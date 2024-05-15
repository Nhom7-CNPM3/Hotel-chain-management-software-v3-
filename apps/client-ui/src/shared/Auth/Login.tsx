'use client'

import styles from "@/utils/style";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from 'next/navigation'
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import toast from "react-hot-toast";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "@/graphql/actions/login.action";
import Cookies from "js-cookie";
import { signIn } from "next-auth/react"
import { formSchemaLogin } from "@/lib/zod/formSchemaLogin";
import  getByUserEmailChiNhanh  from "@/actions/GET/get-by-user-email-chi-nhanh";
import getSubUserByEmailAndPass from "@/actions/GET/get-sub-user-by-email-and-pass";

type LoginSchema = z.infer<typeof formSchemaLogin>;

const Login = ({
  setActiveState,
  setOpen,
}: {
  setActiveState: (e: string) => void;
  setOpen: (e: boolean) => void;
}) => {
  const [Login, { loading }] = useMutation(LOGIN_USER);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginSchema>({
    resolver: zodResolver(formSchemaLogin),
  });
  const [show, setShow] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: LoginSchema) => {
    const loginData = {
      email: data.email,
      password: data.password,
    };
    const response = await Login({
      variables: loginData,
    });

    
    if (response.data.Login.user) {
      let UserId = response.data.Login.user.id
      let UserRole = response.data.Login.user.role
      let UserEmail = response.data.Login.user.email
      let UserChiNhanIdAndKhachSanId = await getByUserEmailChiNhanh(UserEmail)

      let userIdChiNhanh = UserChiNhanIdAndKhachSanId?.ChiNhanh[0]?.id ?? "";
      let userIdKhachSan = UserChiNhanIdAndKhachSanId?.ChiNhanh[0]?.KhachSan[0]?.id ?? "";
      Cookies.set("chi_nhanh_id", userIdChiNhanh);
      Cookies.set("khach_san_id", userIdKhachSan);
  
      toast.success("Login Successful!");
      Cookies.set("refresh_token", response.data.Login.refreshToken);
      Cookies.set("access_token", response.data.Login.accessToken);
      Cookies.set("user_id", UserId);
      Cookies.set("role", UserRole);
      setOpen(false);
      reset();
      window.location.reload();
      router.push(`/${UserRole}/Home`)
    } else if(!response.data.Login.user){
      try {
        const responseSubUser = await getSubUserByEmailAndPass(loginData)
      toast.success("Login Successful!");
        setOpen(false);
        reset();
        window.location.reload();
        router.push(`/${responseSubUser.role}/Home`)
      } catch (error: any) {
        toast.error(error.message);
      }
    } else {
      toast.error(response.data.Login.error.message);
    }
  };

  return (
    <div>
      <h1 className={`${styles.title}`}>Login with Welding Store</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className={`${styles.label}`}>Enter your Email</label>
        <input
          {...register("email")}
          type="email"
          placeholder="loginmail@gmail.com"
          className={`${styles.input}`}
        />
        {errors.email && (
          <span className="text-red-500 block mt-1">
            {`${errors.email.message}`}
          </span>
        )}
        <div className="w-full mt-5 relative mb-1">
          <label htmlFor="password" className={`${styles.label}`}>
            Enter your password
          </label>
          <input
            {...register("password")}
            type={!show ? "password" : "text"}
            placeholder="password!@%"
            className={`${styles.input}`}
          />
          {!show ? (
            <AiOutlineEyeInvisible
              className="absolute bottom-3 right-2 z-1 cursor-pointer"
              size={20}
              onClick={() => setShow(true)}
            />
          ) : (
            <AiOutlineEye
              className="absolute bottom-3 right-2 z-1 cursor-pointer"
              size={20}
              onClick={() => setShow(false)}
            />
          )}
        </div>
        {errors.password && (
          <span className="text-red-500">{`${errors.password.message}`}</span>
        )}
        <div className="w-full mt-5">
          <span
            className={`${styles.label} text-[#2190ff] block text-right cursor-pointer`}
            onClick={() => setActiveState("Forgot-Password")}
          >
            Forgot your password?
          </span>
          <input
            type="submit"
            value="Login"
            disabled={isSubmitting || loading}
            className={`${styles.button} mt-3`}
          />
        </div>
        <br />
        <h5 className="text-center pt-4 font-Poppins text-[16px] text-white">
          Or join with
        </h5>
        <div className="flex items-center justify-center my-3"
        onClick={() => signIn()}
        >
          <FcGoogle size={30} className="cursor-pointer mr-2" />
        </div>
        <h5 className="text-center pt-4 font-Poppins text-[14px]">
          Not have any account?
          <span
            className="text-[#2190ff] pl-1 cursor-pointer"
            onClick={() => setActiveState("Signup")}
          >
            Sign up
          </span>
        </h5>
        <br />
      </form>
    </div>
  );
};

export default Login;
