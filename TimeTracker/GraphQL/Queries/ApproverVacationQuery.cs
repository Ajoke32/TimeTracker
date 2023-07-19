using AutoMapper;
using GraphQL;
using GraphQL.Types;
using TimeTracker.Absctration;
using TimeTracker.GraphQL.Types;
using TimeTracker.Models;
using TimeTracker.Models.Dtos;

namespace TimeTracker.GraphQL.Queries;

public sealed class ApproverVacationQuery:ObjectGraphType
{
    public ApproverVacationQuery(IUnitOfWorkRepository uow,IMapper mapper)
    {
        Field<ListGraphType<ApproverVacationType>>("requests")
            .Argument<int>("userId")
            .ResolveAsync(async context =>
            {
                var id = context.GetArgument<int>("userId");
                
                
                return  await uow.GenericRepository<ApproverVacation>()
                        .GetAsync(
                            includeProperties:"Vacation.User",
                            filter:a=>a.UserId==id);
            });
    }
}