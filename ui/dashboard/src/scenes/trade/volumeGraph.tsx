import { Box, useTheme } from "@mui/material";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

type Props = {
    data: any;
};

const Graph = (props: Props) => {
    const { palette } = useTheme();
    let { data } = props;
    return (
        <>
            <Box gridArea='b'>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={data.update}
                        margin={{
                            right: 75,
                            left: 20,
                            bottom: 20,
                        }}>
                        <CartesianGrid strokeDasharray="3 3" stroke={palette.grey[800]} />
                        <XAxis tickLine={false} style={{ fontSize: "10px" }} ticks={[0, data.length-1]}/>
                        <YAxis
                            axisLine={{ strokeWidth: "0" }}
                            style={{ fontSize: "10px" }}
                        />
                        <Tooltip />
                        <Area dot={false} dataKey="volume" stroke={palette.tertiary.main} isAnimationActive={false} />
                    </AreaChart>
                </ResponsiveContainer>
            </Box>
        </>
    );
}

export default Graph;