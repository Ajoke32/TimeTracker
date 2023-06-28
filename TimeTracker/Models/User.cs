using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using TimeTracker.Enums;

namespace TimeTracker.Models;

public class User
{
    public int Id { get; set; }
    
    [Required] public string FirstName { get; set; } = string.Empty;
    
    [Required] public string LastName { get; set; } = string.Empty;
    
    [Required] public string Email { get; set; } = string.Empty;
    
    [Required] public string Password { get; set; } = string.Empty;
    
    [Required] public WorkType WorkType { get; set; }
    
    public Permissions Permissions { get; set; }

    public int VacationDays { get; set; }
    
    public List<Vacation> Vacations { get; } = new();
    
    public List<Approver> Approvers { get; } = new();
    
    public List<Approver> Requests { get; } = new();

}