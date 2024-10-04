import { Box, useTheme } from "@mui/material";
import { CartesianGrid, Label, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

type Props = {
    symbol: string;
    data: any
};

const Graph = (props: Props) => {
    const { palette } = useTheme();
    let { data } = props;
    return (
        <>
            <Box gridArea='a'>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={data.update}
                        margin={{
                            top: 20,
                            right: 75,
                            left: 20
                        }}
                    >
                        <CartesianGrid strokeDasharray="4 3" stroke={palette.grey[800]} />
                        <XAxis tickLine={false} style={{ fontSize: "10px" }} ticks={[0, data.length - 1]} />
                        <YAxis
                            domain={[Number(data.minPrice), Number(data.maxPrice)]}
                            axisLine={{ strokeWidth: "0" }}
                            style={{ fontSize: "10px" }}
                        >
                            <Label
                                value="Price"
                                angle={-90}
                                offset={-5}
                                position="insideLeft"
                            />
                        </YAxis>
                        <Tooltip />
                        <Legend verticalAlign="top" />
                        <Line
                            type="monotone"
                            dataKey="price"
                            stroke={palette.primary.main}
                            strokeWidth={1}
                            dot={false}
                            isAnimationActive={false}
                        />
                        <Line
                            type="monotone"
                            dataKey="slowma"
                            stroke={palette.secondary.main}
                            strokeWidth={1}
                            dot={false}
                            isAnimationActive={false}
                        />
                        <Line
                            type="monotone"
                            dataKey="fastma"
                            stroke={palette.tertiary.main}
                            strokeWidth={1}
                            dot={false}
                            isAnimationActive={false}
                        />
                        <Line
                            type="monotone"
                            dataKey="position"
                            stroke={palette.grey[400]}
                            strokeWidth={3}
                            dot={false}
                            isAnimationActive={false}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </Box>
        </>
    );
}

export default Graph;