COPY labmem (code, name, alias, age, dob, description, img)
FROM 'csv_files/data.csv'
WITH (
    FORMAT csv,
    HEADER true,
    DELIMITER ',',
    ENCODING 'UTF8',
    NULL ''
);
