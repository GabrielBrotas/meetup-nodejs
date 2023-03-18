package sso

import (
	"context"
	"os"

	"github.com/google/go-github/github"
	"golang.org/x/oauth2"
)

type GithubProvider struct {
	config *oauth2.Config
}

// Generates the URL that the user should be redirected to in order to authenticate with Github.
// state params is used to protect against cross-site request forgery (CSRF) attacks.
func (gh *GithubProvider) AuthCodeURL(state string) string {
	return gh.config.AuthCodeURL(state)
}

// Takes the OAuth2 authorization code as a parameter generated from the callback url
// and exchanges it for an OAuth2 access token.
// It returns a pointer to an oauth2.Token struct that contains the access token and any associated refresh token and expiration time,
// as well as an error if the exchange fails.
func (gh *GithubProvider) Exchange(ctx context.Context, code string) (*oauth2.Token, error) {
	return gh.config.Exchange(ctx, code)
}

// Retrieve the authenticated user's profile information
func (gh *GithubProvider) GetUserData(token *oauth2.Token) (*github.User, error) {
	client := github.NewClient(gh.config.Client(context.Background(), token))
	user, _, err := client.Users.Get(context.Background(), "")
	if err != nil {
		return nil, err
	}
	return user, nil
}

func NewGithubProvider(clientID, clientSecret string) OAuth2Provider {
	config := &oauth2.Config{
		ClientID:     os.Getenv("GITHUB_CLIENT_ID"),
		ClientSecret: os.Getenv("GITHUB_CLIENT_SECRET"),
		RedirectURL:  "http://localhost:9090/auth/callback",
		Scopes:       []string{"user:email"},
		Endpoint: oauth2.Endpoint{
			AuthURL:  "https://github.com/login/oauth/authorize",
			TokenURL: "https://github.com/login/oauth/access_token",
		},
	}

	return &GithubProvider{config}
}
