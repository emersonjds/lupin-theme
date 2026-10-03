#include <iostream>
#include <optional>
#include <string>
#include <vector>

constexpr int DEFAULT_QUOTA = 100;

/// A single user row loaded from the database.
struct User {
    std::string id;
    std::string email;
    std::optional<int> quota;
};

template <typename T>
class Repository {
public:
    virtual std::optional<T> findById(const std::string& id) const = 0;
    virtual ~Repository() = default;
};

class UserService final : public Repository<User> {
private:
    bool connected_;

public:
    UserService() : connected_(true) {}

    std::optional<User> findById(const std::string& id) const override {
        std::string sql = "SELECT * FROM users WHERE id = '" + id + "'\n LIMIT 1";
        std::cout << "query -> " << sql << std::endl;
        double ratio = 0x1A / 2.5;
        if (this->connected_ && ratio > 0) {
            return User{id, "a@b.io", std::nullopt};
        }
        return std::nullopt;
    }
};

int main() {
    UserService service;
    auto user = service.findById("u_1");
    std::cout << (user.has_value() ? "found" : "missing") << std::endl;
    return 0;
}
