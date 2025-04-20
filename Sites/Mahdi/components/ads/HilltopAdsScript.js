'use client';

import { useEffect } from 'react';

const HilltopPOPAdsScript = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "//sentimental-glad.com/c/Dm9.6NbT2K5/lKSSW/QY9BN/jqEnxKO/TvYb2TN/i_0v2mMpTSEh5YN_jWY/3J";
    script.async = true;
    script.defer = true;
    script.referrerPolicy = 'no-referrer-when-downgrade';

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
};

const BannerScript = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "//unusedframe.com/bhX.VcsxdKGelf0PYsWCdainYjWt5Nu/ZnXNII/Rebm-9xu/ZXUqlXksPqTqYtxaMdj-YbwWNzjmErtpN-jbE/ywNQjMAQ2pMAgA";
    script.async = true;
    script.referrerPolicy = 'no-referrer-when-downgrade';

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
};

export { HilltopPOPAdsScript, BannerScript };
