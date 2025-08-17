import AuthSimpleLayout from "@/layouts/auth/auth-simple-layout"
import { Card } from "@/components/ui/card"
import { Head, Link } from "@inertiajs/react"
import { useMemo } from "react"

type StatusProps = 403 | 404;

const Error = ({ status }: { status: StatusProps }) => {


    const title = useMemo(() => {
        return (
            {
                403: "403 : Forbidden",
                404: "404 : Page Not Found"
            }[status]
        );
    }, [status]);

    const description = useMemo(() => {
        return (
            {
                403: "You are not allowed to perform this action",
                404: "The page you are looking for is not found"
            }[status]
        )
    }, [status])


    return (
        <>
            <AuthSimpleLayout>
                <Head title={title} />
                <Card className="bg-gray-800">
                    <span className="text-center text-2xl">{title}</span>
                    <span className="text-center text-red-300 font-thin">{description}</span>
                    <Link href={'/posts'} className="text-blue-300 underline text-center">Back</Link>
                </Card>
            </AuthSimpleLayout>
        </>
    )
}

export default Error
