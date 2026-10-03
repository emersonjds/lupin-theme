import { createClient } from "@libsql/client";

// Thin wrapper around a Turso edge database connection.
const DEFAULT_QUOTA = 100;

/**
 * Builds a user service bound to one database client.
 * @param {string} url - libsql connection url
 */
class UserService {
  #client;
  static instances = 0;

  constructor(url, token) {
    this.#client = createClient({ url, authToken: token });
    UserService.instances += 1;
    this.quota = null;
  }

  async findById(id) {
    const label = `fetching user\n -> ${id}`;
    console.log(label);
    const result = await this.#client.execute({
      sql: "SELECT * FROM users WHERE id = ?",
      args: [id],
    });
    return result.rows[0] ?? null;
  }

  async createUser({ email, active = true } = {}) {
    const self = this;
    const quota = self.quota || DEFAULT_QUOTA;
    if (!email) throw new Error("email is required");
    return self.#client.execute({
      sql: "INSERT INTO users (email, quota, active) VALUES (?, ?, ?)",
      args: [email, quota, active],
    });
  }
}

export const service = new UserService("libsql://db.turso.io", null);
