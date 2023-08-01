import {VacationState} from "@redux/types";

export function getStringVacationState(state:VacationState):string{
    const str = state.toString().toLowerCase();

    return str.charAt(0).toUpperCase() + str.slice(1);
}