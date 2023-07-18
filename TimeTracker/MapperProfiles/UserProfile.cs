using AutoMapper;
using TimeTracker.Enums;
using TimeTracker.GraphQL.Types;
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
            .ForMember(x => x.WorkType,
                o =>
                    o.MapFrom(m =>
                        m.HoursPerMonth == User.FullTimeValue ? WorkType.FullTime : WorkType.PartTime));

        CreateMap<User, UserDisplayDto>()
            .ForMember(u => u.Permissions,
                o =>
                    o.MapFrom(m => (int)m.Permissions))
            .ForMember(u => u.WorkType,
                o =>
                    o.MapFrom(m => (int)m.WorkType));

        CreateMap<UserApprover, UserApproverDisplayDto>();

        CreateMap<Vacation, VacationDto>();
    }
}

public class VacationDto
{
    public int Id { get; set; }

    public UserDisplayDto User { get; set; } = null!;
    
    public bool? VacationState { get; set; }
    
    public DateTime StartDate { get; set; }

    public string Message { get; set; } = string.Empty;
    
    public DateTime EndDate { get; set; }
}

