'use client'
import * as React from "react"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import axios from "axios"
import { useRouter } from "next/navigation"
import Link from "next/link"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
    patientName: z.string().min(2).max(50),
})

type Props = {
    patient: string[]
}
export function CpanelUser({ patient }: Props) {
    // remove duplicates in patient array
    const uniquePatient = [...new Set(patient)]
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            patientName: "",
        },
    })
    const router = useRouter()
    const [patientName, setPatientName] = React.useState<string>("")
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        console.log('[e.target.value]', e.target.value)
        setPatientName(e.target.value)
    }
    // console.log('[patient]', patientName)
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        router.push(`/admin/${values.patientName}`)
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="patientName"
                    render={({ field }) => (
                        <FormItem>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a verified email to display" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {
                                        uniquePatient.map((patient, index) => (
                                            <SelectItem key={index} value={patient}>{patient}</SelectItem>
                                        ))

                                    }
                                </SelectContent>
                            </Select>
                            <FormDescription>
                                Select Patient Name.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}
