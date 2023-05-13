
export default async function generateReport(token:string): Promise<string> {
  let tenv = process.env.BACKEND_URL
console.log('tenv',tenv)
const response = await fetch(
  `http://localhost:4000/api/user/pdf`,
  {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
    },
  }
);
if (!response.ok) {
  throw new Error(response.statusText);
}
const profile = await response.json() as { pdf: string };
const report = profile.pdf
return report
}