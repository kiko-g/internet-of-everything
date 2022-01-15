FROM  alpine:3.15
LABEL vertical="edge"

# Set directories
RUN mkdir -p /edge/
WORKDIR /edge/
COPY src/ src/
COPY lib/ lib/
COPY .env.docker .env
COPY build.gradle build.gradle
COPY settings.gradle settings.gradle

RUN apk add gradle --no-cache
RUN apk --no-cache add mosquitto-clients

RUN gradle build