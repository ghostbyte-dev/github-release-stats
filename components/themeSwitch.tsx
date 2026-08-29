'use client';

import { MoonIcon, SunIcon } from '@phosphor-icons/react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

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
      className="relative w-10 h-5.5 rounded-full bg-switch-inactive border-border border cursor-pointer hover:border-primary duration-200"
      onClick={toggleTheme}
      aria-label="switch theme"
    >
      {theme === 'light' ? (
        <span className="absolute left-px top-px w-4.5 h-4.5 rounded-full bg-white flex justify-center items-center duration-200">
          <SunIcon size={14} />
        </span>
      ) : (
        <span className="absolute left-px top-px w-4.5 h-4.5 rounded-full bg-black flex justify-center items-center trans translate-x-full  duration-200">
          <MoonIcon size={14} />
        </span>
      )}
    </button>
  );
};

export default ThemeSwitch;
