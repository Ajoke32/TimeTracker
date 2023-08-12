using System.Linq.Expressions;
using Microsoft.IdentityModel.Tokens;
using TimeTracker.Utils.Filters.ExpressionTypes;

namespace TimeTracker.Utils.Filters;

public class LambdaBuilder
{
  

    public static Expression<Func<T, bool>> BuildLambda<T>(WhereExpression expression,string oprt)
    {
        BinaryExpression body = null;
        
        var parameter = Expression.Parameter(typeof(T), "f");
        
        var propertyName = expression.PropertyName;
        
        var property = Expression.Property(parameter, propertyName);
        
        var constant = GetConvertedConstantExpression<T>(propertyName,expression.CompareValue);
        if (oprt.IsNullOrEmpty())
        {
            throw new Exception("empty operator");
        }
        
        if (oprt == "eq")
        {
            body =  Expression.Equal(property, constant);
        }

        if (oprt == "neq")
        {
            body = Expression.NotEqual(property, constant);
        }

        if (oprt == "gt")
        {
            body = Expression.GreaterThan(property, constant);
        }

        if (oprt == "lt")
        {
            body = Expression.LessThan(property, constant);
        }
        
        return Expression.Lambda<Func<T, bool>>(body!, parameter);
    }
    private static ConstantExpression GetConvertedConstantExpression<T>(string propertyName,string compareValue)
    {
        var converted = EntityFiledTypeConverter.ConvertToFieldType<T>(propertyName, compareValue);
        return Expression.Constant(converted);
    }
}