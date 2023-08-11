using GraphQL.Types;

namespace TimeTracker.Utils.Filters.ExpressionTypes.GraphTypes;

public class OrderByGraphType:InputObjectGraphType<OrderByExpression>
{
    public OrderByGraphType()
    {
        Field(x => x.Property);
        Field(x => x.Direction);
    }
}