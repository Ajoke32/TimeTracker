namespace TimeTracker.Models.Dtos;

public class WorkedHourUpdateDto
{
    public int Id { get; set; }

    public TimeOnly WorkedTime { get; set; }
}