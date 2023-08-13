using System.Linq.Expressions;
using System.Reflection;
using GraphQL;
using TimeTracker.Utils.Filters.ExpressionTypes;

namespace TimeTracker.Utils.Filters;

public static class IQueryableExtensions
{
    public static IQueryable<T> ApplyGroupFilters<T>(this IQueryable<T> q,
        List<WhereExpression> groupExpression,IResolveFieldContext context, bool withExtraInfo = true)
    {
        var group = groupExpression;
        Expression<Func<T, bool>>? combinedExpression = null;
        var parameter = Expression.Parameter(typeof(T), "f");
        foreach (var exp in group)
        {
            var lambda = LambdaBuilder.BuildLambda<T>(exp, exp.Operator,parameter);
            
            if (combinedExpression == null)
            {
                combinedExpression = Expression.Lambda<Func<T, bool>>(lambda.Body, parameter);
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
                    resultingExpression = Expression.AndAlso(combinedExpression.Body, lambda.Body);
                }

                if (exp.Connector == "or")
                {
                    resultingExpression = Expression.Or(combinedExpression.Body, lambda.Body);
                }

                combinedExpression = Expression.Lambda<Func<T, bool>>(resultingExpression, parameter);
            }
        }
        

        return q.Where(combinedExpression!);
    }

    public static IQueryable<T> ApplyWhereFilter<T>(this IQueryable<T> q,WhereExpression expression)
    {
        var parameter = Expression.Parameter(typeof(T), "f");
        var lambda = LambdaBuilder.BuildLambda<T>(expression, expression.Operator,parameter);
        return q.Where(lambda);
    }

    public static IQueryable<T> ApplyGraphQlOrdering<T>(this IQueryable<T> q, OrderByExpression orderBy)
    {
        
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

    public static IQueryable<T> ApplyGraphQlPaging<T>(this IQueryable<T> q,int take,int skip)
    {
        return q.Take(take).Skip(skip);
    }
}