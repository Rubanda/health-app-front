'use client'
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
import { Loader2, Share2 } from "lucide-react"
import Image from "next/image"
import generateReport from "@/lib/fetchData"
import { dAppClient, getActiveAccount } from "./beacon"
import { TezosOperationType } from "@airgap/beacon-sdk"
import config from "@/config/wallet"
import { get } from "http"
interface LoadingState {
    [buttonId: string]: boolean;
}
const isEmail = (email: string) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);



export function CardWithForm({ token,user }: any) {

    const [email, setEmail] = React.useState<string>('')
    const [errors, setErrors] = React.useState<boolean>(false);
    const [loading, setLoading] = React.useState<LoadingState>({})
    const [report, setReport] = React.useState<string>('')
    const [wallet,setWallet] = React.useState<string>()
    const walletData = async() =>{
        const result = await getActiveAccount()
        console.log('[res]', result?.address)
        setWallet(result?.address)
    };
    React.useEffect(() => {
        walletData()
    }, [])
    // on loading 
    const handleOnChange = (e: any) => {
        e.preventDefault()
        setEmail(e.target.value)
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = regex.test(email);

        setErrors(!isValid)
    }
    async function generateReportAndOpenModal(token: string,
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>, buttonId: string): Promise<void> {
        event.preventDefault();
        setLoading((prevState) => ({ ...prevState, [buttonId]: true }));
        await new Promise<void>(async (resolve) => {
            const report = await generateReport(token);
            setReport(report);
            resolve();
        });
        setLoading((prevState) => ({ ...prevState, [buttonId]: false }));
    }
    const handleSendEmail = async (buttonId: string) => {
        setLoading((prevState) => ({ ...prevState, [buttonId]: true }));
        const report = await axios.post(`${process.env.BACKEND_URL}/api/user/email?toEmail=${email}`, {}, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        if (report.status === 200) {
            setEmail('')
        }

        setLoading((prevState) => ({ ...prevState, [buttonId]: false }));
    }
    const requestOperation = async (pdfFile: string) => {
      try {
        const activeAccount = await getActiveAccount();
        console.log('[activeAccount]', activeAccount)
        const result = await dAppClient.requestOperation({
          operationDetails: [
            {
              kind: TezosOperationType.TRANSACTION,
              amount: "1",
              destination: config.contractAddress,
              parameters: {
                entrypoint: 'set_value',
                value: {
                  string: pdfFile,
                },
              },
            },
          ],
        });
        await axios.patch(`${process.env.BACKEND_URL}/api/user/${user.id}`, { hashEdTransaction: result.transactionHash }, {
          headers: {
            Authorization: 'Bearer ' + token
          }
        })
        return result
      } catch (error) {
        return error
      }
    };
    return (
        <>  
        <div className="flex w-full flex-col items-center justify-center space-y-4">
            <Card className="max-w-3xl">
                <CardHeader>
                    <CardTitle>Generate a Report</CardTitle>
                    <CardDescription>You can download a report, attach to email && send it through crypto .</CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex items-center gap-3">
                                <div className="flex flex-grow flex-col space-y-1.5">
                                    <Label htmlFor="report">Pdf Link</Label>
                                    <Input id="report" placeholder={report ? report : 'generate report...'} defaultValue={report} />
                                </div>
                                <span className="flex flex-col self-end	">
                                    {report && <a href={report} target="_blank" download><ArrowDownTrayIcon className="h-7 w-7 " /></a>}
                                </span>
                            </div>

                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" placeholder="Name of your project" value={email} onChange={handleOnChange} defaultValue='Enter' />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex items-center">
                    <Button
                        id='generate-report'
                        type="button"
                        onClick={(event) => { generateReportAndOpenModal(token, event, 'generate-report'); }}
                        disabled={loading['generate-report'] ?? false}
                        className={`flex w-full items-center px-4 py-2 text-white rounded-lg text-base font-semibold
                        hover:bg-white hover:text-black border-2 border-solid border-transparent hover:border-black dark:text-white
                        ${loading}`}>
                        {loading['generate-report'] ?
                            (<><Loader2 className="mr-2 h-4 w-4 animate-spin" /> <span>Generating...</span></>) :
                            'Generate Report'
                        }

                    </Button>
                </CardFooter>
                <CardFooter className="justify-between" >
                    <Button
                        id='share-report'
                        disabled={isEmail(email) ? false : true}
                        onClick={() => handleSendEmail('share-report')}
                    >
                        {loading['share-report'] ?
                            (<><Loader2 className="mr-2 h-4 w-4 animate-spin" /> <span>sending...</span></>) :
                            <><Share2 className="mr-2 h-4 w-4" /><span>Email</span></>
                        }
                    </Button>
                    <Button
                        onClick={() => {
                            requestOperation(report);
                        }}
                          disabled={wallet ? false : true}
                        className="flex items-center  bg-black text-white p-1 px-2 rounded-lg text-base font-semibold
                          hover:bg-white hover:text-black border-2 border-solid border-transparent hover:border-black disabled:cursor-not-allowed disabled:opacity-75
                          "
                    >
                        <Image src={TezosLogo} alt="Tezos logo" className="flex items justify-center h-6 w-6 mr-3" /> Tezos
                    </Button>
                    {!wallet && <p className="text-red-500 text-sm">Please connect your wallet</p>}

                </CardFooter>
            </Card>
        </div>
        </>

    )
}
