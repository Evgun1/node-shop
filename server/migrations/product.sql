ALTER TABLE products
ADD IF NOT EXISTS product_title VARCHAR(255), 
ADD IF NOT EXISTS product_description TEXT;
