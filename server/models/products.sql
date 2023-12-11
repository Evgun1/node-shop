CREATE TABLE IF NOT EXISTS products
(
    product_id SERIAL NOT NULL PRIMARY KEY,
    supplier_id BIGINT ,
    category_id BIGINT,
    quantity_per_unit INT NOT NULL,
    unit_price FLOAT NOT NULL,
    units_in_stock INT,
    units_on_order INT,
    reorder_level INT,
    discontinued FLOAT
    
);