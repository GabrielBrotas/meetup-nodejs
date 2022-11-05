package entities

import (
	"errors"
	"fmt"
	"time"

	"github.com/GabrielBrotas/meetup-users/pkg/utils"
)

type User struct {
	ID        int       `json:"id"`
	Name      string    `json:"name"`
	Email     string    `json:"email"`
	Password  string    `json:"password"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

func (User) New(name string, password string, email string) (*User, error) {
	user := User{
		ID:        0,
		Name:      name,
		Password:  password,
		Email:     email,
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	}

	err := user.IsValid()

	if err != nil {
		return nil, err
	}

	return &user, nil
}

func (u *User) IsValid() error {
	collection := utils.ErrorCollection{}.New()

	if len(u.Name) <= 3 {
		collection.AddError(fmt.Sprintf("Name should bigger than 3. Got %d", len(u.Name)))
	}

	if len(u.Password) <= 5 {
		collection.AddError("Password must be bigger than 5")
	}

	if len(u.Email) == 0 {
		collection.AddError("Invalid email")
	}

	if collection.HasErrors() {
		return collection.ThrowErrors()
	}

	return nil
}

func (u *User) UpdatePassword(new_password string) error {
	if new_password == u.Password {
		return errors.New("New password must not be equal current password")
	}

	u.Password = new_password

	return nil
}

func (u *User) SetID(id int) {
	u.ID = id
}