// import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Posts',
        href: '/posts',
    },
];

type User = {
    id: number;
    name: string;
};

type Post = {
    id: number;
    body: string;
    created_at?: string; // optional kalau nggak selalu ada
    user?: User;         // optional kalau nggak selalu ada
};

type PaginatedPosts = {
    data: Post[];
    links?: Record<string, unknown>; // opsional, kalau pagination
    meta?: Record<string, unknown>;  // opsional
};

export default function Dashboard({ posts }
    : { posts: PaginatedPosts }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Posts" />
            <meta name='description' content='Posts Index' />
            <Head />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                {/* <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                </div>
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div> */}
                <ul>
                    {/* {posts.map(post => (
                        <li key={post.id}>-{post.body}</li>
                    ))} */}
                    {posts.data.map((post) => (
                        <li key={post.id}>
                            {post.user!.name} - {post.body}
                        </li>
                    ))}
                </ul>
            </div>
        </AppLayout>
    );
}
