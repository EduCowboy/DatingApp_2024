using API.DTO;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _dataContext;
        private readonly IMapper _mapper;

        public UserRepository(DataContext dataContext,
                                IMapper mapper)
        {
            _dataContext = dataContext;
            _mapper = mapper;
        }
        
        public async Task<UserResponseDto> GetMemberAsync(string userName)
        {
            return await _dataContext.Users
                .Where(x => x.UserName == userName)
                .ProjectTo<UserResponseDto>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync();
        }

        public async Task<IEnumerable<UserResponseDto>> GetMembersAsync()
        {
            return await _dataContext.Users
            .ProjectTo<UserResponseDto>(_mapper.ConfigurationProvider)
            .ToListAsync();
        }

        public async Task<User> GetUserByIdAsync(int id)
        {
            return await _dataContext.Users.FindAsync(id);
        }

        public async Task<User> GetUserByUserNameAsync(string userName)
        {
            return await _dataContext.Users
            .Include(p => p.Photos)
            .SingleOrDefaultAsync(u => u.UserName == userName);
        }

        public async Task<IEnumerable<User>> GetUsersAsync()
        {
            return await _dataContext.Users
            .Include(p => p.Photos)
            .ToListAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _dataContext.SaveChangesAsync() > 0;
        }

        public void Update(User user)
        {
            _dataContext.Entry(user).State = EntityState.Modified;
        }
    }
}