using System.Linq.Expressions;
using GraphQL;
using TimeTracker.Utils.Filters.ExpressionTypes;

namespace TimeTracker.Utils.Filters;

public static class IQueryableExtensions
{
    public static IEnumerable<T> ApplyGraphQlFilters<T>(this IQueryable<T> q, IResolveFieldContext context)
    {
        var expression = context.GetArgument<WhereExpression>("where");
        var groupExpression = context.GetArgument<List<WhereExpression>>("group");
        
        
        if (groupExpression!=null&&groupExpression.Any())
        {
            var group =  groupExpression;
            Expression<Func<T, bool>>? combinedExpression = null;
            var parameter = Expression.Parameter(typeof(T), "f");
            foreach (var exp in group)
            {
                var lambda = LambdaBuilder.BuildLambda<T>(exp,exp.Operator);
                
                var replacedBody = new ParameterReplacer(lambda.Parameters[0],
                    parameter).Visit(lambda.Body);
                
                if (combinedExpression == null)
                {
                    combinedExpression = Expression.Lambda<Func<T, bool>>(replacedBody, parameter);
                }
                else
                {
                    if (exp.Connector == "")
                    {
                        continue;
                    }
                    BinaryExpression? resultingExpression = null;
                    if (exp.Connector == "and")
                    {
                        resultingExpression  = Expression.AndAlso(combinedExpression.Body, replacedBody);
                    }

                    if (exp.Connector == "or")
                    {
                        resultingExpression  = Expression.Or(combinedExpression.Body, replacedBody);
                    }
                    combinedExpression = Expression.Lambda<Func<T, bool>>(resultingExpression, parameter);
                }
            }
            

            return q.Where(combinedExpression!);
        }

        if (expression != null)
        {
            var lambda = LambdaBuilder.BuildLambda<T>(expression,expression.Operator);
            return q.Where(lambda);
        }

        return q;
    }
}