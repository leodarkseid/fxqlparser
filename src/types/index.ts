export interface FXRate {
  BUY: number; // The buy rate for the currency pair
  SELL: number; // The sell rate for the currency pair
  CAP: number; // The transaction cap for the currency pair
}
export interface FXData {
  [currencyPair: string]: FXRate; // Dynamic keys for currency pairs (e.g., "USD-GBP", "EUR-JPY")
}

export interface FXQLResponse {
  FXQL: FXData;
}
