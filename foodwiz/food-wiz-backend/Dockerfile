FROM maven:3.8.6-eclipse-temurin-17 as builder

# add pom.xml and source code
ADD ./pom.xml pom.xml
ADD ./src src/

# package jar
RUN mvn clean package spring-boot:repackage -Dmaven.test.skip

FROM openjdk:17-jdk-alpine

# copy jar
COPY --from=builder target/FoodWizBackend-food-wiz-backend.jar FoodWizBackend.jar
