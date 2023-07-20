using System.ComponentModel.DataAnnotations;
using TimeTracker.Models.Dtos;


namespace TimeTracker.Models;

public class Vacation
{
    public int Id { get; set; }
     
    public int UserId { get; set; }

    public User User { get; set; } = null!;
    
    public bool? VacationState { get; set; }
    
    [Required]
    public DateTime StartDate { get; set; }

    public string Message { get; set; } = string.Empty;
    
    [Required]
    public DateTime EndDate { get; set; }

    public List<ApproverVacation> ApproverVacations { get; set; } = new();
}