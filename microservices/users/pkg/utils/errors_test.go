package utils_test

import (
	"testing"

	"github.com/GabrielBrotas/meetup-users/pkg/utils"
	"github.com/stretchr/testify/require"
)

func TestInitCollection(t *testing.T) {
	collection := utils.ErrorCollection{}

	require.Nil(t, collection.Errors)
}

func TestAddErrors(t *testing.T) {
	collection1 := utils.ErrorCollection{}.New()

	collection1.AddError("Error 1")
	require.Equal(t, len(collection1.Errors), 1)

	collection1.AddError("Error 2")
	require.Equal(t, len(collection1.Errors), 2)

	collection2 := utils.ErrorCollection{}.New()

	collection2.AddError("Error 3")
	require.Equal(t, len(collection2.Errors), 1)

	collection2.AddError("Error 4")
	require.Equal(t, len(collection2.Errors), 2)
}

func TestHasErrors(t *testing.T) {
	collection := utils.ErrorCollection{}.New()

	require.False(t, collection.HasErrors())

	collection.AddError("Error 1")

	require.True(t, collection.HasErrors())
}

func TestCleanUp(t *testing.T) {
	collection := utils.ErrorCollection{}.New()

	collection.CleanUp()
	require.False(t, collection.HasErrors())

	collection.AddError("Error 1")
	collection.CleanUp()
	require.False(t, collection.HasErrors())
}

func TestThrowErrors(t *testing.T) {
	collection := utils.ErrorCollection{}.New()

	err := collection.ThrowErrors()
	require.Nil(t, err)

	collection.AddError("Error 1")
	err = collection.ThrowErrors()

	require.Equal(t, "Error 1", err.Error())
	require.Equal(t, len(collection.Errors), 0)

	collection.AddError("Error 1")
	collection.AddError("Error 2")
	collection.AddError("Error 3")

	err = collection.ThrowErrors()
	require.Equal(t, "Error 1;Error 2;Error 3", err.Error())
}
