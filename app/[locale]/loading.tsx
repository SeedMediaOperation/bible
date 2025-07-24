'use client';

import React, { CSSProperties }  from 'react'
import { ClockLoader } from "react-spinners";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const Loading = () => {
  return (
    <div className="fixed inset-0 min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 z-[50]">
      <div className="space-y-4 w-full max-w-xs">

        <div className="flex flex-col items-center justify-center space-y-2 mt-4">
          <ClockLoader
            color="#50bbed"
            cssOverride={override}
            size={100}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
          <h1 className='text-[20px] text-[#50bbed] font-bold'>The Bible Society in Cambodia.</h1>
        </div>
      </div>
    </div>
  );
}

export default Loading