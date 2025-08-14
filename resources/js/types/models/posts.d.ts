export type Post = {
    id: number;
    body: string;
    created_at?: string; // optional kalau nggak selalu ada
    user?: User;         // optional kalau nggak selalu ada
};

export type PaginatedPosts = {
    data: Post[];
    links?: Record<string, unknown>; // opsional, kalau pagination
    meta?: Record<string, unknown>;  // opsional
};
