import validator from "validator";
import client from "../database.js";

class Utilisateur {

  #id;
  #nom;
  #prenom;
  #email;
  #mot_de_passe;
  #admin;

  constructor(config) {
    this.id = config.id;
    this.nom = config.nom;
    this.prenom = config.prenom;
    this.email = config.email;
    this.mot_de_passe = config.mot_de_passe;
    this.admin = config.admin;
  }

  get id() {
    return this.#id;
  }

  get nom() {
    return this.#nom;
  }

  get prenom() {
    return this.#prenom;
  }

  get email() {
    return this.#email;
  }

  get mot_de_passe() {
    return this.#mot_de_passe;
  }

  get admin() {
    return this.#admin;
  }

  set id(value) {
    if (typeof value !== 'number' && typeof value !== 'undefined') {
      throw new Error('Id incorrect');
    }
    this.#id = value;
  }

  set nom(value) {
    if (!value) {
      throw new Error('Nom requis');
    }
    this.#nom = value;
  }

  set prenom(value) {
    if (!value) {
      throw new Error('Prénom requis');
    }
    this.#prenom = value;
  }

  set email(value) {
    if (!validator.isEmail(value)) {
      throw new Error('Email invalide');
    }
    this.#email = value;
  }

  set mot_de_passe(value) {
    if (!value) {
      throw new Error('Mot de passe requis');
    }
    this.#mot_de_passe = value;
  }

  set admin(value) {
    if (typeof value !== 'boolean') {
      throw new Error('La valeur de admin doit être un booléen');
    }
    this.#admin = value;
  }

  async create() {
    const text = `
      INSERT INTO "utilisateur" ("nom", "prenom", "email", "mot_de_passe", "admin")
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id;
    `;
    const values = [this.nom, this.prenom, this.email, this.mot_de_passe, this.admin];
    const result = await client.query(text, values);
    this.#id = result.rows[0].id;
  }

  async update() {
    const text = `
      UPDATE "utilisateur" 
      SET 
        "nom" = $1,
        "prenom" = $2,
        "email" = $3,
        "mot_de_passe" = $4,
        "admin" = $5
      WHERE id = $6;
    `;
    const values = [this.nom, this.prenom, this.email, this.mot_de_passe, this.admin, this.id];
    await client.query(text, values);
  }

  static async delete(id) {
    const deleteCommandsText = `
      DELETE FROM "commande"
      WHERE utilisateur_id = $1;
    `;
    await client.query(deleteCommandsText, [id]);

    // Ensuite, supprimer l'utilisateur
    const deleteUserText = `
      DELETE FROM "utilisateur"
      WHERE id = $1;
    `;
    await client.query(deleteUserText, [id]);
}

static async searchByNameOrSurname(searchTerm) {
  const text = `
      SELECT * FROM "utilisateur"
      WHERE "nom" ILIKE $1 OR "prenom" ILIKE $1
      ORDER BY "id" ASC;
  `;
  const values = [`%${searchTerm}%`]; // Utilisez ILIKE pour une recherche insensible à la casse et les % pour des correspondances partielles
  const result = await client.query(text, values);
  return result.rows; // Retourne tous les utilisateurs correspondants
}

  static async findByEmail(email) {
    const request = `SELECT * FROM "utilisateur" WHERE email = $1`;
    const result = await client.query(request, [email]);

    if(result.rowCount > 0) {
        // console.log(result.rows[0]);
        return result.rows[0];
    } else {
        throw new Error('Utilisateur non trouvé')
    }
  }

  static async findById(id) {
    const text = `
      SELECT * FROM "utilisateur"
      WHERE id = $1;
    `;
    const values = [id];
    const result = await client.query(text, values);
    if (result.rowCount > 0) {
      return result.rows[0];
    }
    else {
      throw new Error('User non trouvé');
    }
  }

  static async findAllPagination(limit = 5, offset = 0) {
    const text = `
      SELECT * FROM "utilisateur"
      ORDER BY "id" ASC
      LIMIT $1 OFFSET $2;
    `;
    const values = [limit, offset];
    const result = await client.query(text, values);
    if (result.rows.length > 0) {
      return result;
    } else {
      throw new Error('Aucun utilisateurs trouvée');
    }
  }

  static async makeAdmin(id) {
    // Vérifie si l'id est fourni et est un nombre
    if (!id || typeof id !== 'number') {
        throw new Error('Un ID valide est requis pour promouvoir un utilisateur en administrateur.');
    }

    // Préparation de la requête SQL pour mettre à jour l'attribut 'admin'
    const text = `
      UPDATE "utilisateur"
      SET "admin" = NOT "admin"
      WHERE "id" = $1
      RETURNING *;
    `;
    const values = [id];

    try {
        const result = await client.query(text, values);
        if (result.rowCount === 0) {
            // Si aucun utilisateur n'a été mis à jour, cela signifie que l'ID fourni n'existe pas dans la base de données
            throw new Error(`Aucun utilisateur trouvé avec l'ID ${id}.`);
        }
        // Retourne l'utilisateur promu pour confirmation
        return result.rows[0];
    } catch (error) {
        // Gestion des erreurs liées à la requête SQL ou à la connexion à la base de données
        console.error('Erreur lors de la promotion de l\'utilisateur en administrateur:', error);
        throw new Error('Erreur lors de la mise à jour de l\'utilisateur.');
    }
  }

}

export default Utilisateur;
