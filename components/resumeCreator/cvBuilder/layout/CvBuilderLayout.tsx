import React from "react";

interface BuilderLayoutProps {
  children: React.ReactNode;
}

export const BuilderLayout: React.FC<BuilderLayoutProps> = ({
  children,
}) => {
  return <div className="mx-auto max-w-5xl px-3">{children}</div>;
};
