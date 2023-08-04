using AutoMapper;
using TimeTracker.Models;
using TimeTracker.Models.Dtos;

namespace TimeTracker.MapperProfiles;

public class WorkedHourProfile : Profile
{

    public WorkedHourProfile()
    {
        CreateMap<WorkedHourInputDto, WorkedHour>()
            .ForMember(x => x.WorkedTime,
                o =>
                    o.MapFrom((src, dest) => dest.WorkedTime.Add(src.WorkedTime.ToTimeSpan())))
            .ForAllMembers(o => o.UseDestinationValue());

        CreateMap<WorkedHourUpdateDto, WorkedHour>()
            .ForMember(x => x.WorkedTime,
                o =>
                    o.MapFrom(dto => dto.WorkedTime))
            .ForAllMembers(o => o.UseDestinationValue());
    }
}
