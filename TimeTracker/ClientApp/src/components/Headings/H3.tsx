import React from 'react';

const H3 = ({ value }: { value: string }) => {
    return (
        <div>
            <h3 className="heading-text__h3">{value}</h3>
        </div>
    );
};

export default H3;