import Link from "next/link";

const navItems = [
  {
    title: "Trang chủ",
    url: "/",
  },
  {
    title: "Sản Phẩm",
    url: "/product",
  },
  {
    title: "Phí dịch vụ",
    url: "/prices",
  },
  {
    title: "Tin tức",
    url: "/news",
  },
  {
    title: "Về WeldingStore",
    url: "/about",
  },
];

const NavItems = ({ activeItem = 0 }: { activeItem?: number }) => {
  return (
    <div className="md:block hidden">
      {navItems.map((item, index) => (
        <Link
          key={item.url}
          href={item.url}
          className={`px-5 text-[18px] font-Poppins font-[500] ${
            activeItem === index && "text-[#47aaf1f1]"
          }`}
        >
          {item.title}
        </Link>
      ))}
    </div>
  );
};

export default NavItems;
