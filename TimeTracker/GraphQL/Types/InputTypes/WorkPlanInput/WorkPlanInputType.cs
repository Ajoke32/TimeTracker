using GraphQL.Types;
using TimeTracker.Models.Dtos;


namespace TimeTracker.GraphQL.Types.InputTypes.WorkPlanInput;

public sealed class WorkPlanInputType: InputObjectGraphType<WorkPlanInputDto>
{
    public WorkPlanInputType()
    {
        Field(x => x.UserId).Description("user id");

        Field(x => x.Date).Description("working date");

        Field(x => x.StartTime).Description("start time");

        Field(x => x.EndTime).Description("end time");

    }
}