import { Card } from "@/components/ui/card"
import { redirect } from "next/navigation"
import Image from "next/image"
import { Icons } from "@/components/icons"
import TezosLogo from "@/public/SVG/TezosLogo_Icon_Blue.svg"

export default async function Home() {

    return (
        <>
            <div className='container px-8'>
                <section className='w-full flex flex-col md:flex-row mt-12'>
                    <div className="">
                        <h1 className='font-bold text-3xl my-3'>
                            Transform Your Health with our Innovative Health App
                        </h1>
                        <p className='text-base'>
                            Our health app, built with Flutter and powered by Node.js and Next.js,
                            tracks your heart rate and location to generate comprehensive health reports.
                            With a simple and intuitive interface, you can easily view and
                            analyze your health data to make informed decisions about your lifestyle and wellness.
                        </p>
                    </div>
                    <div className="">
                        <Image src='/home.png' width={500} height={500} alt='home' />

                    </div>
                </section>

                <div className="flex flex-col mt-40">
                    <h2 className="mb-4 text-2xl font-bold">Feature</h2>

                    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        <div className="flex items-start rounded-xl bg-white p-4 shadow-lg">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-blue-100 bg-blue-50">
                                <Image src={TezosLogo} alt="Tezos logo" className="flex items justify-center h-6 w-6 mr-3" />
                            </div>

                            <div className="ml-4">
                                <h2 className="font-semibold">Tezos coin</h2>
                                <p className="mt-2 text-sm text-gray-500">We use tezos coin for our transaction for health report</p>
                            </div>
                        </div>

                        <div className="flex items-start rounded-xl bg-white p-4 shadow-lg">
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
                        <div className="flex items-start rounded-xl bg-white p-4 shadow-lg">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-red-100 bg-red-50">
                                <Icons.email className="" />
                            </div>

                            <div className="ml-4">
                                <h2 className="font-semibold">Email</h2>
                                <p className="mt-2 text-sm text-gray-500">We are able to share our health document using Email</p>
                            </div>
                        </div>
                        <div className="flex items-start rounded-xl bg-white p-4 shadow-lg">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-indigo-100 bg-indigo-50">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-map"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"></polygon><line x1="9" x2="9" y1="3" y2="18"></line><line x1="15" x2="15" y1="6" y2="21"></line></svg>
                            </div>

                            <div className="ml-4">
                                <h2 className="font-semibold">Google Map</h2>
                                <p className="mt-2 text-sm text-gray-500">We have Integrated with Google Map for live location</p>
                            </div>
                        </div>
                    </div>

                </div>

                <section className='flex flex-col md:flex-row mt-12'>
                    <div>
                        <h1 className='font-bold text-3xl my-3'>
                            Google map Integration
                        </h1>
                        <p className='text-base'>
                            We have other features like maps, to see your location and where you have been.
                        </p>
                    </div>
                    <Image src='/map.png' width={500} height={500} alt='home' />
                </section>
                <div className="w-3/4 mt-5">
                    <div className="flex-col gap-7">
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
                    </div>

                </div>


                <p className="text-gray-500 ">Go to dashboard
                    <a href="/dashboard" className="inline-flex ml-1 items-center font-medium text-blue-600 hover:underline">
                        see you are data

                    </a>
                </p>


            </div >

        </>
    )
}


