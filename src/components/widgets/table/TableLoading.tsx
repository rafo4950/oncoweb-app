import React from 'react';
// @mui
import { TableRow, TableCell, CircularProgress, Box } from '@mui/material';
// ----------------------------------------------------------------------
import { styled } from '@mui/material/styles';

type TableLoadingProps = {
    isLoading: boolean;
};

const RootStyle = styled(Box)(({ theme }) => ({
    height: '100%',
    display: 'flex',
    textAlign: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing(8, 2)
}));

export default function TableLoading({ isLoading }: TableLoadingProps) {
    return (
        <TableRow>
            {isLoading ? (
                <TableCell colSpan={12}>
                    <RootStyle>
                        <CircularProgress />
                    </RootStyle>
                </TableCell>
            ) : (
                <TableCell colSpan={12} sx={{ p: 0 }} />
            )}
        </TableRow>
    );
}
