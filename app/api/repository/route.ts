export async function GET(request: Request) {
  try {
    const { user, repo } = Object.fromEntries(new URL(request.url).searchParams);

    const token = process.env.GITHUB_API_KEY ?? '';
    const res = await fetch(`https://api.github.com/repos/${user}/${repo}`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
      cache: 'force-cache',
      next: { revalidate: 86400 },
    });
    const repository = await res.json();
    console.log(`rate limits remaining: ${res.headers.get('x-ratelimit-remaining')}`);
    if (res.status !== 200) {
      return new Response(JSON.stringify(repository), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    return new Response(JSON.stringify(repository), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    throw Error('an unexpected error occured');
  }
}
