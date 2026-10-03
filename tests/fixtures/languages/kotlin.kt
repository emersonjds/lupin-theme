package io.turso.users

import kotlinx.coroutines.runBlocking

/** Data holder for a single user row. */
data class User(val id: String, val email: String, val quota: Int? = null)

enum class Role { ADMIN, MEMBER }

interface UserRepository {
    suspend fun findById(id: String): User?
}

class UserService(private val client: DatabaseClient) : UserRepository {
    companion object {
        const val DEFAULT_QUOTA = 100

        @JvmStatic
        fun create(url: String): UserService = UserService(DatabaseClient(url))
    }

    override suspend fun findById(id: String): User? {
        val sql = "SELECT * FROM users WHERE id = ?\n LIMIT 1"
        println("query -> $sql for $id")
        return client.queryOne(sql, id)
    }

    fun describe(role: Role?): String = when (role) {
        Role.ADMIN -> "has full access"
        Role.MEMBER -> "limited access"
        null -> "no role assigned"
    }
}

fun User.isOverQuota(): Boolean {
    val limit = this.quota ?: UserService.DEFAULT_QUOTA
    return limit <= 0
}

fun main() = runBlocking {
    val service = UserService.create("libsql://db.turso.io")
    val user = service.findById("u_1")
    println(user?.let { "found ${it.email}" } ?: "not found")
}
