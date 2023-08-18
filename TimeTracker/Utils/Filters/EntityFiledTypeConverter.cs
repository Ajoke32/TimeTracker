namespace TimeTracker.Utils.Filters;

public class EntityFiledTypeConverter
{
    public static object ConvertToFieldType<T>(string fieldName, string compareValue)
    {

        var classType = typeof(T);
        
        var property = classType.GetProperty(fieldName);
        
        return Convert.ChangeType(compareValue, property.PropertyType);
    }

    public static object ConvertToFieldType(Type type, string value,string? oprt=null)
    {
        if (oprt is "contains" && type==typeof(DateTime))
        {
            return Convert.ChangeType(value, typeof(string));
        }
        
        return Convert.ChangeType(value, type);
    }
    
}