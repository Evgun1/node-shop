import Link from 'next/link';
import { CardElement } from '../components/cards/CardElement';
import classes from './Product.module.css';
import { Spinner } from 'react-bootstrap';
import { useSearchParams } from 'next/navigation';
import Pagination from '../components/ui/pagination/Pgination';
import { PageProps } from '@/.next/types/app/page';
import useCustomFetch from '@/lib/hooks/usePaginationFetch';

const fetchData = async (searchParams) => {
  const urlSearchParams = new URLSearchParams(searchParams);
  const res = await fetch(`http://localhost:5000/products?${urlSearchParams}`);
  if (!res.ok && res.status !== 200) {
    throw new Error('');
  }
  return res.json();
};

export default async function Products(props: PageProps) {
  const data = await fetchData(props.searchParams);

  // console.log(productsData);
  const productsData = data.productsArr;
  const productRows = parseInt(data.rowCounts) as number;

  return (
    <main>
      {productsData && productsData.length ? (
        <Pagination productRow={productRows} searchParams={props.searchParams}>
          <div className={classes.wrapper}>
            {productsData.map((element: any, index: number) => (
              <CardElement
                key={index}
                id={element.product_id}
                text={element.product_description}
                title={element.product_title}
              />
            ))}
          </div>
        </Pagination>
      ) : (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
    </main>
  );
}
