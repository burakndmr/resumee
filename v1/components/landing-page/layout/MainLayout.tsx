import React from "react";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return <div className="mx-auto max-w-7xl px-3">{children}</div>;
};
