import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Icons } from '@/components/icons'

export const DeviceCard = ({ devices }: any) => {
    return (
        <>
            <Card className="drop-shadow-md border-none p-4">
                <CardHeader>
                    <CardTitle>My Device</CardTitle>
                    <CardDescription>turn them on or off</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col justify-center md:flex-row gap-3 ">
                    {devices?.map((item: any, index: number) => (
                        <div key={item.name + index} className="">
                            <Card className="p-3 border border-solid border-blue-400 ">

                                <CardContent className="flex flex-col gap-3 items-center justify-center">
                                    <Icons.temperature className="w-6 h-6" />
                                    <p>{item?.type}</p>
                                    <Switch id="airplane-mode" />
                                </CardContent>
                            </Card>
                        </div>
                    )
                    )}
                </CardContent>
            </Card>
        </>
    )
}
