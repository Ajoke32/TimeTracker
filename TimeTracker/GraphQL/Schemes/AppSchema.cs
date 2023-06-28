

using GraphQL.Types;
using TimeTracker.GraphQL.Types;
using TimeTracker.Models;

namespace TimeTracker.GraphQL.Schemes;

public class AppSchema:Schema
{
    public AppSchema(IServiceProvider provider):base(provider)
    {
        RegisterTypeMapping(typeof(Vacation),typeof(VacationType));
        RegisterTypeMapping(typeof(Approver),typeof(ApproveType));
        RegisterTypeMapping(typeof(User),typeof(UserType));
        Query = provider.GetRequiredService<RootQuery>();
        Mutation = provider.GetRequiredService<RootMutation>();
    }
}