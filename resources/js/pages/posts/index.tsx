// import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, router } from '@inertiajs/react';
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

import {
    Card,
    CardHeader,
    CardContent,
} from "@/components/ui/card"
import { PaginatedPosts } from '@/types/models/posts';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Posts',
        href: '/posts',
    },
];


export default function Index({ posts, now }
    : { posts: PaginatedPosts }) {

    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        body: ''
    })

    function submit(e: { preventDefault: () => void; }) {
        e.preventDefault()
        post('/posts', {
            onSuccess: () => {
                reset()
            }
        })
    }

    function refreshPage() {
        router.visit('/posts', {
            only: ['posts']
        })
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Posts" />
            <meta name='description' content='Posts Index' />
            <Head />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="relative min-h-[100vh] p-10 flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <form onSubmit={submit}>
                        <span className='text-2xl'>Add Some Post Here</span>
                        <div>
                            <span className='text-md'>{now}</span>
                        </div>
                        {/* <span>{data.body}</span> */}
                        <div className='my-5'>
                            <Textarea
                                className='mb-2'
                                name="body"
                                id="body"
                                value={data.body}
                                onChange={e => setData('body', e.target.value)}
                                onFocus={() => clearErrors()}
                            />
                            {errors.body && <span className='font-thin text-red-300'>{errors.body}</span>}
                        </div>
                        <div className='mb-2'>
                            <Button type='submit' disabled={processing}>POST</Button>
                        </div>
                    </form>
                    <div className='mb-5 text-center'>
                        <span className='text-sm text-blue-300 font-thin' onClick={refreshPage} style={{ cursor: 'pointer' }}>Refresh Page</span>
                    </div>
                    {posts.data!.map((post) => (
                        <Card className='mb-2'>
                            <CardHeader>
                                <span className='text-2xl'>{post.user!.name}</span>
                            </CardHeader>
                            <CardContent>
                                <span>{post.body}</span>
                            </CardContent>
                        </Card>
                    ))}


                    {/* <ul>
                        {/* {posts.map(post => (
                        <li key={post.id}>-{post.body}</li>
                    ))}
                    {posts.data.map((post) => (
                        <li key={post.id}>
                            {post.user!.name} - {post.body}
                        </li>
                    ))}
                </ul> */}
                </div>

            </div>
        </AppLayout>
    );
}
