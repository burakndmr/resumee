import React from "react";

interface ProgressProps {
  progress: number;
}

export const Progress: React.FC<ProgressProps> = ({ progress }) => {
  return (
    <div className="mb-4 w-full h-4 bg-gray-200 rounded-full dark:bg-gray-700">
      <div
        className={`h-4 ${
          progress < 100 ? "bg-primary" : "bg-green-500"
        }  rounded-full dark:bg-blue-500 transition-all duration-500 ease-in-out`}
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};
