import {
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TableHead,
    TablePagination,
    TableRow,
    Typography
} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import type { globalState } from '../../../types/redux/redux-type';
import TablePaginationActions from '../../Table Pagination/TablePagination';

const TableRowCustom = ({ name, date }: { name: string; date: Date }) => {
    const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return (
        <>
            <TableRow
                sx={{
                    '& > *': { borderBottom: 'unset' },
                    borderBottom: '1px solid #e5e5e5'
                }}
            >
                <TableCell>
                    <Typography sx={{ fontSize: '18px', fontWeight: 500 }}>{name}</Typography>
                </TableCell>
                <TableCell>
                    <Typography sx={{ fontSize: '18px', fontWeight: 500 }}>
                        {date.toLocaleTimeString('it-IT')}, {`${weekday[date.getDay()]}, `}
                        {date.toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                        })}
                    </Typography>
                </TableCell>
            </TableRow>
        </>
    );
};

const ListAttendance = () => {
    const userInfo = useSelector((state: globalState) => state.userInfo);
    const [attendance, setAttendance] = useState<any>([]);
    const [page, setPage] = useState(0);
    const [rowsPage, setrowsPage] = useState(5);

    const judulBar: { name: string; width: number | string; align: 'center' | 'left' }[] = [
        { name: 'Course', width: '30%', align: 'left' },
        { name: 'Date', width: '20%', align: 'left' }
    ];

    const handleChangePage = (e: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPage = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setrowsPage(parseInt(e.target.value, 10));
        setPage(0);
    };

    const getAttendance = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/attendance/${userInfo.id}-0`);
            if (response) setAttendance(response.data);
        } catch (e) {
            console.log(e);
        }
    };
    console.log(attendance);
    useEffect(() => {
        if (userInfo.id) getAttendance();
    }, [userInfo.id]);

    return (
        <>
            <Grid container direction='column' sx={{ mt: 2 }}>
                <Grid item>
                    <Typography sx={{ fontSize: '32px', fontWeight: 'bold' }}>Your Attendance</Typography>
                </Grid>
                <Grid item sx={{ mt: 1.5 }}>
                    <TableContainer
                        sx={{
                            backgroundColor: 'white',
                            borderRadius: '0px 0px 2px 2px',
                            pb: 0
                        }}
                    >
                        <Table
                            sx={{
                                '& .MuiTableCell-root': {
                                    borderBottom: 0
                                },
                                tableLayout: 'fixed',
                                overflowX: 'auto'
                            }}
                        >
                            <TableHead>
                                <TableRow
                                    sx={{
                                        borderBottom: '1px solid #e5e5e5',
                                        backgroundColor: 'rgba(0, 0, 0, 0.1)',
                                        borderTop: 0
                                    }}
                                >
                                    {judulBar.map(
                                        (
                                            page: {
                                                name: string;
                                                width: number | string;
                                                align: 'center' | 'left';
                                            },
                                            index: number
                                        ) => {
                                            return (
                                                <React.Fragment key={index}>
                                                    <TableCell align={page.align} sx={{ width: page.width }}>
                                                        <Typography
                                                            sx={{
                                                                fontSize: '16px',
                                                                fontWeight: 'bold',
                                                                color: 'rgba(0,0,0,0.6)'
                                                            }}
                                                        >
                                                            {page.name}
                                                        </Typography>
                                                    </TableCell>
                                                </React.Fragment>
                                            );
                                        }
                                    )}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {attendance.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={2} sx={{ textAlign: 'center' }}>
                                            <Typography>No Attendance</Typography>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    <>
                                        {attendance
                                            .slice(page * rowsPage, page * rowsPage + rowsPage)
                                            .map((data: any, index: number) => {
                                                console.log(data);
                                                return (
                                                    <React.Fragment key={index}>
                                                        <TableRowCustom
                                                            name={data.courseId.name}
                                                            date={new Date(data.time)}
                                                        />
                                                    </React.Fragment>
                                                );
                                            })}
                                    </>
                                )}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    {attendance?.length !== 0 && (
                                        <TablePagination
                                            rowsPerPageOptions={[5, 10, 25]}
                                            colSpan={2}
                                            count={attendance?.length}
                                            rowsPerPage={rowsPage}
                                            page={page}
                                            onPageChange={handleChangePage}
                                            onRowsPerPageChange={handleChangeRowsPage}
                                            ActionsComponent={TablePaginationActions}
                                        />
                                    )}
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </>
    );
};

export default ListAttendance;
