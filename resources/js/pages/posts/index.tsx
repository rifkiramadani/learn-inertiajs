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
import { usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Posts',
        href: '/posts',
    },
];

type now = {
    now: Date
}

type greeting = {
    greeting: string
}

type PageProps = {
    can: {
        create_post: boolean
    }
}


export default function Index({ posts, now, greeting }
    : { posts: PaginatedPosts, now: now, greeting: greeting }) {

    const { data, setData, post, processing, errors, reset, clearErrors } = useForm("previousData", {
        body: ''
    })

    const page = usePage<PageProps>();

    function submit(e: { preventDefault: () => void; }) {
        e.preventDefault()
        post(route('posts.store'), {
            onSuccess: () => {
                reset();
                // toast.success('Data has been successfully added!')
            }
        })
    }

    function refreshPage() {
        router.visit(route('posts.index'), {
            only: ['posts'],
            preserveScroll: true,
            preserveState: true
        })
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Posts" />
            <meta name='description' content='Posts Index' />
            <Head />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="relative min-h-[100vh] p-10 flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    {page.props.can.create_post && (
                        <form onSubmit={submit}>
                            <span className='text-3xl'>{greeting.greeting}</span>
                        <div className='grid mt-3'>
                            <span className='text-2xl'>Add Some Post Here</span>
                            <span className='text-md'>{now.toString()}</span>
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
                    )}
                    <div className='mb-5 text-center'>
                        <span
                            className='text-sm text-blue-300 font-thin'
                            onClick={refreshPage}
                            style={{ cursor: 'pointer' }}
                        >Refresh Page
                        </span>
                        {/* <Link
                            href={'/posts'}
                            only={['posts']}
                            preserveScroll={true}
                            className='text-sm text-blue-300 font-thin'
                            style={{ cursor: 'pointer' }}>Refresh Page
                        </Link> */}
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
