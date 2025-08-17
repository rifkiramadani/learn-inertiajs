import { usePage } from '@inertiajs/react';
import toast, { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';

const Toastify = () => {

    type PageProps = {
        message: {
            type: string;
            body: string;
        };
    }

    const page = usePage<PageProps>();

    useEffect(() => {
        if (page.props.message) {
            toast.success(page.props.message.body, {
                position: "top-center"
            })
        }
    }, [page.props.message]);

    return (
        <>
            <Toaster position="top-center"
                reverseOrder={false} />
        </>
    )
}

export default Toastify
