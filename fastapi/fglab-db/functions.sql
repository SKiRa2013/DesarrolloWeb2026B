CREATE OR REPLACE FUNCTION insert_labmem(
    target_idx INT, 
    new_name VARCHAR(30), 
    new_alias VARCHAR(30),
    new_age INT, 
    new_dob DATE, 
    new_description TEXT, 
    new_img TEXT,
    OUT new_code INT,  
    OUT new_id INT    
) AS $$
BEGIN
    -- Reorganizar códigos en orden descendente para evitar violar la restricción UNIQUE
    UPDATE labmem
    SET code = code + 1
    WHERE id IN (
        SELECT id 
        FROM labmem 
        WHERE code >= target_idx 
        ORDER BY code DESC
    );

    -- Insertar el nuevo miembro en la posición deseada
    INSERT INTO labmem (code, name, alias, age, dob, description, img)
    VALUES (target_idx, new_name, new_alias, new_age, new_dob, new_description, new_img)
    RETURNING id INTO new_id;

    new_code := target_idx;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION delete_labmem(
    target_idx INT, 
    OUT del_code INT, 
    OUT del_id INT
) AS $$
BEGIN
    -- 1. Eliminar el registro y guardar su id
    DELETE FROM labmem
    WHERE code = target_idx
    RETURNING id INTO del_id;

    -- 2. Si no se encontró el registro, cortar la ejecución lanzando una excepción
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Labmem con código % no encontrado.', target_idx
            USING ERRCODE = 'NO_DATA_FOUND';
    END IF;

    -- 3. Reorganizar los códigos en orden ASCENDENTE para evitar violar la restricción UNIQUE
    UPDATE labmem
    SET code = code - 1
    WHERE id IN (
        SELECT id 
        FROM labmem 
        WHERE code > target_idx 
        ORDER BY code ASC
    );

    del_code := target_idx;
END;
$$ LANGUAGE plpgsql;