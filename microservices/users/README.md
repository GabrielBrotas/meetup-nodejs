
```sh
sudo chmod -R 777 .docker/

# init 
go mod init github.com/GabrielBrotas/meetup-users

# test repository
# first ssh the users-svc container
go test ./src/repositories/users_test.go -v

```