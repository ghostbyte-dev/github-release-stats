export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const user = searchParams.get('user');
    const repo = searchParams.get('repo');

    if (!user || !repo) {
      return Response.json({ message: 'Missing required parameters: user, repo' }, { status: 400 });
    }

    const token = process.env.GITHUB_API_KEY;
    const headers: Record<string, string> = {};

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const res = await fetch(`https://api.github.com/repos/${user}/${repo}`, {
      headers,
      cache: 'no-store',
    });

    console.log(`rate limits remaining: ${res.headers.get('x-ratelimit-remaining')}`);

    const repository = await res.json();

    return Response.json(repository, { status: res.status });
  } catch (error) {
    console.error('API Route Error:', error);
    return Response.json({ message: 'An unexpected error occurred' }, { status: 500 });
  }
}
