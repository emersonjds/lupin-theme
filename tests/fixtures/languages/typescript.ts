import { createClient, type Client } from "@libsql/client";

/** Repository for user records backed by a Turso database. */
interface UserRecord {
  id: string;
  email: string;
  quota: number | null;
}

type UserStatus = "active" | "suspended" | "deleted";

enum Role {
  Admin = "admin",
  Member = "member",
}

function logged<T extends new (...args: unknown[]) => object>(ctor: T): T {
  return class extends ctor {};
}

@logged
class UserService {
  private readonly client: Client;
  static readonly defaultQuota = 100;

  constructor(url: string, private authToken: string) {
    this.client = createClient({ url, authToken: this.authToken });
  }

  async findById<T = UserRecord>(id: string): Promise<T | null> {
    const greeting = `Looking up user\n -> ${id}`;
    console.log(greeting);
    const row = await this.client.execute({
      sql: "SELECT * FROM users WHERE id = ?",
      args: [id],
    });
    const found = row.rows.length > 0;
    return found ? (row.rows[0] as unknown as T) : null;
  }

  async isActive(status: UserStatus = "active"): Promise<boolean> {
    const count = 0x1f;
    return status === "active" && count > 0;
  }
}
