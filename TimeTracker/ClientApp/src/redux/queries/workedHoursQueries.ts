import { AjaxQuery } from './query';
import { QueryStructure } from '../intrerfaces';
import { WorkedHour, CreateWorkedHourType, UpdateWorkedHourType } from '@redux/types';
import { createWorkedHourEpic, fetchWorkedHoursEpic } from '@redux/epics/timeTracker';

export function FetchWorkedHoursQuery(userId: number) {
  return AjaxQuery<QueryStructure<{ workedHourQuery: { workedHours: WorkedHour[] } }>>(
    `query GetUserWorkedHours($userId: Int!) {
      workedHourQuery {
        workedHours(userId: $userId) {
          id
          userId
          date
          startTime
          endTime
          totalTime
        }
      }
    }`,
    { userId: userId },
  );
}

export function UpdateWorkedHoursQuery(workedHour: UpdateWorkedHourType) {
  return AjaxQuery<QueryStructure<{ workedHourMutations: { update: WorkedHour } }>>(
    `mutation UpdateWorkedHours($workedHour: UpdateWorkedHourInputType!) {
      workedHourMutations {
        update(workedHour: $workedHour) {
          id
          userId
          startTime
          endTime
          totalTime
          date
        }
      }
    }`,
    { workedHour: workedHour },
  );
}

export function DeleteWorkedHoursQuery(id: number) {
  return AjaxQuery<QueryStructure<{ workedHourMutations: { delete: number } }>>(
    `mutation DeleteWorkedHours($id: Int!) {
      workedHourMutations {
        delete(id: $id)
      }
    }`,
    { id: id },
  );
}

export function CreateWorkedHoursQuery(workedHour: CreateWorkedHourType) {
  //const token = ReadCookie('user');

  return AjaxQuery<QueryStructure<{ workedHourMutations: { create: WorkedHour } }>>(
    `mutation CreateWorkedHour($workedHour: WorkedHourInputType!) {
      workedHourMutations {
        create(workedHour: $workedHour) {
          id
          userId
          startTime
          endTime
          totalTime
          date
        }
      }
    }`,
    { workedHour: workedHour },
    //token
  )
}