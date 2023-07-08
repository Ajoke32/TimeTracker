using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using TimeTracker.Enums;

namespace TimeTracker.Models;

public class User
{
    public int Id { get; set; }
    
    public static int FullTimeValue => 100;

    [Required] public string FirstName { get; set; } = string.Empty;
    
    [Required] public string LastName { get; set; } = string.Empty;
    
    [Required] public string Email { get; set; } = string.Empty;
    
    [Required] public string Password { get; set; } = string.Empty;
    
    [Required] public WorkType WorkType { get; set; }
    
    public string? RefreshToken { get; set; }
    
    public DateTime? RefreshTokenExpiration { get; set; }
    
    public bool IsEmailActivated { get; set; }
    public Permissions Permissions { get; set; }
    
    public int HoursPerMonth { get; set; }
    public int VacationDays { get; set; }
    
    public List<Vacation> Vacations { get; } = new();
    
    public List<UserApprover> Approvers { get; } = new();
    
    public List<UserApprover> Senders { get; } = new();

    public User()
    {
        VacationDays = 30;
        Permissions = Permissions.None;
    }
}