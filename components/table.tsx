import {
    Card,
    Table,
    TableHead,
    TableRow,
    TableHeaderCell,
    TableBody,
    TableCell,
    Text,
    Title,
    Badge,
} from "@tremor/react";

const data = [
    {
        name: "Viola Amherd",
        Role: "Federal Councillor",
        departement:
            "The Federal Department of Defence, Civil Protection and Sport (DDPS)",
        status: "active",
    },
    {
        name: "Simonetta Sommaruga",
        Role: "Federal Councillor",
        departement:
            "The Federal Department of the Environment, Transport, Energy and Communications (DETEC)",
        status: "active",
    },
    {
        name: "Alain Berset",
        Role: "Federal Councillor",
        departement: "The Federal Department of Home Affairs (FDHA)",
        status: "active",
    },
    {
        name: "Ignazio Cassis",
        Role: "Federal Councillor",
        departement: "The Federal Department of Foreign Affairs (FDFA)",
        status: "active",
    },
    {
        name: "Ueli Maurer",
        Role: "Federal Councillor",
        departement: "The Federal Department of Finance (FDF)",
        status: "active",
    },
    {
        name: "Guy Parmelin",
        Role: "Federal Councillor",
        departement:
            "The Federal Department of Economic Affairs, Education and Research (EAER)",
        status: "active",
    },
    {
        name: "Karin Keller-Sutter",
        Role: "Federal Councillor",
        departement: "The Federal Department of Justice and Police (FDJP)",
        status: "active",
    },
];
function transformDate(date: string) {
    const dateObj = new Date(date);
    const day = dateObj.getDate();
    const month = dateObj.toLocaleString('default', { month: 'long' });
    const year = dateObj.getFullYear();

    const formattedDate = `${day} ${month} ${year}`;
    return formattedDate;
}
export default function TableComponent({ data }: { data: any }) {

    return (
        <>
            <Title>List of {data?.length > 0 ? data[0]?.type : "No Data"} Measurement</Title>
            <Table className="mt-5">
                <TableHead>
                    <TableRow>
                        <TableHeaderCell>Name</TableHeaderCell>
                        <TableHeaderCell>Measure</TableHeaderCell>
                        <TableHeaderCell>Time</TableHeaderCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data?.map((item: any, index: number) => (
                        <TableRow key={item?.type + index}>
                            <TableCell>{item?.type}</TableCell>
                            <TableCell>
                                <Text>{item?.rate}</Text>
                            </TableCell>
                            <TableCell>
                                <Text>{transformDate(item?.createdAt)}</Text>
                            </TableCell>
                            {/* <TableCell>
                                <Badge color="emerald" icon={StatusOnlineIcon}>
                                    {item.status}
                                </Badge>
                            </TableCell> */}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    )
}