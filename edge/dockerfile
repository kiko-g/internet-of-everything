FROM alpine:latest

RUN apk add gradle openjdk17

WORKDIR /home/proj
COPY . .

RUN gradle build

ENTRYPOINT [ "java", "-jar", "./app/build/libs/app.jar" ]