FROM golang:1.23-alpine
RUN apk add build-base
WORKDIR /app
COPY . .
WORKDIR /app/cmd
RUN  go build -o uiserver .
CMD [ "./uiserver" ]
