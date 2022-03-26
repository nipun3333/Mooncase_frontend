/**
Project: Copper apis 
version : v0.1
author : @badrik-github , @jimishio
desc : Utils for making Live graph.
*/

//utils
import { slotMaker } from "./GraphMaker";

/**
 * @param {number} startTime //start time in timestamp should be in sec(10 digit)
 * @param {number} endTime //start time in timestamp should be in sec(10 digit)
 * @param {number} lotSize //lot size
 * @param {number} processingFee //Processing fee
 * @param {number} tokenStartWeight //token start weight
 * @param {number} collateralStartWeight //collateral token start weight
 * @param {number} tokenEndWeight //token end weight
 * @param {number} collateralEndWeight //collateral token end weight
 * @param {number} tokenAmount //token amount
 * @param {number} collateralAmount //collateral token amount
 * @param {String} tokenSymbol //Current token symbol
 * @param {Array} data //array of all old transactions
 */

/**
 * @returns {Array Of object} it would contain step and the price at that step used to create steps.
 */
const liveGraphHelper = async (
  startTime,
  endTime,
  swapFee,
  tokenStartWeight,
  collateralStartWeight,
  tokenEndWeight,
  collateralEndWeight,
  tokenAmount,
  collateralAmount,
  tokenSymbol,
  data
) => {
  try {
    //making sure all data is in number format
    var startTime = parseFloat(startTime);
    var endTime = parseFloat(endTime);
    //var lotSize = parseFloat(lotSize)
    //var processingFee = parseFloat(processingFee)
    var tokenStartWeight = parseFloat(tokenStartWeight);
    var collateralStartWeight = parseFloat(collateralStartWeight);
    var tokenEndWeight = parseFloat(tokenEndWeight);
    var collateralEndWeight = parseFloat(collateralEndWeight);
    var tokenAmount = parseFloat(tokenAmount);
    var collateralAmount = parseFloat(collateralAmount);

    //getting slots
    let slots = await slotMaker(startTime, endTime);

    //increase weight interval
    var increaseVal = (tokenStartWeight - tokenEndWeight) / slots.slot;

    //decrease time interval
    var decreaseVal =
      (collateralEndWeight - collateralStartWeight) / slots.slot;

    //swap fee
    swapFee = parseFloat(swapFee);

    //output array
    let arr = [];

    //initial balance
    var currentTokenBal = tokenAmount;
    var currentCollateralBal = collateralAmount;

    //transactions and index to traverse transactions
    var transactions = data;
    var j = 0;

    //making od points
    for (let i = 0; i < slots.slot; i++) {
      //getting interval of current points
      let startInterval = startTime + i * slots.duration;
      let endInterval = startTime + (i + 1) * slots.duration;

      //traversing through transactions and adding current one
      while (
        j < transactions.length &&
        transactions[j].timestamp > startInterval &&
        transactions[j].timestamp <= endInterval
      ) {
        //this is selling of out token
        if (transactions[j].tokenInSym == tokenSymbol) {
          currentTokenBal += parseFloat(transactions[j].tokenAmountIn);
          currentCollateralBal -= parseFloat(transactions[j].tokenAmountOut);
        }

        //this is buying of our token
        else {
          currentCollateralBal += parseFloat(transactions[j].tokenAmountIn);
          currentTokenBal -= parseFloat(transactions[j].tokenAmountOut);
        }

        //incrementing counter
        j++;
      }

      //response for plotting graph
      let obj = {
        step: i + 1,
        startTimeSlot: startInterval,
        endTimeSlot: endInterval,
        tokenWeight: tokenStartWeight,
        collateralWeight: collateralStartWeight,
        tokenAmount: currentTokenBal,
        collateralTokenAmount: currentCollateralBal,
        price:
          1 /
          (tokenAmount *
            (1 -
              Math.pow(
                currentCollateralBal / (currentCollateralBal + (1 - swapFee)),
                collateralStartWeight / tokenStartWeight
              ))),
      };

      arr.push(obj);

      //changing weight
      tokenStartWeight -= increaseVal;
      collateralStartWeight += decreaseVal;
    }

    return arr;
  } catch (err) {
    console.log(err);
  }
};

export default liveGraphHelper;
