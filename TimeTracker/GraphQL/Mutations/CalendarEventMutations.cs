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

        Field<int>("deleteEventById")
            .Argument<int>("id")
            .ResolveAsync(async context =>
            {
                var id = context.GetArgument<int>("id");
                var searchEvent = await uow.GenericRepository<CalendarEvent>()
                    .FindAsync(u => u.Id == id);
                
                if (searchEvent == null)
                {
                    throw new ArgumentException("not found");
                }
                
                await uow.GenericRepository<CalendarEvent>()
                    .DeleteAsync(searchEvent);
                
                await uow.SaveAsync();

                return searchEvent.Id;
            });

        Field<CalendarEventType>("updateEvent")
            .Argument<CalendarEventUpdateType>("calendarEvent")
            .ResolveAsync(async context =>
            {
                var calendarEvent = context.GetArgument<CalendarEvent>("calendarEvent");
                
                return await uow.GenericRepository<CalendarEvent>()
                    .UpdateAsync(calendarEvent);
            });
    }
}