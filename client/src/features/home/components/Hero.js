import React from "react";
import Lottie from "lottie-react";
import animationData from "../../../assets/68832-shop-car.json";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <div className='hero min-h-screen bg-base-200'>
      <div className='hero-content text-center'>
        <div className='max-w-md'>
          <h1 className='text-5xl font-bold'>Hello there</h1>
          <Lottie animationData={animationData} />
          <Link to='/login'>
            <button className='btn bg-base-100 btn-outline'>Get Started</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
