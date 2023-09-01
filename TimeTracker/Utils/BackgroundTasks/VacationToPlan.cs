using Quartz;
using TimeTracker.Absctration;
using TimeTracker.Enums;
using TimeTracker.Models;

namespace TimeTracker.Utils.BackgroundTasks;

public class VacationToPlan
{
    private readonly IUnitOfWorkRepository _uow;
    
    public VacationToPlan(IUnitOfWorkRepository repos)
    {
        _uow = repos;
    }
    
    public async Task Execute(IJobExecutionContext context)
    {
        var logs = await _uow.GenericRepository<QuartzLog>()
            .GetAsync(orderBy:q=>q.OrderByDescending(e=>e.Id));
        
        var lastLog = logs.FirstOrDefault(l=>l.Type==Log.Leave);
        
        
        
        
        
        await _uow.SaveAsync();
    }
}