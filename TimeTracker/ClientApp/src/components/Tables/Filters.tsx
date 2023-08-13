import React, {useState} from 'react';
import {userFields} from "@redux/types";
import {WhereFilter} from "@redux/types/filterTypes.ts";
import {useAppDispatch} from "@hooks/customHooks.ts";
import {addUserFilter, userFiltersToDefault} from "@redux/slices";


const Filter = () => {

    const [clicked, setClicked] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const [filter, setFilter] = useState<WhereFilter>({
        property: "",
        operator: "",
        value: ""
    });

    const [value, setValue] = useState<string>("");

    function handleSelectChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const target = e.currentTarget;
        if (target.id === "property") {
            setFilter(prevState => {
                return {
                    ...prevState,
                    property: target.value,
                    connector: "and"
                }
            })
        }
        if (target.id === "operator") {
            setFilter(prevState => {
                return {
                    ...prevState,
                    operator: target.value,
                    connector: "and"
                }
            })
        }
    }

    function handleApplyFilters() {
        dispatch(addUserFilter({...filter, value: value}));
    }

    return (
        <>
            <button style={{marginRight: "10px", marginLeft: "10px"}} onClick={() => setClicked(!clicked)}
                    className="btn-base btn-info">Filter
            </button>
            <div style={{alignSelf: "center", position: "relative", display: `${clicked ? 'block' : 'none'}`}}>

                <div style={{
                    position: "absolute",
                    display: "flex",flexDirection:"column", gap: "10px", backgroundColor: "#fff", padding: "5px",
                    zIndex: "100", borderRadius: "8px", left: "-350px", top: "40px"
                }} className="filter-select">
                    <div style={{display:"flex",flexDirection:'row',gap:"5px"}}>
                        <div className='select-group'>
                            <label htmlFor="">Column</label>
                            <select id='property' onChange={(e) => handleSelectChange(e)} className="input-base">
                                {userFields.map(f => {
                                    return <option key={f} value={f}>{f}</option>
                                })}
                            </select>
                        </div>
                        <div className='select-group'>
                            <label htmlFor="">Operator</label>
                            <select id='operator' onChange={(e) => handleSelectChange(e)} className="input-base">
                                <option value="gt">GreaterThan</option>
                                <option value="lt">LessThan</option>
                                <option value="neq">NotEqual</option>
                                <option value="eq">Equal</option>
                                <option value="contains">Contains</option>
                            </select>
                        </div>
                        <div className='select-group'>
                            <label htmlFor="">Value</label>
                            <input  value={value} onChange={(e) => {
                                setValue(e.target.value)
                            }}
                                   className="input-base" type="text" placeholder="comparison value"/>
                        </div>
                    </div>
                    <div style={{display:"flex",gap:"10px",alignSelf:"flex-end"}}>
                        <button className="btn-base btn-decline" onClick={() => {
                            dispatch(userFiltersToDefault())
                        }}>Reset
                        </button>
                        <button className="btn-base btn-confirm" onClick={handleApplyFilters}>Apply filters</button>
                    </div>
                </div>
            </div>
        </>

    );
};

export default Filter;
