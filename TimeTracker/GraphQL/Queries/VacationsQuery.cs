using GraphQL;
using GraphQL.Types;
using TimeTracker.Absctration;
using TimeTracker.GraphQL.Types;
using TimeTracker.Models;

namespace TimeTracker.GraphQL.Queries;

public class VacationsQuery:ObjectGraphType
{
    public VacationsQuery(IUnitOfWorkRepository uow)
    {
        Field<ListGraphType<VacationType>>("userVacations")
            .Argument<int>("userId")
            .ResolveAsync(async _ =>
            {
                var id = _.GetArgument<int>("userId");
                
                return await uow.GenericRepository<Vacation>()
                    .GetAsync(x => x.UserId == id);
            });
    }
}