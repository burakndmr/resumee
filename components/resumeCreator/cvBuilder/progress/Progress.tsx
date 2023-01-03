import React from "react";

interface ProgressProps {
  color?: string;
  progress: number;
}

export const Progress: React.FC<ProgressProps> = ({ color, progress }) => {
  return (
    <div className="mb-4 w-full h-4 bg-gray-200 rounded-full dark:bg-gray-700">
      <div
        className={`h-4 ${
          color ? color : "bg-primary"
        }  rounded-full dark:bg-blue-500 transition-all duration-500 ease-in-out`}
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};
