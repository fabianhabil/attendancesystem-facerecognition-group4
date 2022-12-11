import { Container, Box } from '@mui/material';
import React from 'react';

interface ContentWrapperProps {
    children: React.ReactNode;
}

const Main: React.FC<ContentWrapperProps> = ({ children }) => {
    return (
        <>
            <Box component='div' sx={{ minHeight: '80vh' }}>
                <Container sx={{ minHeight: '80vh' }} maxWidth='xl'>
                    {children}
                </Container>
            </Box>
        </>
    );
};

export default Main;
