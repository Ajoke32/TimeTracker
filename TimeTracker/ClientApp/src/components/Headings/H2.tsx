import "./headings.css"

export const H2 = ({ value }: { value: string }) => {
    return (
        <div>
            <h1 className="heading-text__h2">{value}</h1>
        </div>
    );
};