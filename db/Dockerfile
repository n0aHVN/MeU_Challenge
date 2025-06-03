FROM postgres:latest

# Set environment variables
ENV POSTGRES_USER=ttadmin
ENV POSTGRES_PASSWORD=123
ENV POSTGRES_DB=TableTennisDB

# Optional: copy SQL seed data
# COPY ./init.sql /docker-entrypoint-initdb.d/

COPY init.sql /docker-entrypoint-initdb.d/
EXPOSE 5432