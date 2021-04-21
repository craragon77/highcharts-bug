import React, {useState} from 'react';
import './SelectMenu.css';

export default function SelectMenu(props){
    const [selectedValue, handleSelectedValue] = useState(null);
    console.log(props.options)
    function testFunction(e){
        console.log(e.target.value);
        props.fetchChordChartData(e.target.value);
    }
    function handleMappingIssue(){
        if(props.options == []){
            return null
        }else{
            return(
                <div className="DrowDown-Container">
                    <select id="dummy-dropdown" htmlFor="DummyDropDown" onChange={(e) => testFunction(e)}>
                        {props.options.map(val => <option key={val.landuse_id} value={val.landuse_id}>{val.landuse}</option>)}
                    </select>
                </div>
            )
        }
    }

    return(
        <>
        {handleMappingIssue()}
        </>
    )
}