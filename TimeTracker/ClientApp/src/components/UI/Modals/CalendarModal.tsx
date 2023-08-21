import { useState } from 'react';
import { CalendarModalProps } from ".";
import { DayPlanForm, EventForm, TabSwitcher } from '../..';

export const CalendarModal = ({ isHidden, setIsHidden }: CalendarModalProps) => {
    const [tab, setTab] = useState<boolean>(true)

    return (
        <>
            {isHidden && <div className="event-form__wrapper" style={{ display: `${!isHidden ? "none" : ''}` }}>
                <button className="event-form__close-btn" onClick={() => setIsHidden(null)} />
                <div className="event-form__inner" style={{ display: `${!isHidden ? "none" : ''}` }}>
                    {tab ?
                        <DayPlanForm setIsOpen={setIsHidden} date={isHidden} /> :
                        <EventForm setIsOpen={setIsHidden} date={isHidden} />}
                    <TabSwitcher setter={setTab} tab={tab} />
                </div>
            </div>}
        </>
    )
}