version: "2.1"

services:
  db:
    image: postgres:12-alpine
    environment:
      - POSTGRES_PASSWORD=password
    ports:
      - "5432:5432"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 5s
      timeout: 5s
      retries: 5
    networks:
      - backend
  backend:
    build: ./backend
    environment:
      - POSTGRES_PASSWORD=password
      - SANIC_AUTORELOAD=true
    volumes:
      - ./backend:/srv/app
    ports:
      - "8000:8000"
    depends_on:
      db:
        condition: service_healthy
    networks:
      - backend
      - frontend
  frontend:
    build:
      context: ./frontend
      args:
        NODE_ENV: "development"
    volumes:
      - ./frontend:/srv/app
    ports:
      - "3000:3000"
      - "35729:35729"
    networks:
      - frontend

networks:
  backend:
  frontend: