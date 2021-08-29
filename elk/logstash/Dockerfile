ARG ELK_VERSION
FROM docker.elastic.co/logstash/logstash:${ELK_VERSION}

RUN curl -L -o mysql-connector-java-8.0.18.tar.gz https://dev.mysql.com/get/Downloads/Connector-J/mysql-connector-java-8.0.18.tar.gz
RUN tar -xvf ./mysql-connector-java-8.0.18.tar.gz
RUN mv ./mysql-connector-java-8.0.18/mysql-connector-java-8.0.18.jar ./lib/mysql-connector-java-8.0.18.jar
RUN rm -rf ./mysql-connector-java-8.0.18*
RUN chmod 755 ./lib/mysql-connector-java-8.0.18.jar

COPY ./entrypoint.sh ./
ENTRYPOINT [ "sh", "./entrypoint.sh" ]
