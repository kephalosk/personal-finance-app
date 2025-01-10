DROP TABLE IF EXISTS pots;

CREATE TABLE pots (
                      id SERIAL PRIMARY KEY,
                      name VARCHAR(255) NOT NULL,
                      target NUMERIC(10, 2) NOT NULL,
                      total NUMERIC(10, 2) NOT NULL,
                      theme VARCHAR(7) NOT NULL
);

INSERT INTO pots (name, target, total, theme)
VALUES
    ('Savings', 2000.00, 159.00, '#277C78'),
    ('Concert Ticket', 150.00, 110.00, '#626070'),
    ('Gift', 150.00, 110.00, '#82C9D7'),
    ('New Laptop', 1000.00, 10.00, '#F2CDAC'),
    ('Holiday', 1440.00, 531.00, '#826CB0');
