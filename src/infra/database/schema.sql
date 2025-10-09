CREATE DATABASE auth;

CREATE EXTENSION "uuid-ossp";

CREATE TYPE role_enum AS ENUM('ADMIN', 'USER');

CREATE TABLE accounts(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT,
    email TEXT UNIQUE,
    password TEXT,
    role role_enum
);