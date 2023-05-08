
export async function POST(request: Request) {
    const { username, password } = await request.json();
    const prompt  = {username:'momo', password:'123456'}
        const response = await fetch(
          "http://localhost:4000/api/auth/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...prompt }),
          }
        );
      
        const user = await response.json();
      
        return new Response(JSON.stringify(user), {
          status: 200,
        });
      
      
}
