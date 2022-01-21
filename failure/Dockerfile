FROM  alpine:3.15
LABEL vertical="failure"

# Set directories
RUN mkdir -p /failure/
WORKDIR /failure/
COPY src/ src/
COPY data/ data/
COPY build.gradle build.gradle
COPY settings.gradle settings.gradle
COPY .env.docker .env

RUN apk add gradle --no-cache
RUN apk --no-cache add mosquitto-clients

# To be deleted later
RUN gradle build