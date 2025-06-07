CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE racket (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    brand VARCHAR(100) NOT NULL,
    description VARCHAR(5000) NOT NULL,
    racket_name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL,
    weight INTEGER,
    speed_rating FLOAT CHECK (speed_rating >= 0),
    vibration_rating FLOAT CHECK (vibration_rating >= 0),
    composition VARCHAR(255),
    racket_size VARCHAR(20),
    thickness VARCHAR(20),
    price INT CHECK (price >= 0) NOT NULL,
    quantity INT CHECK (price >= 0) NOT NULL,
    status VARCHAR(50) CHECK (status IN ('disable', 'enable')) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "user" (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    status VARCHAR(10) CHECK (status IN ('disable', 'verified','unverified')) DEFAULT 'unverified' NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "otp" (
    username VARCHAR(50) NOT NULL UNIQUE,
    otp VARCHAR(6) NOT NULL,
    expired_at TIMESTAMP NOT NULL,

    CONSTRAINT fk_otp_user 
        FOREIGN KEY (username) 
        REFERENCES "user"(username)
        ON DELETE CASCADE
);

-- CREATE TABLE token (
--     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
--     user_id UUID REFERENCES "user"(id) ON DELETE CASCADE,
--     refresh_token TEXT NOT NULL,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     expires_at TIMESTAMP
-- );

------------------------- TRIGGER ------------------------- 
-- racket
CREATE OR REPLACE FUNCTION set_update_at_column()
RETURNS TRIGGER AS 
$$
BEGIN
	NEW.updated_at = CURRENT_TIMESTAMP;
	RETURN NEW;
END;
$$
LANGUAGE plpgsql;


CREATE OR REPLACE TRIGGER set_update_trigger_racket
BEFORE UPDATE ON racket
FOR EACH ROW
EXECUTE FUNCTION set_update_at_column();

-- user
CREATE OR REPLACE TRIGGER set_update_trigger_user
BEFORE UPDATE ON "user"
FOR EACH ROW
EXECUTE FUNCTION set_update_at_column();


-----------------------INSERT-----------------------

INSERT INTO racket (brand, racket_name, slug, description, speed_rating, vibration_rating, weight, composition, racket_size, thickness, price, quantity,status)
VALUES
('Butterfly', 'Zhang Jike ALC', 'zhang-jike-alc', 'This is the description', 11.8, 10.3, 82, '5 Wood Layers + 2 Arylate Carbon Layers', '157x150mm', '5.8mm', 100, 8000000, 'enable'),
('Butterfly', 'Viscaria ALC', 'viscaria-alc', 'This is the description', 11.8, 10.3, 82, '5 Wood Layers + 2 Arylate Carbon Layers', '157x150mm', '5.8mm', 100, 3200000, 'enable'),
('Butterfly', 'Amultart ZLC', 'amultart-zlc', 'This is the description', 12.2, 13.7, 76, '3 Wood Layers + 2 Arylate Carbon Layers', '157x150mm', '7.1mm', 100, 3800000, 'enable'),
('Butterfly', 'Fan Zhendong ALC', 'fan-zhendong-alc', 'This is the description', 11.8, 10.3, NULL, '5 Wood Layers + 2 Arylate Carbon Layers', '157x150mm', '5.8mm', 100, 3000000, 'enable'),
('Butterfly', 'Zhang Jike ALC NDN', 'zhang-jike-alc-ndn', 'This is the description', 11.8, 10.3, 82, '5 Wood Layers + 2 Arylate Carbon Layers', '157x150mm', '5.8mm', 100, 9000000, 'enable'),
('Butterfly', 'Timo Boll ALC', 'timo-boll-alc', 'This is the description', 11.8, 10.3, 85, '5 Wood Layers + 2 Carbon Layers', '157x150mm', '5.8mm', 100, 3000000, 'disable');

INSERT INTO "user" (username, email, password, status)
VALUES 
  ('alice', '123@gmail.com', '123', 'verified'),
  ('bob', 'bob@gmail.com', '123', 'verified'),
  ('charlie', 'charlie@gmail.com', '123', 'verified');


CREATE USER tt_admin WITH PASSWORD '123';

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO ttadmin;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO ttadmin;