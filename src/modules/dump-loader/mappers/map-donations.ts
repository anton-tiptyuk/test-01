import { parseDumpDate } from '@/common/date';

import { AstNodeBase } from '@/domain/ast-parser/ast-node-base';
import { Currency } from '@/domain/currencies';

import { Donation } from '@/db/models';

import { RatesByCurrencyAndDate } from './build-rates-dictionary';

// 211.56 GBP
const amountRegex = /^(?<amount>\S+)\s+(?<currency>\S+)$/;

export function mapDonations(
  employeeId: number,
  donationNodes: AstNodeBase[],
  ratesByCurrencyAndDate: RatesByCurrencyAndDate,
) {
  return donationNodes.map((donationNode): Partial<Donation> => {
    const { id, amount, date } = donationNode.properties;

    const { groups } = amount.match(amountRegex);

    const amountOriginal = Number(groups.amount);
    const currency = <Currency>groups.currency;

    const rate =
      Currency.USD === currency ? 1 : ratesByCurrencyAndDate[currency][date];

    return {
      id: Number(id),
      amountOriginal,
      amountUsd:
        Currency.USD === currency ? amountOriginal : amountOriginal * rate,
      date: parseDumpDate(date),
      currency,
      employeeId,
    };
  });
}
