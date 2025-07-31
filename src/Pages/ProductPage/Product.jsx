import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProdDescription from '../../Components/Product-detail/ProdDescription'; 

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        if (!res.ok) throw new Error('Network response was not ok');
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error('Failed to fetch product:', err);
        setError('Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
  if (!product) return <div className="text-center py-10 text-gray-600">Product not found.</div>;

  return <ProdDescription product={product} />;
};

export default Product;
