import { CgProfile } from "react-icons/cg";
import { FaCcAmazonPay, FaRegBell } from "react-icons/fa";
import { IoMdBasket } from "react-icons/io";
import { LuMenu, LuMessageCircleMore } from "react-icons/lu";

const HomeHeader = () => {
  return (
    <div className=" flex-row flex justify-between">
      <div className="headerIcons">
        <LuMenu />
        <FaCcAmazonPay />
        <IoMdBasket />
      </div>
      <div className="headerIcons">
        <LuMessageCircleMore />
        <FaRegBell />
        <CgProfile />
      </div>
    </div>
  );
};
export default HomeHeader;
