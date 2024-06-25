import client from "../database.js";

class Billet {

  #id;
  #nom;
  #prix;
  #duree;

  constructor(config) {
    this.id = config.id;
    this.nom = config.nom;
    this.prix = config.prix;
    this.duree = config.duree;
  }

  get id() {
    return this.#id;
  }

  get nom() {
    return this.#nom;
  }

  get prix() {
    return this.#prix;
  }

  get duree() {
    return this.#duree;
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

  set prix(value) {
    if (typeof value !== 'number') {
      throw new Error('Prix invalide');
    }
    this.#prix = value;
  }

  set duree(value) {
    if (typeof value !== 'number') {
      throw new Error('Durée invalide');
    }
    this.#duree = value;
  }

  async create() {
    const text = `
      INSERT INTO "billet" ("nom", "prix", "duree")
      VALUES ($1, $2, $3)
      RETURNING id;
    `;
    const values = [this.nom, this.prix, this.duree];
    const result = await client.query(text, values);
    this.#id = result.rows[0].id;
  }

  async update() {
    const text = `
      UPDATE "billet" 
      SET 
        "nom" = $1,
        "prix" = $2,
        "duree" = $3
      WHERE id = $4;
    `;
    const values = [this.nom, this.prix, this.duree, this.id];
    await client.query(text, values);
  }

  async delete() {
    const text = `
      DELETE FROM "billet"
      WHERE id = $1;
    `;
    const values = [this.id];
    await client.query(text, values);
  }

  static async findById(id) {
    const text = `
      SELECT * FROM "billet"
      WHERE id = $1;
    `;
    const values = [id];
    const result = await client.query(text, values);
    if (result.rows.length > 0) {
      return new Billet(result.rows[0]);
    } else {
      throw new Error('Billet non trouvé');
    }
  }
}

export default Billet;
