import AuthSimpleLayout from "@/layouts/auth/auth-simple-layout"
import { Card } from "@/components/ui/card"
import { Link } from "@inertiajs/react"

const Error = () => {
    return (
        <>
            <AuthSimpleLayout>
                <Card className="bg-gray-800">
                    <span className="text-center text-red-300 font-thin">An error ocurred</span>
                    <Link href={'/posts'} className="text-blue-300 underline text-center">Back</Link>
                </Card>
            </AuthSimpleLayout>
        </>
    )
}

export default Error
