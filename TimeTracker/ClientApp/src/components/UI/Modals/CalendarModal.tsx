import React, { useState } from 'react';
import { CalendarModalProps } from ".";
import { DayPlanForm,  TabSwitcher } from '../..';
import {useAppDispatch} from "@hooks/customHooks.ts";
import {modalClose} from "@redux/slices";
import {EventForm} from "@components/CalendarForms/EventForm.tsx";

export const CalendarModal = ({ isHidden, setIsHidden, event }: CalendarModalProps) => {
    const [tab, setTab] = useState<boolean>(true)

    return (
        <>
            {isHidden && <div className="event-form__wrapper" style={{ display: `${!isHidden ? "none" : ''}` }}>
                <button className="event-form__close-btn" onClick={() => setIsHidden(null)} />
                <div className="event-form__inner" style={{ display: `${!isHidden ? "none" : ''}` }}>
                    {event ?
                        <>
                            <EventForm setIsOpen={setIsHidden} date={isHidden} event={event} />
                        </> :
                        <>
                            {
                                tab ?
                                    <DayPlanForm setIsOpen={setIsHidden} date={isHidden} /> :
                                    <EventForm setIsOpen={setIsHidden} date={isHidden} event={event} />}
                            <TabSwitcher setter={setTab} tab={tab} />

                        </>
                    }


                </div>
            </div>}
        </>
    )
}