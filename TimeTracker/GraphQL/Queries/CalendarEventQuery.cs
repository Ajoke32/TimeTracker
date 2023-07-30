using AutoMapper;
using GraphQL.Types;
using TimeTracker.Absctration;
using TimeTracker.GraphQL.Types;
using TimeTracker.Models;
using TimeTracker.Models.Dtos;

namespace TimeTracker.GraphQL.Queries;

public sealed class CalendarEventQuery:ObjectGraphType
{
    public CalendarEventQuery(IUnitOfWorkRepository uow)
    {
        Field<ListGraphType<CalendarEventType>>("calendarEvents")
            .ResolveAsync(async context =>await uow.GenericRepository<CalendarEvent>().GetAsync());
    }
}