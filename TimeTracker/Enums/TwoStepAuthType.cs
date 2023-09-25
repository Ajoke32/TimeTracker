namespace TimeTracker.Enums;

[Flags]
public enum TwoStepAuthType
{
    None=0,
    PhoneNumber=1,
    WhatsApp=2,
    Email=4
}