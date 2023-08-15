import React, {useState} from 'react';
import {setUsersSkip, setUsersTake} from "@redux/slices";
import {calculateTotalPages} from "../../utils/paging.ts";
import {useAppDispatch} from "@hooks/customHooks.ts";
import {PagingType, PagingWithExtraInfo} from "@redux/types/filterTypes.ts";
import {ActionCreator, ActionCreatorWithPayload, PayloadAction} from "@reduxjs/toolkit";


interface PagerProps extends PagingWithExtraInfo{
    setTake: ActionCreatorWithPayload<any>,
    setSkip:ActionCreatorWithPayload<any>,
}

const Pager = ({setSkip,setTake,perPage,take,skip,extensions}:PagerProps) => {

    const [activePage,setActivePage] = useState<number>(0);
    const dispatch = useAppDispatch();
    function handlePageClick(page:number){
        dispatch(setTake(perPage*page));
        dispatch(setSkip((page-1)*perPage));
        setActivePage(page-1);
    }

    return (
        <div className="pages-wrapper">
            <button className={`btn-base btn-info ${skip==0?'neutral':''}`} disabled={skip==0} onClick={()=>{
                dispatch(setTake(take-perPage))
                dispatch(setSkip(skip-perPage))
                setActivePage(prevState => prevState-1);
            }}>Prev</button>
            {[...Array(calculateTotalPages(extensions?.count!,perPage))].map((_, index) => (
                <div className={`${index===activePage?'active-page':''}`} onClick={()=>handlePageClick(index+1)} key={index}>{index + 1}</div>))
            }
            <button className={`btn-base btn-info ${take>extensions?.count!?'neutral':''}`} disabled={take>extensions?.count!} onClick={()=>{
                dispatch(setTake(take+perPage))
                dispatch(setSkip(skip+perPage))
                setActivePage(prevState => prevState+1);
            }}>Next</button>
        </div>
    );
};

export default Pager;
