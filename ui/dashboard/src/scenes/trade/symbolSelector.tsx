import { FormControl, Select, MenuItem } from "@mui/material";
import { useTheme } from "@mui/material";

type Props = {
    setSymbol: Function;
    symbol: string;
};

const symbols = ['A', 'B', 'C', 'D'];

const SymbolSelector = (props: Props) => {
    const handleSelection = (event: any) => {
        props.setSymbol(event.target.value);
        localStorage.setItem('symbol', event.target.value)
    }
    const { palette } = useTheme();

    return (
        <>
            <FormControl
                variant='standard'
                sx={{
                    width: '100%',
                    maxWidth: 360,
                    bgcolor: palette.primary[300],
                    position: 'relative',
                    overflow: 'auto',
                    maxHeight: 300,
                    '& ul': { padding: 0 }
                }}>
                <Select
                    value={props.symbol}
                    onChange={handleSelection}
                    label="Symbol"
                    sx={{
                        height: '1.5rem',
                        backgroundColor: palette.tertiary.main,
                    }}
                >
                    {symbols.map((sectionId) => (
                        <MenuItem value={sectionId}>{sectionId}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </>
    );
}

export default SymbolSelector;