import { parseDumpDate } from '@/common/date';

import { Currency } from '@/domain/currencies';
import { AstNodeBase } from '@/domain/ast-parser/ast-node-base';
import { ICurrencyRate } from '@/domain/icurrency-rate';

export type RatesByCurrencyAndDate = Partial<
  Record<Currency, Record<string, number>>
>;

export function mapRates(nodes: AstNodeBase[]) {
  return nodes.map((node) => {
    const { date, sign, value } = node.properties;

    return <ICurrencyRate>{
      currency: sign,
      date: parseDumpDate(date),
      value: Number(value),
    };
  });
}
