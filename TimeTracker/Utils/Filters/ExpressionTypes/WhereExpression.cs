namespace TimeTracker.Utils.Filters.ExpressionTypes;

public class WhereExpression
{
    public string Operator { get; set; } = string.Empty;
    public string PropertyName { get; set; } = string.Empty;

    public string CompareValue { get; set; } = string.Empty;

    public string Connector { get; set; } = string.Empty;
}