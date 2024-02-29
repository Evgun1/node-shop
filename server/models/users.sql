CREATE TABLE IF NOT EXISTS users (
    user_id BIGSERIAL NOT NULL PRIMARY KEY,
    user_email TEXT NOT NULL UNIQUE,
    user_password TEXT NOT NULL,
    user_role VARCHAR(50) NOT NULL DEFAULT 'user'
);