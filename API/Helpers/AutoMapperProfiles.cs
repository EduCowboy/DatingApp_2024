using API.DTO;
using API.Entities;
using API.Extensions;
using AutoMapper;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserResponseDto>()
                .ForMember(dest => dest.PhotoUrl, 
                opt => opt.MapFrom(
                    src => src.Photos.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(dest => dest.UserAge, 
                opt => opt.MapFrom(
                    src => src.DateOfBirth.CalculateAge()));
            CreateMap<Photos, PhotoResponseDto>();
            CreateMap<UserUpdateDto, User>();
        }
    }
}