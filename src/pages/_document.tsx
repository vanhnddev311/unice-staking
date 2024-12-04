import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>UNICE Staking</title>
        <link rel="icon" href="/favicon.png" />
        <link rel="apple-touch-icon" sizes="192x192" href="/favicon.png" />
        <meta
          name="description"
          content="UNICE Staking Phase 2: Stake your UNICE tokens to earn additional FRENS tokens. Enhance your healthcare experience and contribute to our growing community."
        />
        <meta
          name="og:description"
          content="UNICE Staking Phase 2: Stake your UNICE tokens to earn additional FRENS tokens. Enhance your healthcare experience and contribute to our growing community."
        />
        <meta property="og:image" content="https://testnet-unice-staking.vercel.app/thumbnail.png" />
        {/*<meta property="og:title" content="AI-based Blockchain Messenger" />*/}
        {/*<meta name="og:image:alt" content={'AI-based Blockchain Messenger'} />*/}
        <meta name="og:url" content="" />

        <meta name="twitter:image" content="/logo.png" />
        <meta name="twitter:card" content="summary" />

        <meta name="og:locale" content="en" />
        <meta name="og:type" content="article" />
        <meta name="og:site_name" content="UNICE Staking" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"
          integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={''} />
        <link
          href="https://fonts.googleapis.com/css2?family=Chakra+Petch:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />

        <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Lexend+Exa:wght@100..900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Lexend:wght@100..900&display=swap" rel="stylesheet" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body data-theme={'dark'}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
