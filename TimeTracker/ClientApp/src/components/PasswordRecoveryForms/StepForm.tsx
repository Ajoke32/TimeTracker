import React from "react";

interface FirstStepFormProps{
    setValue:(value:string)=>void,
    dispatchFunction:()=>void,
    value:string,
    placeHolder:string,
    isLastStep:boolean
}


const StepForm = ({setValue,dispatchFunction,value,placeHolder,isLastStep}:FirstStepFormProps) => {

    function onInputEmailChange(e:React.ChangeEvent<HTMLInputElement>){
        setValue(e.target.value);
    }

    return (
        <div style={{display:"flex",gap:"8px",flexDirection:"column"}}>
            <input onChange={(e)=>onInputEmailChange(e)} value={value} className="search-input" type="text" placeholder={placeHolder}/>
            <button onClick={dispatchFunction} className="btn-base btn-info">{!isLastStep?"next":"create"}</button>
        </div>
    );
};

export default StepForm;