DROP TABLE IF EXISTS pots;

CREATE TABLE pots (
                         id SERIAL PRIMARY KEY,
                         name VARCHAR(255) NOT NULL,
                         target NUMERIC(10, 2) NOT NULL,
                         total NUMERIC(10, 2) NOT NULL,
                         theme VARCHAR(7) NOT NULL
);

INSERT INTO budgets (name, target, total, theme)
VALUES
    ('Savings', 2000.00, 159.00, '#277C78'),
    ('Concert Ticket', 150.00, 110.00, '#82C9D7'),
    ('Gift', 150.00, 110.00, '#F2CDAC'),
    ('New Laptop', 1000.00, 10.00, '#626070');
