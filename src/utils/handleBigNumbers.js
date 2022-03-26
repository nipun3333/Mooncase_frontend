import BigNumber from "bignumber.js";

const convertUnit = (number, action, decimals) => {
    let temp = new BigNumber(10);
    switch (action) {
        case "divide":
            temp = temp.exponentiatedBy(decimals);
            if(!BigNumber.isBigNumber(number)) {
                number = new BigNumber(number);
            }
            // console.log("number", number.toString(), "temp", temp.toString());
            return number.dividedBy(temp);
        case "multiply":
            temp = temp.exponentiatedBy(decimals);
            if(!BigNumber.isBigNumber(number)) {
                number = new BigNumber(number);
            }
            return number.multipliedBy(temp);
        default:
            return number;
    }
}


const handleSubstraction = (numberOne, numberTwo) => {
    if(!BigNumber.isBigNumber(numberOne)) {
        numberOne = new BigNumber(numberOne);
    }
    if(!BigNumber.isBigNumber(numberTwo)) {
        numberTwo = new BigNumber(numberTwo);
    }
    return numberOne.minus(numberTwo).toString();
}

const handleDivide = (numberOne, numberTwo) => {
    if(!BigNumber.isBigNumber(numberOne)) {
        numberOne = new BigNumber(numberOne);
    }
    if(!BigNumber.isBigNumber(numberTwo)) {
        numberTwo = new BigNumber(numberTwo);
    }
    return numberOne.dividedBy(numberTwo);
}



export { convertUnit , handleSubstraction, handleDivide};
