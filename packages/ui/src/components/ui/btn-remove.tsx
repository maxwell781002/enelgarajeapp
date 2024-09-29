"use client";

import { TrashIcon } from "@radix-ui/react-icons";

import {
  BtnConfirm,
  BtnConfirmProps,
} from "@repo/ui/components/ui/btn-confirm";

type TKey = "title" | "description" | "btnIcon";

export type BtnRemoveProps = {
  action: (id: any) => any;
  entityId: any;
} & Omit<BtnConfirmProps, TKey | "action"> &
  Partial<Pick<BtnConfirmProps, TKey>>;

export function BtnRemove({
  action,
  entityId,
  ...props
}: BtnRemoveProps): JSX.Element {
  const newProps: BtnConfirmProps = {
    ...{
      title: "Are you absolutely sure?",
      description: "The record will be removed.",
      btnIcon: <TrashIcon />,
      action: () => action(entityId),
    },
    ...props,
  };

  return <BtnConfirm {...newProps} btnAttr={{ variant: "destructive" }} />;
}
