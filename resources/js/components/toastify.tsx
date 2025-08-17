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

    // GAGAL
    // type PageProps = {
    //     message: {
    //         success: string
    //     }
    // }

    const page = usePage<PageProps>();

    // GAGAL
    // useEffect(() => {
    //     if (page.props.message) {
    //         toast.success(page.props.message.success, {
    //             position: "top-center"
    //         })
    //     }
    // }, [page.props.message]);


    useEffect(() => {
        if (page.props.message.body) {
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
