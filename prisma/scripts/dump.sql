--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2
-- Dumped by pg_dump version 15.3 (Ubuntu 15.3-1.pgdg18.04+1)

-- Started on 2023-05-24 07:35:00 UTC

BEGIN;

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE ONLY public."_GroupToUser" DROP CONSTRAINT "_GroupToUser_B_fkey";
ALTER TABLE ONLY public."_GroupToUser" DROP CONSTRAINT "_GroupToUser_A_fkey";
ALTER TABLE ONLY public."LeetcodeInfo" DROP CONSTRAINT "LeetcodeInfo_leetcodeUsername_fkey";
DROP INDEX public."_GroupToUser_B_index";
DROP INDEX public."_GroupToUser_AB_unique";
DROP INDEX public."User_leetcodeUsername_key";
DROP INDEX public."User_email_key";
DROP INDEX public."UpdateQueue_username_key";
DROP INDEX public."LeetcodeInfo_leetcodeUsername_key";
DROP INDEX public."Group_name_key";
DROP INDEX public."Group_inviteID_key";
ALTER TABLE ONLY public._prisma_migrations DROP CONSTRAINT _prisma_migrations_pkey;
ALTER TABLE ONLY public."User" DROP CONSTRAINT "User_pkey";
ALTER TABLE ONLY public."UpdateQueue" DROP CONSTRAINT "UpdateQueue_pkey";
ALTER TABLE ONLY public."LeetcodeInfo" DROP CONSTRAINT "LeetcodeInfo_pkey";
ALTER TABLE ONLY public."Group" DROP CONSTRAINT "Group_pkey";
ALTER TABLE public."User" ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public."UpdateQueue" ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public."LeetcodeInfo" ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public."Group" ALTER COLUMN id DROP DEFAULT;
DROP TABLE public._prisma_migrations;
DROP TABLE public."_GroupToUser";
DROP SEQUENCE public."User_id_seq";
DROP TABLE public."User";
DROP SEQUENCE public."UpdateQueue_id_seq";
DROP TABLE public."UpdateQueue";
DROP SEQUENCE public."LeetcodeInfo_id_seq";
DROP TABLE public."LeetcodeInfo";
DROP SEQUENCE public."Group_id_seq";
DROP TABLE public."Group";
-- *not* dropping schema, since initdb creates it
--
-- TOC entry 5 (class 2615 OID 57422)
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
-- Data Pos: 0
--

-- *not* creating schema, since initdb creates it


--
-- TOC entry 2601 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
-- Data Pos: 0
--

COMMENT ON SCHEMA public IS '';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 218 (class 1259 OID 57443)
-- Dependencies: 5
-- Name: Group; Type: TABLE; Schema: public; Owner: -
-- Data Pos: 0
--

