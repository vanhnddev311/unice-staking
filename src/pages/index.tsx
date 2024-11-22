import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/staking');
  }, []);

  return;
}
