CREATE TABLE IF NOT EXISTS suppliers 
(
    supplier_id BIGSERIAL PRIMARY KEY ,
    company_name VARCHAR(255) NOT NULL,
    contact_name VARCHAR(255) NOT NULL,
    contact_title VARCHAR(255) NOT NULL,
    suppliers_addres VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    region VARCHAR(255) NOT NULL,
    postal_code VARCHAR(100) NOT NULL,
    country VARCHAR(255) NOT NULL,
    phone VARCHAR(100) NOT NULL,
    fax VARCHAR(100),
    homepage text NOT NULL
    );


