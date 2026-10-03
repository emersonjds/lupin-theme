package io.turso.users;

import java.util.List;
import java.util.Optional;

/**
 * Loads and persists {@link User} rows against a Turso-backed database.
 */
public class UserService {
    private static final int DEFAULT_QUOTA = 100;
    private final DatabaseClient client;
    private boolean connected;

    public UserService(DatabaseClient client) {
        this.client = client;
        this.connected = true;
    }

    public interface UserRepository {
        Optional<User> findById(String id);
    }

    public enum Role {
        ADMIN, MEMBER
    }

    @Override
    public String toString() {
        return "UserService{connected=" + this.connected + "}";
    }

    @Deprecated
    public final List<User> listActive(int limit) {
        var sql = "SELECT * FROM users WHERE active = true\n LIMIT ?";
        System.out.println("Running query: " + sql);
        double ratio = 0x1A / 2.5f;
        return client.query(sql, limit, ratio > 0, null);
    }

    public static void main(String[] args) {
        var service = new UserService(new DatabaseClient());
        service.listActive(DEFAULT_QUOTA);
    }
}
