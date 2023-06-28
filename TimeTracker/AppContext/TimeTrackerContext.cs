using Microsoft.EntityFrameworkCore;
using TimeTracker.Models;

namespace TimeTracker.AppContext;

public class TimeTrackerContext:DbContext
{
    public TimeTrackerContext(DbContextOptions<TimeTrackerContext> options):base(options){ }
    
    public DbSet<User> Users { get; set; }
    
    public DbSet<Vacation> Vacations { get; set; }
    
    public DbSet<Approver> Approvers { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Approver>()
            .HasOne(a => a.UserApprover)
            .WithMany(u => u.Approvers)
            .HasForeignKey(a => a.UserApproverId)
            .OnDelete(DeleteBehavior.NoAction);
        
        modelBuilder.Entity<Approver>()
            .HasOne(a => a.UserSender)
            .WithMany(u => u.Requests)
            .HasForeignKey(a => a.UserSenderId)
            .OnDelete(DeleteBehavior.NoAction);

        base.OnModelCreating(modelBuilder);
    }
}