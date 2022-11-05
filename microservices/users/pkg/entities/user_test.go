package entities_test

import (
	"log"
	"testing"

	"github.com/GabrielBrotas/meetup-users/pkg/entities"
	"github.com/stretchr/testify/require"
)

var stub_user = map[string]string{
	"name":     "Jon Doe",
	"email":    "jondoe@gmail.com",
	"password": "123456",
}

func TestNewUser(t *testing.T) {
	user, err := entities.User{}.New(
		stub_user["name"],
		stub_user["password"],
		stub_user["email"],
	)

	require.Nil(t, err)
	require.Equal(t, stub_user["name"], user.Name)
	require.Equal(t, stub_user["password"], user.Password)
	require.Equal(t, stub_user["email"], user.Email)
	log.Println(user.CreatedAt)
}

func TestInvalidUser(t *testing.T) {
	small_name_user, err := entities.User{}.New(
		"abc",
		stub_user["password"],
		stub_user["email"],
	)

	require.NotNil(t, err)
	require.Nil(t, small_name_user)

	small_password_user, err := entities.User{}.New(
		stub_user["name"],
		"12345",
		stub_user["email"],
	)

	require.NotNil(t, err)
	require.Nil(t, small_password_user)

	invalid_email_user, err := entities.User{}.New(
		stub_user["name"],
		stub_user["password"],
		"",
	)

	require.NotNil(t, err)
	require.Nil(t, invalid_email_user)

}

func TestUpdatePassword(t *testing.T) {
	user, err := entities.User{}.New(
		stub_user["name"],
		stub_user["password"],
		stub_user["email"],
	)

	require.Nil(t, err)

	err = user.UpdatePassword("1234567")

	require.Nil(t, err)
	require.Equal(t, "1234567", user.Password)

	err = user.UpdatePassword("1234567")
	require.NotNil(t, err)
	require.Equal(t, "1234567", user.Password)
}

func TestSetID(t *testing.T) {
	user, err := entities.User{}.New(
		stub_user["name"],
		stub_user["password"],
		stub_user["email"],
	)

	require.Nil(t, err)

	user.SetID(2)

	require.Equal(t, 2, user.ID)
}