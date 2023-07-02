using GraphQL.Types;
using TimeTracker.Models;

namespace TimeTracker.GraphQL.Types;

public sealed class VacationType: ObjectGraphType<Vacation>
{
    public VacationType()
    {
        Field(x => x.Id).Description("Id");

        Field(x => x.UserId).Description("request from this user");

        Field(x => x.StartDate).Description("vacation start date");

        Field(x => x.EndDate).Description("vacation end date");

        Field(x => x.VacationState,nullable:true).Description("vacation state");
    }
}