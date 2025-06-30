// context/ThemeContext.js
import useLocalStorage from '@/hooks/useLocalStorage';
import type { RepositorySave } from '@/types/repositorySave';
import { createContext, useContext } from 'react';
import type React from 'react';

type LocalStorageContextType = {
  repositories: RepositorySave[];
  setRepositories: (repositories: RepositorySave[]) => void;
};

export const LocalStorageContext = createContext<LocalStorageContextType | null>(null);
export const LocalStorageContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [repositories, setRepositories] = useLocalStorage<RepositorySave[]>('repositories', []);

  return (
    <LocalStorageContext.Provider value={{ repositories, setRepositories }}>
      {children}
    </LocalStorageContext.Provider>
  );
};

export default LocalStorageContextProvider;

export const useLocalStorageContext = () => {
  const value = useContext(LocalStorageContext);
  if (!value) {
    throw new Error('state context has not been set yet');
  }
  return value;
};
