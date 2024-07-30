import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Monitor = () => {
  const [data, setData] = useState({ cpu_percent: 0, mem_percent: 0, message: '' });

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios('http://localhost:5001/');
      setData(result.data);
    };

    fetchData();
  }, []);

  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const offset1 = circumference * (1 - data.cpu_percent / 100);
  const offset2 = circumference * (1 - data.mem_percent / 100);

  return (
    <div className='flex flex-col justify-center items-center w-1/2 h-screen mx-auto'>
      <h1 className='text-white text-center m-10 text-3xl font-semibold'>System Monitor</h1>
      <div className="relative w-full h-1/2 flex justify-center items-center">
      <svg
  className="w-full h-full rotate-180"
  viewBox="0 0 200 100"
>
  <circle
    cx="100"
    cy="50"
    r={radius}
    fill="transparent"
    stroke="white"
    strokeWidth="10"
    strokeDasharray={circumference}
    strokeDashoffset={circumference / 2}
  />
  <circle
    cx="100"
    cy="50"
    r={radius}
    fill="transparent"
    stroke="blue"
    strokeWidth="10"
    strokeDashoffset={circumference / 2}
    strokeDasharray={`${offset1}, ${circumference}`}
  />
</svg>

        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-semibold">{data.cpu_percent}%</span>
        </div>
      </div>
      <p className='text-white mt-5'>CPU Utilization: {data.cpu_percent}%</p>
      
      <div className="relative w-full h-1/2 flex justify-center items-center">
      <svg
  className="w-full h-full rotate-180"
  viewBox="0 0 200 100"
>
  <circle
    cx="100"
    cy="50"
    r={radius}
    fill="transparent"
    stroke="white"
    strokeWidth="10"
    strokeDasharray={circumference}
    strokeDashoffset={circumference / 2}
  />
  <circle
    cx="100"
    cy="50"
    r={radius}
    fill="transparent"
    stroke="blue"
    strokeWidth="10"
    strokeDashoffset={circumference / 2}
    strokeDasharray={`${offset2}, ${circumference}`}
  />
</svg>

        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-semibold">{data.mem_percent}%</span>
        </div>
      </div>
      <p className='text-white'>Memory Utilization: {data.mem_percent}%</p>
      <div className='text-white'>
        {data.message && <p>{data.message}</p>}
      </div>
    </div>
  );
};

export default Monitor;