CREATE TABLE public."Group" (
    id integer NOT NULL,
    name text NOT NULL,
    description text,
    "coverPhoto" text,
    "createdByEmail" text NOT NULL,
    "inviteID" text NOT NULL,
    "lastAccessed" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- TOC entry 217 (class 1259 OID 57442)
-- Dependencies: 218 5
-- Name: Group_id_seq; Type: SEQUENCE; Schema: public; Owner: -
-- Data Pos: 0
--

CREATE SEQUENCE public."Group_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2602 (class 0 OID 0)
-- Dependencies: 217
-- Name: Group_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
-- Data Pos: 0
--

ALTER SEQUENCE public."Group_id_seq" OWNED BY public."Group".id;


--
-- TOC entry 220 (class 1259 OID 57453)
-- Dependencies: 5
-- Name: LeetcodeInfo; Type: TABLE; Schema: public; Owner: -
-- Data Pos: 0
--

CREATE TABLE public."LeetcodeInfo" (
    id integer NOT NULL,
    avatar text,
    "leetcodeUsername" text NOT NULL,
    ranking integer NOT NULL,
    streak integer NOT NULL,
    "easySolved" integer NOT NULL,
    "mediumSolved" integer NOT NULL,
    "hardSolved" integer NOT NULL
);


--
-- TOC entry 219 (class 1259 OID 57452)
-- Dependencies: 220 5
-- Name: LeetcodeInfo_id_seq; Type: SEQUENCE; Schema: public; Owner: -
-- Data Pos: 0
--

CREATE SEQUENCE public."LeetcodeInfo_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2603 (class 0 OID 0)
-- Dependencies: 219
-- Name: LeetcodeInfo_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
-- Data Pos: 0
--

ALTER SEQUENCE public."LeetcodeInfo_id_seq" OWNED BY public."LeetcodeInfo".id;


--
-- TOC entry 222 (class 1259 OID 57462)
-- Dependencies: 5
-- Name: UpdateQueue; Type: TABLE; Schema: public; Owner: -
-- Data Pos: 0
--

CREATE TABLE public."UpdateQueue" (
    id integer NOT NULL,
    "inTime" timestamp(3) without time zone NOT NULL,
    username text NOT NULL
);


--
-- TOC entry 221 (class 1259 OID 57461)
-- Dependencies: 5 222
-- Name: UpdateQueue_id_seq; Type: SEQUENCE; Schema: public; Owner: -
-- Data Pos: 0
--

CREATE SEQUENCE public."UpdateQueue_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2604 (class 0 OID 0)
-- Dependencies: 221
-- Name: UpdateQueue_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
-- Data Pos: 0
--

ALTER SEQUENCE public."UpdateQueue_id_seq" OWNED BY public."UpdateQueue".id;


--
-- TOC entry 216 (class 1259 OID 57433)
-- Dependencies: 5
-- Name: User; Type: TABLE; Schema: public; Owner: -
-- Data Pos: 0
--

CREATE TABLE public."User" (
    id integer NOT NULL,
    email text NOT NULL,
    name text NOT NULL,
    "leetcodeUsername" text NOT NULL,
    "lastAccessed" timestamp(3) without time zone NOT NULL,
    "lastUpdated" timestamp(3) without time zone NOT NULL,
    "failedRetries" integer DEFAULT 0 NOT NULL
);


--
-- TOC entry 215 (class 1259 OID 57432)
-- Dependencies: 216 5
-- Name: User_id_seq; Type: SEQUENCE; Schema: public; Owner: -
-- Data Pos: 0
--

CREATE SEQUENCE public."User_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2605 (class 0 OID 0)
-- Dependencies: 215
-- Name: User_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
-- Data Pos: 0
--

ALTER SEQUENCE public."User_id_seq" OWNED BY public."User".id;


--
-- TOC entry 223 (class 1259 OID 57470)
-- Dependencies: 5
-- Name: _GroupToUser; Type: TABLE; Schema: public; Owner: -
-- Data Pos: 0
--

CREATE TABLE public."_GroupToUser" (
    "A" integer NOT NULL,
    "B" integer NOT NULL
);


--
-- TOC entry 214 (class 1259 OID 57423)
-- Dependencies: 5
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: -
-- Data Pos: 0
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


--
-- TOC entry 2418 (class 2604 OID 57446)
-- Dependencies: 217 218 218
-- Name: Group id; Type: DEFAULT; Schema: public; Owner: -
-- Data Pos: 0
--

ALTER TABLE ONLY public."Group" ALTER COLUMN id SET DEFAULT nextval('public."Group_id_seq"'::regclass);


--
-- TOC entry 2420 (class 2604 OID 57456)
-- Dependencies: 219 220 220
-- Name: LeetcodeInfo id; Type: DEFAULT; Schema: public; Owner: -
-- Data Pos: 0
--

ALTER TABLE ONLY public."LeetcodeInfo" ALTER COLUMN id SET DEFAULT nextval('public."LeetcodeInfo_id_seq"'::regclass);


--
-- TOC entry 2421 (class 2604 OID 57465)
-- Dependencies: 221 222 222
-- Name: UpdateQueue id; Type: DEFAULT; Schema: public; Owner: -
-- Data Pos: 0
--

ALTER TABLE ONLY public."UpdateQueue" ALTER COLUMN id SET DEFAULT nextval('public."UpdateQueue_id_seq"'::regclass);


--
-- TOC entry 2416 (class 2604 OID 57436)
-- Dependencies: 215 216 216
-- Name: User id; Type: DEFAULT; Schema: public; Owner: -
-- Data Pos: 0
--

ALTER TABLE ONLY public."User" ALTER COLUMN id SET DEFAULT nextval('public."User_id_seq"'::regclass);


--
-- TOC entry 2589 (class 0 OID 57443)
-- Dependencies: 218
-- Data for Name: Group; Type: TABLE DATA; Schema: public; Owner: -
-- Data Pos: 14830
--

COPY public."Group" (id, name, description, "coverPhoto", "createdByEmail", "inviteID", "lastAccessed") FROM stdin;
1       Jamia Millia Islamia    A group of coders of JMI, New Delhi     https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Building_10_jamia.JPG/1920px-Building_10_jamia.JPG    husainshahidrao@gmail.com       iChgPv6pwQ      2023-05-12 00:15:40.437
2       huehuehue       very heavy koding going here. \nprintf("meow")  https://i.redd.it/sbs2usgvs2vy.jpg      husainshahidrao@gmail.com       q3eTrBvZBq      2023-05-13 02:09:29.025
3       Test    \N      https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80  ausaf.esrar@gmail.com   iEe4Y8zkt_      2023-05-13 15:19:51.034
\.


--
-- TOC entry 2591 (class 0 OID 57453)
-- Dependencies: 220
-- Data for Name: LeetcodeInfo; Type: TABLE DATA; Schema: public; Owner: -
-- Data Pos: 15281
--

COPY public."LeetcodeInfo" (id, avatar, "leetcodeUsername", ranking, streak, "easySolved", "mediumSolved", "hardSolved") FROM stdin;
8       https://assets.leetcode.com/users/avatars/avatar_1644332867.png saquib_ali      24539   33      222     439    46
3       https://assets.leetcode.com/users/avatars/avatar_1641588719.png mdsaquibshakeel 370560  18      84      79     9
5       https://assets.leetcode.com/users/avatars/avatar_1653930649.png Sparsh_Mahajan  125778  47      131     194    39
2       https://assets.leetcode.com/users/avatars/avatar_1661110328.png Sarfraz-droid   30360   24      201     379    80
1       https://assets.leetcode.com/users/avatars/avatar_1682222071.png husain3012      330136  17      58      109    23
4       https://assets.leetcode.com/users/avatars/avatar_1662529775.png xpandeyed       11117   174     279     511    98
10      https://assets.leetcode.com/users/avatars/avatar_1637851909.png ps6is   562820  6       58      53      3
6       https://assets.leetcode.com/users/avatars/avatar_1673867786.png Farhan779       181866  41      142     141    10
7       https://s3-us-west-1.amazonaws.com/s3-lc-upload/assets/default_avatar.jpg       tahzeebanwar    343220  19     109      69      6
9       https://s3-us-west-1.amazonaws.com/s3-lc-upload/assets/default_avatar.jpg       Ausaf1  65006   24      110    316      73
\.


--
-- TOC entry 2593 (class 0 OID 57462)
-- Dependencies: 222
-- Data for Name: UpdateQueue; Type: TABLE DATA; Schema: public; Owner: -
-- Data Pos: 15691
--

COPY public."UpdateQueue" (id, "inTime", username) FROM stdin;
\.


--
-- TOC entry 2587 (class 0 OID 57433)
-- Dependencies: 216
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: -
-- Data Pos: 15720
--

COPY public."User" (id, email, name, "leetcodeUsername", "lastAccessed", "lastUpdated", "failedRetries") FROM stdin;
2       alamsarfraz422@gmail.com        Sarfraz Alam    Sarfraz-droid   2023-05-13 15:02:20.711 2023-05-23 18:35:08.8320
1       husainshahidrao@gmail.com       Husain Shahid Rao       husain3012      2023-05-13 14:54:06.979 2023-05-23 18:35:13.427 0
4       lalbiharipandeyg@gmail.com      Pandey  xpandeyed       2023-05-12 16:39:59.975 2023-05-23 18:35:18.928 0
13      mdnoor20205@gmail.com   aNoor   ps6is   2023-05-13 18:00:00.245 2023-05-23 18:35:23.078 0
6       akhtar.farhan779@gmail.com      Mohd Farhan Akhtar      Farhan779       2023-05-12 18:44:34.748 2023-05-23 18:35:32.172 0
7       tahzebazmi1@gmail.com   Tahzeeb tahzeebanwar    2023-05-12 19:19:41.421 2023-05-23 18:35:36.139 0
12      ausaf.esrar@gmail.com   Ausaf Ahmad     Ausaf1  2023-05-13 15:21:16.032 2023-05-23 18:35:41.619 0
11      ALISAQUIB95@GMAIL.COM   Saquib Ali      saquib_ali      2023-05-13 14:31:23.624 2023-05-23 18:35:46.677 0
3       saquib.shakeel.1866@gmail.com   Saquib Shakeel  mdsaquibshakeel 2023-05-12 18:44:21.449 2023-05-23 18:35:51.2480
5       sparshmahajan3@gmail.com        Sparsh Mahajan  Sparsh_Mahajan  2023-05-12 18:43:11.553 2023-05-23 20:07:47.4750
\.


--
-- TOC entry 2594 (class 0 OID 57470)
-- Dependencies: 223
-- Data for Name: _GroupToUser; Type: TABLE DATA; Schema: public; Owner: -
-- Data Pos: 16215
--

COPY public."_GroupToUser" ("A", "B") FROM stdin;
1       1
1       2
1       4
1       5
1       3
1       6
1       7
2       1
1       11
3       12
\.


--
-- TOC entry 2585 (class 0 OID 57423)
-- Dependencies: 214
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: -
-- Data Pos: 16275
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
ddf7f38e-2e5a-4df8-94a0-f0591f52fbc6    db3462f1eea325f5a7b1e8f8cfe9b00aa2376d0c5890d7ac4df8469614af1e33        2023-05-12 00:14:11.460056+00   20230512001410_init     \N      \N      2023-05-12 00:14:11.031969+00   1
\.


--
-- TOC entry 2606 (class 0 OID 0)
-- Dependencies: 217
-- Name: Group_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
-- Data Pos: 0
--

SELECT pg_catalog.setval('public."Group_id_seq"', 3, true);


--
-- TOC entry 2607 (class 0 OID 0)
-- Dependencies: 219
-- Name: LeetcodeInfo_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
-- Data Pos: 0
--

SELECT pg_catalog.setval('public."LeetcodeInfo_id_seq"', 10, true);


--
-- TOC entry 2608 (class 0 OID 0)
-- Dependencies: 221
-- Name: UpdateQueue_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
-- Data Pos: 0
--

SELECT pg_catalog.setval('public."UpdateQueue_id_seq"', 1, false);


--
-- TOC entry 2609 (class 0 OID 0)
-- Dependencies: 215
-- Name: User_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
-- Data Pos: 0
--

SELECT pg_catalog.setval('public."User_id_seq"', 13, true);


--
-- TOC entry 2431 (class 2606 OID 57451)
-- Dependencies: 218
-- Name: Group Group_pkey; Type: CONSTRAINT; Schema: public; Owner: -
-- Data Pos: 0
--

ALTER TABLE ONLY public."Group"
    ADD CONSTRAINT "Group_pkey" PRIMARY KEY (id);


--
-- TOC entry 2434 (class 2606 OID 57460)
-- Dependencies: 220
-- Name: LeetcodeInfo LeetcodeInfo_pkey; Type: CONSTRAINT; Schema: public; Owner: -
-- Data Pos: 0
--

ALTER TABLE ONLY public."LeetcodeInfo"
    ADD CONSTRAINT "LeetcodeInfo_pkey" PRIMARY KEY (id);


--
-- TOC entry 2436 (class 2606 OID 57469)
-- Dependencies: 222
-- Name: UpdateQueue UpdateQueue_pkey; Type: CONSTRAINT; Schema: public; Owner: -
-- Data Pos: 0
--

ALTER TABLE ONLY public."UpdateQueue"
    ADD CONSTRAINT "UpdateQueue_pkey" PRIMARY KEY (id);


--
-- TOC entry 2427 (class 2606 OID 57441)
-- Dependencies: 216
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: -
-- Data Pos: 0
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- TOC entry 2423 (class 2606 OID 57431)
-- Dependencies: 214
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
-- Data Pos: 0
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- TOC entry 2428 (class 1259 OID 57476)
-- Dependencies: 218
-- Name: Group_inviteID_key; Type: INDEX; Schema: public; Owner: -
-- Data Pos: 0
--

CREATE UNIQUE INDEX "Group_inviteID_key" ON public."Group" USING btree ("inviteID");


--
-- TOC entry 2429 (class 1259 OID 57475)
-- Dependencies: 218
-- Name: Group_name_key; Type: INDEX; Schema: public; Owner: -
-- Data Pos: 0
--

CREATE UNIQUE INDEX "Group_name_key" ON public."Group" USING btree (name);


--
-- TOC entry 2432 (class 1259 OID 57477)
-- Dependencies: 220
-- Name: LeetcodeInfo_leetcodeUsername_key; Type: INDEX; Schema: public; Owner: -
-- Data Pos: 0
--

CREATE UNIQUE INDEX "LeetcodeInfo_leetcodeUsername_key" ON public."LeetcodeInfo" USING btree ("leetcodeUsername");


--
-- TOC entry 2437 (class 1259 OID 57478)
-- Dependencies: 222
-- Name: UpdateQueue_username_key; Type: INDEX; Schema: public; Owner: -
-- Data Pos: 0
--

CREATE UNIQUE INDEX "UpdateQueue_username_key" ON public."UpdateQueue" USING btree (username);


--
-- TOC entry 2424 (class 1259 OID 57473)
-- Dependencies: 216
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: -
-- Data Pos: 0
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- TOC entry 2425 (class 1259 OID 57474)
-- Dependencies: 216
-- Name: User_leetcodeUsername_key; Type: INDEX; Schema: public; Owner: -
-- Data Pos: 0
--

CREATE UNIQUE INDEX "User_leetcodeUsername_key" ON public."User" USING btree ("leetcodeUsername");


--
-- TOC entry 2438 (class 1259 OID 57479)
-- Dependencies: 223 223
-- Name: _GroupToUser_AB_unique; Type: INDEX; Schema: public; Owner: -
-- Data Pos: 0
--

CREATE UNIQUE INDEX "_GroupToUser_AB_unique" ON public."_GroupToUser" USING btree ("A", "B");


--
-- TOC entry 2439 (class 1259 OID 57480)
-- Dependencies: 223
-- Name: _GroupToUser_B_index; Type: INDEX; Schema: public; Owner: -
-- Data Pos: 0
--

CREATE INDEX "_GroupToUser_B_index" ON public."_GroupToUser" USING btree ("B");


--
-- TOC entry 2440 (class 2606 OID 57481)
-- Dependencies: 2425 220 216
-- Name: LeetcodeInfo LeetcodeInfo_leetcodeUsername_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
-- Data Pos: 0
--

ALTER TABLE ONLY public."LeetcodeInfo"
    ADD CONSTRAINT "LeetcodeInfo_leetcodeUsername_fkey" FOREIGN KEY ("leetcodeUsername") REFERENCES public."User"("leetcodeUsername") ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 2441 (class 2606 OID 57486)
-- Dependencies: 223 218 2431
-- Name: _GroupToUser _GroupToUser_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
-- Data Pos: 0
--

ALTER TABLE ONLY public."_GroupToUser"
    ADD CONSTRAINT "_GroupToUser_A_fkey" FOREIGN KEY ("A") REFERENCES public."Group"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2442 (class 2606 OID 57491)
-- Dependencies: 216 223 2427
-- Name: _GroupToUser _GroupToUser_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
-- Data Pos: 0
--

ALTER TABLE ONLY public."_GroupToUser"
    ADD CONSTRAINT "_GroupToUser_B_fkey" FOREIGN KEY ("B") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


COMMIT;

-- Completed on 2023-05-27 12:24:40 UTC

--
-- PostgreSQL database dump complete
--