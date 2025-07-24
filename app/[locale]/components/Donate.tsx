"use client";
import React from "react";
import DanationForm from "../donations/page";
const Donate = () => {

  return (
    <div  className="w-full max-w-[350px] md:max-w-[720px] xl:max-w-[1200px] mx-auto h-full bg-[linear-gradient(85.15deg,_rgba(30,_30,_30,_0.8)_0.43%,_rgba(7,_32,_39,_0.64)_98.29%)] backdrop-blur-[10px] shadow-[0px_50px_50px_-40px_rgba(0,_0,_0,_0.25)] rounded-[30px] border-[2px] border-solid border-[#575757] translate-y-[-32%] p-3 md:p-14 md:translate-y-[-40%]">
      <h1 data-aos="fade-down"
    data-aos-duration={`400`}
      className="text-[14px] xl:text-[30px] font-normal text-[#4FC9EE] text-center text-wrap mb-14">
        Help where it is needed most
      </h1>
      <div className="p-3">
        <DanationForm />
      </div>
    </div>
  );
};

export default Donate;
