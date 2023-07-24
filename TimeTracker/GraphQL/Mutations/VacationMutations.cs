﻿using GraphQL;
using GraphQL.Types;
using GraphQL.Validation;
using TimeTracker.Absctration;
using TimeTracker.GraphQL.Types;
using TimeTracker.GraphQL.Types.InputTypes.VacationInput;
using TimeTracker.Models;

namespace TimeTracker.GraphQL.Mutations;

public sealed class VacationMutations:ObjectGraphType
{
    public VacationMutations(IUnitOfWorkRepository uow)
    {
        Field<VacationType>("create")
            .Argument<VacationInputType>("vacation")
            .ResolveAsync(async _ =>
            {
                var vacation = _.GetArgument<Vacation>("vacation");

                var user = await uow.GenericRepository<User>()
                    .FindAsync(u => u.Id == vacation.UserId);

                if (user!.VacationDays == 0)
                {
                    throw new ValidationError("The available days have expired");
                }
                
                var diff = vacation.EndDate - vacation.StartDate;
                
                if (diff.Days > user!.VacationDays)
                {
                    throw new ValidationError("Vacation period invalid");
                }
                
                user.VacationDays -= diff.Days;
                
                var res = await uow.GenericRepository<Vacation>()
                    .CreateAsync(vacation);
                
                await uow.SaveAsync();
                
                return res;
            });

        Field<bool>("updateState")
            .Argument<List<int>>("vacations")
            .ResolveAsync(async _ =>
            {
                var id = _.GetArgument<List<int>>("vacations");
                
                var vacations = await uow.GenericRepository<Vacation>()
                    .GetAsync(v => id.Contains(v.Id),includeProperties:"ApproverVacations");
                
                if (!vacations.Any())
                {
                    throw  new ValidationError("Vacations not found");
                }
                
                
                foreach (var vac in vacations)
                {
                    vac.VacationState = IsVacationConfirmed(vac.ApproverVacations);
                }
                
                await uow.SaveAsync();
                
                return true;
            });


        Field<VacationType>("update")
            .Argument<VacationInputType>("vacation")
            .ResolveAsync(async _ =>
            {
                var vacation = _.GetArgument<Vacation>("vacation");

                var updated = await uow.GenericRepository<Vacation>().UpdateAsync(vacation);
                await uow.SaveAsync();
                return updated;
            });
    }


    private bool? IsVacationConfirmed(List<ApproverVacation> avs)
    {
        int approvals=0, rejections=0, pending=0;
        
        foreach (var av in avs)
        {
            if (av.IsApproved == false)
                return false;
            
            if (av.IsApproved == true)
                approvals++;
            else
                pending++;
        }

        if (pending > 0)
        {
            return null;
        }
        
        return approvals==avs.Count;
    }
} 