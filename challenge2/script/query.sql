CREATE TABLE racket (
    id SERIAL PRIMARY KEY,
    brand VARCHAR(100) NOT NULL,
    description VARCHAR(5000) NOT NULL,
    racket_name VARCHAR(100) NOT NULL,
    weight INTEGER,
    speed_rating FLOAT CHECK (speed_rating >= 0),
    vibration_rating FLOAT CHECK (vibration_rating >= 0),
    composition VARCHAR(255),
    racket_size VARCHAR(20),
    thickness VARCHAR(20),
    price INT CHECK (price >= 0),
    status VARCHAR(50) CHECK (status IN ('disable', 'enable')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE OR REPLACE FUNCTION set_update_at_column()
RETURNS TRIGGER AS 
$$
BEGIN
	NEW.updated_at = CURRENT_TIMESTAMP;
	RETURN NEW;
END;
$$
LANGUAGE plpgsql;


CREATE OR REPLACE TRIGGER set_update_trigger 
BEFORE UPDATE ON racket
FOR EACH ROW
EXECUTE FUNCTION set_update_at_column();

INSERT INTO racket (brand, racket_name, description, speed_rating, vibration_rating, weight, composition, racket_size, thickness, price, status)
VALUES
('Butterfly', 'Zhang Jike ALC', 'This is the description', 11.8, 10.3, 82, '5 Wood Layers + 2 Arylate Carbon Layers', '157x150mm', '5.8mm', 8000000,'enable'),
('Butterfly', 'Viscaria ALC', 'This is the description', 11.8, 10.3, 82, '5 Wood Layers + 2 Arylate Carbon Layers', '157x150mm', '5.8mm', 3200000,'enable'),
('Butterfly', 'Amultart ZLC', 'This is the description', 12.2, 13.7, 76, '3 Wood Layers + 2 Arylate Carbon Layers', '157x150mm', '7.1mm', 3800000,'enable'),
('Butterfly', 'Fan Zhendong ALC', 'This is the description', 11.8, 10.3, NULL, '5 Wood Layers + 2 Arylate Carbon Layers', '157x150mm', '5.8mm', 3000000,'enable'),
('Butterfly', 'Zhang Jike ALC NDN', 'This is the description', 11.8, 10.3, 82, '5 Wood Layers + 2 Arylate Carbon Layers', '157x150mm', '5.8mm', 9000000,'enable'),
('Butterfly', 'Timo Boll ALC', 'This is the description', 11.8, 10.3, 85, '5 Wood Layers + 2 Carbon Layers', '157x150mm', '5.8mm', 3000000,'disable');
