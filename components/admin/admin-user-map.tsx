'use client'
import React from 'react'
import MyComponent from '@/components/google-map';

export const AdminUserMap = ({ latest_location }: any) => {
    const [toggleMap, setToggleMap] = React.useState(false)

    function toggleMaps() {
        setToggleMap(!toggleMap)
    }

    return (
        <>
            <button
                className={` flex w-full items-center px-4 py-2 ${toggleMap ? 'bg-green-500' : 'bg-black'} text-white rounded-lg text-base font-semibold
                hover:bg-white hover:text-black border-2 border-solid border-transparent hover:border-black 
                `} onClick={toggleMaps}>
                Show Map
            </button>
            <div>
                {/* {toggleMap ? */}
                    <MyComponent location={latest_location} /> 
                    {/* : null */}
                {/* } */}
            </div>
        </>
    )
}
