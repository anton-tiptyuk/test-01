export enum Currency {
  USD = 'USD',
  GBP = 'GBP',
  AUD = 'AUD',
  EUR = 'EUR',
}

const convertableCurrencies = <Currency[]>(
  Object.keys(Currency).filter((c) => Currency.USD !== c)
);

export const convertableCurrencySymbols = convertableCurrencies.join();
