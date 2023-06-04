import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { UserAvatar } from '@/components/user-avatar'


export default function UserCard({user}:any) {
    const dateOfBirth = new Date(user.date_of_birth).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })
    
    return (
        <>

            <Card className=" drop-shadow-md border-none p-4">
                {/* <CardHeader>
                    <CardDescription><UserAvatar className="" user={{ image: user?.avatar }} /></CardDescription>
                </CardHeader> */}
                <CardContent className="gap-4">
                    <div>
                        <div className="mb-4 ">
                            {/* <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" /> */}
                            <div className="space-y-1">
                                <p className="text-lg font-bold leading-none">
                                    {user.name}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    Email: {user.email}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    date of birth: {dateOfBirth}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    Gender: {user.gender}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    Height: {user.height} cm
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    Weight: {user.weight} kg
                                </p>

                            </div>
                        </div>
                        <Card className="p-4">
                            <CardHeader>
                                <CardTitle>Emergency Contact</CardTitle>
                            </CardHeader>
                            <CardContent className="">
                                <p className="flex">{user?.phone}</p>
                                <p className="flex">{user?.address}</p>
                            </CardContent>
                        </Card>

                    </div>
                </CardContent>

            </Card>
        </>
    )
}
