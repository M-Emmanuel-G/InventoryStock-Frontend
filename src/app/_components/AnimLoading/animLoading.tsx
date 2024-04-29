import React from 'react';

const AnimLoading: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="border-t-8 border-b-8 border-emerald-400 rounded-full h-10 w-10 animate-spin"></div>
    </div>
  );
};

export default AnimLoading;