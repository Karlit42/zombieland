import client from "../database.js";

class Commande {

  #id;
  #statut;
  #date_de_reservation;
  #nombre_de_jours;
  #nombre_de_personnes;
  #reservation_hotel;
  #prix_total;
  #utilisateur_id;

  constructor(config) {
    this.id = config.id;
    this.statut = config.statut;
    this.date_de_reservation = config.date_de_reservation;
    this.nombre_de_jours = config.nombre_de_jours;
    this.nombre_de_personnes = config.nombre_de_personnes;
    this.reservation_hotel = config.reservation_hotel;
    this.prix_total = config.prix_total;
    this.utilisateur_id = config.utilisateur_id;
  }

  get id() {
    return this.#id;
  }

  get statut() {
    return this.#statut;
  }

  get date_de_reservation() {
    return this.#date_de_reservation;
  }

  get nombre_de_jours() {
    return this.#nombre_de_jours;
  }

  get nombre_de_personnes() {
    return this.#nombre_de_personnes;
  }

  get reservation_hotel() {
    return this.#reservation_hotel;
  }

  get prix_total() {
    return this.#prix_total;
  }

  get utilisateur_id() {
    return this.#utilisateur_id;
  }

  set id(value) {
    if (typeof value !== 'number' && typeof value !== 'undefined') {
      throw new Error('Id incorrect');
    }
    this.#id = value;
  }

  set statut(value) {
    if (typeof value !== 'boolean') {
      throw new Error('Statut doit être un booléen');
    }
    this.#statut = value;
  }

  set date_de_reservation(value) {
    if (typeof value !== 'string') {
      throw new Error('Date invalide');
    }
    this.#date_de_reservation = value;
  }

  set nombre_de_jours(value) {
    if (typeof value !== 'number' || value < 1) {
      throw new Error('Nombre de jours invalide');
    }
    this.#nombre_de_jours = value;
  }

  set nombre_de_personnes(value) {
    if (typeof value !== 'number' || value < 1) {
      throw new Error('Nombre de personnes invalide');
    }
    this.#nombre_de_personnes = value;
  }

  set reservation_hotel(value) {
    if (typeof value !== 'string') {
      throw new Error('Reservation hotel doit être une chaine de caractères');
    }
    this.#reservation_hotel = value;
  }

  set prix_total(value) {
    if (typeof value !== 'number' || value <= 0) {
      throw new Error('Prix total invalide');
    }
    this.#prix_total = value;
  }

  set utilisateur_id(value) {
    if (!value) {
      throw new Error('Il manque l\'id de l\'utilisateur')
    }
    this.#utilisateur_id = value;
  }

  async create() {
    const text = `
      INSERT INTO "commande" ("statut", "date_de_reservation", "nombre_de_jours", "nombre_de_personnes", "reservation_hotel", "prix_total", "utilisateur_id")
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id;
    `;
    const values = [this.statut, this.date_de_reservation, this.nombre_de_jours, this.nombre_de_personnes, this.reservation_hotel, this.prix_total, this.utilisateur_id];
    const result = await client.query(text, values);
    this.#id = result.rows[0].id;
  }

  async update() {
    const text = `
      UPDATE "commande" 
      SET 
        "statut" = $1,
        "date_de_reservation" = $2,
        "nombre_de_jours" = $3,
        "nombre_de_personnes" = $4,
        "reservation_hotel" = $5,
        "prix_total" = $6,
        "utilisateur_id" = $7
      WHERE id = $8;
    `;
    const values = [this.statut, this.date_de_reservation, this.nombre_de_jours, this.nombre_de_personnes, this.reservation_hotel, this.prix_total, this.utilisateur_id, this.id];
    await client.query(text, values);
  }

  async delete() {
    const text = `
      DELETE FROM "commande"
      WHERE id = $1;
    `;
    const values = [this.id];
    await client.query(text, values);
  }

