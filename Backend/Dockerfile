FROM amazoncorretto:21-alpine
LABEL authors="acheron"
COPY ./build/libs/devx-1.0.0.jar ./main.jar
ENTRYPOINT ["java", "-jar", "main.jar"]