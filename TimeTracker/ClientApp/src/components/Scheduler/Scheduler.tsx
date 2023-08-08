import './scheduler.css';
import "../Calendar/calendars.css"
import React, {useState} from 'react';
import {CurrentDateElement} from "@components/UI";
import {H4} from "@components/Headings";


const hours = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
];

const convertTimeToIndex = (time: string) => {
    const [hoursStr, minutesStr] = time.split(":");
    let hours = parseInt(hoursStr, 10);
    let minutes = parseInt(minutesStr, 10);

    return minutes + hours * 60;
};


/*random color from grey to light blue/cyan */
const generateRandomColor = () => {
    const randomR = Math.floor(Math.random() * 100) + 100;
    const randomG = Math.floor(Math.random() * 100) + 155;
    const randomB = Math.floor(Math.random() * 100) + 200;
    const randomOpacity = Math.random() * 0.3 + 0.3;
    
    return `rgba(${randomR}, ${randomG}, ${randomB}, ${randomOpacity})`;
}

const colors = [
    generateRandomColor(),
    generateRandomColor(),
    generateRandomColor(),
    generateRandomColor(),
    generateRandomColor(),
]

const Scheduler = ({date} : {date: Date}) => {
    const [currentDate, setCurrentDate] = useState<Date>(date);
    const defaultRowsCount = 7;
    
    const workedHours = [
        {
        startTime: "08:30:00",
        endTime: "15:35:00",
        totalTime: "7:15",
        date: new Date(),
        },

        {
            startTime: "16:00:00",
            endTime: "18:45:00",
            totalTime: "2:45",
            date: new Date(),
        },

        {
            startTime: "08:00:00",
            endTime: "20:00:00",
            totalTime: "12:00",
            date: new Date(),
        },

        {
            startTime: "14:20:00",
            endTime: "19:20:00",
            totalTime: "05:00",
            date: new Date(),
        },

        {
            startTime: "16:00:00",
            endTime: "18:45:00",
            totalTime: "2:45",
            date: new Date(2023, 7, 7),
        },

        {
            startTime: "08:00:00",
            endTime: "20:00:00",
            totalTime: "12:00",
            date: new Date(2023, 7, 7),
        },

        {
            startTime: "14:20:00",
            endTime: "19:20:00",
            totalTime: "05:00",
            date: new Date(2023, 7, 7),
        },
    ];
    
    const filteredWorkedHours = workedHours.filter((item) => item.date.toDateString() === currentDate.toDateString())
    
    
    const handlePrevDayButton = () => {
        const newDate = new Date(currentDate);
        newDate.setDate(newDate.getDate() - 1);

        if (newDate.getDate() === 0) {
            newDate.setDate(0);
        }
        
        setCurrentDate(newDate);
    }
    
    const handleNextDayButton = () => {
        const newDate = new Date(currentDate);
        newDate.setDate(newDate.getDate() + 1);

        if (newDate.getDate() === 1) {
            newDate.setDate(1);
        }

        setCurrentDate(newDate);
    }
    
    return (
        <div className="working-hours__wrapper">
            <div className="calendar-header__wrapper">
                <div className="calendar-date__wrapper"><CurrentDateElement date={currentDate} showFullDate={true}/></div>
                <div className="calendar-actions">
                    <div>
                        <button onClick={handlePrevDayButton}></button>
                        <button onClick={handleNextDayButton}></button>
                    </div>
                </div>
            </div>

            <div className="working-hours__table">
                <div className="working-hours__schedule">
                    {hours.map((time, index) => (
                         <div key={index}><span>{time}</span></div>
                    ))}
                </div>

                {filteredWorkedHours.length < 1 ? (
                    <div className="no-data__message-wrapper"><H4 value="No data available"/></div>
                ) : (
                    <div 
                        className="working-hours__content" 
                        style={{ gridTemplateRows: `repeat(${workedHours.length < 7 ? 7 : workedHours.length}, 1fr)` }}
                    >
                            {filteredWorkedHours.map((item, index) => (
                                <div className="content-row" key={index}>
                                    {convertTimeToIndex(item.totalTime) > 15 &&
                                    <div
                                        className="working-hours__inner-row"
                                        style={{
                                            width: `${(convertTimeToIndex(item.totalTime) / (hours.length * 60)) * 100}%`,
                                            background: colors[index],
                                            left: `${((convertTimeToIndex(item.startTime) - convertTimeToIndex(hours[0])) / (hours.length * 60)) * 100}%`}}
                                    >
                                        <div className="time-range__wrapper">
                                            <span className="">{item.startTime.slice(0, -3)} - {item.endTime.slice(0, -3)}</span>
                                        </div>
                                    </div>}
                                </div>
                            ))}
                        {filteredWorkedHours.length < defaultRowsCount &&
                            Array.from({length: defaultRowsCount - filteredWorkedHours.length}, (_, index) => (
                                <div className="content-row" key={index}></div>
                        ))}
                    </div>)}
            </div> 
        </div>
    );
};

export default Scheduler;
