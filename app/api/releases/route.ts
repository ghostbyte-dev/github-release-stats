import type { Release } from '@/types/release';

export async function GET(request: Request) {
  // For example, fetch data from your DB here
  try {
    const { user, repo } = Object.fromEntries(new URL(request.url).searchParams);
    console.log(user);
    console.log(repo);
    const token = process.env.GITHUB_API_KEY ?? '';
    console.log(token);
    const res = await fetch(`https://api.github.com/repos/${user}/${repo}/releases?per_page=100`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
    const releases: Release[] = await res.json();
    return new Response(JSON.stringify(releases), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e) {
    console.log(e);
    throw Error('an unexpected error occured');
  }
}
