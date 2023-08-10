namespace TimeTracker.Models;

public class WorkedHour
{
    public int Id { get; set; }

    public int UserId { get; set; }

    public User User { get; set; } = null!;

    public DateOnly Date { get; set; }

    public TimeOnly StartTime { get; set; }
    
    public TimeOnly EndTime { get; set; }
    
    public TimeOnly TotalTime { get; set; }
}