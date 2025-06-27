import type { repository } from '@/types/repository';
import type { Edge, StargazersHistoryData } from '@/types/stargazersHistory';

const maxRequestAmount = 20;

export async function GET(request: Request) {
  // For example, fetch data from your DB here
  try {
    const { user, repo } = Object.fromEntries(new URL(request.url).searchParams);

    const repository = await getRepository(user, repo);

    const pageCount = Math.ceil(repository.stargazers_count / 30);
    const requestPages: number[] = [];

    if (pageCount < maxRequestAmount) {
      requestPages.push(...range(1, pageCount));
    } else {
      range(1, maxRequestAmount).map((i) => {
        requestPages.push(Math.round((i * pageCount) / maxRequestAmount) - 1);
      });
      if (!requestPages.includes(1)) {
        requestPages[0] = 1;
      }
    }

    const resArray = await Promise.all(
      requestPages.map((page) => {
        return getRepoStargazers(user, repo, page);
      }),
    );

    const chartData = await formatStargazers(resArray, requestPages, repository.stargazers_count);
    return new Response(JSON.stringify(chartData), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e) {
    console.log(e);
    throw Error('an unexpected error occured');
  }
}

function range(from: number, to: number): number[] {
  const r: number[] = [];
  for (let i = from; i <= to; i++) {
    r.push(i);
  }
  return r;
}

const getRepository = async (user: string, repo: string): Promise<repository> => {
  const token = process.env.GITHUB_API_KEY ?? '';

  const res = await fetch(`https://api.github.com/repos/${user}/${repo}`, {
    headers: {
      Authorization: `bearer ${token}`,
    },
    cache: 'force-cache',
    next: { revalidate: 86400 },
  });
  const repository = await res.json();
  return repository;
};

const formatStargazers = async (
  resArray: Response[],
  requestPages: number[],
  repoStargazersCountCurrent: number,
): Promise<StargazersHistoryData[]> => {
  /*const starRecordsData: Promise<number[]> = resArray.map(async (res: Response) => {
    const data = await res.json();
    return new Date(data.starred_at).getTime();
  });*/

  const starRecordsData: number[][] = await Promise.all(
    resArray.map(async (res: Response) => {
      const data = await res.json();
      if (data && Array.isArray(data)) {
        return data.map((starData: { starred_at: string }) => {
          return new Date(starData.starred_at).getTime();
        });
      }
      return [0];
    }),
  );

  const formattedData: StargazersHistoryData[] = [];
  if (requestPages.length < maxRequestAmount) {
    const numberArray: number[] = [];
    const allStarRecordsData: number[] = numberArray.concat(...starRecordsData);
    const step = Math.ceil(allStarRecordsData.length / 20);

    for (let index = 0; index < allStarRecordsData.length; index += step) {
      if (allStarRecordsData[index]) {
        formattedData.push({
          date: new Date(allStarRecordsData[index]).getTime(),
          stars: index,
        });
      }
    }
    formattedData.push({
      date: new Date(allStarRecordsData[allStarRecordsData.length - 1]).getTime(),
      stars: allStarRecordsData.length,
    });
  } else {
    starRecordsData.map((starPage: number[], index: number) => {
      if (starPage[0] !== 0) {
        formattedData.push({
          date: starPage[0],
          stars: (requestPages[index] - 1) * 30,
        });
      }
    });
    formattedData.push({
      date: new Date(Date.now()).getTime(),
      stars: repoStargazersCountCurrent,
    });
  }

  const uniqueFormattedData: StargazersHistoryData[] = [];
  for (const stargazerData of formattedData) {
    if (uniqueFormattedData.find((element) => element.date === stargazerData.date) === undefined) {
      console.log(stargazerData);
      uniqueFormattedData.push(stargazerData);
    }
  }

  console.log(uniqueFormattedData);
  return uniqueFormattedData;
};

const getRepoStargazers = async (user: string, repo: string, page?: number) => {
  let url = `https://api.github.com/repos/${user}/${repo}/stargazers?per_page=30`;

  if (page !== undefined) {
    url = `${url}&page=${page}`;
  }
  console.log(url);
  const token = process.env.GITHUB_API_KEY ?? '';

  return fetch(url, {
    headers: {
      Accept: 'application/vnd.github.v3.star+json',
      Authorization: token ? `token ${token}` : '',
    },
    cache: 'force-cache',
    next: { revalidate: 86400 },
  });
};
