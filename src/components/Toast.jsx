import { useState, useEffect } from 'react';

const Toast = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === 'success' ? 'bg-green-500' : 'bg-blue-500';
  const icon = type === 'success' 
    ? '✓' 
    : '🛒';

  return (
    <div className={`fixed top-4 right-4 z-[1000] ${bgColor} text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce-in`}>
      <span className="text-xl font-bold">{icon}</span>
      <span className="font-bold text-sm">{message}</span>
    </div>
  );
};

export default Toast;
