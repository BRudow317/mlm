# ---- Build stage: create the single Spring Boot JAR ----
FROM eclipse-temurin:21-jdk-alpine AS build
WORKDIR /app

# Copy Maven Wrapper and config
COPY mvnw ./
COPY .mvn .mvn
COPY pom.xml ./

RUN chmod +x mvnw

# Copy Project, using .dockerignore to exclude files not needed for build
COPY . .

RUN ./mvnw -B -DskipTests clean package 

# ---- Runtime stage: production container ----
FROM eclipse-temurin:21-jre-alpine AS runtime
WORKDIR /app

RUN addgroup -S spring && adduser -S spring -G spring

# If there is exactly one bootable JAR, this wildcard is safe
COPY --from=build --chown=spring:spring /app/target/*.jar app.jar

EXPOSE 8080
USER spring:spring

ENV JAVA_TOOL_OPTIONS="-XX:+UseContainerSupport"

ENTRYPOINT ["java", "-jar", "app.jar"]