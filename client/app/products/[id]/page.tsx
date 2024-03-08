import { Product } from '@/lib/types/product';

export default async function Product({ params }: { params: { id: string } }) {
  const res = await fetch(`http://localhost:5000/products/${params.id}`);

  if (!res.ok && res.status !== 200) {
    throw new Error('Invalid url ');
  }

  const data: Product = await res.json();

  return <div></div>;
}
