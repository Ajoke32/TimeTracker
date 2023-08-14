namespace TimeTracker.Models.Dtos;

public class WorkPlanInputDto
{
    public int UserId { get; set; }

    public DateOnly Date { get; set; }

    public TimeOnly StartTime { get; set; }
    
    public TimeOnly EndTime { get; set; }
}