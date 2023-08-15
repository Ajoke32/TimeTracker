namespace TimeTracker.Utils.Filters;

public class EntityFiledTypeConverter
{
    public static object ConvertToFieldType<T>(string fieldName, string compareValue)
    {

        var classType = typeof(T);
        
        var property = classType.GetProperty(fieldName);
        
        return Convert.ChangeType(compareValue, property.PropertyType);
    }
    
}