DROP TABLE IF EXISTS budgets;

CREATE TABLE budgets (
                         id SERIAL PRIMARY KEY,
                         category VARCHAR(255) NOT NULL,
                         maximum NUMERIC(10, 2) NOT NULL,
                         theme VARCHAR(7) NOT NULL
);

INSERT INTO budgets (category, maximum, theme)
VALUES
    ('Entertainment', 50.00, '#277C78'),
    ('Bills', 750.00, '#82C9D7'),
    ('Dining Out', 75.00, '#F2CDAC'),
    ('Personal Care', 100.00, '#626070');
