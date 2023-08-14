using AutoMapper;
using TimeTracker.Models;
using TimeTracker.Models.Dtos;
using TimeTracker.Enums;


namespace TimeTracker.MapperProfiles;

public class CalendarProfile : Profile
{

    public CalendarProfile()
    {
        CreateMap<WorkPlanInputDto, WorkPlan>()
                .ForMember(x => x.Date,
                    o => o.MapFrom(src => src.Date.ToDateTime(new TimeOnly()))
                );
        
        CreateMap<CalendarEventInputDto, CalendarEvent>()
                .ForMember(x => x.Date,
                    o => o.MapFrom(src => src.Date.ToDateTime(new TimeOnly()))
                )
                .ForMember(x => x.EventType,
                o =>
                    o.MapFrom(dto => (EventType)dto.EventType));
    }
}
