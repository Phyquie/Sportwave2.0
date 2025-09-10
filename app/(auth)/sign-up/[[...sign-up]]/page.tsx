import { SignUp } from '@clerk/nextjs'

export default function Page() {
    return (<div className='flex flex-col justify-center items-center min-h-screen text-white relative'>
        <SignUp />

    </div>)
}