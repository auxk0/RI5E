import nifty50 from '../../data/Nifty50HistoricalData.js';
import tata from '../../data/TATAEQ-0923-0924.js';
import airtel from '../../data/BHARTIARTL.js'
import { Decimal } from 'decimal.js'
import Position from '../../models/position.js';

class Ticker {
    constructor(ws, symbol, strategy) {
        this.client = ws;
        this.symbol = symbol;
        this.strategy = strategy;
        this.MACD = new Decimal(0);
        this.return = new Decimal(0);
    }

    //simple moving average
    SMA(array) {
        array = array.map(t => t.price);
        let num = new Decimal(array.reduce((a, b) => new Decimal(a).plus(new Decimal(b)), 0));
        return num.dividedBy(new Decimal(array.length));
    }

    // Exponential Moving Average
    EMA(arr, entity, window, pace) {
        const slice = arr.slice(arr.length - window - 1);
        const today = slice.pop();
        if (!slice[slice.length - 1][pace]) return this.SMA(slice)
        let multiplier = new Decimal(2).dividedBy(new Decimal(slice.length).plus(new Decimal(1)));
        let ema = new Decimal(today[`${entity}`]).times(multiplier).plus(new Decimal(slice[slice.length - 1][pace]).times(new Decimal(1).minus(multiplier)));
        return ema.toDP(2);
    }

    formatVolume(volume) {
        while (volume.includes(',')) volume = volume.replace(',', '');
        if (volume.includes('K')) volume = new Decimal(1000).times(new Decimal(volume.replace('K', '')));
        else if (volume.includes('M')) volume = new Decimal(1000000).times(new Decimal(volume.replace('M', '')));
        else if (volume.includes('B')) volume = new Decimal(1000000000).times(new Decimal(volume.replace('B', '')));
        return new Decimal(volume).dividedBy(new Decimal(1000000000));
    }

    // start tracking
    async start() {
        let data;
        switch (this.symbol) {
            case 'A':
                data = nifty50;
                break;
            case 'B':
                data = tata;
                break;
            case 'C':
                data = airtel;
                break;
        }
        const { fast, slow } = this.strategy;
        let update = [];
        let minPrice;
        let maxPrice;
        let maxVolume = 0;
        for (let i = 0; i < data.length; i++) {
            // process price and calculate graph min max
            update.push({ price: new Decimal(data[i].price.replace(',', '')) });
            if (!maxPrice || update[i].price.greaterThanOrEqualTo(maxPrice)) maxPrice = new Decimal(update[i].price);
            if (!minPrice || update[i].price.lessThanOrEqualTo(minPrice)) minPrice = new Decimal(update[i].price);

            // process volume data
            if (data[i].volume) update[i]['volume'] = this.formatVolume(data[i].volume);
            else update[i]['volume'] = update[i - 1]['volume'];
            if (maxVolume < update[i]['volume']) maxVolume = update[i]['volume'];

            // calculate fast ma
            if (update.length < fast + 1) continue;
            update[i]['fastma'] = this.EMA(update, 'price', fast, 'fastma');

            // calculate slow ma
            if (update.length < slow + 1) continue;
            update[i]['slowma'] = this.EMA(update, 'price', slow, 'slowma');

            // calculate MACD and breakout
            if (!update[i - 1].slowma) continue;
            this.prevMACD = this.MACD;
            this.MACD = update[i].fastma.minus(update[i].slowma);
            this.relativeMomentum = update[i].fastma.minus(update[i - 1].fastma).dividedBy(update[i].slowma.minus(update[i - 1].slowma));

            // compare price and volume
            // generate signals based on indicators
            if (!this.position && this.MACD.greaterThan(new Decimal(0))) {
                this.buy_price = update[i].price;
                this.position = {
                    buyPrice: update[i].price,
                    sellingPrice: null,
                    profit: null,
                    positions: [{ price: update[i].price, volume: update[i]['volume'], slowma: update[i]['slowma'], fastma: update[i]['fastma'] }]
                };
            } else if (this.position) {
                this.position.positions.push({ price: update[i].price, volume: update[i]['volume'], slowma: update[i]['slowma'], fastma: update[i]['fastma'] });
                if (this.MACD.minus(this.prevMACD).lessThan(new Decimal(0))) {
                    this.position.sellingPrice = update[i].price;
                    this.position.profit = update[i].price.minus(this.buy_price);
                    await Position.create(this.position);
                    this.position = null;
                }
                update[i].returns = update[i].price.minus(this.buy_price);
                this.return = this.return.plus(update[i].returns);
            }

            if (!update[i].returns) update[i].returns = 0;

            // add position to graph data
            if (this.position) update[i].position = update[i].price;

        }
        this.client.send(JSON.stringify({ update, minPrice, maxPrice }));
    }
}

export default Ticker;