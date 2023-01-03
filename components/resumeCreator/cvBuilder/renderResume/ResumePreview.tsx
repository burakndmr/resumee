import React, { forwardRef } from "react";
import { Resume } from "../../../../lib/types";

type Props = {
  data: Resume;
};

const ResumePreview: React.FC<Props> = (data) => {
  const resumee: Resume = data.data;
  console.log(data);
  return (
    <div className="aspect-realA4 scale-75 md:scale-75 lg:scale-95 xl:scale-100 box-border border-2 p-4">
      <div className="h-72 bg-orange-300 flex items-center justify-center flex-col">
        <h2 className="text-4xl font-semibold">{resumee.mainInfo?.name}</h2>
        <h6 className="text-sm italic font-thin text-gray-800">
          {resumee.mainInfo?.jobTitle}
        </h6>
      </div>
    </div>
  );
};

export default ResumePreview;
