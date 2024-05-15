import styles from "@/utils/style";
import { Button } from "@nextui-org/button";
import Image from "next/image";
import CoffleImg from '../../../public/e5bef75aa55c98d8a698fe9c840157ea223d3490e2c7a82214d9794716855b8b.svg'
import PiggyImg from '../../../public/02ce04b26b147aa4b319028da1536388583893128b2e45fe6009b46ce2995235.svg'
import CheckGreenImg from '../../../public/9fb9763611598b43ae4d2e4be85923044371c9e1f14756da0c886c88c68102af.svg'
import ShopStoreImg from '../../../public/92104edf6dbef4ff7ef3030c3dd6ffac273901b537b82ecaefef1115db0713bd.svg'
import FashionStoreImg from '../../../public/e86dcfc32d187605bb88f3cbbd49fbc7470982aa71777aa8f798fed8afede0a4.svg'
import TshirtImg from '../../../public/2cdbd131693bc03d909eefeb07b813e397ca0bf5aace3eda7fbfc110116a947d.svg'
import GlassImg from '../../../public/9683bcde820416b3b34f4209fec615fee04925ee07026a9e61509665fa1942e2.svg'

const Hero = () => {
  return (
    <>
    <div className="w-full h-[100vh] banner flex items-center z-10 absolute">
      <div className="backdrop_shaders w-full" />
      <div className="w-[80%] m-auto">
        <h1 className="text-4xl text-[#1398f8f1] py-5 xl:text-6xl font-[800] xl:leading-[80px] sm:mt-20 font-Inter">
          Chào mừng đến với WeldingStore<br />
          <span className="text-slate-200 font-Poppins font-[600] text-3xl">
            Chúng tôi sẽ giúp bạn tìm hiểu về sản phẩm của mình
          </span>
        </h1>
        <p className={`${styles.label} !text-[18px]`}>
          Ở đây, chúng tôi coi trọng sự uy tin và chất lượng của việc quản lý 
          <br /> đối với từng doanh nghiệp lớn hay nhỏ.
        </p>
        <br />
        <Button className={`${styles.button} w-[180px] font-semibold md:mb-12`}>
          Dùng thử miễn phí
        </Button>
      </div>
    </div>
    <div className="mt-[770px] flex flex-col">
    <div className="text-white text-3xl font-medium self-center mt-20 max-md:max-w-full max-md:mt-10">
     Welding Store khiến cho việc quản lý trở nên dễ dàng hơn
   </div>
   <div className="justify-center self-center w-[911px] max-w-full mt-12 max-md:mt-10">
     <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
       <div className="flex flex-col items-stretch w-6/12 max-md:w-full max-md:ml-0">
         <span className="justify-center items-stretch content-center self-stretch flex-wrap shadow-sm bg-white flex grow flex-col w-full px-9 py-12 rounded-3xl max-md:max-w-full max-md:mt-10 max-md:px-5">
           <span className="flex items-stretch justify-between gap-5 mt-32 max-md:mt-10">
             <div className="justify-center items-center bg-orange-200 flex flex-col w-[100px] h-[100px] px-6 rounded-[500px] max-md:px-5">
               <Image
                 priority={false}
                 src={CoffleImg}
                 alt="Coffee Logo"
                 className="aspect-[1.14] object-contain object-center w-full fill-yellow-800 overflow-hidden"
               />
             </div>
             <div className="text-black text-xl font-medium self-center grow whitespace-nowrap my-auto">
               Đơn giản & dễ sử dụng
             </div>
           </span>
           <div className="text-zinc-500 text-center text-base self-center max-w-[331px] mt-3.5 mb-20 max-md:mb-10">
             Giao diện đơn giản, thân thiện và thông minh. Chỉ mất 15 phút
             làm quen, đồng thời còn có đội ngũ nhân viên sẵn sàng hỗ trợ cho
             khách hàng 24/24
           </div>
         </span>
       </div>
       <div className="flex flex-col items-stretch w-6/12 ml-5 max-md:w-full max-md:ml-0">
         <div className="justify-center items-stretch flex grow flex-col max-md:max-w-full max-md:mt-10">
           <span className="justify-center items-stretch content-center flex-wrap shadow-sm bg-white flex flex-col px-12 py-6 rounded-3xl max-md:max-w-full max-md:px-5">
             <div className="justify-center items-center bg-orange-200 self-center flex w-[100px] flex-col h-[100px] px-6 rounded-[500px] max-md:px-5">
             <Image
                 priority={false}
                 src={PiggyImg}
                 alt="Piggy Logo"
                 className="aspect-square object-contain object-center w-full fill-orange-400 overflow-hidden"
               />
             </div>
             <div className="text-black text-xl font-medium self-center whitespace-nowrap mt-3.5">
               Tiết kiệm chi phí
             </div>
             <div className="text-zinc-500 text-center text-base mt-3.5">
               Miễn phí cài đặt, triển khai, nâng cấp và hỗ trợ. Rẻ hơn một
               ly trà đá.
             </div>
           </span>
           <span className="justify-center items-center content-center flex-wrap shadow-sm bg-white flex flex-col mt-11 px-12 py-6 rounded-3xl max-md:max-w-full max-md:mt-10 max-md:px-5">
             <div className="justify-center items-center bg-emerald-200 flex w-[100px] flex-col h-[100px] px-6 rounded-[500px] max-md:px-5">
             <Image
                 priority={false}
                 src={CheckGreenImg}
                 alt="Check Green Logo"
                 className="aspect-square object-contain object-center w-full fill-green-800 overflow-hidden"
               />
             </div>
             <div className="text-black text-xl text-center font-medium self-stretch whitespace-nowrap mt-3.5">
               Phù hợp cho từng ngành hàng
             </div>
             <div className="text-zinc-500 text-center text-base self-stretch mt-3.5">
               Phần mềm phù hợp cho hơn 20 ngành nghề kinh doanh khác nhau.
             </div>
           </span>
         </div>
       </div>
     </div>
   </div>
   <div className="text-white text-center text-3xl font-medium self-center max-w-[888px] mt-20 max-md:max-w-full max-md:mt-10">
     Chúng tôi thiết kế phần mềm chuyên biệt cho từng ngành hàng
   </div>
   <div className="justify-center self-center w-full max-w-screen-xl mt-20 px-5 max-md:max-w-full max-md:mt-10">
     <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
       <div className="flex flex-col items-stretch w-[33%] max-md:w-full max-md:ml-0">
         <span className="items-center flex grow flex-col pb-2.5 max-md:mt-8">
           <div className="justify-center items-center bg-white bg-opacity-90 self-center flex aspect-square flex-col w-[70px] h-[70px] px-4 rounded-xl">
           <Image
                 priority={false}
                 src={ShopStoreImg}
                 alt="Shop Store Logo"
               className="aspect-square object-contain object-center w-full fill-yellow-800 overflow-hidden"
             />
           </div>
           <div className="text-white text-center text-xl font-semibold self-center whitespace-nowrap mt-5">
             Bán buôn, bán lẻ
           </div>
           <span className="items-stretch self-stretch border-white flex justify-between gap-1 mt-7 pt-2.5 border-t border-solid">
             <div className="justify-center items-center bg-white bg-opacity-90 flex aspect-square flex-col w-[29px] h-[29px] px-1.5">
             <Image
                 priority={false}
                 src={TshirtImg}
                 alt="T Shirt Logo"
                 className="aspect-square object-contain object-center w-full overflow-hidden"
               />
             </div>
             <div className="text-white text-base grow whitespace-nowrap self-start">
               Thời trang
             </div>
           </span>
           <span className="items-stretch self-stretch border-white flex justify-between gap-1 mt-3 pt-2.5 border-t border-solid">
             <div className="justify-center items-center bg-white bg-opacity-90 flex aspect-[1.0357142857142858] flex-col w-[29px] h-[29px] px-1.5">
             <Image
                 priority={false}
                 src={TshirtImg}
                 alt="T Shirt Logo"
                 className="aspect-[1.06] object-contain object-center w-full overflow-hidden"
               />
             </div>
             <div className="text-white text-base grow whitespace-nowrap self-start">
               Điện thoại & Điện máy
             </div>
           </span>
           <span className="items-stretch self-stretch border-white flex justify-between gap-1 mt-3 pt-2.5 border-t border-solid">
             <div className="justify-center items-center bg-white bg-opacity-90 flex aspect-square flex-col w-[29px] h-[29px] px-1.5">
             <Image
                 priority={false}
                 src={TshirtImg}
                 alt="T Shirt Logo"
                 className="aspect-square object-contain object-center w-full overflow-hidden"
               />
             </div>
             <div className="text-white text-base grow whitespace-nowrap self-start">
               Nhà thuốc
             </div>
           </span>
           <span className="items-stretch self-stretch border-white flex justify-between gap-1 mt-3 pt-2.5 border-t border-solid">
             <div className="justify-center items-center bg-white bg-opacity-90 flex aspect-square flex-col w-[29px] h-[29px] px-1.5">
             <Image
                 priority={false}
                 src={TshirtImg}
                 alt="T Shirt Logo"
                 className="aspect-square object-contain object-center w-full overflow-hidden"
               />
             </div>
             <div className="text-white text-base grow whitespace-nowrap self-start">
               Mỹ phẩm
             </div>
           </span>
           <span className="items-stretch self-stretch border-white flex justify-between gap-1 mt-3 pt-2.5 border-t border-solid">
             <div className="justify-center items-center bg-white bg-opacity-90 flex aspect-[1.0357142857142858] flex-col w-[29px] h-[29px] px-1.5">
             <Image
                 priority={false}
                 src={TshirtImg}
                 alt="T Shirt Logo"
                 className="aspect-[1.06] object-contain object-center w-full overflow-hidden"
               />
             </div>
             <div className="text-white text-base grow whitespace-nowrap self-start">
               Nội thất & Gia dụng
             </div>
           </span>
           <span className="items-stretch self-stretch border-white flex justify-between gap-1 mt-3 pt-2.5 border-t border-solid">
             <div className="justify-center items-center bg-white bg-opacity-90 flex aspect-square flex-col w-[29px] h-[29px] px-1.5">
             <Image
                 priority={false}
                 src={TshirtImg}
                 alt="T Shirt Logo"
                 className="aspect-square object-contain object-center w-full overflow-hidden"
               />
             </div>
             <div className="text-white text-base grow whitespace-nowrap self-start">
               Sách & Văn phòng phẩm
             </div>
           </span>
           <span className="items-stretch self-stretch border-white flex justify-between gap-1 mt-3 pt-2.5 border-t border-solid">
             <div className="justify-center items-center bg-white bg-opacity-90 flex aspect-square flex-col w-[29px] h-[29px] px-1.5">
             <Image
                 priority={false}
                 src={TshirtImg}
                 alt="T Shirt Logo"
                 className="aspect-square object-contain object-center w-full overflow-hidden"
               />
             </div>
             <div className="text-white text-base grow whitespace-nowrap self-start">
               Sản xuất
             </div>
           </span>
         </span>
       </div>
       <div className="flex flex-col items-stretch w-[33%] ml-5 max-md:w-full max-md:ml-0">
         <span className="items-center flex grow flex-col pb-2.5 max-md:mt-8">
           <div className="justify-center items-center bg-white bg-opacity-90 self-center flex aspect-[1.0344827586206897] flex-col w-[70px] h-[70px] px-5 rounded-xl">
           <Image
                 priority={false}
                 src={GlassImg}
                 alt="Glass Logo"
               className="aspect-[1.09] object-contain object-center w-full fill-yellow-800 overflow-hidden"
             />
           </div>
           <div className="text-white text-center text-xl font-semibold self-center whitespace-nowrap mt-5">
             Ăn uống, giải trí
           </div>
           <span className="items-stretch self-stretch border-white flex justify-between gap-1 mt-7 pt-2.5 border-t border-solid">
             <div className="justify-center items-center bg-white bg-opacity-90 flex aspect-[0.9655172413793104] flex-col w-[29px] h-[29px] px-1.5">
             <Image
                 priority={false}
                 src={TshirtImg}
                 alt="T Shirt Logo"
                 className="aspect-[0.94] object-contain object-center w-full overflow-hidden"
               />
             </div>
             <div className="text-white text-base grow whitespace-nowrap self-start">
               Nhà hàng
             </div>
           </span>
           <span className="items-stretch self-stretch border-white flex justify-between gap-1 mt-3 pt-2.5 border-t border-solid">
             <div className="justify-center items-center bg-white bg-opacity-90 flex aspect-square flex-col w-7 h-7 px-1.5">
             <Image
                 priority={false}
                 src={TshirtImg}
                 alt="T Shirt Logo"
                 className="aspect-square object-contain object-center w-full overflow-hidden"
               />
             </div>
             <div className="text-white text-base grow whitespace-nowrap self-start">
               Quán ăn
             </div>
           </span>
           <span className="items-stretch self-stretch border-white flex justify-between gap-1 mt-3 pt-2.5 border-t border-solid">
             <div className="justify-center items-center bg-white bg-opacity-90 flex aspect-[0.9655172413793104] flex-col w-[29px] h-[29px] px-1.5">
             <Image
                 priority={false}
                 src={TshirtImg}
                 alt="T Shirt Logo"
                 className="aspect-[0.94] object-contain object-center w-full overflow-hidden"
               />
             </div>
             <div className="text-white text-base grow whitespace-nowrap self-start">
               Cafe, Trà sữa
             </div>
           </span>
           <span className="items-stretch self-stretch border-white flex justify-between gap-1 mt-3 pt-2.5 border-t border-solid">
             <div className="justify-center items-center bg-white bg-opacity-90 flex aspect-[0.9655172413793104] flex-col w-[29px] h-[29px] px-1.5">
             <Image
                 priority={false}
                 src={TshirtImg}
                 alt="T Shirt Logo"
                 className="aspect-[0.94] object-contain object-center w-full overflow-hidden"
               />
             </div>
             <div className="text-white text-base grow whitespace-nowrap self-start">
               Karaoke, Bida
             </div>
           </span>
           <span className="items-stretch self-stretch border-white flex justify-between gap-1 mt-3 pt-2.5 border-t border-solid">
             <div className="justify-center items-center bg-white bg-opacity-90 flex aspect-square flex-col w-7 h-7 px-1.5">
             <Image
                 priority={false}
                 src={TshirtImg}
                 alt="T Shirt Logo"
                 className="aspect-square object-contain object-center w-full overflow-hidden"
               />
             </div>
             <div className="text-white text-base grow whitespace-nowrap self-start">
               Bar, Pub & Club
             </div>
           </span>
           <span className="items-stretch self-stretch border-white flex justify-between gap-1 mt-3 pt-2.5 border-t border-solid">
             <div className="justify-center items-center bg-white bg-opacity-90 flex aspect-[0.9655172413793104] flex-col w-[29px] h-[29px] px-1.5">
             <Image
                 priority={false}
                 src={TshirtImg}
                 alt="T Shirt Logo"
                 className="aspect-[0.94] object-contain object-center w-full overflow-hidden"
               />
             </div>
             <div className="text-white text-base grow whitespace-nowrap self-start">
               Căng tin & Trạm dừng nghỉ
             </div>
           </span>
           <span className="items-stretch self-stretch border-white flex justify-between gap-1 mt-3 pt-2.5 border-t border-solid">
             <div className="justify-center items-center bg-white bg-opacity-90 flex aspect-[0.9655172413793104] flex-col w-[29px] h-[29px] px-1.5">
             <Image
                 priority={false}
                 src={TshirtImg}
                 alt="T Shirt Logo"
                 className="aspect-[0.94] object-contain object-center w-full overflow-hidden"
               />
             </div>
             <div className="text-white text-base grow whitespace-nowrap self-start">
               Khác
             </div>
           </span>
         </span>
       </div>
       <div className="flex flex-col items-stretch w-[33%] ml-5 max-md:w-full max-md:ml-0">
         <span className="items-center flex flex-col pb-2.5 max-md:mt-8">
           <div className="justify-center items-center bg-white bg-opacity-90 self-center flex aspect-square flex-col w-[70px] h-[70px] px-5 rounded-xl">
           <Image
                 priority={false}
                 src={FashionStoreImg}
                 alt="Fashion store Logo"
               className="aspect-square object-contain object-center w-full fill-yellow-800 overflow-hidden"
             />
           </div>
           <div className="text-white text-center text-xl font-semibold self-center whitespace-nowrap mt-5">
             Làm đẹp, sức khỏe & lưu trú
           </div>
           <span className="items-stretch self-stretch border-white flex justify-between gap-1 mt-7 pt-2.5 border-t border-solid">
             <div className="justify-center items-center bg-white bg-opacity-90 flex aspect-[1.0357142857142858] flex-col w-[29px] h-[29px] px-1.5">
                <Image
                 priority={false}
                 src={TshirtImg}
                 alt="T Shirt Logo"
                 className="aspect-[1.06] object-contain object-center w-full overflow-hidden"
               />
             </div>
             <div className="text-white text-base grow whitespace-nowrap self-start">
               Khách sạn & Nhà nghỉ
             </div>
           </span>
           <span className="items-stretch self-stretch border-white flex justify-between gap-1 mt-3 pt-2.5 border-t border-solid">
             <div className="justify-center items-center bg-white bg-opacity-90 flex aspect-square flex-col w-[29px] h-[29px] px-1.5">
             <Image
                 priority={false}
                 src={TshirtImg}
                 alt="T Shirt Logo"
                 className="aspect-square object-contain object-center w-full overflow-hidden"
               />
             </div>
             <div className="text-white text-base grow whitespace-nowrap self-start">
               Homestay & Villa, Resort
             </div>
           </span>
           <span className="items-stretch self-stretch border-white flex justify-between gap-1 mt-3 pt-2.5 border-t border-solid">
             <div className="justify-center items-center bg-white bg-opacity-90 flex aspect-square flex-col w-[29px] h-[29px] px-1.5">
             <Image
                 priority={false}
                 src={TshirtImg}
                 alt="T Shirt Logo"
                 className="aspect-square object-contain object-center w-full overflow-hidden"
               />
             </div>
             <div className="text-white text-base grow whitespace-nowrap self-start">
               Beauty Spa & Massage
             </div>
           </span>
           <span className="items-stretch self-stretch border-white flex justify-between gap-1 mt-3 pt-2.5 border-t border-solid">
             <div className="justify-center items-center bg-white bg-opacity-90 flex aspect-[1.0357142857142858] flex-col w-[29px] h-[29px] px-1.5">
                <Image
                 priority={false}
                 src={TshirtImg}
                 alt="T Shirt Logo"
                 className="aspect-[1.06] object-contain object-center w-full overflow-hidden"
               />
             </div>
             <div className="text-white text-base grow whitespace-nowrap self-start">
               Hair Salon & Nails
             </div>
           </span>
           <span className="items-stretch self-stretch border-white flex justify-between gap-1 mt-3 pt-2.5 border-t border-solid">
             <div className="justify-center items-center bg-white bg-opacity-90 flex aspect-square flex-col w-[29px] h-[29px] px-1.5">
             <Image
                 priority={false}
                 src={TshirtImg}
                 alt="T Shirt Logo"
                 className="aspect-square object-contain object-center w-full overflow-hidden"
               />
             </div>
             <div className="text-white text-base grow whitespace-nowrap self-start">
               Fitness & Yoga
             </div>
           </span>
           <span className="items-stretch self-stretch border-white flex justify-between gap-1 mt-3 pt-2.5 border-t border-solid">
             <div className="justify-center items-center bg-white bg-opacity-90 flex aspect-square flex-col w-[29px] h-[29px] px-1.5">
             <Image
                 priority={false}
                 src={TshirtImg}
                 alt="T Shirt Logo"
                 className="aspect-square object-contain object-center w-full overflow-hidden"
               />
             </div>
             <div className="text-white text-base grow whitespace-nowrap self-start">
               Phòng khám
             </div>
           </span>
           <span className="items-stretch self-stretch border-white flex justify-between gap-1 mt-3 pt-2.5 border-t border-solid">
             <div className="justify-center items-center bg-white bg-opacity-90 flex aspect-[1.0357142857142858] flex-col w-[29px] h-[29px] px-1.5">
                <Image
                 priority={false}
                 src={TshirtImg}
                 alt="T Shirt Logo"
                 className="aspect-[1.06] object-contain object-center w-full overflow-hidden"
               />
             </div>
             <div className="text-white text-base grow whitespace-nowrap self-start">
               Khác
             </div>
           </span>
         </span>
       </div>
     </div>
   </div>
    </div>
   </>
  );
};

export default Hero;
