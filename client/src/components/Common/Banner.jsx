import { memo } from "react";
import banner_girl from "../../assets/bestSeller.jpg";

const Banner = () => {
  return (
    <div className="w-full">
      <img
        src={banner_girl}
        alt="text2-slideshow1-home2_600x.png"
        className="h-[360px] w-full object-cover"
      />
    </div>
  );
};

export default memo(Banner);
