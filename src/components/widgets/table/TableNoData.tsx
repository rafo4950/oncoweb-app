import React from 'react';
// @mui
import { TableRow, TableCell, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';

// ----------------------------------------------------------------------

const RootStyle = styled(Box)(({ theme }) => ({
    height: '100%',
    display: 'flex',
    textAlign: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing(8, 2)
}));

type Props = {
    isNotFound: boolean;
};

export default function TableNoData({ isNotFound }: Props) {
    return (
        <TableRow>
            {isNotFound ? (
                <TableCell colSpan={12}>
                    <RootStyle>
                        <Typography variant="h6" gutterBottom>
                            No Data
                        </Typography>
                    </RootStyle>
                </TableCell>
            ) : (
                <TableCell colSpan={12} sx={{ p: 0 }} />
            )}
        </TableRow>
    );
}
