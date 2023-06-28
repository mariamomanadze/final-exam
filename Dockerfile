FROM maven:3.8.5-openjdk-11 AS maven_build
COPY pom.xml /tmp/
COPY src /tmp/src
WORKDIR /tmp/
RUN mvn clean package

FROM eclipse-temurin:11
MAINTAINER mariamomanadze
COPY --from=maven_build /tmp/target/hello-world-0.1.0.jar /data/hello-world-0.1.0.jar
USER 1002
CMD ["java", "-jar", "/data/hello-world-0.1.0.jar"]
