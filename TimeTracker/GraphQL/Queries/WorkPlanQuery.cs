using AutoMapper;
using GraphQL;
using GraphQL.Types;
using TimeTracker.Absctration;
using TimeTracker.GraphQL.Types;
using TimeTracker.GraphQL.Types.InputTypes.CalendarEventInput;
using TimeTracker.Models;
using TimeTracker.Models.Dtos;

namespace TimeTracker.GraphQL.Queries;

public sealed class WorkPlanQuery : ObjectGraphType
{
    public WorkPlanQuery(IUnitOfWorkRepository uow, IMapper mapper)
    {
        Field<ListGraphType<WorkPlanType>>("workPlans")
            .Argument<int>("userId")
            .Argument<DateRangeInputType>("dateRange")
            .ResolveAsync(async ctx =>
            {
                var userId = ctx.GetArgument<int>("userId");
                var dateRange = ctx.GetArgument<DateRangeInputDto>("dateRange");

                var workPlans = await uow.GenericRepository<WorkPlan>()
                                    .GetAsync(c => c.UserId == userId
                                                && c.Date >= DateOnly.FromDateTime(dateRange.StartDate)
                                                && c.Date <= DateOnly.FromDateTime(dateRange.EndDate),
                                                includeProperties: "User");

                return workPlans;
            })
            .Description("gets all user's work plans");
    }
}