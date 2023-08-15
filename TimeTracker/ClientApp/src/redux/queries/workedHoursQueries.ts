import { AjaxQuery } from './query';
import { WorkedHour, CreateWorkedHourType, UpdateWorkedHourType } from '@redux/types';

export function FetchWorkedHoursQuery(userId: number,take:number,skip:number) {
  return AjaxQuery<{ workedHourQuery: { workedHours: WorkedHour[] } }>(
    `query GetUserWorkedHours($userId: Int!,$take:Int,$skip:Int) {
      workedHourQuery{
        workedHours(userId: $userId,take:$take,skip:$skip) {
          id
          userId
          date
          startTime
          endTime
          totalTime
        }
      }
    }`,
    { userId: userId,take:take,skip:skip },
  );
}

export function UpdateWorkedHoursQuery(workedHour: UpdateWorkedHourType) {
  return AjaxQuery<{ workedHourMutations: { update: WorkedHour } }>(
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
  return AjaxQuery<{ workedHourMutations: { delete: number } }>(
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

  return AjaxQuery<{ workedHourMutations: { create: WorkedHour } }>(
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