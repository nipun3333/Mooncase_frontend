const LatestPrice = async (
  endWeight,
  startWeight,
  endTime,
  startTime,
  tokenIN,
  stableAmount,
  tokenAmount,
  swapFee
) => {
  //  if (Math.round(new Date().getTime() / 1000) - startTime <= 0) {
  //     return;
  //}

  endWeight = [parseFloat(endWeight[0]), parseFloat(endWeight[1])];
  startWeight = [parseFloat(startWeight[0]), parseFloat(startWeight[1])];
  endTime = parseFloat(endTime);
  startTime = parseFloat(startTime);
  tokenIN = parseFloat(tokenIN);
  stableAmount = parseFloat(stableAmount);
  tokenAmount = parseFloat(tokenAmount);
  swapFee = parseFloat(swapFee);

  if (tokenIN >= 0.3 * stableAmount) {
    return [0, 0, 0];
  }

  // stable coin weight different in total duration
  let StablediffWeight = endWeight[0] - startWeight[0];
  // lauched coin weight different in total duration
  let CustomdiffWeight = startWeight[1] - endWeight[1];
  // auction duration
  let diffTime = endTime - startTime;
  //current time in unix
  let currentTime = Math.round(new Date().getTime() / 1000);
  //to store current weight
  let weights = [];

  //current time different
  let currentDiffrentTime = currentTime - startTime;

  if (currentDiffrentTime < 0) {
    weights.push(startWeight[0]);
    weights.push(startWeight[1]);
  } else if (currentTime > endTime) {
 
    weights.push(endWeight[0]);
    weights.push(endWeight[1]);
  } else {

    //current stable coin weight
    weights.push(
      startWeight[0] + StablediffWeight * (currentDiffrentTime / diffTime)
    );
    //current our coin weight
    weights.push(
      startWeight[1] - CustomdiffWeight * (currentDiffrentTime / diffTime)
    );
  }
  var tokenOut =
    tokenAmount *
    (1 -
      Math.pow(
        stableAmount / (stableAmount + tokenIN * (1 - swapFee)),
        weights[0] / weights[1]
      ));
  var spotPrice = stableAmount / weights[0] / (tokenAmount / weights[1]);

  var effectivePrice = (tokenIN * (1 - swapFee)) / tokenOut;

  var priceImpact = effectivePrice / spotPrice - 1;
  var daiToToken = tokenOut / tokenIN;

  return [tokenOut, priceImpact, daiToToken];
};

async function tokenPriceCalulate(
  endWeight,
  startWeight,
  endTime,
  startTime,
  tokenIN,
  stableAmount,
  tokenAmount,
  swapFee
) {
  endWeight = [parseFloat(endWeight[0]), parseFloat(endWeight[1])];
  startWeight = [parseFloat(startWeight[0]), parseFloat(startWeight[1])];
  endTime = parseFloat(endTime);
  startTime = parseFloat(startTime);
  tokenIN = parseFloat(tokenIN);
  stableAmount = parseFloat(stableAmount);
  tokenAmount = parseFloat(tokenAmount);
  swapFee = parseFloat(swapFee);
  let [tokenOut, priceImpact, daiToToken] = await LatestPrice(
    endWeight,
    startWeight,
    endTime,
    startTime,
    tokenIN,
    stableAmount,
    tokenAmount,
    swapFee
  );

  const stableCoinCurrentPrice = 1; // TODO - fecth price from api
  
  if (tokenOut === 0) {
    return 0;
  }
  let price = (tokenIN * stableCoinCurrentPrice) / tokenOut;

  return price;
}

async function run() {
  console.log(
    "Price:",
    await LatestPrice(
      [80, 20],
      [20, 80],
      1644409800,
      1643977800,
      "1",
      "10",
      "50",
      0.001
    )
  );
}

// run()

export { tokenPriceCalulate, LatestPrice };
