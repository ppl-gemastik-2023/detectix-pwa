import { useOCR } from '@/context/OCRContext'
import withSession from '@/hoc/withSession'
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react'
import { AiOutlineFullscreen, AiOutlineFullscreenExit } from 'react-icons/ai'
import { Accordion } from '@mantine/core'

const ScanResultPage = () => {

    const { result, imageUrl, clearImage } = useOCR();

    const router = useRouter();

    const [fullScreen, setFullScreen] = useState<boolean>(false);

    useEffect(() => {
        !imageUrl && router.replace('/');
        // router.events.on('routeChangeComplete', () => {
        //     imageUrl && clearImage();
        // })
        // return () => {
        //     router.events.off('routeChangeComplete', () => {
        //         imageUrl && clearImage();
        //     })
        // }
    }, [router])


    return (
        <main className='h-screen'>
            {imageUrl ?
                <>
                    <section className={`transition-all duration-300 relative z-0 w-full bg-black flex flex-col items-center justify-center ${fullScreen ? "h-full bg-opacity-75" : "h-1/3 bg-opacity-0"}`}>
                        <aside className={`relative w-full ${fullScreen ? "h-1/3" : "h-full"}`}>
                            <Image src={imageUrl} alt="Scan result" fill className='object-cover' />
                        </aside>
                        <button onClick={() => setFullScreen(!fullScreen)} className='absolute p-2 text-xl bg-white bg-opacity-75 rounded-full shadow-md top-2 right-2'>
                            {fullScreen ? <AiOutlineFullscreenExit /> : <AiOutlineFullscreen />}
                        </button>
                    </section>
                    <section className={`absolute bottom-0 left-0 w-full p-3 pb-24 overflow-y-auto bg-white shadow-upper rounded-t-xl h-2/3 ${fullScreen ? "scale-y-0" : "scale-y-100"}`}>
                        <Accordion>
                            <Accordion.Item value='Scan Result'>
                                <Accordion.Control>
                                    <h1 className='text-xl font-medium'>Hasil Scan</h1>
                                </Accordion.Control>
                                <Accordion.Panel>
                                    {
                                        !result ?
                                            <p className='text-2xl text-zinc-500'>Loading...</p>
                                            :
                                            <>
                                                <p className='text-sm'>{result}</p>
                                            </>
                                    }
                                </Accordion.Panel>
                            </Accordion.Item>
                        </Accordion>

                    </section>
                </>
                :
                <></>
            }
        </main>
    )
}

export default withSession(ScanResultPage)