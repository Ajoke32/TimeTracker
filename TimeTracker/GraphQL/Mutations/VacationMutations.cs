using GraphQL;
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

                var diff = vacation.EndDate - vacation.StartDate;
                
                if (diff.Days > user!.VacationDays)
                {
                    throw new ValidationError("Vacation period invalid");
                }
                
                var res = await uow.GenericRepository<Vacation>().CreateAsync(vacation);
                await uow.SaveAsync();
                return res;
            });

        Field<VacationType>("updateState")
            .Argument<int>("id")
            .ResolveAsync(async _ =>
            {
                var state = _.GetArgument<bool>("state");
                var id = _.GetArgument<int>("id");

                var vacation = await uow.GenericRepository<Vacation>()
                    .FindAsync(v => v.Id == id);
                
                if (vacation == null)
                {
                    throw new ArgumentException("vacation not exist");
                }

                var user = await uow.GenericRepository<User>()
                    .FindAsync(u => u.Id == vacation.UserId,relatedData:"Approvers");

                vacation.VacationState = IsVacationConfirmed(user!.Approvers);
                
                var updated = await uow.GenericRepository<Vacation>().UpdateAsync(vacation);
                
                await uow.SaveAsync();

                return updated;
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


    private bool IsVacationConfirmed(IEnumerable<UserApprover> userApprovers)
    {
        return true;
    }
} 