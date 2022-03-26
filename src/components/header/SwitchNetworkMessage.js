import React from "react";




const SwitchNetworkMessage = (props) => {
  return (
    <div
      style={{
        background: "rgba(255, 72, 120, 0.3)",
      }}
      className='flex gap-6 p-2 items-center justify-center'
    >
      <div>
        Please the switch the network
      </div>
      <button className='py-1 px-4 bg-red-700 rounded-2xl' onClick={() => props.warningSwitchNetwork()}>
        Switch
      </button>
    </div>
  );
};

export default SwitchNetworkMessage;
