import { Currency } from '@/domain/currencies';
import { AstNodeBase } from '@/domain/ast-parser/ast-node-base';

export type RatesByCurrencyAndDate = Partial<
  Record<Currency, Record<string, number>>
>;

export function buildRatesDictionary(nodes: AstNodeBase[]) {
  const result: RatesByCurrencyAndDate = {};

  nodes.forEach((node) => {
    const { date, sign, value } = node.properties;

    const currency = <Currency>sign;
    if (!result[currency]) {
      result[currency] = {};
    }

    result[currency][date] = Number(value);
  });

  return result;
}
