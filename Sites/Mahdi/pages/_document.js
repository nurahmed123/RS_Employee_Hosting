import { HilltopPOPAdsScript, BannerScript } from "@/components/ads/HilltopAdsScript";
import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (

    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&family=Outfit:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <meta name="2d9411ba8b77a336dc470fef38942249dbbecc18" content="2d9411ba8b77a336dc470fef38942249dbbecc18" />
      </Head>
      <body>
        <Main />
        <NextScript />

        {/* Adsterra Popup Ad Script */}
        {/* <Script
          id="adsterra-popup"
          strategy="afterInteractive"
          src="//pl25948524.effectiveratecpm.com/db/1b/4d/db1b4d2a7488b382d77a782e2aaa5a4b.js"
        /> */}


        {/*Adsterra Social Ad */}
        <Script
          id="adsterra-script"
          strategy="lazyOnload"
          src="//pl25949179.effectiveratecpm.com/0d/8c/b4/0d8cb431300cd1925f1d61ca5d9eb3c1.js"
        />

        {/* Adsterra Ad JSScript */}
        <Script
          id="adsterra-ad"
          strategy="lazyOnload"
          data-cfasync="false"
          src="//pl25948868.effectiveratecpm.com/ce15f12e9d1b6592798b163f7a7b3f15/invoke.js"
        />


        {/* HillTopAdds */}
        <HilltopPOPAdsScript />
        <BannerScript />

      </body>
    </Html>
  );
}
