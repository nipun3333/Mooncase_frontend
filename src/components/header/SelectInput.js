import { useState, useEffect } from "react";
import { useSelector, connect, useDispatch } from "react-redux";
import styled from "styled-components";
import SwitchNetwork from "../../redux/Services/SwitchNetwork";

import { eth, polygon, selectDown } from "../../assets/icon";
import { setUserChain } from "../../redux/actions/user";
import { useNavigate } from "react-router-dom";

/*

  Note: This should only be used for the network dropdown.
  It has functionality code too

    Todo:
    1. Made keeping in mind the header nav
    2. Clean the code


    Usage:
        <SelectInput></SelectInput>
    */

const tempoptions = [
  {
    key: 1,
    value: "Ethereum",
    label: "Ethereum",
    icon: eth,
    id: "0x1",
  },
  {
    key: 2,
    value: "Polygon",
    label: "Polygon",
    icon: polygon,
    id: "0x89",
  },
  {
    key: 3,
    value: "Kovan",
    label: "Kovan",
    icon: eth,
    id: "0x2a",
  },
];

const ArrowContainer = styled.div`
  text-align: center;
  height: 20px;
  width: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Select = styled.div`
  box-sizing: border-box;
  width: ${(props) => {
    return props.width ? props.width : "216px";
  }};
  height: fit-content;
  background: transparent;
  border-radius: 15px;
  border: 1px solid #f70fe8;
  box-shadow: 0px 5px 20px #000000;
  color: white;
  outline: none;
  position: relative;
  width: ${(props) => {
    return props.width ? props.width : "216px";
  }};

  &.up {
    z-index: 6;
  }
`;

const ValueContianer = styled.div`
  cursor: pointer;
  box-sizing: border-box;
  align-items: center;
  display: flex;
  position: relative;
  padding: 15px;
  justify-content: space-between;

  width: ${(props) => {
    return props.width ? props.width : "216px";
  }};

  /* &:after {
        
        display: inline-block;
        border-radius: ${(props) => {
    return props.variant === "rounded" ? "24px" : "9px";
  }};
        width: ${(props) => {
    return props.width ? props.width : "216px";
  }}; */
`;

const IconContainer = styled.div`
  box-sizing: border-box;
  text-align: center;
  height: 20px;
  width: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 1px solid #656565;
`;

const Text = styled.p`
  font-size: 16px;
  font-weight: 450;
  line-height: 20px;
  text-align: center;
  margin: 0;
`;

const Hidden = styled.input`
  opacity: 0;
  pointer-events: none;
  position: absolute;
`;

const Dropdown = styled.div`
  background: #191e24;
  border: 1px solid #f70fe8;
  border-radius: inherit;
  box-shadow: 0px 5px 20px #000000;
  font-weight: normal;
  left: 0;
  list-style: none;
  opacity: ${({ isActive }) => (isActive ? "1" : "0")};
  padding: 0px;
  position: absolute;
  pointer-events: ${({ isActive }) => (isActive ? "auto" : "none")};
  right: 0;
  top: 140%;
  transition: all 0.2s ease-in;

  z-index: 5;

  &:before {
    border-color: rgba(0, 0, 0, 0.1) transparent;
    border-style: solid;
    border-width: 0 8px 8px 8px;
    bottom: 100%;
    content: "";
    height: 0;
    position: absolute;
    right: 13px;
    width: 0;
  }

  &:after {
    border-color: ${({ bgColor }) => bgColor} transparent;
    border-style: solid;
    border-width: 0 6px 6px 6px;
    content: "";
    height: 0;
    position: absolute;
    bottom: 100%;
    right: 15px;
    width: 0;
  }
`;

const List = styled.ul`
  max-height: ${({ height }) => height};
  overflow-y: auto;
  padding: 0;
  margin: 6px;
  list-style: none;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    border-radius: 9px;
    margin: 5px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 9px;
    max-height: 50px;
  }
`;

const Item = styled.li`
  cursor: pointer;
  color: white;
  display: flex;
  margin: 0;
  padding: 10px;
  text-decoration: none;
  transition: all 0.1s ease-out;
  opacity: ${({ isActive }) => (isActive ? "1" : "0.7")};
  border: ${({ isActive }) => (isActive ? "1px solid #F70FE8" : "none")};
  border-radius: 10px;

  &:hover {
    opacity: 1;
  }
`;

const Icon = styled.img``;

const Value = styled.div`
  box-sizing: border-box;
  align-items: center;
  display: flex;
  position: relative;

  gap: 9px;

  width: ${(props) => {
    return props.width ? props.width : "216px";
  }};

  &:after {
    display: inline-block;
    border-radius: ${(props) => {
      return props.variant === "rounded" ? "24px" : "9px";
    }};
    width: ${(props) => {
      return props.width ? props.width : "216px";
    }};
  }
