using AutoMapper;
using GraphQL;
using GraphQL.Execution;
using GraphQL.Types;
using GraphQL.Validation;
using TimeTracker.Absctration;
using TimeTracker.Enums;
using TimeTracker.GraphQL.Types;
using TimeTracker.GraphQL.Types.InputTypes;
using TimeTracker.Models;
using TimeTracker.Models.Dtos;
using TimeTracker.Utils.Auth;
using TimeTracker.Utils.Email;
using TimeTracker.Utils.Errors;
using TimeTracker.Utils.Filters;
using TimeTracker.Visitors;

namespace TimeTracker.GraphQL.Queries;

public sealed class WorkedHourQuery : ObjectGraphType
{
    public WorkedHourQuery(IUnitOfWorkRepository uow, IGraphQlArgumentVisitor visitor)
    {
        Field<ListGraphType<WorkedHourType>>("workedHours")
            .Argument<int>("userId")
            .ResolveAsync(async ctx =>
            {
                var userId = ctx.GetArgument<int>("userId");

                var workedHours = await uow.GenericRepository<WorkedHour>()
                                    .GetAsync(filter: (w => w.UserId == userId));
                
                workedHours = workedHours.OrderByDescending(w=>w.Id);
                
                return visitor.VisitPaging(workedHours,ctx);
            })
            .Description("gets all user's worked hours")
            .UsePaging();
    }
}