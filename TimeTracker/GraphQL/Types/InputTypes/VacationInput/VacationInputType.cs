using GraphQL.Types;
using TimeTracker.Models;

namespace TimeTracker.GraphQL.Types.InputTypes.VacationInput;

public sealed class VacationInputType: InputObjectGraphType<Vacation>
{
    public VacationInputType()
    {
        Field(v => v.UserId).Description("user sender id");

        Field(v => v.StartDate)
            .Type(new DateGraphType())
            .Description("vacation start date");

        Field(v => v.EndDate)
            .Type(new DateGraphType())
            .Description("vacation end date");
        
        Field(v=>v.Message,nullable:true).Description("vacation message");

        Field(v => v.VacationState, nullable: true)
            .DefaultValue(null)
            .Description("vacation state");
    }
}