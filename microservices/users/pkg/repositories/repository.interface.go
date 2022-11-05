package repositories

import "github.com/GabrielBrotas/meetup-users/pkg/entities"

type IRepository[T entities.Entity] interface {
	Save(*T) (int, error)
	GetById(id int) (*T, error)
	FindAll() ([]*T, error)
	DeleteOne(id int) error
	Update(T) error
}
