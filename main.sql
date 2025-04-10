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

INSERT INTO events (name, description, location, date, time, total_tickets, available_tickets)
VALUES
('Tech Conference 2025', 'Yillik texnologiyalar konferensiyasi', 'Tashkent City Hall', '2025-05-20', '10:00', 500, 500),
('Startup Pitch Night', 'Yosh startaplar uchun tanlov', 'Inha University', '2025-06-15', '18:00', 200, 200),
('Music Festival', 'Ochiq osmon ostida musiqa bayrami', 'Amir Temur Bogi', '2025-07-10', '17:30', 1000, 1000),
('Book Fair', 'Kitob sevuvchilar uchun korgazma', 'UzExpo Center', '2025-08-01', '09:00', 300, 300),
('Art Exhibition', 'Zamonaviy sanat korgazmasi', 'Art Gallery Tashkent', '2025-04-22', '11:00', 150, 150),
('Film Premiere', 'Premyera kinotomosha', 'Cinema Park', '2025-09-05', '19:00', 400, 400),
('Coding Bootcamp', 'Dasturlash boyicha 3 kunlik kurs', 'IT Park', '2025-05-02', '09:00', 100, 100),
('Job Fair', 'Ishga joylashish yarmarkasi', 'Westminster University', '2025-10-10', '10:00', 600, 600),
('Gaming Tournament', 'Kibersport musobaqasi', 'Game Arena', '2025-11-12', '15:00', 250, 250),
('Charity Gala', 'Xayriya kechasi', 'Hyatt Regency Hotel', '2025-12-01', '20:00', 350, 350);

select * from events;

INSERT INTO tickets (event_id, type, price, currency, seat_number, status)
VALUES
('7199443e-f669-4ec9-b600-42c793ac3fea', 'standard', 20.00, 'USD', 'A1', 'available'),
('7199443e-f669-4ec9-b600-42c793ac3fea', 'vip', 50.00, 'USD', 'B1', 'available'),
('7199443e-f669-4ec9-b600-42c793ac3fea', 'student', 10.00, 'USD', 'C1', 'available'),
('eda229d0-fc0a-47d6-948f-72bc39c049e3', 'standard', 15.00, 'USD', 'A1', 'available'),
('eda229d0-fc0a-47d6-948f-72bc39c049e3', 'vip', 35.00, 'USD', 'B1', 'available'),
('eda229d0-fc0a-47d6-948f-72bc39c049e3', 'student', 8.00, 'USD', 'C1', 'available'),
('f41841f4-5d0d-4b53-ae05-8e375f2f774b', 'standard', 25.00, 'USD', 'A1', 'available'),
('f41841f4-5d0d-4b53-ae05-8e375f2f774b', 'vip', 60.00, 'USD', 'B1', 'available'),
('f41841f4-5d0d-4b53-ae05-8e375f2f774b', 'student', 12.00, 'USD', 'C1', 'available'),
('ace8ff2f-2136-40be-8d57-83780bdce301', 'standard', 12.00, 'USD', 'A1', 'available'),
('5c41eb68-3e81-4867-bc88-402dd634741a', 'standard', 15.00, 'USD', 'A1', 'available');

select * from tickets;

INSERT INTO users (email, username, password, role, status)
VALUES
('johndoe@example.com', 'johndoe', '<hashed_password_1>', 'user', 'active'),
('janedoe@example.com', 'janedoe', '<hashed_password_2>', 'user', 'active'),
('admin@example.com', 'admin', '<hashed_password_3>', 'admin', 'active'),
('organizer@example.com', 'organizer1', '<hashed_password_4>', 'organizer', 'active'),
('testuser@example.com', 'testuser', '<hashed_password_5>', 'user', 'inactive'),
('marksmith@example.com', 'marksmith', '<hashed_password_6>', 'user', 'active'),
('elisajohnson@example.com', 'elisajohnson', '<hashed_password_7>', 'admin', 'inactive'),
('bobbrown@example.com', 'bobbrown', '<hashed_password_8>', 'user', 'active'),
('alicegreen@example.com', 'alicegreen', '<hashed_password_9>', 'organizer', 'active'),
('charliewhite@example.com', 'charliewhite', '<hashed_password_10>', 'user', 'active');

select * from users;

