export class K {
    // 字段
    open: number;
    close: number;
    high: number;
    low: number;
    timeBegin: Date;
    volume: number;
    amount: number;

    constructor(open: number, close: number, high: number, low: number, timeBegin: Date, volume: number, amount: number) {
        this.open = open;
        this.close = close;
        this.high = high;
        this.low = low;
        this.timeBegin = timeBegin;
        this.volume = volume;
        this.amount = amount;
    }
}
