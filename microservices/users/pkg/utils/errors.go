package utils

import (
	"errors"
	"fmt"
)

type ErrorCollection struct {
	Errors []string
}

func (ErrorCollection) New() *ErrorCollection {
	return &ErrorCollection{
		Errors: []string{},
	}
}

func (e *ErrorCollection) AddError(err string) {
	e.Errors = append(e.Errors, err)
}

func (e *ErrorCollection) HasErrors() bool {
	return len(e.Errors) > 0
}

func (e *ErrorCollection) CleanUp() {
	e.Errors = nil
}

func (e *ErrorCollection) ThrowErrors() error {
	if !e.HasErrors() {
		return nil
	}

	formated_errors := ""

	for i, err := range e.Errors {
		if i == len(e.Errors) - 1 {
			formated_errors += fmt.Sprintf("%s", err)
			continue
		}
		formated_errors += fmt.Sprintf("%s;", err)
	}

	e.CleanUp()
	return errors.New(formated_errors)
}
