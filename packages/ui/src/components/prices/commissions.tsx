import { TCurrency } from "@repo/model/types/enums";

export type CommissionsType = {
  form: any;
  currency?: TCurrency;
};

export default function Commissions({ form, currency }: CommissionsType) {
  return <div>Commissions</div>;
}
