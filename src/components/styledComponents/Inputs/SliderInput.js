import React, { useEffect, useState } from "react";
import { sampleLeftToken, DaiIcon, DefaultTokenIcon } from "../../../assets/icon";
import "rc-tooltip/assets/bootstrap.css";
import Slider from "rc-slider";

// Component Shoud get 2 Tokens as props Name and Icon
// value and setValue should be passed as props

const handleStyle = {
  borderColor: "white",
  height: 12,
  width: 12,
  background: "#F70FE8",
  border: "1px solid #FFFFFF",
  borderRadius: "15px",
  position: "relative",
  bottom: "8.5px",
};

const SliderInput = (props) => {
  const [leftToken, setLeftToken] = useState({
    name: "SPC",
    icon: '',
  });

  const [rightToken, setRightToken] = useState({
    name: "DAI",
    icon: DaiIcon,
  });

  // This should be passed as props
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (props.leftToken) {
      if(props.leftToken.icon !== '') {
        setLeftToken(props.leftToken);
      }else{
        props.leftToken.icon = '';
        setLeftToken(props.leftToken)
      }
      
    }
    if (props.rightToken) {
      setRightToken(props.rightToken);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSliderChange = (value) => {
    if( value < 100 && value > 0 ) {
      if (props.setValue) {
        props.setValue(value);
      }
  
      setValue(value);
    }
    
  };

  return (
    <div style={{ width: props.width ? props.width : "490px" }}>
      <div className="flex justify-between pb-3">
        <div className="flex">
          
            {leftToken.icon !== '' ? (
              <img
              src={leftToken.icon}
              alt={leftToken.name}
              style={{ height: "20px", width: "20px" }}
              className='rounded-full'
            />
            ) : (
              <DefaultTokenIcon width="20" height="20" />
            )}
          
          <p className="pr-2.5 pl-2 text-sm font-bold">{leftToken.name}</p>
          <p className="text-sm font-bold" style={{ color: "#FFA5F6" }}>
            {": " + props.value + "%"}
          </p>
        </div>
        <div className="flex ">
          <img
            src={rightToken.icon}
            alt={rightToken.name}
            style={{ height: "20px", width: "20px" }}
            className='rounded-full'
          />
          <p className="pr-2.5 pl-2 text-sm font-bold">{rightToken.name}</p>
          <p className="text-sm font-bold" style={{ color: "#FFA5F6" }}>
            {": " + (100 - props.value) + "%"}
          </p>
        </div>
      </div>
      <div style={{ display: "block", cursor: "pointer" }}>
        <Slider
          value={props.value ? props.value : value}
          onChange={onSliderChange}
          trackStyle={{
            backgroundColor: "#F70FE8",
            height: 5,
            borderRadius: "17px",
          }}
          handleStyle={handleStyle}
          railStyle={{
            height: 5,
            borderRadius: "17px",
            border: "1px solid #656565",
            position: "relative",
            top: "5px",
          }}
        />
      </div>
    </div>
  );
};

export default SliderInput;
