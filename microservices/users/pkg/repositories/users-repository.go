package repositories

import (
	"context"
	"database/sql"
	"time"

	"github.com/GabrielBrotas/meetup-users/pkg/entities"
)

type UsersRespository struct {
	db *sql.DB
}

func (UsersRespository) New(db *sql.DB) *UsersRespository {
	return &UsersRespository{
		db: db,
	}
}

func (u *UsersRespository) Save(user *entities.User) (int, error) {
	ctx, cancel := context.WithTimeout(context.Background(), time.Second*3)
	defer cancel()

	query := `INSERT INTO users (name, password, email) VALUES ($1, $2, $3) RETURNING id`

	id := 0
	err := u.db.QueryRowContext(ctx, query, user.Name, user.Password, user.Email).Scan(&id)

	if err != nil {
		return id, err
	}

	return id, nil
}

func (u *UsersRespository) GetById(id int) (*entities.User, error) {
	var user entities.User

	ctx, cancel := context.WithTimeout(context.Background(), time.Second*3)
	defer cancel()

	query := `select id, name, password, email, created_at, updated_at from users where id = $1`

	row := u.db.QueryRowContext(ctx, query, id)

	err := row.Scan(
		&user.ID,
		&user.Name,
		&user.Password,
		&user.Email,
		&user.CreatedAt,
		&user.UpdatedAt,
	)

	if err != nil {
		return nil, err
	}

	return &user, nil
}

func (u *UsersRespository) FindAll() ([]*entities.User, error) {
	ctx, cancel := context.WithTimeout(context.Background(), time.Second*3)
	defer cancel()

	query := `SELECT * FROM users`

	rows, err := u.db.QueryContext(ctx, query)

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	users := []*entities.User{}

	for rows.Next() {
		var user entities.User

		err := rows.Scan(
			&user.ID,
			&user.Name,
			&user.Password,
			&user.Email,
			&user.CreatedAt,
			&user.UpdatedAt,
		)

		if err != nil {
			return nil, err
		}
		users = append(users, &user)
	}

	return users, nil
}

func (u *UsersRespository) DeleteOne(id int) error {
	ctx, cancel := context.WithTimeout(context.Background(), time.Second*3)
	defer cancel()

	query := `DELETE FROM users WHERE id=1`

	_, err := u.db.ExecContext(ctx, query)

	if err != nil {
		return err
	}

	return nil
}

func (u *UsersRespository) Update(user *entities.User) (error) {
	ctx, cancel := context.WithTimeout(context.Background(), time.Second*3)
	defer cancel()

	query := `UPDATE users SET name = $2, password = $3, email = $4 WHERE id = $1`

	_, err := u.db.ExecContext(ctx, query, user.ID, user.Name, user.Password, user.Email)

	if err != nil {
		return err
	}

	return nil
}
