import { ClassAttributes, ImgHTMLAttributes } from "react";
import { JSX } from "react/jsx-runtime";

export default function ApplicationLogoBlack(props: JSX.IntrinsicAttributes & ClassAttributes<HTMLImageElement> & ImgHTMLAttributes<HTMLImageElement>) {
    return (
       <img src="/public/logo-black.png" alt="logo" {...props}/>
    );
}
