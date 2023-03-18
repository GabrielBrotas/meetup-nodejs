package entities

import (
	"time"

	"github.com/GabrielBrotas/meetup-auth/internal/sso"
)

type User struct {
	ID         int64
	Provider   sso.OAuth2ProviderEnum
	ProviderID int // unique identifier from the SSO provider
	UserName   string
	CreatedAt  time.Time
	UpdatedAt  time.Time
}

func NewUser(provider sso.OAuth2ProviderEnum, providerID int, username string) *User {
	return &User{
		Provider:   provider,
		ProviderID: providerID,
		UserName:   username,
		CreatedAt:  time.Now(),
		UpdatedAt:  time.Now(),
	}
}
