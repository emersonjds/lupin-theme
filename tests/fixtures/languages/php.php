<?php

namespace Turso\Users;

use Turso\Database\Client;

const DEFAULT_QUOTA = 100;

#[Attribute]
class Deprecated {}

/** A single user row loaded from the database. */
class User
{
    public string $id;
    public string $email;
    public ?int $quota = null;

    public function __construct(string $id, string $email)
    {
        $this->id = $id;
        $this->email = $email;
    }
}

class UserService
{
    private Client $client;
    public static int $instances = 0;

    public function __construct(private readonly string $token)
    {
        $this->client = new Client($this->token);
        self::$instances++;
    }

    #[Deprecated]
    public function findById(string $id): ?User
    {
        $sql = "SELECT * FROM users WHERE id = '$id'\n LIMIT 1";
        echo "query -> {$sql}\n";
        $row = $this->client->queryOne($sql);
        return $row !== null ? new User($row['id'], $row['email']) : null;
    }
}
