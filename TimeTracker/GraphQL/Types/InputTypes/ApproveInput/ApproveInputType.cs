using GraphQL.Types;
using TimeTracker.Models;

namespace TimeTracker.GraphQL.Types.InputTypes.ApproveInput;

public class ApproveInputType:InputObjectGraphType<Approver>
{
    public ApproveInputType()
    {
        Field(x => x.UserApproverId,nullable:false);

        Field(x => x.UserSenderId,nullable:true);

        Field<ListGraphType<IntGraphType>>("approvers",nullable:true);
    }
}