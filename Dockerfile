FROM eclipse-temurin:21-jdk-alpine AS build
WORKDIR /app
COPY .mvn/ .mvn
COPY mvnw pom.xml ./
RUN chmod +x mvnw
COPY . .
RUN ./mvnw clean package -DskipTests

# Stage 2: Run the application
FROM eclipse-temurin:21-jre-alpine
RUN addgroup -S spring && adduser -S spring -G spring
WORKDIR /app
VOLUME /tmp
# Copy the jar FROM the build stage, not your local hard drive
COPY --from=build --chown=spring:spring /app/target/mlm-1.0.0.jar app.jar
EXPOSE 8080
USER spring:spring
ENTRYPOINT ["java", "-jar", "app.jar"]