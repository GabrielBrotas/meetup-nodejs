FROM golang:1.18-alpine as builder

WORKDIR /app

COPY go.mod ./
COPY go.sum ./

RUN go mod download

COPY *.go ./

RUN CGO_ENABLED=0 go build -o auth_app main.go

FROM alpine:latest

WORKDIR /app

COPY --from=builder /app/auth_app .

RUN chmod +x /app/auth_app

EXPOSE 4002

CMD [ "/app/auth_app" ]