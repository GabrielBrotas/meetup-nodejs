package repositories

import "github.com/GabrielBrotas/meetup-auth/internal/entities"

type inMemoryUsersRepository struct {
	db []*entities.User
}

func NewInMemoryUsersRepository() *inMemoryUsersRepository {
	return &inMemoryUsersRepository{
		db: make([]*entities.User, 0),
	}
}

func (r *inMemoryUsersRepository) Save(user *entities.User) error {
	r.db = append(r.db, user)
	return nil
}

func (r *inMemoryUsersRepository) GetByProviderID(id int) *entities.User {
	for _, user := range r.db {
		if user.ProviderID == id {
			return user
		}
	}
	return nil
}

func (r *inMemoryUsersRepository) List() ([]*entities.User, error) {
	return r.db, nil
}
