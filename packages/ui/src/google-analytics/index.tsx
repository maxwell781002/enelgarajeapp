import { GoogleAnalytics as GoogleAnalyticsComponent } from "@next/third-parties/google";

export default function GoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;
  if (!gaId) return null;
  return <GoogleAnalyticsComponent gaId={gaId} />;
}
