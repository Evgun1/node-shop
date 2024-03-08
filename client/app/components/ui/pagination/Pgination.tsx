import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { FC, ReactNode } from 'react';

type LinkItemProps = {
  index: number;
  page: string;
  activePage: number;
};
type PaginationProps = {
  children: ReactNode;
  productRow: number;
  searchParams: { [key: string]: string };
};

const LinkItem: FC<LinkItemProps> = ({ index, page, activePage }) => (
  <Link href={page}>{index}</Link>
);

const LIMIT_ARRAY: number[] = [10, 30, 50];

const Pagination = ({
  children,
  productRow,
  searchParams,
}: PaginationProps) => {
  const linkArray: React.JSX.Element[] = [];

  const nextUrlSearchParams = new URLSearchParams(searchParams);
  const numberUrlSearchParams = new URLSearchParams(searchParams);
  const prevUrlSearchParams = new URLSearchParams(searchParams);
  const limit = new URLSearchParams(searchParams);

  const productRowCount = Math.ceil(
    productRow /
      (limit.get('limit') !== null
        ? parseInt(limit.get('limit'))
        : LIMIT_ARRAY[0])
  ) as number;

  const activePage =
    numberUrlSearchParams.get('page') && numberUrlSearchParams !== null
      ? numberUrlSearchParams.get('page')
      : '1';
  const activePageInt = parseInt(activePage as string);

  nextUrlSearchParams.set('page', nextUrlSearchParams.get('page') * 1 + 1);
  prevUrlSearchParams.set('page', prevUrlSearchParams.get('page') * 1 - 1);

  for (let index = activePageInt - 2; index <= activePageInt + 2; index++) {
    if (index > 0 && index > 1 && index < productRowCount) {
      numberUrlSearchParams.set('page', index.toString());
      linkArray.push(
        <LinkItem
          key={index}
          index={index}
          activePage={activePageInt}
          page={`/products?${numberUrlSearchParams}`}
        />
      );
    }
  }

  const setLimit = (value: number) => {
    limit.set('limit', value.toString());
  };

  return (
    <div style={{ display: 'grid', gridGap: 32, padding: '64px 0' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 10,
        }}
      >
        {LIMIT_ARRAY &&
          LIMIT_ARRAY.length &&
          LIMIT_ARRAY.map((value, index) => (
            <Link key={index} href={`/products?limit=${value}`}>
              {value}
            </Link>
          ))}
      </div>
      {children}
      <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
        <Link href={`/products?${prevUrlSearchParams}`}>Prev</Link>
        <LinkItem
          key={1}
          index={1}
          activePage={activePageInt}
          page={`/products?page=${1}`}
        />
        {1 < linkArray.length - 3 && <div>...</div>}
        {linkArray}
        {activePageInt < productRowCount - 3 && <div>...</div>}
        {productRowCount >= 1 && (
          <LinkItem
            key={productRowCount}
            index={productRowCount}
            activePage={activePageInt}
            page={`/products?page=${productRowCount}`}
          />
        )}
        <Link href={`/products?${nextUrlSearchParams}`}>Next</Link>
      </div>
    </div>
  );
};

export default Pagination;
