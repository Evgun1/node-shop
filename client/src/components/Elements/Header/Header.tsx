import { Nav, Navbar } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { NavLink } from 'react-router-dom';
import CartBtn from '../Cart/CartBtn';

function Header() {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to={'/'} className={'nav-link'}>
                            Home
                        </NavLink>
                        <NavLink to={'/products'} className={'nav-link'}>
                            Products
                        </NavLink>
                        <NavLink to={'/categories'} className={'nav-link'}>
                            Categories
                        </NavLink>
                        <NavLink to={'/suppliers'} className={'nav-link'}>
                            Suppliers
                        </NavLink>
                        <CartBtn />
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
export default Header;
