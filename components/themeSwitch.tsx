'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { MoonIcon, SunIcon } from '@phosphor-icons/react';

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const toggleTheme = () => {
    if (theme === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  };

  return (
    <button
      type="button"
      className="relative w-10 h-[22px] rounded-full bg-switch-inactive border-border border-[1px] cursor-pointer hover:border-primary duration-200"
      onClick={toggleTheme}
      aria-label="switch theme"
    >
      {theme === 'light' ? (
        <span className="absolute left-[1px] top-[1px] w-[18px] h-[18px] rounded-full bg-white flex justify-center items-center duration-200">
          <SunIcon size={14} />
        </span>
      ) : (
        <span className="absolute left-[1px] top-[1px] w-[18px] h-[18px] rounded-full bg-black flex justify-center items-center trans translate-x-full  duration-200">
          <MoonIcon size={14} />
        </span>
      )}
    </button>
  );
};

export default ThemeSwitch;
