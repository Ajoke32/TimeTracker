using GraphQL.Types;
using TimeTracker.Models;

namespace TimeTracker.GraphQL.Types.InputTypes.VacationInput;

public sealed class VacationInputType: InputObjectGraphType<Vacation>
{
    public VacationInputType()
    {
        Field(v => v.UserId).Description("user sender id");

        Field(v => v.StartDate).Description("vacation start date");

        Field(v => v.EndDate).Description("vacation end date");

        Field(v => v.VacationState, nullable: true)
            .DefaultValue(null)
            .Description("vacation state");
    }
}