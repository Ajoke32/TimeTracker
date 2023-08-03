namespace TimeTracker.Models.Dtos;

public class WorkedHourInputDto
{
    public int UserId { get; set; }

    public DateOnly Date { get; set; }

    public TimeOnly StartTime { get; set; }
    
    public TimeOnly EndTime { get; set; }

    public TimeOnly TotalTime { get; set; }
}