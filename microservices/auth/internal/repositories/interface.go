package repositories

import "github.com/GabrielBrotas/meetup-auth/internal/entities"

type IUsersRepository interface {
	Save(category *entities.User) error
	GetByProviderID(id int) *entities.User
	List() ([]*entities.User, error)
}
