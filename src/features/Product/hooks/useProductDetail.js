import productAPI from 'api/productAPI';
import { useEffect, useState } from 'react';

export default function useProductDetail(productId) {
  // This hook would typically fetch product details based on the productId
  // For now, we will return a mock product object and a loading state
  const [product, setProductState] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //Async Iffy
    (async () => {
      try {
        setLoading(true);
        const result = await productAPI.get(productId);
        setProductState(result[0]);
      } catch (error) {
        console.error('Failed to fetch product details:', error);
      }
      setLoading(false);
    })();
  }, [productId]);

  return { product, loading };
}
