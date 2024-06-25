BEGIN;

DROP TABLE IF EXISTS Utilisateur CASCADE;
DROP TABLE IF EXISTS Commande CASCADE;
DROP TABLE IF EXISTS Attraction CASCADE;
DROP TABLE IF EXISTS Categorie CASCADE;


CREATE TABLE Utilisateur (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    prenom VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    mot_de_passe VARCHAR(255) NOT NULL,
    admin BOOLEAN NOT NULL
);

CREATE TABLE Commande (
    id SERIAL PRIMARY KEY,
    statut BOOLEAN NOT NULL,
    date_de_reservation TEXT NOT NULL,
    nombre_de_jours INTEGER NOT NULL,
    nombre_de_personnes INTEGER NOT NULL,
    reservation_hotel TEXT NOT NULL,
    prix_total NUMERIC(10, 2) NOT NULL,
    utilisateur_id INTEGER NOT NULL REFERENCES Utilisateur(id)
);

CREATE TABLE Categorie (
    id SERIAL PRIMARY KEY,
    nom TEXT NOT NULL
);

CREATE TABLE Attraction (
    id SERIAL PRIMARY KEY,
    nom TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT NOT NULL,
    photo_url_1 TEXT NOT NULL,
    photo_url_2 TEXT,
    photo_url_3 TEXT,
    photo_url_4 TEXT,
    photo_url_5 TEXT,
    horaires TEXT NOT NULL,
    categorie_id INTEGER NOT NULL REFERENCES Categorie(id)
);

COMMIT;