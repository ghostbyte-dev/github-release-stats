export type Release = {
	url: string;
	tag_name: string;
	name: "string";
	draft: boolean;
	prerelease: boolean;
	created_at: Date;
	published_at: Date;
	assets: Asset[];
	body: string;
};

export type Asset = {
	url: string;
	id: number;
	name: string;
	content_type: string;
	state: string;
	size: number;
	digest: string;
	download_count: number;
	created_at: Date;
	updated_at: Date;
	browser_download_url: string;
};

export type User = {
	login: string;
	id: number;
	node_id: string;
	avatar_url: string;
	gravatar_id: string;
	url: string;
	html_url: string;
	followers_url: string;
	following_url: string;
	type: string;
	user_view_type: string;
	site_admin: boolean;
};
