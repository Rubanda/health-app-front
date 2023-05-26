import { Card } from "@/components/ui/card"
import { redirect } from "next/navigation"
import Image from "next/image"
import { Icons } from "@/components/icons"
import TezosLogo from "@/public/SVG/TezosLogo_Icon_Blue.svg"
import { InfiniteLooper } from "@/components/image-slider"

export default async function Home() {
    const suppliers = [
        { url: "/mapP.jpeg", name: "map" },
        { url: "/phoneH.jpeg", name: "home phone" },
        { url: "/inputP.jpeg", name: "manual input." },
        { url: "/inputP.jpeg", name: "manual input." },
        { url: "/home.png", name: "manual input." },
        { url: "/map.png", name: "manual input." },
        { url: "/report.png", name: "manual input." },

    ]

    return (
        <>
            <div className='mx-auto max-w-7xl px-8'>

                <div className='flex flex-col items-center justify-center mt-12 '>
                    <h1 className='text-slate-900 font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-center dark:text-white'>
                        Transform Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">Health</span>  with our Innovative Health App
                    </h1>
                    <p className='mt-6 mb-6 text-lg text-slate-600 text-center max-w-3xl mx-auto dark:text-slate-400'>
                        Our health app, built with <span className="hover:underline text-[#1289FD]">Flutter</span> and powered by {' '} <span className="hover:underline text-[#036E02]">Node.js</span>{' '}
                        and {' '}<span className="hover:underline text-black dark:text-primary"> Next.js</span> {' '}
                        tracks your heart rate and location to generate comprehensive health reports.
                        With a simple and intuitive interface, you can easily view and
                        analyze your health data to make informed decisions about your lifestyle and wellness.
                    </p>
                    <button
                        className="flex items-center 
                            bg-black text-white p-1 px-2 rounded-lg text-base font-semibold
                            hover:bg-white hover:text-black border-2 border-solid border-transparent
                            hover:border-black"
                    >
                        <a className="" href="https://drive.google.com/file/d/1T8hRotBu3PuVjksZ8wc3GCpjZfFi1GT5/view?usp=share_link" target="_blank">Download App APK</a>
                    </button>
                    <p className="text-gray-500 ">Go to dashboard
                        <a href="/dashboard" className="inline-flex ml-1 items-center font-medium text-blue-600 hover:underline">
                            see you are data

                        </a>
                    </p>
                </div>

                <div className="flex flex-col mt-40">
                    <h2 className="mb-4 text-2xl font-bold">Feature</h2>

                    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        <div className="flex items-start rounded-xl bg-white p-4 shadow-lg bg-opacity-60 bg-clip-padding backdrop-blur-sm dark:bg-gray-800">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-blue-100 bg-blue-50">
                                <Image src={TezosLogo} alt="Tezos logo" className="flex items justify-center h-6 w-6 mr-3" />
                            </div>

                            <div className="ml-4">
                                <h2 className="font-semibold">Tezos coin</h2>
                                <p className="mt-2 text-sm text-gray-500">We use tezos coin for our transaction for health report</p>
                            </div>
                        </div>

                        <div className="flex items-start rounded-xl bg-white p-4 shadow-lg  bg-opacity-60 bg-clip-padding backdrop-blur-sm dark:bg-gray-800">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-orange-100 bg-orange-50">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>

                            <div className="ml-4">
                                <h2 className="font-semibold">Filecoin</h2>
                                <p className="mt-2 text-sm text-gray-500">We have integrated with W3.storage which uses filecoin to save our report</p>
                            </div>
                        </div>
                        <div className="flex items-start rounded-xl bg-white p-4 shadow-lg  bg-opacity-60 bg-clip-padding backdrop-blur-sm dark:bg-gray-800">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-red-100 bg-red-50">
                                <Icons.email className="text-violet-500" />
                            </div>

                            <div className="ml-4">
                                <h2 className="font-semibold">Email</h2>
                                <p className="mt-2 text-sm text-gray-500">We are able to share our health document using Email</p>
                            </div>
                        </div>
                        <div className="flex items-start rounded-xl bg-white p-4 shadow-lg  bg-opacity-60 bg-clip-padding backdrop-blur-sm dark:bg-gray-800">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-indigo-100 bg-indigo-50">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"></polygon><line x1="9" x2="9" y1="3" y2="18"></line><line x1="15" x2="15" y1="6" y2="21"></line></svg>
                            </div>

                            <div className="ml-4">
                                <h2 className="font-semibold">Google Map</h2>
                                <p className="mt-2 text-sm text-gray-500">We have Integrated with Google Map for live location</p>
                            </div>
                        </div>
                    </div>

                </div>

                <div className='flex flex-col items-center  justify-center mt-40 mb-40'>
                    <h1 className='text-slate-900 text-4xl tracking-tight font-extrabold sm:text-5xl dark:text-white'>
                        International Research Center for AI and IoT
                    </h1>
                    <p className="mt-6 max-w-3xl mx-auto text-lg">
                        The Department of <span className="text-sky-500 font-semibold dark:text-sky-400">Artificial Intelligence</span> at Near East University has developed a
                        this health app. as final project of semester of spring of 2023.
                    </p>

                </div>

                <section className="py-12 bg-gray-200 rounded-3xl dark:bg-gray-900">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-4">What Users Are Saying</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
                                <div className="mb-4">

                                    <p className="text-lg text-gray-700 dark:text-gray-300">
                                        Students, join us in testing our cutting-edge health app developed by the Department of AI at Near East University. Monitor your health,
                                        receive personalized reports, and take control of your well-being. Give it a try today!</p>
                                </div>
                                <p className="text-gray-600 dark:text-gray-400 font-medium">- AI and IoT</p>
                            </div>
                            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
                                <div className="mb-4">

                                    <p className="text-lg text-gray-700 dark:text-gray-300">
                                        Students, discover the incredible health app created by the Department of AI. Its like having a personal health wizard in your pocket.
                                        Track activities, monitor vital signs, and unleash your inner health superhero. Try it now!
                                    </p>
                                </div>
                                <p className="text-gray-600 dark:text-gray-400 font-medium">- Mercel</p>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="mt-20">
                    <h1 className='text-slate-900 text-2xltracking-tight font-extrabold sm:text-2xl dark:text-white'>
                        Show Case
                    </h1>
                    <p className="mt-6 max-w-3xl mx-auto text-lg mb-20">
                        Here are some screenshot of  <span className="text-sky-500 font-semibold dark:text-sky-400">health app</span> download the app and try it yourself.
                    </p>
                    <InfiniteLooper speed='40' direction='left'>
                        {suppliers.map((item) => {
                            return (
                                <Image
                                    width={180}
                                    height={70}
                                    src={item.url}
                                    alt={item.name}
                                    key={Math.random()}
                                    style={{ paddingLeft: "1rem" }}
                                />
                            )
                        })}
                    </InfiniteLooper>


                </div>


            </div >

        </>
    )
}


