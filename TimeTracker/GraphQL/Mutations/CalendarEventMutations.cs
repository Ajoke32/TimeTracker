using AutoMapper;
using GraphQL;
using GraphQL.Types;
using TimeTracker.Absctration;
using TimeTracker.GraphQL.Types;
using TimeTracker.GraphQL.Types.InputTypes;
using TimeTracker.Models;
using TimeTracker.Models.Dtos;

namespace TimeTracker.GraphQL.Mutations;

public sealed class CalendarEventMutations:ObjectGraphType
{
    public CalendarEventMutations(IUnitOfWorkRepository uow,IMapper mapper)
    {
        Field<CalendarEventType>("createEvent")
            .Argument<CalendarEventInputType>("calendarEvent")
            .ResolveAsync(async context =>
            {
                var eEvent = context.GetArgument<CalendarEventInputDto>("calendarEvent");
                
                var created = await uow.GenericRepository<CalendarEvent>()
                    .CreateAsync(mapper.Map<CalendarEvent>(eEvent));
                
                await uow.SaveAsync();

                return created;
            });
        
    }
}