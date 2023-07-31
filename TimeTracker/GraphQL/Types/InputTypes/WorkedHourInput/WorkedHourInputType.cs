using GraphQL.Types;
using TimeTracker.Models.Dtos;

namespace TimeTracker.GraphQL.Types.InputTypes.WorkedHourInput;

public sealed class WorkedHourInputType: InputObjectGraphType<WorkedHourInputDto>
{
    public WorkedHourInputType()
    {
        Field(v => v.UserId).Description("user id");

        Field(x => x.Date).Description("working date");

        Field(x => x.WorkedTime).Description("user's worked time");
    }
}