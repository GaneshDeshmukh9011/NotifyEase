import React from 'react';

const Loader = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-blue-500 border-dotted rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
