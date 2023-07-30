import { AjaxQuery } from './query';
import { QueryStructure } from '../intrerfaces';
import { WorkedHour, SetWorkedHoursType, UpdateWorkedHoursType } from '@redux/types';

export function SetWorkedHoursQuery(workedHours: SetWorkedHoursType) {
    //const token = ReadCookie('user');

    return AjaxQuery<QueryStructure<{ workedHoursMutations: { set: WorkedHour } }>>(
        `mutation SetWorkedHours($workedHours: WorkedHourInputType!) {
        workedHoursMutations {
          set(workedHours: $workedHours) {
            id
            userId
            workedTime
            date
          }
        }
      }`,
        { workedHours: workedHours },
        //token
    )
}


export function FetchWorkedHoursQuery(userId: number) {
    return AjaxQuery<QueryStructure<{ workedHourQuery: { workedHours: WorkedHour[] } }>>(
        `query GetUserWorkingHours($userId: Int!) {
            workedHourQuery {
              workedHours(userId: $userId) {
                id
                userId
                date
                workedTime
              }
            }
          }`,
        { userId: userId },
    );
}

export function UpdateWorkedHoursQuery(workedHours: UpdateWorkedHoursType) {
    return AjaxQuery<QueryStructure<{ workedHoursMutations: { update: WorkedHour } }>>(
        `mutation UpdateWorkedHours($workedHours: UpdateWorkedHourInputType!) {
            workedHoursMutations {
              update(workedHours: $workedHours) {
                id
                userId
                workedTime
                date
              }
            }
          }`,
        { workedHours: workedHours },
    );
}

export function DeleteWorkedHoursQuery(id: number) {
    return AjaxQuery<QueryStructure<{ workedHoursMutations: { delete: boolean } }>>(
        `mutation DeleteWorkingHours($id : Int!){
            workedHoursMutations{
              delete(id: $id)
            }
          }`,
        { id: id },
    );
}

export function CreateWorkedHoursQuery(workedHours: SetWorkedHoursType) {
  //const token = ReadCookie('user');

  return AjaxQuery<QueryStructure<{ workedHoursMutations: { create: WorkedHour } }>>(
      `mutation CreateWorkedHours($workedHours: WorkedHourInputType!) {
        workedHoursMutations {
          create(workedHours: $workedHours) {
            id
            userId
            workedTime
            date
          }
        }
      }`,
      { workedHours: workedHours },
      //token
  )
}