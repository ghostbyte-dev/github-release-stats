import type { repository } from '@/types/repository';
import type { Edge, StargazersHistoryData } from '@/types/stargazersHistory';

export async function GET(request: Request) {
  // For example, fetch data from your DB here
  try {
    const { user, repo } = Object.fromEntries(new URL(request.url).searchParams);

    const repository = await getRepository(user, repo);

    let pageCount = Math.ceil(repository.stargazers_count / 100);
    const requestPages: number[] = [];
    if (pageCount > 10) {
      pageCount = 10;
    }
    requestPages.push(...range(1, pageCount));

    const resArray = await Promise.all(
      requestPages.map((page) => {
        return getRepoStargazers(user, repo, page);
      }),
    );
    const chartData = await formatStargazers(resArray);
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
  });
  const repository = await res.json();
  return repository;
};

const formatStargazers = async (resArray: Response[]): Promise<StargazersHistoryData[]> => {
  /*const starRecordsData: Promise<number[]> = resArray.map(async (res: Response) => {
    const data = await res.json();
    return new Date(data.starred_at).getTime();
  });*/

  let starRecordsData = await Promise.all(
    resArray.map(async (res: Response) => {
      const data = await res.json();
      if (data) {
        return data.map((starData: { starred_at: string }) => {
          return new Date(starData.starred_at).getTime();
        });
      }
    }),
  );

  starRecordsData = [].concat(...starRecordsData);

  const step = Math.ceil(starRecordsData.length / 20);
  const formattedData: StargazersHistoryData[] = [];
  for (let index = 0; index < starRecordsData.length; index += step) {
    if (starRecordsData[index]) {
      formattedData.push({
        date: new Date(starRecordsData[index]).getTime(),
        stars: index,
      });
    }
  }

  formattedData.push({
    date: new Date(starRecordsData[starRecordsData.length - 1]).getTime(),
    stars: starRecordsData.length,
  });

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
  let url = `https://api.github.com/repos/${user}/${repo}/stargazers?per_page=100`;

  if (page !== undefined) {
    url = `${url}&page=${page}`;
  }
  const token = process.env.GITHUB_API_KEY ?? '';

  return fetch(url, {
    headers: {
      Accept: 'application/vnd.github.v3.star+json',
      Authorization: token ? `token ${token}` : '',
    },
  });
};
