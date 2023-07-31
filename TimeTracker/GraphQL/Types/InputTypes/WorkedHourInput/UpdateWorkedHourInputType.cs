using GraphQL.Types;
using TimeTracker.Models.Dtos;

namespace TimeTracker.GraphQL.Types.InputTypes.WorkedHourInput;

public sealed class UpdateWorkedHourInputType: InputObjectGraphType<WorkedHourUpdateDto>
{
    public UpdateWorkedHourInputType()
    {
        Field(v => v.Id).Description("record id");

        Field(x => x.WorkedTime).Description("user's worked time");
    }
}