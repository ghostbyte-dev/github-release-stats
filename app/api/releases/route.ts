import type { Release } from '@/types/release';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const user = searchParams.get('user');
    const repo = searchParams.get('repo');
    const page = searchParams.get('page') ?? '1';

    const token = process.env.GITHUB_API_KEY ?? '';
    const res = await fetch(
      `https://api.github.com/repos/${user}/${repo}/releases?per_page=100&page=${page}`,
      {
        headers: {
          Authorization: `bearer ${token}`,
        },
        cache: 'no-store',
      },
    );
    const releases: Release[] = await res.json();
    return Response.json(releases, { status: res.status });
  } catch {
    throw Error('an unexpected error occured');
  }
}
