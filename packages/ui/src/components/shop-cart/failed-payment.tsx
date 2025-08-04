"use client";

import { AlertCircle, CreditCard, RefreshCw, ArrowLeft } from "lucide-react";
import Link from "next/link";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@repo/ui/components/ui/alert";
import { Button } from "@repo/ui/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { CompleteOrder } from "@repo/model/prisma/zod/order";
import { formatPrice } from "packages/model/lib/utils";
import { TCurrency } from "packages/model/types/enums";
import { formatDate } from "date-fns";
import { useTranslations } from "next-intl";

export default function PaymentFailedPage({ order }: { order: CompleteOrder }) {
  const t = useTranslations("FailedPayment");
  const reasons = t("reasons").split("|");

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Main Error Card */}
        <Card className="border-red-200">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              {t("title")}
            </CardTitle>
            <CardDescription className="text-gray-600">
              {t("description")}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>{t("transaction_declined")}</AlertTitle>
              <AlertDescription>{t("declined_message")}</AlertDescription>
            </Alert>

            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <h4 className="font-medium text-gray-900">
                {t("reasons_title")}
              </h4>
              <ul className="text-sm text-gray-600 space-y-1">
                {reasons.map((reason, index) => (
                  <li key={index}>• {reason}</li>
                ))}
              </ul>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-3 pt-6">
            <Button variant="ghost" className="w-full" asChild>
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t("continue_shopping")}
              </Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Transaction Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              {t("transaction_details")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">{t("transaction_id")}</span>
              <span className="font-mono text-gray-900">
                #{order.identifier as string}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">{t("amount")}</span>
              <span className="font-semibold text-gray-900">
                {formatPrice(
                  order.total as number,
                  order.currency as TCurrency,
                )}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">{t("date")}</span>
              <span className="text-gray-900">
                {formatDate(order.sentAt as any, "dd/MM/yyyy")}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">{t("status")}</span>
              <span className="text-red-600 font-medium">
                {t("status_failed")}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
