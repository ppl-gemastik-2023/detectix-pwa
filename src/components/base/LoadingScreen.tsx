import Image from 'next/image'
import React from 'react'

const LoadingScreen = () => {
    return (
        <main className='z-50 flex flex-col items-center justify-center w-full h-screen gap-3 bg-slate-50'>
            <Image src="/icon.png" alt='Logo' width={128} height={128} />
            <p className='text-lg font-semibold text-center'>
                Sedang memuat...
            </p>
        </main>
    )
}

export default LoadingScreen