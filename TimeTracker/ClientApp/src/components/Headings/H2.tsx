import React from 'react';
import "./headings.css"

const H2 = ({ value }: { value: string }) => {
    return (
        <div>
            <h2 className="heading-text__h2">{value}</h2>
        </div>
    );
};

export default H2;