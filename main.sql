-- imtihon_db nomli DATABASE yaratib olamiz
CREATE DATABASE imtihon_db;

-- Yaratgan imtihon_db nomli bazamizga ulanamiz
\c imtihon_db;

-- events nomli jadval yaratamiz
CREATE TABLE events (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(255),
    location VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    total_tickets INT NOT NULL CHECK (total_tickets >= 0),
    available_tickets INT NOT NULL CHECK (available_tickets >= 0),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Yaratgan events jadvalimizni ko'ramiz
select * from events;

-- tickets nomli jadval yaratamiz
CREATE TABLE tickets (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    type VARCHAR(50) CHECK (type IN ('standard', 'vip', 'student', 'senior')),
    price DECIMAL NOT NULL,
    currency VARCHAR(50) CHECK (currency IN ('USD', 'EUR', 'UZS')),
    seat_number VARCHAR(50),
    status VARCHAR(50) CHECK (status IN ('available', 'booked', 'sold')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Yaratgan tickets jadvalimizni ko'ramiz
select * from tickets;

-- users nomli jadval yaratamiz
CREATE TABLE users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(100) CHECK (role IN ('user', 'admin', 'organizer')),
    status VARCHAR(100) CHECK (status IN ('active', 'inactive')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Yaratgan users jadvalimizni ko'ramiz
select * from users;

-- orders nomli jadval yaratamiz
CREATE TABLE orders (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    tickets UUID[] NOT NULL,
    total_amount DECIMAL NOT NULL,
    currency VARCHAR(50) CHECK (currency IN ('USD', 'EUR', 'UZS')),
    status VARCHAR(50) CHECK (status IN ('pending', 'completed', 'cancelled')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Yaratgan orders jadvalimizni ko'ramiz
select * from orders;

-- payments nomli jadval yaratamiz
CREATE TABLE payments(
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    amount DECIMAL NOT NULL,
    method VARCHAR(50) CHECK (method IN ('credit_card', 'bank_transfer', 'paypal')),
    status VARCHAR(50) CHECK (status IN ('pending', 'completed', 'failed')),
    transaction_id VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Yaratgan payments jadvalimizni ko'ramiz
select * from payments;