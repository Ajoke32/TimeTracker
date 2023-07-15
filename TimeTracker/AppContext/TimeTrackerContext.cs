using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using TimeTracker.Models;
using TimeTracker.Utils.SoftDelete;

namespace TimeTracker.AppContext;

public class TimeTrackerContext:DbContext
{
    public TimeTrackerContext(DbContextOptions<TimeTrackerContext> options) : base(options)
    {
    }
    
    public DbSet<User> Users { get; set; }
    
    public DbSet<Vacation> Vacations { get; set; }
    
    public DbSet<UserApprover> Approvers { get; set; }
    
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<UserApprover>()
            .HasOne(a => a.Approver)
            .WithMany(u => u.Senders)
            .HasForeignKey(a => a.ApproverId)
            .OnDelete(DeleteBehavior.NoAction);

        modelBuilder.Entity<UserApprover>()
            .HasOne(a => a.User)
            .WithMany(u => u.Approvers)
            .HasForeignKey(a => a.UserId)
            .OnDelete(DeleteBehavior.NoAction);
        


        base.OnModelCreating(modelBuilder);
    }
    
}