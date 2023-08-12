using System.Linq.Expressions;
using System.Reflection;
using GraphQL;
using TimeTracker.Utils.Filters.ExpressionTypes;

namespace TimeTracker.Utils.Filters;

public static class IQueryableExtensions
{
    public static IQueryable<T> ApplyGraphQlFilters<T>(this IQueryable<T> q, IResolveFieldContext context,bool withExtraInfo=true)
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

            if (withExtraInfo)
            {
                var count = q.Count(combinedExpression!);
                context.OutputExtensions.Add("count", count);
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

    public static IQueryable<T> ApplyGraphQlOrdering<T>(this IQueryable<T> q, IResolveFieldContext context)
    {
        var orderBy = context.GetArgument<OrderByExpression>("orderBy");
        if (orderBy == null)
        {
            throw new Exception("cannot apply ordering,orderBy expression missing");
        }
        var parameter = Expression.Parameter(typeof(T), "f");
        Expression property = Expression.Property(parameter, orderBy.Property);


        var lambda = Expression.Lambda(property, parameter);


        MethodInfo orderByMethod = null;
        
        if (orderBy.Direction == "ASC")
        {
            orderByMethod = typeof(Queryable).GetMethods()
                .Single(method => method.Name == "OrderBy" && method.GetParameters().Length == 2)
                .MakeGenericMethod(typeof(T), property.Type);
        }
        else
        {
            orderByMethod = typeof(Queryable).GetMethods()
                .Single(method => method.Name == "OrderByDescending" && method.GetParameters().Length == 2)
                .MakeGenericMethod(typeof(T), property.Type);
        }


        var orderedQuery = Expression.Call(
            typeof(Queryable),
            orderByMethod.Name,
            new[] { typeof(T), property.Type },
            q.Expression,
            Expression.Quote(lambda)
        );

        return q.Provider.CreateQuery<T>(orderedQuery);
    }

    public static IQueryable<T> ApplyGraphQlPaging<T>(this IQueryable<T> q, IResolveFieldContext context)
    {
        var take = context.GetArgument<int>("take");
        var skip = context.GetArgument<int>("skip");
        return q.Take(take).Skip(skip);
    }
    
}