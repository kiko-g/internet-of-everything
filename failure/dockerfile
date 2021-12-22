FROM  alpine:3.15
LABEL vertical="edge"

# Set directories
RUN mkdir -p /edge/
WORKDIR /edge/
COPY src/ src/
COPY data/ data/
COPY build.gradle build.gradle
COPY settings.gradle settings.gradle

RUN apk add gradle --no-cache
RUN apk --no-cache add mosquitto-clients

# To be deleted later
RUN gradle build
