from fastapi import APIRouter, HTTPException, status

from sqlalchemy import text
from sqlalchemy.exc import DBAPIError

from config.db import conn
from models.labmem import PostLabMem, UpdateLabMem

###############################################################################################################################

labmem = APIRouter()

@labmem.post('/labmem/')
def create_labmem(labmem: PostLabMem):
    query = text("SELECT COUNT(*) FROM labmem")
    labmem_length = conn.execute(query).mappings().fetchone()['count']

    query_2 = text("""
        SELECT * FROM insert_labmem(
            CAST(:idx AS INTEGER),
            CAST(:name AS VARCHAR),
            CAST(:alias AS VARCHAR),
            CAST(:age AS INTEGER),
            CAST(:dob AS DATE),
            CAST(:description AS TEXT),
            CAST(:img AS TEXT)
        )
    """)
    
    try:
        result = conn.execute(query_2, {
            'idx': labmem_length + 1,
            'name': labmem.name,
            'alias': labmem.alias,
            'age': labmem.age,
            'dob': labmem.dob.strftime("%Y/%m/%d"),
            'description': labmem.description,
            'img': labmem.img
        }).mappings().fetchall()

        conn.commit()
        return result
    except DBAPIError as dbe:
        POSTGRES_ERROR_MSG = str(dbe.orig)
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=POSTGRES_ERROR_MSG)
    

@labmem.post('/labmem/{labmem_idx}/')
def create_labmem_at_index(labmem_idx: int, labmem: PostLabMem):
    query = text("""
        SELECT * FROM insert_labmem(
            CAST(:idx AS INTEGER),
            CAST(:name AS VARCHAR),
            CAST(:alias AS VARCHAR),
            CAST(:age AS INTEGER),
            CAST(:dob AS DATE),
            CAST(:description AS TEXT),
            CAST(:img AS TEXT)
        )
    """)

    try:
        result = conn.execute(query, {
            'idx': labmem_idx,
            'name': labmem.name,
            'alias': labmem.alias,
            'age': labmem.age,
            'dob': labmem.dob.strftime("%Y/%m/%d"),
            'description': labmem.description,
            'img': labmem.img
        }).mappings().fetchall()

        conn.commit()
        return result
    except DBAPIError as dbe:
        POSTGRES_ERROR_MSG = str(dbe.orig)
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=POSTGRES_ERROR_MSG)    

#############################################################################

@labmem.get('/')
def get_root():
    return {'welcome': "WELCOME TO FUTURE GADGET FASTAPI API REST"} 

@labmem.get('/labmem/')
def get_labmem():
    query = text("SELECT code, name, alias, age, dob, description, img FROM labmem ORDER BY code")

    with conn.begin():
        return conn.execute(query).mappings().fetchall() 

@labmem.get('/labmem/{labmem_idx}/')
def get_labmem_from_index(labmem_idx: int):
    query = text("SELECT code, name, alias, age, dob, description, img FROM labmem WHERE code = :idx ORDER BY code")

    with conn.begin():
        result = conn.execute(query, {'idx': labmem_idx}).mappings().fetchall()

        if len(result) == 0:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="LAB MEM NOT FOUND")

        return result

#############################################################################

@labmem.put('/labmem/{labmem_idx}/')
def update_labmem_in_index(labmem_idx: int, labmem: UpdateLabMem):
    raw_data = {
        'name': labmem.name,
        'alias': labmem.alias,
        'age': labmem.age,
        'description': labmem.description,
        'img': labmem.img
    }

    update_data = {key: value for key, value in raw_data.items() if value is not None}
    
    # Si no enviaron nada para actualizar, salimos temprano
    if not update_data:
        raise HTTPException(status_code=status.HTTP_204_NO_CONTENT, detail="LAB MEM UPDATE DATA NOT PROVIDED")

    set_clause = ", ".join([f"{key} = :{key}" for key in update_data.keys()])
    query = text(f"UPDATE labmem SET {set_clause} WHERE code = :idx")

    update_data.update({'idx': labmem_idx})

    with conn.begin():
        conn.execute(query, update_data)

        update_data.update({'status': "updated"})
        return update_data

#############################################################################

@labmem.delete('/labmem/{labmem_idx}/')
def delete_labmem_in_index(labmem_idx: int):
    query = text("SELECT * FROM delete_labmem(:idx)")

    with conn.begin():
        result = conn.execute(query, {'idx': labmem_idx}).mappings().fetchall()

        if len(result) == 0:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="LAB MEM NOT FOUND")

        return result
