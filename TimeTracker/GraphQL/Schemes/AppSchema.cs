using GraphQL.Types;
using TimeTracker.GraphQL.Types;
using TimeTracker.Models;
using TimeTracker.Utils.Filters;


namespace TimeTracker.GraphQL.Schemes;

public class AppSchema:Schema
{
    public AppSchema(IServiceProvider provider):base(provider)
    {
        RegisterTypeMapping(typeof(Vacation),typeof(VacationType));
        RegisterTypeMapping(typeof(UserApprover),typeof(ApproveType));
        RegisterTypeMapping(typeof(User),typeof(UserType));
        RegisterTypeMapping(typeof(ApproverVacation),typeof(ApproverVacationType));
        RegisterTypeMapping(typeof(WorkedHour), typeof(WorkedHourType));
        RegisterTypeMapping(typeof(WhereExpression),typeof(WhereGraphType));
        Query = provider.GetRequiredService<RootQuery>();
        Mutation = provider.GetRequiredService<RootMutation>();
    }
}