import { FC } from 'react';
import Link from 'next/link';

import classes from './CardElement.module.css';

type ProductCartProps = {
  title: string;
  text: string;
  id: number;
};

export const CardElement: FC<ProductCartProps> = ({ title, text, id }) => {
  return (
    <Link href={`products/${id}`}>
      <div className={classes.wrapper}>
        <img className={classes.img} src="https://placehold.co/400" />
        <div>
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
      </div>
    </Link>
  );
};
