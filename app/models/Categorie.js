import client from "../database.js";

class Categorie {

    #id;
    #nom;

    constructor(config) {
        this.id = config.id;
        this.nom = config.nom;
    }

    get id() {
        return this.#id;
    }

    get nom() {
        return this.#nom;
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

    async create() {
        const text = `
            INSERT INTO "categorie" ("nom")
            VALUES ($1)
            RETURNING id;
        `;
        const values = [this.nom];
        const result = await client.query(text, values);
        this.#id = result.rows[0].id;
    }

    async update() {
        const text = `
            UPDATE "categorie"
            SET
                "nom" = $1,
            WHERE id = $2;
        `;
        const values = [this.nom, this.id];
        await client.query(text, values);
    }

    async delete() {
        const text = `
        DELETE FROM "categorie"
        WHERE id = $1;
    `;
    const values = [this.id];
    await client.query(text, values);
    }

    static async findById(id) {
        const text = `
            SELECT * FROM "categorie"
            WHERE id = $1;
        `;
        const values = [id];
        const result = await client.query(text, values);
        if (result.rows.length > 0) {
            return new Categorie(result.rows[0]);
        } else {
            throw new Error('Categorie non trouvée');
        }
    }

    static async findAll() {
        const text = `
            SELECT * FROM "categorie"
        `;
        const result = await client.query(text);
        if (result.rows.length > 0) {
            return result;
        } else {
            throw new Error('Categories non trouvées');
        }
    }
}

export default Categorie;