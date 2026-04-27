# Build stage
FROM maven:3.9.9-eclipse-temurin-17 AS builder
WORKDIR /build
COPY . /build
WORKDIR /build/backend
RUN mvn clean install -DskipTests

# Runtime stage
FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=builder /build/backend/target/citizen-connect-backend-1.0.0.jar /app/citizen-connect-backend-1.0.0.jar
EXPOSE 10000
ENTRYPOINT ["sh", "-c", "java -Dserver.port=${PORT:-10000} -jar /app/citizen-connect-backend-1.0.0.jar"]