INSERT INTO orders (user_id, tickets, total_amount, currency, status)
VALUES
('17e8df39-b70c-4156-ab66-dccb0aa1f958', ARRAY[CAST('a3f6c2b9-1d4b-41f7-8c91-8d24f3e4a042' AS UUID), CAST('d4d1b83c-5bfc-4b5f-9b79-b264a76d3e12' AS UUID)], 100.00, 'USD', 'pending'),
('9873f254-eef3-4789-a606-457e8e852add', ARRAY[CAST('f0f69cc5-d7a2-4b9d-9bc5-5861b0747394' AS UUID), CAST('f2f09c79-16a4-4bc7-a679-71e7f416a8f8' AS UUID)], 200.00, 'EUR', 'completed'),
('927bc999-bccb-4462-8a12-b06c966ce8f4', ARRAY[CAST('5a5a8f4b-167f-47ea-9b8b-1b1fc3b7c4e9' AS UUID)], 50.00, 'UZS', 'cancelled'),
('5908560f-ee0e-4348-bab7-4d0fea5ef057', ARRAY[CAST('c5a249d3-1b72-4673-9ed9-b44edb32c2d7' AS UUID), CAST('eaf8c320-4f57-4531-8fd7-234ce2481fa5' AS UUID)], 150.00, 'USD', 'completed'),
('de4887cf-e757-4caa-9280-834987b30071', ARRAY[CAST('abc123ef-9bb7-4a11-bc8b-b2490c8d3a2d' AS UUID)], 120.00, 'EUR', 'pending'),
('4c3bc140-4bd1-4e9e-b792-45446e4001b4', ARRAY[CAST('33d6e2d9-eacb-4652-85d4-45c62bc6f9b0' AS UUID), CAST('f101d0f7-ded6-4370-b577-8c9f5d8a3492' AS UUID)], 75.00, 'UZS', 'completed'),
('0ebed1a6-28d0-49b8-94df-9244cfc9b070', ARRAY[CAST('7b2d3a87-7b90-4662-82d9-9baf1a47be35' AS UUID)], 80.00, 'USD', 'cancelled'),
('b0688ded-493f-4c04-84b7-a97f54213750', ARRAY[CAST('5b0f7105-d2a0-4656-8a43-6cbba9335c4f' AS UUID), CAST('a3ff6ab5-b960-4380-a7ed-4201c52a4b6b' AS UUID)], 100.00, 'EUR', 'pending'),
('148439fc-b72c-438f-bc94-87aad4a1e003', ARRAY[CAST('d9719d2f-8c76-46c2-b66a-b2a052f90872' AS UUID), CAST('f95b18e9-2b7e-4705-aedb-c4e61e5c8f9d' AS UUID)], 250.00, 'UZS', 'completed'),
('c5fcf939-8a52-4442-8bbf-1385a8773887', ARRAY[CAST('9be2b67e-b760-4a1c-8a2f-68c45e8ef3e2' AS UUID), CAST('97b8f18c-b8b9-4f68-9989-2a3388c1b918' AS UUID)], 200.00, 'USD', 'pending');

select * from orders;

INSERT INTO payments (order_id, amount, method, status, transaction_id)
VALUES
('91de0e1e-6f8b-47d8-a7f3-fe7b4c7892b4', 150.00, 'credit_card', 'completed', 'txn_12345'),
('8ffdb23b-3920-4d07-b03e-771fddd04fa5', 200.00, 'paypal', 'pending', 'txn_12346'),
('8fc51b2d-3f77-4b11-8cb6-fae14bc5cec2', 250.00, 'bank_transfer', 'failed', 'txn_12347'),
('ac1c11b0-9784-4b97-8617-f2e5aaa8fa43', 100.00, 'credit_card', 'completed', 'txn_12348'),
('dd99a2b2-1eca-4357-bbe5-7f027bef29fd', 120.00, 'paypal', 'completed', 'txn_12349'),
('be257e63-b4f6-49f7-a45a-81ccae0f2476', 130.00, 'bank_transfer', 'pending', 'txn_12350'),
('0a950265-0a11-43a1-97b8-94092d83f8b9', 90.00, 'credit_card', 'failed', 'txn_12351'),
('08ed402f-6157-43d7-86cf-086dfbc7d579', 140.00, 'paypal', 'pending', 'txn_12352'),
('f2ca178d-c2bd-4c93-9190-bd9e7c9838b4', 160.00, 'bank_transfer', 'completed', 'txn_12353'),
('ff3783d6-fb42-4c84-9525-7f0edc509ea7', 200.00, 'credit_card', 'completed', 'txn_12354');

select * from payments;

select * from events;
select * from tickets;
select * from users;
select * from orders;
select * from payments;