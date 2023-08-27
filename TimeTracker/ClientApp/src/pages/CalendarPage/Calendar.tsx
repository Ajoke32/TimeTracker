import { useState } from 'react';
import { LargeCalendar } from "@components/Calendar/LargeCalendar";
import "./Calendar.css"
import { Scheduler } from "@components/Scheduler";
import { CalendarCell } from '@redux/types';

const Calendar = () => {
    const [page, setPage] = useState<CalendarCell | null>(null)
    const [date, setDate] = useState<Date | undefined>();

    const returnBack = (selectedDate: Date) => {
        setDate(selectedDate);
        setPage(null);
    }

    return (
        <div className="calendar-page__wrapper">
            {page
                ? <Scheduler cell={page} back={returnBack} />
                : <LargeCalendar date={date} setter={setPage} />
            }
        </div>
    );
};

export default Calendar;