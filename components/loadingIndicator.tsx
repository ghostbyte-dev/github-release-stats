import { CircleNotchIcon } from '@phosphor-icons/react';

const LoadingIndicator = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <CircleNotchIcon size={24} className="animate-spin" />
    </div>
  );
};

export default LoadingIndicator;
