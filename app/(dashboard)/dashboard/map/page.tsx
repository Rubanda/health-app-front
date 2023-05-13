
async function getData(token: string) {
  const user = await fetch(`${process.env.BACKEND_URL}/api/user/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token,
    },
     next: { revalidate: 10 } 
  })
  const res= await user.json() 
  return res
}

export default async function Home() {
  return (
    <main className="mx-auto max-w-7xl px-4 mt-5 sm:px-6 lg:px-8">

     map
      
    </main>
  )
}
