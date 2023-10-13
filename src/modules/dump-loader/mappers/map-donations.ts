import { parseDumpDate } from '@/common/date';

import { AstNodeBase } from '@/domain/ast-parser/ast-node-base';
import { Currency } from '@/domain/currencies';
import { RateResolver } from '@/domain/rate-resolver';

import { Donation } from '@/db/models';

// 211.56 GBP
const amountRegex = /^(?<amount>\S+)\s+(?<currency>\S+)$/;

export function mapDonations(
  employeeId: number,
  donationNodes: AstNodeBase[],
  rateResolver: RateResolver,
) {
  return donationNodes.map((donationNode): Partial<Donation> => {
    const { id, amount, date: dumpDateStr } = donationNode.properties;

    const { groups } = amount.match(amountRegex);

    const amountOriginal = Number(groups.amount);
    const currency = <Currency>groups.currency;

    const date = parseDumpDate(dumpDateStr);

    const rate =
      Currency.USD === currency ? 1 : rateResolver.getRate(currency, date);

    return {
      id: Number(id),
      amountOriginal,
      amountUsd:
        Currency.USD === currency ? amountOriginal : amountOriginal * rate,
      date,
      currency,
      employeeId,
    };
  });
}
