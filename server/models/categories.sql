CREATE TABLE IF NOT EXISTS categories
(
    category_id BIGSERIAL PRIMARY KEY,
    category_name VARCHAR(200) NOT NULL,
    discription TEXT
);