import React from 'react';

interface PageFrameProps {
  children: React.ReactNode;
}

export const PageFrame: React.FC<PageFrameProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-200/70 p-2 sm:p-4 md:p-6 lg:p-7 flex flex-col justify-center transition-all">
      <div className="min-h-[calc(100vh-1rem)] sm:min-h-[calc(100vh-2rem)] lg:min-h-[calc(100vh-3.5rem)] w-full max-w-[1600px] mx-auto bg-slate-50 rounded-[1.75rem] sm:rounded-[2.25rem] lg:rounded-[2.75rem] border border-slate-300/70 shadow-2xl overflow-hidden flex flex-col relative ring-1 ring-slate-900/5">
        {children}
      </div>
    </div>
  );
};

export default PageFrame;
