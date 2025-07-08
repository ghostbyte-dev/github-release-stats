import type { Release } from '@/types/release';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchReleases } from './useReleases';

export default function useReleasesInfinite(user: string, repository: string) {
  return useInfiniteQuery<Release[]>({
    queryKey: ['releasesInfinite', user, repository],
    queryFn: ({pageParam}) => fetchReleases(user, repository, pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage, _allPages, lastPageParam: any) => {
      if (lastPage.length === 0) {
        return undefined;
      }
      return lastPageParam + 1;
    },
    getPreviousPageParam: (_firstPage, _allPages, firstPageParam: any) => {
      if (firstPageParam <= 1) {
        return undefined;
      }
      return firstPageParam - 1;
    },
  });
}
