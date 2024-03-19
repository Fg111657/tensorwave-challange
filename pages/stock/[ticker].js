import React from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

const Loading = dynamic(() => import('components/Loading'), {
  ssr: false,
});

const StockDetails = dynamic(() => import('components/StockDetails'), {
  ssr: false,
  loading: () => <Loading />,
});

const StockPage = () => {
  const router = useRouter();
  const { ticker } = router.query;

  if (!ticker) {
    return <Loading />;
  }

  return <StockDetails ticker={ticker} />;
};

export default StockPage;