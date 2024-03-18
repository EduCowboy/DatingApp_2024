using System.Net;
using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DTO;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController : BaseAPIController
    {
        private readonly ILogger<AccountController> _logger;
        private readonly DataContext _dataContext;
        private readonly ITokenService _tokenService;

        public AccountController(ILogger<AccountController> logger,
                                DataContext dataContext,
                                ITokenService tokenService)
        {
            _logger = logger;
            _dataContext = dataContext;
            _tokenService = tokenService;
        }

        [HttpPost("register")]
        public async Task<ActionResult<LoginResponseDto>> Register(UserRequestDto userDto)
        {
            
            try
            {
                if(await UserExists(userDto.UserName)) return BadRequest("Username already exists!");

                using var hmac = new HMACSHA512();

                var user = new User();
                var loginResponseDto = new LoginResponseDto();

                user.UserName = userDto.UserName.ToLower();
                user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(userDto.Password));
                user.PasswordSalt = hmac.Key;

                _dataContext.Users.Add(user);
                await _dataContext.SaveChangesAsync();
                
                loginResponseDto.UserName = user.UserName;
                loginResponseDto.Token = _tokenService.CreateToken(user);

                return loginResponseDto;
            }
            catch (Exception ex)
            {
                return StatusCode(500);
            }
            
        }

        [HttpPost("login")]
        public async Task<ActionResult<LoginResponseDto>> Login(LoginRequestDto loginDto)
        {
            var user = await _dataContext.Users.SingleOrDefaultAsync(user => user.UserName == loginDto.UserName);

            if(user == null) return Unauthorized("Invalid username!");

            using var hmac = new HMACSHA512(user.PasswordSalt);

            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

        	for (int i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid password!");
            }

            var loginResponseDto = new LoginResponseDto();

            loginResponseDto.UserName = user.UserName;
            loginResponseDto.Token = _tokenService.CreateToken(user);

            return loginResponseDto;
        }


        private Task<bool> UserExists(string username)
        {
            return  _dataContext.Users.AnyAsync(user => user.UserName == username.ToLower());
        }

       
    }
}