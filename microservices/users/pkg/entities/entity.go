package entities

type Entity interface {
	New() *Entity
	IsValid() bool
}