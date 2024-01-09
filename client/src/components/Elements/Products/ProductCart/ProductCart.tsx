import  { FC } from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

type ProductCartProps = {
    title: string;
    text: string;
    id: number;
};

const ProductCard:FC<ProductCartProps>=({ title, text, id } )=> {
    return (
        <Link to={`${id}`}>
            <Card>
                <Card.Img variant="top" src="https://placehold.co/400" />
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text>{text}</Card.Text>
                </Card.Body>
            </Card>
        </Link>
    );
}

export default ProductCard;