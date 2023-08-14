import { AjaxQuery } from './query';
import { WorkPlan, CalendarEvent, DateRangeType, CreateWorkedHourType, CreateCalendarEventType } from '@redux/types';

export function FetchCalendarEventsQuery(dateRange: DateRangeType) {
  return AjaxQuery<{ calendarEventQuery: { calendarEvents: CalendarEvent[] } }>(
    `query GetCalendarEvents($dateRange: DateRangeInputType!) {
            calendarEventQuery {
              calendarEvents(dateRange: $dateRange) {
                id
                date
                title
                eventType
              }
            }
          }`,
    { dateRange: dateRange },
  );
}

export function FetchWorkPlansQuery(data: { dateRange: DateRangeType, userId: number }) {
  const { dateRange, userId } = data;

  return AjaxQuery<{ workPlanQuery: { workPlans: WorkPlan[] } }>(
    `query GetWorkPlans($userId: Int!, $dateRange: DateRangeInputType!) {
            workPlanQuery {
              workPlans(userId: $userId, dateRange: $dateRange) {
                id
                userId
                firstName
                lastName
                date
                startTime
                endTime
              }
            }
          }`,
    {
      userId: userId,
      dateRange: dateRange
    },
  );
}

export function CreateWorkPlanQuery(workPlan: CreateWorkedHourType) {
  //const token = ReadCookie('user');

  return AjaxQuery<{ workPlanMutations: { create: WorkPlan } }>(
    `mutation CreateWorkPlan($workPlan: WorkPlanInputType!) {
      workPlanMutations {
        create(workPlan: $workPlan) {
          id
          userId
          date
          startTime
          endTime
        }
      }
    }`,
    { workPlan: workPlan },
    //token
  )
}

export function CreateCalendarEventQuery(calendarEvent: CreateCalendarEventType) {
  //const token = ReadCookie('user');

  return AjaxQuery<{ calendarEventMutations: { create: CalendarEvent } }>(
    `mutation CreateCalendarEvent($calendarEvent: CalendarEventInputType!) {
      calendarEventMutations {
        create(calendarEvent: $calendarEvent) {
          id
          date
          title
          eventType
        }
      }
    }`,
    { calendarEvent: calendarEvent },
    //token
  )
}