import { getCurrentUser } from "@/lib/session"
import { Flex } from "@tremor/react"
import { redirect } from "next/navigation"
import Image from "next/image"

export default async function Home() {
    const user: any = await getCurrentUser()

    return (
        <>
            <div className='main'>
                <div className='gradient' />
            </div>

            <main className='app'>
                <section className='w-full flex-center flex-col'>
                    <h1 className='head_text text-center'>
                        Transform Your Health with our Innovative Health App
                        <br className='max-md:hidden' />
                        <span className='orange_gradient text-center'> </span>
                    </h1>
                    <p className='desc text-center'>
                        Our health app, built with Flutter and powered by Node.js and Next.js,
                        tracks your heart rate and location to generate comprehensive health reports.
                        With a simple and intuitive interface, you can easily view and
                        analyze your health data to make informed decisions about your lifestyle and wellness.
                    </p>

                    {/* <Feed /> */}
                </section>
                <div className="w-3/4 mt-4">
                    <Flex className="flex-col gap-7">
                        <input
                            type='text'
                            placeholder='Search for a tag or a username'
                            value='https://drive.google.com/file/d/1T8hRotBu3PuVjksZ8wc3GCpjZfFi1GT5/view?usp=share_link'
                            disabled={true}
                            className='search_input peer'
                        />
                        <button
                            // onClick={() => navigator.clipboard.writeText('https://drive.google.com/file/d/1T8hRotBu3PuVjksZ8wc3GCpjZfFi1GT5/view?usp=share_link')}
                            className="flex items-center  bg-black text-white p-1 px-2 rounded-lg text-base font-semibold
                          hover:bg-white hover:text-black border-2 border-solid border-transparent hover:border-black 
                          "
                        >
                            {/* <Image src={TezosLogo} alt="Tezos logo" className="flex items justify-center h-6 w-6 mr-3" />  */}
                            <a className="" href="https://drive.google.com/file/d/1T8hRotBu3PuVjksZ8wc3GCpjZfFi1GT5/view?usp=share_link" target="_blank">Download App APK</a>
                        </button>
                    </Flex>

                </div>


                <p className="text-gray-500 ">Go to dashboard
                    <a href="/dashboard" className="inline-flex ml-1 items-center font-medium text-blue-600 hover:underline">
                        see you are data
                       
                    </a>
                </p>


            </main>

        </>
    )
}


