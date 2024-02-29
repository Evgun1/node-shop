ALTER TABLE products
ADD FOREIGN KEY (category_id) REFERENCES categories(category_id),
ADD FOREIGN KEY (supplier_id) REFERENCES suppliers(supplier_id);


ALTER TABLE cart
ADD FOREIGN KEY (product_id) REFERENCES products(product_id)