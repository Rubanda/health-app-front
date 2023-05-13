import * as React from "react"
import TezosLogo from "@/public/SVG/TezosLogo_Icon_Blue.svg"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from "axios"
import { ArrowDownTrayIcon, ArrowSmallRightIcon } from "@heroicons/react/24/outline"
import { ShareIcon } from "lucide-react"
import Image from "next/image"

const isEmail = (email: string) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);



export function CardWithForm({ token, report }: any) {

    const [email, setEmail] = React.useState<string>('')
    const [errors, setErrors] = React.useState<boolean>(false);

    const [loading, setLoading] = React.useState(false)
    const [fetchedReport, setFetchedReport] = React.useState<{ pdf: string }>({ pdf: '' })
    const handleOnChange = (e: any) => {
        e.preventDefault()
        setEmail(e.target.value)
        // console.log("email", email)
        // check if the email is valid
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = regex.test(email);

        setErrors(!isValid)
    }
    async function generateReportAndOpenModal(token: string,
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ): Promise<void> {
        await new Promise<void>(async (resolve) => {
            //    const report =   GenerateReport(token);
            //    console.log('report', {report})
            // setFetchedReport(report);
            resolve();
        });
    }
    const handleSendEmail = async () => {
        const report = await axios.post(`${process.env.BACKEND_URL}/api/user/email?toEmail=${email}`, {}, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        if (report.status === 200) {
            setEmail('')
        }
    }
    // const requestOperation = async (pdfFile: string) => {
    //   try {
    //     const activeAccount = await getActiveAccount();
    //     console.log('[activeAccount]', activeAccount)
    //     const result = await dAppClient.requestOperation({
    //       operationDetails: [
    //         {
    //           kind: TezosOperationType.TRANSACTION,
    //           amount: "1",
    //           destination: config.contractAddress,
    //           parameters: {
    //             entrypoint: 'set_value',
    //             value: {
    //               string: pdfFile,
    //             },
    //           },
    //         },
    //       ],
    //     });
    //     await axios.patch(`${process.env.BACKEND_URL}/api/user/${chartData.id}`, { hashEdTransaction: result.transactionHash }, {
    //       headers: {
    //         Authorization: 'Bearer ' + token
    //       }
    //     })
    //     return result
    //   } catch (error) {
    //     return error
    //   }
    // };
    return (
        <>  <div className="flex w-full flex-col items-center justify-center space-y-4">
            <Card className="max-w-3xl">
                <CardHeader>
                    <CardTitle>Generate a Report</CardTitle>
                    <CardDescription>You can download a report, attach to email && send it through crypto .</CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid w-full items-center gap-4">
                            <div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="name">Pdf Link</Label>
                                    <Input id="report" placeholder={report?.pdf ? report?.pdf : 'generate report...'} defaultValue='Report' />
                                </div>
                                {report && <a href={report.pdf} target="_blank" download><ArrowDownTrayIcon className="h-7 w-7 " /></a>}
                            </div>

                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" placeholder="Name of your project" />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex items-center">
                    <Button
                        type="button"
                        onClick={(event) => { generateReportAndOpenModal(token, event); }}
                        disabled={loading}
                        className={`flex w-full items-center px-4 py-2 ${loading ? 'bg-green-500' : 'bg-black'} text-white rounded-lg text-base font-semibold
                        hover:bg-white hover:text-black border-2 border-solid border-transparent hover:border-black 
                        ${loading}`}>
                        {loading ? 'loading...' : 'Generate Report'} <ArrowSmallRightIcon className="ml-2 h-4 w-4" />
                    </Button>
                </CardFooter>
                <CardFooter className="justify-between" >
                        <Button
                            disabled={isEmail(email) ? false : true}
                            onClick={handleSendEmail}
                            className="flex items-center  bg-black text-white p-1 px-2 rounded-lg text-base font-semibold
                          hover:bg-white hover:text-black border-2 border-solid border-transparent hover:border-black disabled:cursor-not-allowed disabled:opacity-75
                          "
                        >
                            <ShareIcon className="h-6 w-6 mr-3" /> Share
                        </Button>
                        <Button
                            onClick={() => {
                                // requestOperation(report?.pdf);
                            }}
                            //   disabled={wallet ? false : true}
                            className="flex items-center  bg-black text-white p-1 px-2 rounded-lg text-base font-semibold
                          hover:bg-white hover:text-black border-2 border-solid border-transparent hover:border-black disabled:cursor-not-allowed disabled:opacity-75
                          "
                        >
                            <Image src={TezosLogo} alt="Tezos logo" className="flex items justify-center h-6 w-6 mr-3" /> Tezos
                        </Button>
                        {/* {!wallet && <p className="text-red-500 text-sm">Please connect your wallet</p>} */}
                  
                </CardFooter>
            </Card>
        </div>
        </>

    )
}
