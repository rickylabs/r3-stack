import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import {type ReactNode} from "react";

interface MediaQuery {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
}

type Props = {
    children: ReactNode;
    skeleton: ReactNode;
    loading?: boolean;
    count?: number;
    columns?: number | MediaQuery;
};

export default function GridList({ children, skeleton, loading, count, columns }: Props) {
    return (
        <>
            <Box
                sx={{
                    width: '100%',
                    columnGap: 3,
                    display: 'grid',
                    rowGap: { xs: 4, md: 5 },
                    gridTemplateColumns: {
                        xs: `repeat(${columns?.xs ?? columns ?? 1}, 1fr)`,
                        sm: `repeat(${columns?.sm ?? columns ?? 2}, 1fr)`,
                        md: `repeat(${columns?.md ?? columns ?? 3}, 1fr)`,
                        lg: `repeat(${columns?.lg ?? columns ?? 4}, 1fr)`,
                        xl: `repeat(${columns?.xl ?? columns ?? 5}, 1fr)`,
                    },
                    justifyContent: 'center',
                }}
            >
                {(loading ? skeleton : children)}
            </Box>

            <Pagination
                count={count ?? 10}
                color="primary"
                sx={{
                    display: {
                        xs: (columns?.xs ? count > columns.xs : count > columns) ? "block" : "none",
                        sm: (columns?.sm ? count > columns.sm : count > columns) ? "block" : "none",
                        md: (columns?.md ? count > columns.md : count > columns) ? "block" : "none",
                        lg: (columns?.lg ? count > columns.lg : count > columns) ? "block" : "none",
                        xl: (columns?.xl ? count > columns.xl : count > columns) ? "block" : "none",
                    },
                    my: 10,
                }}
            />
        </>
    );
}
