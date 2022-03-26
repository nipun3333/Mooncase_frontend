import React from 'react'
import styled from 'styled-components'
import { dateTimePicker } from '../../../assets/icon'


const Input = styled.input`
    background: #07080A;
    border: 1px solid #656565;
    box-sizing: border-box;
    border-radius: 17px;
    color: white;
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 18px;
    padding: 17px;
    width: ${props => props.width ? props.width : '490px'};
    ::-webkit-calendar-picker-indicator {
        background-image: url(${dateTimePicker});
        
        transition:all ease 400ms;
        transform:scale(1);
        margin-left:5px;
    }
   

`

const CurrDate = () => {
    let date = new Date()
    let day = date.getDate();
    let month = date.getMonth()+1;
    let year = date.getFullYear();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    console.log(year + '-' + month + '-' + day + 'T' + hours + ':' + minutes)
    return `${year}-${month}-${day}T${hours}:${minutes}`;
}

const DateTimePicker = (props) => {



    return (
        <div  style={{width: props.width ? props.width  : "auto"}}>
            <Input type="datetime-local" 
            id="birthdaytime" name="StartDate" 
            placeholder="2022-01-12T18:27"
            // defaultValue={() => CurrDate()}
            // min='1800'
            style={{width: "100%"}}
            value={props.value}
            min={props.min}
            onChange={(e) =>
            {
                if(props.setValue){
                    props.setValue(e.target.value)
                }
            }}
            />
            
        </div>
    )
}

export default DateTimePicker
