import React, {useState} from 'react';

import {useAppDispatch} from "@hooks/customHooks.ts";
import { ActionCreatorWithPayload} from "@reduxjs/toolkit";



interface PerPageChangerProps{
    count:number,
    setPerPage:ActionCreatorWithPayload<number>,
    perPage:number
}
const PerPageChanger = ({count,setPerPage,perPage}:PerPageChangerProps) => {
    const [takeValue,setTakeValue] = useState<number>(perPage);
    const dispatch = useAppDispatch();
    function changeTake(e:React.ChangeEvent<HTMLInputElement>){
        const newValue = parseInt(e.currentTarget.value);
        if(newValue<=count) {
            dispatch(setPerPage(parseInt(e.currentTarget.value)));
            setTakeValue(parseInt(e.currentTarget.value));
            return;
        }

    }


    return (
        <input onChange={(e)=>changeTake(e)} value={takeValue} type="number" placeholder="take" className="input-search"/>
    );
};

export default PerPageChanger;
