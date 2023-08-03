namespace TimeTracker.Models.Dtos;

public class WorkedHourUpdateDto
{
    public int Id { get; set; }

    public TimeOnly StartTime { get; set; }

    public TimeOnly EndTime { get; set; }
    
    public TimeOnly TotalTime { get; set; }
}