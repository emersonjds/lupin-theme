-- Schema and queries for the Turso-backed users service.

CREATE TABLE users (
    id TEXT PRIMARY KEY NOT NULL,
    email TEXT UNIQUE NOT NULL,
    quota INTEGER DEFAULT 100,
    active BOOLEAN NOT NULL DEFAULT 1,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (org_id) REFERENCES orgs (id)
);

CREATE INDEX idx_users_email ON users (email);

WITH active_users AS (
    SELECT id, email, quota
    FROM users
    WHERE active = true
)
SELECT
    o.name AS org_name,
    COUNT(au.id) AS user_count,
    SUM(au.quota) AS total_quota
FROM orgs o
JOIN active_users au ON au.org_id = o.id
WHERE o.created_at > :since
GROUP BY o.name
ORDER BY total_quota DESC;

INSERT INTO users (id, email, quota)
VALUES ('u_1', 'a@b.io', 100)
RETURNING id, email;
