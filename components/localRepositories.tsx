'use client';

import type { RepositorySave } from '@/types/repositorySave';
import Card from './card';
import { useLocalStorageContext } from '@/context/LocalStorageContext';

const LocalRepositories = () => {
  const { repositories, setRepositories } = useLocalStorageContext();
  const removeRepository = (user: string, repo: string) => {
    setRepositories(
      repositories.filter(
        (repoSave: RepositorySave) => repoSave.name !== repo || repoSave.user !== user,
      ),
    );
  };
  return (
    <>
      {repositories.length > 0 && (
        <div className="mt-10">
          <h2 className="font-semibold text-2xl mb-6">Saved Repositories</h2>
          {repositories && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {repositories.toReversed().map((repository: RepositorySave) => (
                <Card
                  user={repository.user}
                  repositoryName={repository.name}
                  remove={() => removeRepository(repository.user, repository.name)}
                  key={repository.name + repository.user}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default LocalRepositories;
