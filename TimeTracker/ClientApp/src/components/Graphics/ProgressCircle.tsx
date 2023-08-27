import React, {useEffect, useRef, useState} from 'react';
import './ProgressCircle.css'


interface ProgressCircleProps{
    percents:number,
    dependency?:any
}
const ProgressCircle = ({percents,dependency}:ProgressCircleProps) => {
    const percentToCount = percents>100?100:percents;
    const circleRef = useRef<SVGCircleElement>(null);
    const radius = 80;
    const length = 2*Math.PI*radius;
    const  initial = !isNaN(percents)?length - (length*percentToCount)/100:length;

    const appear = [
        { strokeDashoffset: length },
        { strokeDashoffset: `${initial}` },
    ];

    const timing={
        duration:500,
    }


    useEffect(() => {
        if(circleRef.current!==null){
            circleRef.current.animate(appear,timing);
        }
    }, [dependency]);


    return (
        <div className="circle-wrapper">
            <svg>
                <circle cx="70" cy="70" r={radius}></circle>
                <circle ref={circleRef}
                        style={{strokeDashoffset:initial}}
                        cx="70" cy="70" r={radius}></circle>
            </svg>
            <div className="text">{!isNaN(percents)?Math.round(percents):0}%</div>
        </div>
    );
};

export default  ProgressCircle;