`;

const Option = ({
  handle,
  current,
  icon,
  id,
  label,
  value,
  bgColor,
  optColor,
}) => {
  return (
    <Item
      isActive={current === value}
      onClick={() => handle({ value, id, label, icon })}
    >
      <Value>
        <IconContainer>
          <Icon src={icon} />
        </IconContainer>
        <Text>{label}</Text>
      </Value>
    </Item>
  );
};

const SelectInput = (props) => {
  const [options, setOptions] = useState(tempoptions);
  let walletChain = useSelector((state) => state.wallet.walletChain);
  let userChain = useSelector((state) => state.user.userChain);
  let isWalletConnected = useSelector(
    (state) => state.wallet.isWalletConnected
  );
  const [changedOption, setchangedOption] = useState(false);
  const [choice, setChoice] = useState({
    isActive: false,
    id: "0x1",
    value: "Ethereum",
    label: "Ethereum",
    icon: eth,
  });
  const [isOpen, setisOpen] = useState(false);
  const { value, isActive } = choice;

  const navigate = useNavigate();

  const changeState = async (item) => {
    let res = await SwitchNetwork(item.id);
    setChoice({
      ...item,
      isActive: false,
    });

    setUserChain(item.id, dispatch);

    setisOpen(false);
    if (!res && isWalletConnected) {
      props.setSwitchWarning(true);
    }
    navigate("/auction");
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (choice.id === walletChain) {
      props.setSwitchWarning(false);
    }
    // setUserChain(choice.id, dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [choice]);

  // This code will run whenever the user chnages the network in metamask
  useEffect(() => {
    if (isWalletConnected) {
      let successful = false;
      // This code changes the user's chain to the one that is currently selected in metamask
      // Commented it becasue it was changing the chain on /view-auction page which is not deisred
      // for (let i = 0; i < options.length; i++) {
      //   if (options[i].id === walletChain) {
      //     setChoice({
      //       ...options[i],
      //       isActive: false,
      //     });
      //     successful = true;
      //   }
      // }
      if (choice.id === walletChain) {
        successful = true;
      }
      if (walletChain && !successful && walletChain.length !== 0) {
        props.setSwitchWarning(true);
      } else {
        props.setSwitchWarning(false);
      }
    }
  }, [walletChain, isWalletConnected]);

  const showSelect = () => {
    setChoice({
      ...choice,
      isActive: !choice.isActive,
    });
    setisOpen(!isOpen);
  };

  useEffect(() => {
    if (props.options) {
      setOptions(props.options);
    }
    // if (props.default) {
    //   setChoice({
    //     value: props.default.value,
    //     isActive: false,
    //     id: props.default.id,
    //   });
    // }

    // When User will connect if the app will go switch to the user's wallet network
    // if (walletChain) {
    //   for (let i = 0; i < options.length; i++) {
    //     if (options[i].id === walletChain) {
    //       setChoice({
    //         ...options[i],
    //         isActive: false,
    //       });
    //     }
    //   }
    // }

    if (isWalletConnected) {
      if (userChain === walletChain) {
        props.setSwitchWarning(false);
      } else {
        props.setSwitchWarning(true);
      }
    }

    if (userChain) {
      for (let i = 0; i < options.length; i++) {
        if (options[i].id === userChain) {
          setChoice({
            ...options[i],
            isActive: false,
          });
        }
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Select width={props.width} isOpen={isOpen}>
      <Hidden
        tabindex="0"
        onFocus={() => {
          return showSelect();
        }}
        onBlur={() => {
          return showSelect();
        }}
      />
      <ValueContianer onClick={() => showSelect()} width="100%">
        <Value>
          <IconContainer>
            <Icon src={choice.icon} />
          </IconContainer>
          <Text>{choice.label}</Text>
        </Value>
        <ArrowContainer disabled={props.disabled}>
          <img src={selectDown} className="h-3 w-2" alt="arrow" />
        </ArrowContainer>
      </ValueContianer>
      <Dropdown isActive={isActive}>
        <List height={props.height}>
          {options &&
            options.map((item, i) => {
              return (
                <Option
                  value={item.value}
                  icon={item.icon}
                  label={item.label}
                  current={value}
                  key={i}
                  id={item.id}
                  handle={changeState}
                />
              );
            })}
        </List>
      </Dropdown>
    </Select>
  );
};

export default connect()(SelectInput);
