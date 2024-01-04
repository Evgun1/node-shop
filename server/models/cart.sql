CREATE TABLE IF NOT EXISTS cart 
(
    item_id BIGSERIAL PRIMARY KEY,
    user_token VARCHAR(50) NOT NULL,
    item_amount BIGINT NOT NULL,
    product_id BIGINT NOT NULL
)