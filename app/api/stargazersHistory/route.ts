import type { Edge, StargazersHistoryData } from '@/types/stargazersHistory';

export async function GET(request: Request) {
  // For example, fetch data from your DB here
  try {
    const { user, repo } = Object.fromEntries(new URL(request.url).searchParams);

    const allEdges: Edge[] = await getAllEdges([], user, repo, '');
    console.log(allEdges);
    const chartData = formatEdgesData(allEdges);
    console.log(chartData);
    return new Response(JSON.stringify(chartData), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e) {
    console.log(e);
    throw Error('an unexpected error occured');
  }
}

const formatEdgesData = (edges: Edge[]): StargazersHistoryData[] => {
  console.log(edges.length);
  const step = Math.ceil(edges.length / 20);
  console.log(step);
  const formattedData: StargazersHistoryData[] = [];
  for (let index = 0; index < edges.length; index += step) {
    if (edges[index]?.starredAt) {
      formattedData.push({ date: new Date(edges[index].starredAt).getTime(), stars: index });
    }
  }
  formattedData.push({
    date: new Date(edges[edges.length - 1].starredAt).getTime(),
    stars: edges.length,
  });
  return formattedData;
};

const getAllEdges = async (
  edges: Edge[],
  user: string,
  repo: string,
  cursor: string,
): Promise<Edge[]> => {
  const token = process.env.GITHUB_API_KEY ?? '';
  const body = {
    query: `query {
        repository(owner: "${user}", name: "${repo}") {
          stargazers (first: 100, after: "${cursor}") {
            pageInfo {
                endCursor
                hasNextPage
            }
            edges {
            starredAt
            }
            }
        }
        }`,
  };

  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { Authorization: `bearer ${token}` },
  });

  const data = await res.json();
  console.log(data);
  const newEdges = data.data.repository.stargazers.edges;
  if (!data.data.repository.stargazers.pageInfo.hasNextPage) {
    return edges.concat(newEdges);
  }
  return await getAllEdges(
    edges.concat(newEdges),
    user,
    repo,
    data.data.repository.stargazers.pageInfo.endCursor,
  );
};
