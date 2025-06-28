import {
  GoogleAnalytics as GoogleAnalyticsComponent,
  GoogleTagManager,
} from "@next/third-parties/google";

export default function GoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID!!;
  const gtmId = process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID!!;
  return (
    <>
      <GoogleTagManager gtmId={gtmId} />
      <GoogleAnalyticsComponent gaId={gaId} />
    </>
  );
}
