CREATE TABLE IF NOT EXISTS cart 
(
    item_id BIGINT PRIMARY KEY,
    user_token BIGINT NOT NULL,
    item_amount BIGINT NOT NULL,
    product_id BIGINT NOT NULL
)