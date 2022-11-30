package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	oidc "github.com/coreos/go-oidc/v3/oidc"
	"golang.org/x/oauth2"
)

var (
	clientID     = os.Getenv("clientID")
	clientSecret = os.Getenv("clientSecret") // Clients -> Credentials
	apiUrl       = os.Getenv("apiUrl")
)

func main() {
	ctx := context.Background()

	log.Println(clientID, clientSecret, apiUrl)

	// endpoint got from Realm Settings -> Endpoints -> Issuer
	provider, err := oidc.NewProvider(ctx, os.Getenv("issuer_oidc_endpoing"))

	if err != nil {
		log.Fatal(err)
	}

	oauth2Config := oauth2.Config{
		ClientID:     clientID,
		ClientSecret: clientSecret,
		Endpoint:     provider.Endpoint(),
		RedirectURL:  apiUrl + "/auth/callback",
		Scopes:       []string{oidc.ScopeOpenID, "profile", "email", "roles", "team"},
	}

	state := os.Getenv("oidc_state") // put in .env

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		http.Redirect(w, r, oauth2Config.AuthCodeURL(state), http.StatusFound)
	})

	var verifier = provider.Verifier(&oidc.Config{ClientID: clientID})

	http.HandleFunc("/auth/callback", func(w http.ResponseWriter, r *http.Request) {
		// Verify state and errors.
		if r.URL.Query().Get("state") != state {
			http.Error(w, "Invalid State", http.StatusBadRequest)
		}

		oauth2Token, err := oauth2Config.Exchange(ctx, r.URL.Query().Get("code")) // exchange the code for a token

		if err != nil {
			// handle error
			http.Error(w, err.Error(), http.StatusInternalServerError)
		}

		// Extract the ID Token from OAuth2 token.
		rawIDToken, ok := oauth2Token.Extra("id_token").(string)

		log.Printf("rawIDToken = ", rawIDToken)

		if !ok {
			// handle missing token
			http.Error(w, "Failed generating IdToken", http.StatusInternalServerError)
		}

		// Parse and verify ID Token payload.
		idToken, err := verifier.Verify(ctx, rawIDToken)
		if err != nil {
			// handle error
			http.Error(w, err.Error(), http.StatusInternalServerError)
		}

		// Extract custom claims
		var claims struct {
			Email    string `json:"email"`
			Verified bool   `json:"email_verified"`
		}

		err = idToken.Claims(&claims)

		if err != nil {
			// handle error
			log.Println("error here :", err)
			log.Fatal(err)
		}

		resp := struct {
			AccessToken *oauth2.Token
			IDToken     string
		}{
			AccessToken: oauth2Token, // oauth2 token, token to authorize user in some service
			IDToken:     rawIDToken,  // authentication token
		}

		data, err := json.Marshal(resp)

		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
		}

		w.Write(data)
	})

	port := 4002
	log.Printf("App running in port %d", port)

	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%d", port), nil))
}
