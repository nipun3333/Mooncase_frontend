import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";

const Wrapper = styled.div`
  /* .react-datepicker {
    font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI",
      Roboto, "Helvetica Neue", sans-serif;
    overflow: hidden;
  } */

  /* .react-datepicker__navigation--next--with-time:not(.react-datepicker__navigation--next--with-today-button) {
    right: 90px;
  } */

  /* .react-datepicker__navigation--previous,
  .react-datepicker__navigation--next {
    height: 8px;
  } */

  color: #000;

  .react-datepicker-wrapper {
    border-radius: 17px;
    padding: 5px;
    border: 1px solid #656565;
    background: #07080a;

    .react-datepicker__input-container {
      input {
        padding: 10px;
        background: #07080a;
        color: white;
        outline: none;
        width: 100%;
      }
    }
  }

  .react-datepicker__navigation--previous {
    border-right-color: #cbd5e0;

    &:hover {
      border-right-color: #a0aec0;
    }
  }

  .react-datepicker__navigation--next {
    border-left-color: #cbd5e0;

    &:hover {
      border-left-color: #a0aec0;
    }
  }

  .react-datepicker-wrapper,
  .react-datepicker__input-container {
    display: block;
    outline: none;
  }

  .react-datepicker__header {
    border-radius: 0;
    background: #f7fafc;
  }

  .react-datepicker,
  .react-datepicker__header,
  .react-datepicker__time-container {
    border-color: #e2e8f0;
  }

  .react-datepicker__current-month,
  .react-datepicker-time__header,
  .react-datepicker-year-header {
    font-size: inherit;
    font-weight: 600;
  }

  .react-datepicker__time-container
    .react-datepicker__time
    .react-datepicker__time-box
    ul.react-datepicker__time-list
    li.react-datepicker__time-list-item {
    margin: 0 1px 0 0;
    height: auto;
    padding: 7px 10px;

    &:hover {
      background: #edf2f7;
    }
  }

  .react-datepicker__day:hover {
    background: #edf2f7;
  }

  .react-datepicker__day--selected,
  .react-datepicker__day--in-selecting-range,
  .react-datepicker__day--in-range,
  .react-datepicker__month-text--selected,
  .react-datepicker__month-text--in-selecting-range,
  .react-datepicker__month-text--in-range,
  .react-datepicker__time-container
    .react-datepicker__time
    .react-datepicker__time-box
    ul.react-datepicker__time-list
    li.react-datepicker__time-list-item--selected {
    background: #3182ce;
    font-weight: normal;

    &:hover {
      background: #2a69ac;
    }
  }
`;

const CustomDateTimePicker = (props) => {
  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    console.log(startDate);
    console.log(setStartDate.toString());
    let date = new Date(startDate);
    console.log(date.toString());
  }, [startDate]);

  return (
    <Wrapper className="custom-datetimepicker">
      <DatePicker
        selected={props.value}
        onChange={(date) => {
            if(date.getTime() < props.minDate.getTime()){
                props.setError(true);
            }else{
                props.setError(false);
            }
            if(props.setValue){
                props.setValue(date)
            }
        }}
        // locale="pt-BR"
        minDate={props.minDate}
        // minTime={props.minTime ? props.minTime : }
        // maxTime={null}
        showTimeSelect
        timeFormat="p"
        timeIntervals={30}
        dateFormat="Pp"
      />
    </Wrapper>
  );
};

export default CustomDateTimePicker;
