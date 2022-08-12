
## Test
```bash
docker run -d -p 5432:5432 --name meetings-postgres -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=password123 -e POSTGRES_DB=meetup-meetings postgres:13.1-alpine
````