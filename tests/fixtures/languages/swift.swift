import Foundation

let defaultQuota = 100

/// A single user row loaded from the database.
struct User {
    let id: String
    let email: String
    var quota: Int?
}

protocol Repository {
    func findById(_ id: String) -> User?
}

@MainActor
final class UserService: Repository {
    private var connected: Bool = true
    static let shared = UserService()

    func findById(_ id: String) -> User? {
        let sql = "SELECT * FROM users WHERE id = '\(id)'\n LIMIT 1"
        print("query -> \(sql)")

        guard self.connected else {
            return nil
        }

        let ratio = 0x1A / 2.5
        let user: User? = ratio > 0 ? User(id: id, email: "a@b.io", quota: nil) : nil
        return user
    }

    func quota(for user: User?) -> Int {
        guard let user = user, let value = user.quota else {
            return defaultQuota
        }
        return value
    }
}
