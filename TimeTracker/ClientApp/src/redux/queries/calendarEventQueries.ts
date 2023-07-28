import {ReadCookie} from "../../utils";
import {AjaxQuery} from "@redux/queries/query.ts";
import {QueryStructure} from "@redux/intrerfaces";
import {CalendarEvent} from "@redux/types/calendarEventTypes.ts";
import moment from "moment";



export function CreateCalendarEvent(data: CalendarEvent) {
    const token = ReadCookie('user');
    return AjaxQuery<QueryStructure<{ calendarEventMutation: { createEvent: CalendarEvent } }>>(
        "mutation CreateEvent($event:CalendarEventInputType!){calendarEventMutation{createEvent(calendarEvent:$event){date,id,title,description}}}",
        {event:{...data,date:moment(data.date).format("YYYY-MM-DD")}},
        token
    )
}

export function FetchCalendarEvents(){
    return AjaxQuery<QueryStructure<{ calendarEventQuery: { calendarEvents: CalendarEvent[] } }>>(
        "query{calendarEventQuery{calendarEvents{id,date,title,description}}}",
    )
}