  static async deleteCommande(id) {
    const text = `
      DELETE FROM "commande"
      WHERE id = $1;
    `;
    const values = [id];
    await client.query(text, values);
}

  static async findById(id) {
    const text = `
      SELECT * FROM "commande"
      WHERE id = $1;
    `;
    const values = [id];
    const result = await client.query(text, values);
    if (result.rows.length > 0) {
      return result;
    } else {
      throw new Error('Commande non trouvée');
    }
  }

  static async toggleStatutById(id) {
    // Vérifie si l'id est fourni et est un nombre
    if (!id || typeof id !== 'number') {
        throw new Error('Un ID valide est requis pour archiver une commande.');
    }

    // Préparation de la requête SQL pour mettre à jour l'attribut 'statut'
    const text = `
      UPDATE "commande"
      SET "statut" = NOT "statut"
      WHERE "id" = $1
      RETURNING *;
    `;
    const values = [id];

    try {
        const result = await client.query(text, values);
        if (result.rowCount === 0) {
            throw new Error(`Aucune commande trouvé avec l'ID ${id}.`);
        }
        return result;
    } catch (error) {
        console.error('Erreur lors de la promotion de l\'utilisateur en administrateur:', error);
        throw new Error('Erreur lors de la mise à jour de l\'utilisateur.');
    }
  }

  static async findByUtilisateur_id(utilisateur_id) {
    const text = `
      SELECT * FROM "commande"
      WHERE utilisateur_id = $1;
    `;
    const values = [utilisateur_id];
    const result = await client.query(text, values);
    if (result.rows.length > 0) {
      return result;
    } else {
      return null;
    }
  }

  static async findAllPagination(limit = 5, offset = 0) {
    const text = `
      SELECT commande.*, utilisateur.nom AS utilisateur_nom, utilisateur.prenom AS utilisateur_prenom FROM "commande"
      JOIN utilisateur ON commande.utilisateur_id = utilisateur.id
      WHERE commande.statut = FALSE
      ORDER BY commande.id ASC
      LIMIT $1 OFFSET $2;
    `;
    const values = [limit, offset];
    const result = await client.query(text, values);
    if (result.rows.length > 0) {
      return result;
    } else {
      throw new Error('Aucune commande trouvée');
    }
  }

  static async toggleStatutsByUtilisateurId(utilisateur_id) {
    // Vérifie si l'utilisateur_id est fourni et est un nombre
    if (!utilisateur_id || typeof utilisateur_id !== 'number') {
        throw new Error('Un ID utilisateur valide est requis pour modifier le statut des commandes.');
    }

    // Préparation de la requête SQL pour mettre à jour les statuts des commandes de l'utilisateur
    const text = `
      UPDATE "commande"
      SET "statut" = FALSE
      WHERE "utilisateur_id" = $1 AND "statut" = TRUE
      RETURNING *;
    `;
    const values = [utilisateur_id];

    try {
        const result = await client.query(text, values);
        if (result.rowCount === 0) {
            throw new Error(`Aucune commande active trouvée pour l'utilisateur avec l'ID ${utilisateur_id}.`);
        }
        return result;
    } catch (error) {
        console.error('Erreur lors de la mise à jour des statuts des commandes:', error);
        throw new Error('Erreur lors de la mise à jour des statuts des commandes.');
    }
}

static async findActiveCommandesByUtilisateurId(utilisateur_id) {
  const text = `
    SELECT * FROM "commande"
    WHERE utilisateur_id = $1 AND statut = TRUE;
  `;
  const values = [utilisateur_id];
  try {
      const result = await client.query(text, values);
      if (result.rows.length > 0) {
        return result;
      } else {
        return null;
      }
  } catch (error) {
      console.error('Erreur lors de la récupération des commandes:', error);
      throw new Error('Erreur lors de la récupération des commandes actives pour l\'utilisateur.');
  }
}

}

export default Commande;