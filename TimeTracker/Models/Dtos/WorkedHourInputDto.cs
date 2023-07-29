namespace TimeTracker.Models.Dtos;

public class WorkedHourInputDto
{
    public int UserId { get; set; }

    public DateOnly Date { get; set; }

    public TimeOnly WorkedTime { get; set; }
}