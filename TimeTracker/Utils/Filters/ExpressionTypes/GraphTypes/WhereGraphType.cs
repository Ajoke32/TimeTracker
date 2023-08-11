using GraphQL.Types;

namespace TimeTracker.Utils.Filters.ExpressionTypes.GraphTypes;

public sealed class WhereGraphType : InputObjectGraphType<WhereExpression>
{
    public WhereGraphType()
    {
        
        Field(x => x.PropertyName,nullable:true).Name("property");
        Field(x => x.Operator,nullable:true).Name("operator");
        Field(x => x.CompareValue,nullable:true).Name("value");
    }
}
