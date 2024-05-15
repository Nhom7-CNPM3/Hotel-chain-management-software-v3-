'use server'

import styles from "@/utils/style";
import NavItems from "../NavItems";
import ProfileDropDown from "../ProfileDropDown";

const Header = () => {
  return (
    <header className="w-full bg-[#0A0713]">
      <div className="w-[90%] m-auto h-[80px] flex items-center justify-between">
        <h1 className={`${styles.logo}`}>WeldingStore</h1>
        <NavItems />
        <ProfileDropDown />
      </div>
    </header>
  );
};

export default Header;
