using GraphQL;
using GraphQL.Types;
using TimeTracker.Absctration;
using TimeTracker.GraphQL.Types;
using TimeTracker.Models;


namespace TimeTracker.GraphQL.Queries;

public sealed class ApproverVacationQuery:ObjectGraphType
{
    public ApproverVacationQuery(IUnitOfWorkRepository uow)
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

        Field<ApproverVacationType>("approverVacation")
            .Argument<int>("id")
            .ResolveAsync(async context =>
            {
                var id = context.GetArgument<int>("id");

                return await uow.GenericRepository<ApproverVacation>()
                    .FindAsync(a => a.Id == id,relatedData:"Vacation.User");
            });
    }
}