export interface Footprint {
    
    footprint: number;
    details_url: string;
    offset_prices: [
        amount: number,
        currency: string,
        locale: string,
        offset_url: string
    ]
}