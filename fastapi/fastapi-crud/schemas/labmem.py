from sqlalchemy import Table, Column
from sqlalchemy.sql.sqltypes import INTEGER, VARCHAR, DATE, TEXT
from config.db import meta, engine

labmem_table = Table("labmem", meta,
               Column("id", INTEGER, primary_key=True),
               Column("code", INTEGER, unique=True, nullable=False),
               Column("name", VARCHAR(30), nullable=False),
               Column("alias", VARCHAR(30), nullable=False, default=""),
               Column("age", INTEGER, nullable=False, default=99),
               Column("dob", DATE, nullable=False, default="1955-11-05"),
               Column("description", TEXT, nullable=False, default="")
)

meta.create_all(engine)
