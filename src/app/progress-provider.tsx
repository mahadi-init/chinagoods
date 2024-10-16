"use client";
import React from "react";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

const ProgressProvider = () => {
  return <ProgressBar height="8px" color="#FC771E" shallowRouting />;
};

export default ProgressProvider;
