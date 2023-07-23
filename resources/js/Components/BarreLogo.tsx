import { ClassAttributes, ImgHTMLAttributes } from "react";
import { JSX } from "react/jsx-runtime";

export default function BarreLogo(props: JSX.IntrinsicAttributes & ClassAttributes<HTMLImageElement> & ImgHTMLAttributes<HTMLImageElement>) {
    return (
       <img src="../../../storage/images/ligne.png" alt="logo" {...props}/>
    );
}
