import { Box, Typography, useTheme } from '@mui/material';
import FlexBetween from '../../components/FlexBetween';
import { useState } from 'react';
import PixIcon from '@mui/icons-material/Pix';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const { palette } = useTheme();
    const [selected, setSelected] = useState(localStorage.getItem('navigation') || 'dashboard');
    return (
        <FlexBetween mb='0.25rem' p='0.5rem 0rem' color={palette.grey[300]}>
            {/* LEFT SIDE */}
            <FlexBetween gap='0.75rem'>
                <PixIcon sx={{ fontSize: '28px' }} />
                <Typography variant='h4' fontSize='16px'>
                    Omnus
                </Typography>
            </FlexBetween>

            {/* LEFT SIDE */}
            <FlexBetween gap='0.75rem'>
                <Box sx={{ '&:hover': { color: palette.primary[100] } }}>
                    <Link
                        to='/'
                        onClick={() => {
                            localStorage.setItem('navigation', 'dashboard')
                            setSelected('dashboard')
                        }}
                        style={{
                            color: selected === 'dashboard' ? 'inherit' : palette.grey[700],
                            textDecoration: "inherit"
                        }}
                    >
                        dashboard
                    </Link>
                </Box>
                <Box sx={{ '&:hover': { color: palette.primary[100] } }}>
                    <Link
                        to='/predictions'
                        onClick={() => {
                            localStorage.setItem('navigation', 'predictions')
                            setSelected('predictions')
                        }}
                        style={{
                            color: selected === 'predictions' ? 'inherit' : palette.grey[700],
                            textDecoration: "inherit"
                        }}
                    >
                        predictions
                    </Link>
                </Box>
                <Box sx={{ '&:hover': { color: palette.primary[100] } }}>
                    <Link
                        to='/trade'
                        onClick={() => {
                            localStorage.setItem('navigation', 'trade')
                            setSelected('trade')
                        }}
                        style={{
                            color: selected === 'trade' ? 'inherit' : palette.grey[700],
                            textDecoration: "inherit"
                        }}
                    >
                        trade
                    </Link>
                </Box>
            </FlexBetween>
        </FlexBetween>
    )
}

export default Navbar;