import { Nav, Navbar, NavbarBrand } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
// import { NavLink } from 'react-router-dom';
import Link from 'next/link';
import CartBtn from '../cart/CartBtn';
import AuthBtn from '../auth/AuthBtn';

export default function Navigation() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Nav>
          <Link className={'nav-link'} href={'/'}>
            React-Bootstrap
          </Link>
        </Nav>
        <Nav className="me-auto">
          <Link href={'/'} className={'nav-link'}>
            Home
          </Link>
          <Link href={'/products'} className={'nav-link'}>
            Products
          </Link>
          <Link href={'/categories'} className={'nav-link'}>
            Categories
          </Link>
          <Link href={'/suppliers'} className={'nav-link'}>
            Suppliers
          </Link>
        </Nav>
        <Nav>
          <CartBtn />
          <AuthBtn />
        </Nav>
      </Container>
    </Navbar>
  );
}
