CREATE DATABASE auth;

CREATE EXTENSION "uuid-ossp";

CREATE TABLE accounts(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT,
    email TEXT UNIQUE,
    password TEXT
);