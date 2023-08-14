import { months } from "../../";

export const SelectedDateElement = ({date} : {date: string}) => {
    const selectedDate = new Date(date);
    
    return (
        <div className="selected-date__wrapper">
            <span>Selected</span>
            <span>{`${selectedDate.getDate()} ${months[selectedDate.getMonth()]}`}</span>
        </div>
    );
};