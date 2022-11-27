# FROM maven:3.8.6-eclipse-temurin-17 AS build  
# # COPY src /usr/src/app/src  
# # COPY pom.xml /usr/src/app  
# ADD ./pom.xml pom.xml
# ADD ./src src/
# RUN mvn clean package -Dmaven.test.skip && cp -f target/FoodWizBackend-food-wiz-backend.jar FoodWizBackend-food-wiz-backend.jar && rm -rf pom.xml src/ target/
# # RUN mvn -f /usr/src/app/pom.xml clean package -Dmaven.test.skip
# #  -Dmaven.test.skip

# FROM gcr.io/distroless/java  
# COPY --from=build /usr/src/app/target/FoodWizBackend-food-wiz-backend.jar FoodWizBackend-food-wiz-backend.jar  
# COPY wait-for-it.sh wait-for-it.sh


FROM maven:3.8.6-eclipse-temurin-17 as builder

# add pom.xml and source code
ADD ./pom.xml pom.xml
ADD ./src src/

# package jar
RUN mvn clean package spring-boot:repackage -Dmaven.test.skip

FROM openjdk:17-jdk-alpine

# copy jar
COPY --from=builder target/FoodWizBackend-food-wiz-backend.jar FoodWizBackend.jar
# COPY ./FoodWizBackend.jar FoodWizBackend.jar

# # run jar
# CMD ["java", "-jar", "msb.jar"]