export async function GET(request: Request) {
	// For example, fetch data from your DB here
	const { user, repo } = Object.fromEntries(new URL(request.url).searchParams);
	console.log(user);
	console.log(repo);

	const res = await fetch(
		`https://api.github.com/repos/${user}/${repo}/releases`,
	);
	const releases = await res.json();
	console.log(releases);
	return new Response(JSON.stringify(releases), {
		status: 200,
		headers: { "Content-Type": "application/json" },
	});
}
