using AutoMapper;
using GraphQL;
using GraphQL.Types;
using TimeTracker.Absctration;
using GraphQL.Validation;
using TimeTracker.GraphQL.Types.InputTypes.CalendarEventInput;
using TimeTracker.Models;
using TimeTracker.Models.Dtos;
using TimeTracker.Utils.Errors;
using TimeTracker.Enums;

namespace TimeTracker.GraphQL.Mutations;

public sealed class CalendarEventMutations : ObjectGraphType
{
    public CalendarEventMutations(IUnitOfWorkRepository uow, IMapper mapper)
    {
        Field<CalendarEvent>("create")
            .Argument<CalendarEventInputType>("calendarEvent")
            .ResolveAsync(async ctx =>
            {
                var evt = ctx.GetArgument<CalendarEventInputDto>("calendarEvent");

                var calendarEvent = await uow.GenericRepository<CalendarEvent>().FindAsync(c => c.Date == evt.Date.ToDateTime(new TimeOnly()));

                if (calendarEvent is not null)
                {
                    throw new ValidationError("Event on this date already exists!");
                }

                var created = await uow.GenericRepository<CalendarEvent>().CreateAsync(mapper.Map<CalendarEvent>(evt));

                await uow.SaveAsync();

                return created;
            });
    }
}