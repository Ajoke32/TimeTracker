using System.Linq.Expressions;
using GraphQL;
using GraphQL.Builders;
using GraphQL.Instrumentation;
using GraphQL.Types;
using TimeTracker.Models;

namespace TimeTracker.Utils.Filters;

public static class GraphQlBuilderExtensions
{
    public static void UseFiltering<T, V>(this FieldBuilder<T, V> builder, Type entityType)
    {
        builder.Argument<WhereGraphType>("where");
    }


    public static IEnumerable<T> ApplyGraphQlFilters<T>(this IQueryable<T> q, IResolveFieldContext context)
    {
        var expression = context.GetArgument<WhereExpression>("where");

        if (expression == null)
        {
            throw new Exception("filters absent");
        }
        
        var parameter = Expression.Parameter(typeof(T), "f");
        var property = Expression.Property(parameter, expression.PropertyName);
        
        var constant = Expression.Constant(expression.CompareValue);
        
        var body = Expression.Equal(property, constant);
        
        var lambda = Expression.Lambda<Func<T, bool>>(body, parameter);
  
        return q.Where(lambda);
    }
}

public sealed class WhereGraphType : InputObjectGraphType<WhereExpression>
{
    public WhereGraphType()
    {
        Field(x => x.PropertyName).Name("property");
        Field(x => x.Operator).Name("operator");
        Field(x => x.CompareValue).Name("value");
    }
}

public class WhereExpression
{
    public string Operator { get; set; } = string.Empty;
    public string PropertyName { get; set; } = string.Empty;

    public string CompareValue { get; set; } = string.Empty;
}