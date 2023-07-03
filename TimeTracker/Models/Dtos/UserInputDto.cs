using TimeTracker.Enums;

namespace TimeTracker.Models.Dtos;

public class UserInputDto
{
     public string FirstName { get; set; } = string.Empty;
    
     public string LastName { get; set; } = string.Empty;
    
     public string Email { get; set; } = string.Empty;
    
     public string Password { get; set; } = string.Empty;
    
     public int WorkType { get; set; }
     
     public int Permissions { get; set; }
     
     public int HoursPerMonth { get; set; }

     public int VacationDays { get; set; }
}