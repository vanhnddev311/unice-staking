import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/staking');
  }, []);

  const title = 'UNICE Staking';

  return (
    <>
      <NextSeo
        title={title}
        // description={description}
        additionalMetaTags={[{ name: 'og:image:alt', content: title }]}
        openGraph={{
          title,
          description:
            'UNICE Staking Phase 2: Stake your UNICE tokens to earn additional FRENS tokens. Enhance your healthcare experience and contribute to our growing community.',
          siteName: ' UNICE Staking',
          url: 'https://stake.unicelab.io',
          type: 'website',
        }}
      />
    </>
  );
}
