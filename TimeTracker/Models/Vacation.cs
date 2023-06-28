using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.InteropServices.JavaScript;

namespace TimeTracker.Models;

public class Vacation
{
    public int Id { get; set; }
     
    public int UserId { get; set; }
    
    public bool VacationState { get; set; }
    
    [Required]
    public DateTime StartDate { get; set; }
    
    [Required]
    public DateTime EndDate { get; set; }
}