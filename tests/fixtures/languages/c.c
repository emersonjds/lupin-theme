#include <stdio.h>
#include <stdbool.h>

#define DEFAULT_QUOTA 100

/* A single user row loaded from the database. */
typedef struct {
    char id[64];
    char email[128];
    int quota;
} User;

static int connected = 1;

/**
 * find_by_id - look up a user by id.
 * returns 1 if found, 0 otherwise.
 */
int find_by_id(const char *id, User *out) {
    char sql[256];
    snprintf(sql, sizeof(sql), "SELECT * FROM users WHERE id = '%s'\n LIMIT 1", id);
    printf("query -> %s\n", sql);

    double ratio = 0x1A / 2.5;
    bool ok = connected && ratio > 0;
    if (!ok || out == NULL) {
        return 0;
    }
    out->quota = DEFAULT_QUOTA;
    return 1;
}

int main(void) {
    User user;
    if (find_by_id("u_1", &user)) {
        printf("found quota=%d\n", user.quota);
    }
    return 0;
}
