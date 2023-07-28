using GraphQL;
using GraphQL.Types;
using TimeTracker.Absctration;
using TimeTracker.GraphQL.Types;
using TimeTracker.GraphQL.Types.InputTypes;
using TimeTracker.Models;

namespace TimeTracker.GraphQL.Mutations;

public sealed class CalendarEventMutations:ObjectGraphType
{
    public CalendarEventMutations(IUnitOfWorkRepository uow)
    {
        Field<CalendarEventType>("createEvent")
            .Argument<CalendarEventInputType>("calendarEvent")
            .ResolveAsync(async context =>
            {
                var eEvent = context.GetArgument<CalendarEvent>("calendarEvent");
                
                var created = await uow.GenericRepository<CalendarEvent>()
                    .CreateAsync(eEvent);

                await uow.SaveAsync();

                return created;
            });
        
    }
}