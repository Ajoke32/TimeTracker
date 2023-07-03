using AutoMapper;
using TimeTracker.Enums;
using TimeTracker.Models;
using TimeTracker.Models.Dtos;

namespace TimeTracker.MapperProfiles;

public class UserProfile:Profile
{
    public UserProfile()
    {
        CreateMap<UserInputDto, User>()
            .ForMember(x => x.Permissions,
                o =>
                    o.MapFrom(dto => (Permissions)dto.Permissions))
            .ForMember(x=>x.WorkType,
                o=>
                    o.MapFrom(dto=>(WorkType)dto.WorkType));
        
    }
}