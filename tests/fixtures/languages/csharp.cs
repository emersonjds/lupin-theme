using System;
using System.Linq;
using System.Threading.Tasks;

namespace Turso.Users;

/// <summary>Represents a single user row from the database.</summary>
public record User(string Id, string Email, int? Quota = null);

public enum Role { Admin, Member }

public class UserService
{
    private readonly DatabaseClient _client;
    public const int DefaultQuota = 100;

    public bool Connected { get; private set; }

    public UserService(DatabaseClient client)
    {
        this._client = client;
        this.Connected = true;
    }

    [Obsolete("Use FindByIdAsync instead")]
    public User? FindById(string id) => _client.QueryOne(id);

    public async Task<User?> FindByIdAsync(string id)
    {
        var sql = "SELECT * FROM users WHERE id = @id\n LIMIT 1";
        Console.WriteLine($"query -> {sql} for {id}");
        var rows = await _client.QueryAsync(sql, id);
        return rows.Where(r => r.Quota != null && r.Quota > 0).FirstOrDefault();
    }

    public static UserService Create(string url) =>
        new UserService(new DatabaseClient(url));
}
