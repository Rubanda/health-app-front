import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
const image = 'https://images.unsplash.com/photo-1655635643532-fa9ba2648cbe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80'
export default function SignUp() {
    return (
        <div className="flex h-screen w-full items-center justify-center bg-gray-900 bg-cover bg-no-repeat" style={{
            backgroundImage:
                `url(${image})`
        }}>
            <div className="rounded-xl bg-gray-800 bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8">
                <div className="text-white">
                    <div className="mb-8 flex flex-col items-center">
                        <Image src="/iot-logo.svg" width="150" height="150" alt=" iot logo " />
                        <h1 className="mb-2 text-2xl">Instagram</h1>
                        <span className="text-gray-300">Enter Login Details</span>
                    </div>
                    <form action="#">
                        <div className="mb-4 text-lg">
                            <input className="rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md" type="text" name="name" placeholder="john doe" />
                        </div>
                        <div className="mb-4 text-lg">
                            <input className="rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md" type="text" name="username" placeholder="jdoe" />
                        </div>
                        <div className="mb-4 text-lg">
                            <input className="rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md" type="text" name="email" placeholder="jdoe@email.com" />
                        </div>

                        <div className="mb-4 text-lg">
                            <input className="rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md" type="Password" name="name" placeholder="*********" />
                        </div>
                        <div className="mt-8 flex justify-center text-lg text-black">
                            <button type="submit" className="rounded-3xl bg-yellow-400 bg-opacity-50 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-yellow-600">Login</button>
                        </div>
                    </form>
                    <Link className="text-center text-gray-300 mt-4" href="/login">Don&apos;t have an account? <span className='text-blue-900 hover:underline'>login</span></Link>
                </div>
            </div>
        </div >
    )
}
