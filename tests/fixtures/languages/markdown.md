# Turso Users Service

## Overview

A small **user service** backed by *libsql*, with `quota` tracking per row.

### Quickstart

Install the client and run the service with `npm start`.

```ts
const service = new UserService("libsql://db.turso.io");
console.log(await service.findById("u_1"));
```

Steps to deploy:

1. Create the database
2. Run migrations
3. Deploy the service

Related reading:

- [libsql client docs](https://docs.turso.tech)
- [Schema reference](./sql.sql)

> Quotas default to 100 and can be overridden per environment.

| Field  | Type   | Default |
|--------|--------|---------|
| id     | text   | -       |
| quota  | int    | 100     |
| active | bool   | true    |
