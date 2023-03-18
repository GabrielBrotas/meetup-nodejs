package sso

import (
	"context"

	"github.com/google/go-github/github"
	"golang.org/x/oauth2"
)

type OAuth2Provider interface {
	AuthCodeURL(state string) string
	Exchange(ctx context.Context, code string) (*oauth2.Token, error)
	GetUserData(token *oauth2.Token) (*github.User, error)
}

type OAuth2ProviderEnum string

const (
	Github OAuth2ProviderEnum = "github"
)

func NewOAuth2Provider(provider OAuth2ProviderEnum, clientID string, clientSecret string) OAuth2Provider {
	switch provider {
	case Github:
		return NewGithubProvider(clientID, clientSecret)
	default:
		return NewGithubProvider(clientID, clientSecret)
	}
}
