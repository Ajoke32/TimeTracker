const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];


export const SelectedDateElement = ({date} : {date: string}) => {
    const selectedDate = new Date(date);
    
    return (
        <div className="current-date__wrapper">
            <span>Selected</span>
            <span>{`${selectedDate.getDate()} ${months[selectedDate.getMonth()]}`}</span>
        </div>
    );
};