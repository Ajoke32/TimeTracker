﻿using GraphQL;
using GraphQL.Types;
using GraphQL.Validation;
using TimeTracker.Absctration;
using TimeTracker.Enums;
using TimeTracker.GraphQL.Types;
using TimeTracker.GraphQL.Types.InputTypes.VacationInput;
using TimeTracker.Models;
using TimeTracker.Utils.Errors;

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

        Field<VacationType>("updateState")
            .Argument<int>("vacationId")
            .ResolveAsync(async _ =>
            {
                var id = _.GetArgument<int>("vacationId");
                
                var vacation = await uow.GenericRepository<Vacation>()
                    .FindAsync(v => v.Id == id,relatedData:"ApproverVacations")??throw new ValidationError("Vacation not found");


                vacation.VacationState = GetVacationState(vacation.ApproverVacations);
                
                await uow.SaveAsync();
                
                return vacation;
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

        Field<VacationType>("changeState")
            .Argument<int>("vacationId")
            .Argument<VacationState>("state")
            .ResolveAsync(async _ =>
            {
                var id = _.GetArgument<int>("vacationId");
                var state = _.GetArgument<VacationState>("state");
                
                var vacation = await uow.GenericRepository<Vacation>()
                    .FindAsync(v => v.Id == id);
                
                if (vacation == null) { return null; }
                
                vacation.VacationState = state;
                await uow.SaveAsync();
                return vacation;
            });
    }


    private VacationState GetVacationState(List<ApproverVacation> avs)
    {
        var approvals=0;
        
        foreach (var av in avs)
        {
            if (av.IsApproved == false)
                return VacationState.Declined;
            
            if (av.IsApproved == true)
                approvals++;
        }
        
        return approvals == avs.Count ? VacationState.Approved : VacationState.Pending;
    }
} 