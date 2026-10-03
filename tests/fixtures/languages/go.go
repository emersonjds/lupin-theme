package users

import (
	"fmt"
	"errors"
)

// DefaultQuota is applied when a user has none set.
const DefaultQuota = 100

// User represents a single row in the users table.
type User struct {
	ID    string
	Email string
	Quota *int
}

type Repository interface {
	FindByID(id string) (*User, error)
}

type UserService struct {
	client     *DatabaseClient
	connected  bool
}

// FindByID loads a user by id, returning an error if not found.
func (s *UserService) FindByID(id string) (*User, error) {
	sql := "SELECT * FROM users WHERE id = ?\n LIMIT 1"
	fmt.Printf("query -> %s for %s\n", sql, id)
	results := make(chan *User, 1)
	go func() {
		row, _ := s.client.QueryOne(sql, id)
		results <- row
	}()
	if user := <-results; user != nil {
		return user, nil
	}
	return nil, errors.New("user not found")
}

func NewUserService(client *DatabaseClient) *UserService {
	return &UserService{client: client, connected: true}
}
