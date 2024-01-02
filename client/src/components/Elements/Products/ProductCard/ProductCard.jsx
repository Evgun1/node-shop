import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

function ProductCard({ title, text, id }) {
    return (
        <Link to={`${id}`} variant="primary">
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
