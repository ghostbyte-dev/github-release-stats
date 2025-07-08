import type { Release } from '@/types/release';

export async function GET(request: Request) {
  // For example, fetch data from your DB here
  try {
    const { user, repo } = Object.fromEntries(new URL(request.url).searchParams);
    const page = (Object.fromEntries(new URL(request.url).searchParams)).page ?? 0;
    console.log(page)
    const token = process.env.GITHUB_API_KEY ?? '';
    const res = await fetch(`https://api.github.com/repos/${user}/${repo}/releases?per_page=100&page=${page}`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
      cache: 'force-cache',
      next: { revalidate: 86400 },
    });
    const releases: Release[] = await res.json();
    return new Response(JSON.stringify(releases), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    throw Error('an unexpected error occured');
  }
}
