--
-- PostgreSQL database dump
--

\restrict 576cf9GNCmgeBiZZOfDcO0x4t6hyw0vq90LshoYDr33pwbFpxEZsoI9zShpPAEB

-- Dumped from database version 18.6
-- Dumped by pg_dump version 18.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE IF EXISTS ONLY public.labmem DROP CONSTRAINT IF EXISTS labmem_pkey;
ALTER TABLE IF EXISTS ONLY public.labmem DROP CONSTRAINT IF EXISTS labmem_code_key;
DROP VIEW IF EXISTS public.labmem_with_real_ages;
DROP TABLE IF EXISTS public.labmem;
DROP FUNCTION IF EXISTS public.insert_labmem(target_idx integer, new_name character varying, new_alias character varying, new_age integer, new_dob date, new_description text, new_img text, OUT new_code integer, OUT new_id integer);
DROP FUNCTION IF EXISTS public.delete_labmem(target_idx integer, OUT del_code integer, OUT del_id integer);
--
-- Name: delete_labmem(integer); Type: FUNCTION; Schema: public; Owner: fglab
--

CREATE FUNCTION public.delete_labmem(target_idx integer, OUT del_code integer, OUT del_id integer) RETURNS record
    LANGUAGE plpgsql
    AS $$
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
$$;


ALTER FUNCTION public.delete_labmem(target_idx integer, OUT del_code integer, OUT del_id integer) OWNER TO fglab;

--
-- Name: insert_labmem(integer, character varying, character varying, integer, date, text, text); Type: FUNCTION; Schema: public; Owner: fglab
--

CREATE FUNCTION public.insert_labmem(target_idx integer, new_name character varying, new_alias character varying, new_age integer, new_dob date, new_description text, new_img text, OUT new_code integer, OUT new_id integer) RETURNS record
    LANGUAGE plpgsql
    AS $$
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
$$;


ALTER FUNCTION public.insert_labmem(target_idx integer, new_name character varying, new_alias character varying, new_age integer, new_dob date, new_description text, new_img text, OUT new_code integer, OUT new_id integer) OWNER TO fglab;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: labmem; Type: TABLE; Schema: public; Owner: fglab
--

CREATE TABLE public.labmem (
    id integer NOT NULL,
    code integer NOT NULL,
    name character varying(30) DEFAULT 'Default Labmem'::character varying NOT NULL,
    alias character varying(30) DEFAULT 'Default Alias'::character varying NOT NULL,
    age integer DEFAULT 99 NOT NULL,
    dob date DEFAULT '1955-11-05'::date NOT NULL,
    description text DEFAULT ''::text NOT NULL,
    img text DEFAULT 'image.png'::text NOT NULL
);


ALTER TABLE public.labmem OWNER TO fglab;

--
-- Name: labmem_id_seq; Type: SEQUENCE; Schema: public; Owner: fglab
--

ALTER TABLE public.labmem ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.labmem_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: labmem_with_real_ages; Type: VIEW; Schema: public; Owner: fglab
--

CREATE VIEW public.labmem_with_real_ages AS
 SELECT id,
    code,
    name,
    alias,
    EXTRACT(year FROM age((dob)::timestamp with time zone)) AS age,
    dob,
    description,
    img
   FROM public.labmem
  ORDER BY code;


ALTER VIEW public.labmem_with_real_ages OWNER TO fglab;

--
-- Data for Name: labmem; Type: TABLE DATA; Schema: public; Owner: fglab
--

COPY public.labmem (id, code, name, alias, age, dob, description, img) FROM stdin;
1	1	 Okabe Rintarou	Hououin Kyouma	19	1991-12-14		Data/img/Okabe Rintarou.png
2	2	 Shiina Mayuri	Mayushii	16	1994-02-01		Data/img/Shiina Mayuri.png
3	3	 Hashida Itaru	Daru	19	1991-05-19		Data/img/Hashida Itaru.png
4	4	 Makise Kurisu	KuriGohan and Kamehameha	18	1992-07-25		Data/img/Makise Kurisu.png
5	5	 Kiryuu Moeka	Shining Finger	20	1990-06-06		Data/img/Kiryuu Moeka.png
6	6	 Urushibara Luka	Lukako	17	1993-08-30		Data/img/Urushibara Luka.png
7	7	 Akiha Rumiho	Faris NyanNyan	17	1993-04-03		Data/img/Akiha Rumiho.png
8	8	 Amane Suzuha	John Titor	18	2017-09-27		Data/img/Amane Suzuha.png
9	9	 Hiyajo Maho	Maho-tan	21	1989-11-02		Data/img/Hiyajo Maho.png
10	10	 Shiina Kagari	Kagari-chan	22	2026-07-07		Data/img/Shiina Kagari.png
11	11	 Amane Yuki	Amayuki	21	1989-05-31		Data/img/Amane Yuki.png
\.


--
-- Name: labmem_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fglab
--

SELECT pg_catalog.setval('public.labmem_id_seq', 11, true);


--
-- Name: labmem labmem_code_key; Type: CONSTRAINT; Schema: public; Owner: fglab
--

ALTER TABLE ONLY public.labmem
    ADD CONSTRAINT labmem_code_key UNIQUE (code);


--
-- Name: labmem labmem_pkey; Type: CONSTRAINT; Schema: public; Owner: fglab
--

ALTER TABLE ONLY public.labmem
    ADD CONSTRAINT labmem_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

\unrestrict 576cf9GNCmgeBiZZOfDcO0x4t6hyw0vq90LshoYDr33pwbFpxEZsoI9zShpPAEB

