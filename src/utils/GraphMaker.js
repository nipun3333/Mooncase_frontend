const slotMaker = async (start, end) => {
  try {
    let diff = end - start;

    let days = diff / 86400;

    if (days <= 5) {
      return {
        slot: Math.ceil(diff / (1 * 3600)),
        duration: 3600,
      };
    } else if (days <= 10) {
      return {
        slot: Math.ceil(diff / (2 * 3600)),
        duration: 2 * 3600,
      };
    } else if (days <= 20) {
      return {
        slot: Math.ceil(diff / (4 * 3600)),
        duration: 4 * 3600,
      };
    } else if (days <= 40) {
      return {
        slot: Math.ceil(diff / (8 * 3600)),
        duration: 8 * 3600,
      };
    } else if (days <= 60) {
      return {
        slot: Math.ceil(diff / (12 * 3600)),
        duration: 12 * 3600,
      };
    } else {
      return {
        slot: Math.ceil(diff / (24 * 3600)),
        duration: 24 * 3600,
      };
    }
  } catch (err) {
    return err;
  }
};

const graphHelper = async (
  startTime,
  endTime,

  processingFee,
  tokenStartWeight,
  collateralStartWeight,
  tokenEndWeight,
  collateralEndWeight,
  tokenAmount,
  collateralAmount
) => {
  try {
    var startTime = parseFloat(startTime);
    var endTime = parseFloat(endTime);
    var lotSize = parseFloat(lotSize);
    var processingFee = parseFloat(processingFee);
    var tokenStartWeight = parseFloat(tokenStartWeight);
    var collateralStartWeight = parseFloat(collateralStartWeight);
    var tokenEndWeight = parseFloat(tokenEndWeight);
    var collateralEndWeight = parseFloat(collateralEndWeight);
    var tokenAmount = parseFloat(tokenAmount);
    var collateralAmount = parseFloat(collateralAmount);

    let slots = await slotMaker(startTime, endTime);

    console.log("Slots are:", slots.slot);

    var increaseVal = (tokenStartWeight - tokenEndWeight) / slots.slot;

    var decreaseVal =
      (collateralEndWeight - collateralStartWeight) / slots.slot;

    let swapFee = processingFee;

    let arr = [];

    for (let i = 0; i < slots.slot; i++) {
      let obj = {
        step: i + 1,
        
        startTimeSlot: startTime + i * slots.duration,
        endTimeSlot: startTime + (i + 1) * slots.duration,
        tokenWeight: tokenStartWeight,
        collateralWeight: collateralStartWeight,
        tokenAmount: tokenAmount,
        collateralTokenAmount: collateralAmount,
        price:
          1 /
          (tokenAmount *
            (1 -
              Math.pow(
                collateralAmount / (collateralAmount + (1 - swapFee)),
                collateralStartWeight / tokenStartWeight
              ))),
      };

      arr.push(obj);

      tokenStartWeight -= increaseVal;
      collateralStartWeight += decreaseVal;
    }

    return arr;
  } catch (err) {
    console.log(err);
  }
};

export default graphHelper;

export { slotMaker };
