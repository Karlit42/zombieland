import client from "../database.js";
import slugify from "slugify";

class Attraction {

  #id;
  #nom;
  #slug;
  #description;
  #photo1;
  #photo2;
  #photo3;
  #photo4;
  #photo5;
  #horaires;
  #categorie_id;

  constructor(config) {
    this.id = config.id;
    this.nom = config.nom;
    this.slug = slugify(config.nom, {
      lower: true,
      strict: true,
    });
    this.description = config.description;
    this.photo1 = config.photo1;
    this.photo2 = config.photo2;
    this.photo3 = config.photo3;
    this.photo4 = config.photo4;
    this.photo5 = config.photo5;
    this.horaires = config.horaires;
    this.categorie_id = config.categorie_id;
  }

  get id() {
    return this.#id;
  }

  get nom() {
    return this.#nom;
  }

  get slug() {
    return this.#slug;
  }

  get description() {
    return this.#description;
  }

  get photo1() {
    return this.#photo1;
  }

  get photo2() {
    return this.#photo2;
  }

  get photo3() {
    return this.#photo3;
  }

  get photo4() {
    return this.#photo4;
  }

  get photo5() {
    return this.#photo5;
  }

  get horaires() {
    return this.#horaires;
  }

  get categorie_id() {
    return this.#categorie_id;
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

  set slug(value) {
    if (typeof value !== 'string' || value.trim() === '') {
      throw new Error('Slug incorrect');
    }
    this.#slug = value.trim();
  }

  set description(value) {
    if (!value) {
      throw new Error('Description requise');
    }
    this.#description = value;
  }

  set photo1(value) {
    if (!value) {
      throw new Error('Nom requis');
    }
    this.#photo1 = value;
  }

  set photo2(value) {
    this.#photo2 = value;
  }

  set photo3(value) {
    this.#photo3 = value;
  }

  set photo4(value) {
    this.#photo4 = value;
  }

  set photo5(value) {
    this.#photo5 = value;
  }

  set horaires(value) {
    if (!value) {
      throw new Error('Horaires requis');
    }
    this.#horaires = value;
  }

  set categorie_id(value) {
    if (!value) {
      throw new Error('Il manque l\'id categorie')
    }
    this.#categorie_id = value;
  }

  async create() {
    const text = `
      INSERT INTO "attraction" ("nom", "slug", "description", "photo_url_1", "photo_url_2", "photo_url_3", "photo_url_4", "photo_url_5", "horaires", "categorie_id")
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING id;
    `;
    const values = [this.nom, this.slug, this.description, this.photo1, this.photo2, this.photo3, this.photo4, this.photo5, this.horaires, this.categorie_id];
    const result = await client.query(text, values);
    this.#id = result.rows[0].id;
  }

  async update() {
    const text = `
      UPDATE "attraction" 
      SET 
        "nom" = $1,
        "slug" = $2,
        "description" = $3,
        "photo_url_1" = $4,
        "photo_url_2" = $5,
        "photo_url_3" = $6,
        "photo_url_4" = $7,
        "photo_url_5" = $8,
        "horaires" = $9,
        "categorie_id" = $10
      WHERE slug = $2;
    `;
    const values = [this.nom, this.slug, this.description, this.photo1, this.photo2, this.photo3, this.photo4, this.photo5, this.horaires, this.categorie_id];
    await client.query(text, values);
  }

  async delete() {
    const text = `
      DELETE FROM "attraction"
      WHERE id = $1;
    `;
    const values = [this.id];
    await client.query(text, values);
  }

  static async findByName(nom) {
    const text = `
      SELECT * FROM "attraction"
      WHERE nom = $1;
    `;
    const values = [nom];
    const result = await client.query(text, values);
    if (result.rows.length > 0) {
        return result;
    } else {
        throw new Error('Aucune attraction trouvée');
    }
  }

  static async findBySlug(slug) {
    const text = `
      SELECT * FROM "attraction"
      WHERE slug = $1;
      `;
    const value = [slug];
    const result = await client.query(text, value);
    if (result.rows.length > 0) {
      return result;
    } else {
      throw new Error('Aucune attraction trouvée');
    }
  }

  static async findByCategorie(categorie_id) {
    const text = `
      SELECT * FROM "attraction"
      WHERE "categorie_id" = $1;
      `;
    const value = [categorie_id];
    const result = await client.query(text, value);
    if (result.rows.length > 0) {
      return result;
    } else {
      throw new Error('Aucune attraction trouvée');
    }
  }

  static async findAll() {
    const text = `
      SELECT * FROM "attraction";
    `;
    const result = await client.query(text);
    if (result.rows.length > 0) {
      return result;
    } else {
      throw new Error('Aucune attraction trouvée');
    }
  }

  static async findAllPagination(limit = 5, offset = 0) {
    const text = `
      SELECT * FROM "attraction"
      ORDER BY "id" ASC
      LIMIT $1 OFFSET $2;
    `;
    const values = [limit, offset];
    const result = await client.query(text, values);
    if (result.rows.length > 0) {
      return result;
    } else {
      throw new Error('Aucune attraction trouvée');
    }
  }
}

export default Attraction;
