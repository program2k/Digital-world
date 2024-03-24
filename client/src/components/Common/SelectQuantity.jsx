import React, { memo } from "react";

const SelectQuantity = ({ quantity, handleQuantity, handleChangeQuantity }) => {
  return (
    <div className="flex items-center">
      <span
        className="cursor-pointer p-2 border-r border-black"
        onClick={() => handleChangeQuantity("minus")}
      >
        -
      </span>
      <input
        className="py-2 outline-none w-[50px] text-center"
        type="text"
        onChange={(event) => handleQuantity(event.target.value)}
        value={quantity}
      />
      <span
        className="cursor-pointer text-[24px] p-2 border-l border-black"
        onClick={() => handleChangeQuantity("plus")}
      >
        +
      </span>
    </div>
  );
};

export default memo(SelectQuantity);
