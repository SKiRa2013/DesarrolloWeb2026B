CREATE TABLE labmem (
	id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	code INT UNIQUE NOT NULL,	
	name VARCHAR(30) NOT NULL DEFAULT 'Default Labmem',
	alias VARCHAR(30) NOT NULL DEFAULT 'Default Alias',
	age INT NOT NULL DEFAULT 99,
	dob DATE NOT NULL DEFAULT '1955-11-05',
	description TEXT NOT NULL DEFAULT '',
	img TEXT NOT NULL DEFAULT 'image.png'
);

CREATE OR REPLACE VIEW labmem_with_real_ages AS (
	SELECT id, code, name, alias,
	EXTRACT(YEAR FROM age(dob)) AS age,
	dob, description, img
	FROM labmem
	ORDER BY code
);