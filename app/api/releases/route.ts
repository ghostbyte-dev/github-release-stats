export async function GET(request: Request) {
	// For example, fetch data from your DB here
	const body = await request.json();
	const { user, repo } = body;
	console.log(user);
	console.log(repo);

	const res = await fetch(
		"https://api.github.com/repos/ghostbyte-dev/pixelix/releases",
	);
	const releases = await res.json();
	return new Response(JSON.stringify(releases), {
		status: 200,
		headers: { "Content-Type": "application/json" },
	});
}
