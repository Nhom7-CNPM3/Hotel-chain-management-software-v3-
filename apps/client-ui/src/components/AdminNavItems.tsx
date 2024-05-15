"use server";
import Image from "next/image";
import Logo from "../../public/screenshot_1704975625.png";
import Link from "next/link";
import AdminDropDownItemComponent from "./AdminDropDownItemComponent";

const AdminNavItems = () => {
  return (
    <nav className="basis-1/6 bg-blue-300">
      <div className="flex flex-col">
        <div className="fixed pt-5 pl-5 z-20 bg-blue-300">
          <Link href="/">
            <Image 
              src={Logo} 
              width={180} 
              height={180} 
              alt="Logo Photo" 
            />
          </Link>
        </div>

        {/* NavGroup */}
        <div>
          {/* Avartagroup */}
          <div>
            {/* Avarta Icon */}
            <div></div>

            {/* Name */}
            <div></div>

            {/* Email */}
            <div></div>
          </div>

          {/* NavItemList */}
          <div className="mt-32 w-full p-5">       
            <AdminDropDownItemComponent/>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavItems;
