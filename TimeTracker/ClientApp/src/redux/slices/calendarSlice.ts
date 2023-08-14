import { createSlice, current, PayloadAction } from "@reduxjs/toolkit"
import { CalendarSlice, FormattedCalendarArr } from "..";
import {
    createErrorReducer,
    createPendingReducerWithPayload,
    createSuccessReducerWithPayload,
    defaultState
} from "./generic";
import {
    CalendarEvent, WorkPlan, CreateWorkedHourType,
    CreateCalendarEventType, UpdateCalendarEventType,
    UpdateWorkPlanType, DateRangeType
} from "@redux/types";
import { GetLocalCalendarEvent, GetLocalWorkPlan } from "../../utils";

const initialState: CalendarSlice = {
    ...defaultState,
    events: { currentMonth: [], previousMonth: [], nextMonth: [] },
    workPlans: { currentMonth: [], previousMonth: [], nextMonth: [] },
    currentDate: new Date()
};

const calendarSlice = createSlice({
    name: 'calendar',
    initialState,
    reducers: {
        setDate: (state, action: PayloadAction<Date>) => {
            if (state.currentDate > action.payload) {
                state.events.nextMonth = state.events.currentMonth;
                state.events.currentMonth = state.events.previousMonth;
                state.events.previousMonth = []
            }
            else {
                state.events.previousMonth = state.events.currentMonth;
                state.events.currentMonth = state.events.nextMonth;
                state.events.nextMonth = []
            }
            action.payload.getMonth() == new Date().getMonth()
                ? state.currentDate = new Date()
                : state.currentDate = action.payload;
        },

        fetchCalendarEvents: createPendingReducerWithPayload<CalendarSlice, DateRangeType>(),
        fetchAllCalendarEventsSuccess: createSuccessReducerWithPayload<CalendarSlice, CalendarEvent[]>(
            (state: CalendarSlice, action: PayloadAction<CalendarEvent[]>) => {
                action.payload.forEach((element) => {
                    const local = GetLocalCalendarEvent(element)

                    local.date.getMonth() == state.currentDate.getMonth()
                        ? state.events.currentMonth.push(local)
                        : local.date.getMonth() < state.currentDate.getMonth()
                            ? state.events.previousMonth.push(local)
                            : state.events.nextMonth.push(local)
                });
            }),
        fetchNextCalendarEventsSuccess: createSuccessReducerWithPayload<CalendarSlice, CalendarEvent[]>(
            (state: CalendarSlice, action: PayloadAction<CalendarEvent[]>) => {
                action.payload.forEach((element) => {
                    const local = GetLocalCalendarEvent(element)

                    local.date.getMonth() < state.currentDate.getMonth()
                        ? state.events.previousMonth.push(local)
                        : state.events.nextMonth.push(local)
                });
            }),

        createCalendarEvent: createPendingReducerWithPayload<CalendarSlice, CreateCalendarEventType>(),
        createCalendarEventSuccess: createSuccessReducerWithPayload<CalendarSlice, CalendarEvent>(
            (state: CalendarSlice, action: PayloadAction<CalendarEvent>) => {
                const local = GetLocalCalendarEvent(action.payload)

                const localDate = local.date.getMonth();
                const currentDate = state.currentDate.getMonth();

                localDate == currentDate
                    ? state.events.currentMonth.push(local)
                    : localDate > currentDate
                        ? state.events.nextMonth.push(local)
                        : state.events.previousMonth.push(local)
            }
        ),

        fetchWorkPlans: createPendingReducerWithPayload<CalendarSlice, { dateRange: DateRangeType, userId: number }>(),
        fetchAllWorkPlansSuccess: createSuccessReducerWithPayload<CalendarSlice, WorkPlan[]>(
            (state: CalendarSlice, action: PayloadAction<WorkPlan[]>) => {
                action.payload.forEach((element) => {
                    const local = GetLocalWorkPlan(element)

                    local.date.getMonth() == state.currentDate.getMonth()
                        ? state.workPlans.currentMonth.push(local)
                        : local.date.getMonth() < state.currentDate.getMonth()
                            ? state.workPlans.previousMonth.push(local)
                            : state.workPlans.nextMonth.push(local)
                });
            }),

        fetchNextWorkPlansSuccess: createSuccessReducerWithPayload<CalendarSlice, WorkPlan[]>(
            (state: CalendarSlice, action: PayloadAction<WorkPlan[]>) => {
                action.payload.forEach((element) => {
                    const local = GetLocalWorkPlan(element)

                    local.date.getMonth() < state.currentDate.getMonth()
                        ? state.workPlans.previousMonth.push(local)
                        : state.workPlans.nextMonth.push(local)
                });
            }),

        createWorkPlan: createPendingReducerWithPayload<CalendarSlice, CreateWorkedHourType>(),
        createWorkPlanSuccess: createSuccessReducerWithPayload<CalendarSlice, WorkPlan>(
            (state: CalendarSlice, action: PayloadAction<WorkPlan>) => {
                const local = GetLocalWorkPlan(action.payload)

                const localDate = local.date.getMonth();
                const currentDate = state.currentDate.getMonth();

                localDate == currentDate
                    ? state.workPlans.currentMonth.push(local)
                    : localDate > currentDate
                        ? state.workPlans.nextMonth.push(local)
                        : state.workPlans.previousMonth.push(local)
            }
        ),

        editWorkPlan: createPendingReducerWithPayload<CalendarSlice, UpdateWorkPlanType>(),
        editWorkPlanSuccess: createSuccessReducerWithPayload<CalendarSlice, WorkPlan>(
            (state: CalendarSlice, action: PayloadAction<WorkPlan>) => {
            }
        ),

        editCalendarEvent: createPendingReducerWithPayload<CalendarSlice, UpdateCalendarEventType>(),
        editWCalendarEventSuccess: createSuccessReducerWithPayload<CalendarSlice, CalendarEvent>(
            (state: CalendarSlice, action: PayloadAction<CalendarEvent>) => {
            }
        ),

        deleteWorkPlan: createPendingReducerWithPayload<CalendarSlice, number>(),
        deleteWorkPlanSuccess: createSuccessReducerWithPayload<CalendarSlice, number>(
            (state: CalendarSlice, action: PayloadAction<number>) => {
            }),

        deleteCalendarEvent: createPendingReducerWithPayload<CalendarSlice, number>(),
        deleteCalendarEventSuccess: createSuccessReducerWithPayload<CalendarSlice, number>(
            (state: CalendarSlice, action: PayloadAction<number>) => {
            }),

        deleteFail: createErrorReducer(),
        fetchFail: createErrorReducer(),
        createFail: createErrorReducer(),
    }
});

export const {
    setDate, fetchCalendarEvents,
    fetchAllCalendarEventsSuccess,
    fetchNextCalendarEventsSuccess,
    fetchFail, fetchWorkPlans,
    fetchAllWorkPlansSuccess,
    fetchNextWorkPlansSuccess,
    createWorkPlan, createWorkPlanSuccess,
    createCalendarEventSuccess,
    createCalendarEvent, createFail } = calendarSlice.actions;

export const calendar = calendarSlice.reducer;

