import SymbolSelector from "./symbolSelector";
import DashboardBox from "../../components/DashboardBox";
import FlexBetween from "../../components/FlexBetween";
import Ticker from "./tickerGraph";
import VolumeGraph from './volumeGraph';
import { useEffect, useState } from "react";

const Trade = () => {
    const gridTemplate = `
    "a"
    "a"
    "a"
    "a"
    "a"
    "b"
    "b"
  `;
    const [symbol, setSymbol] = useState<string>(localStorage.getItem('symbol') || 'A');
    const [data, setData] = useState<any[]>(new Array(200).fill(null));

    useEffect(() => {
        setData([])
        switch (symbol) {
            case 'A':
            case 'B':
            case 'C':
            case 'D':
                let webSocket = new WebSocket('http://127.0.0.1:9000');
                webSocket.addEventListener("message", async event => {
                    if (event.data === 'connected') {
                        console.log(event.data)
                        webSocket.send(symbol)
                    } else {
                        const update = JSON.parse(await event.data);
                        console.log(update)
                        setData(update);
                        /*
                        {
                            let idx = prev.findIndex(a => a === null)
                            if (idx < 0) {
                                prev.unshift();
                                prev.push(update);
                            } else prev[idx] = update;
                            console.log(prev)
                            return prev
                        }
                         */
                    }
                });
                return () => webSocket.close();
        }
    }, [symbol]);

    return (
        <>
            <FlexBetween m="1rem 2.5rem" gap="1rem">
                <SymbolSelector setSymbol={setSymbol} symbol={symbol} />
                <SymbolSelector setSymbol={setSymbol} symbol={symbol} />
            </FlexBetween>
            <DashboardBox
                width="100%"
                height="100%"
                display="grid"
                sx={{
                    gridTemplateColumns: "repeat(1)",
                    gridTemplateRows: "repeat(7)",
                    gridTemplateAreas: gridTemplate,
                }}
            >
                <Ticker symbol={symbol} data={data} />
                <VolumeGraph data={data} />
            </DashboardBox>
        </>
    );
};

export default Trade;