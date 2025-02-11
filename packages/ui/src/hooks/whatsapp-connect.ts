import { WhatsappConnectStatus } from "@repo/model/types/enums";
import { CompleteWhatsappConnect } from "@repo/model/zod/whatsappconnect";
import { useEffect, useState } from "react";

export const useWhatsAppConnect = (
  businessId: string,
  connect: CompleteWhatsappConnect | null,
) => {
  const [whatsappConnect, setWhatsappConnect] =
    useState<CompleteWhatsappConnect | null>(connect);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (
      !businessId ||
      whatsappConnect?.status !== WhatsappConnectStatus.CREATED
    )
      return;
    setLoading(true);
    const intervalId = setInterval(async () => {
      const response = await fetch(`/api/whatsapp-connect/${businessId}`);
      const data = await response.json();
      setWhatsappConnect(data);
      if (!data || data.status !== WhatsappConnectStatus.CREATED) {
        setLoading(false);
        clearInterval(intervalId); // Stop the interval
      }
    }, 10000);
    return () => {
      clearInterval(intervalId);
    };
  }, [businessId]);
  return {
    whatsappConnect,
    loading,
  };
};
