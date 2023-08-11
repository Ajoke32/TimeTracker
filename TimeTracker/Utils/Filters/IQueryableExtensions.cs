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
            var labmdas = new List<Expression<Func<T, bool>>>();
            var group =  groupExpression;
            foreach (var exp in group)
            {
                var lmb = LambdaBuilder.BuildLambda<T>(exp,exp.Operator);
                labmdas.Add(lmb);
            }
            
            Expression<Func<T, bool>>? combinedExpression = null;
            
            var parameter = Expression.Parameter(typeof(T), "f");
            
            foreach (var lamda in labmdas)
            {
                var replacedBody = new ParameterReplacer(lamda.Parameters[0],
                    parameter).Visit(lamda.Body);
                
                if (combinedExpression == null)
                {
                    combinedExpression = Expression.Lambda<Func<T, bool>>(replacedBody, parameter);
                }
                else
                {
                    var andExpression = Expression.AndAlso(combinedExpression.Body, replacedBody);
                    combinedExpression = Expression.Lambda<Func<T, bool>>(andExpression, parameter);
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