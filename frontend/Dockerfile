# Этап сборки
FROM node:latest AS build

RUN cd ~ && mkdir app
RUN cd ~/app

WORKDIR ~/app

# Установка рабочей директории
# WORKDIR /

# Копируем package.json и package-lock.json для установки зависимостей
COPY frontend/package*.json ./

# Установка зависимостей
RUN npm install

# Копируем остальные файлы приложения
COPY frontend/ ./

# Сборка Angular приложения
RUN npm run build --prod

# Этап запуска
FROM nginx:stable

RUN chmod -R 755 /usr/share/nginx/html
RUN chown -R nginx:nginx /usr/share/nginx/html

# Копируем собранное приложение из предыдущего этапа в директорию Nginx
# COPY --from=build /~/app/dist/frontend/ /usr/share/nginx/html/

# Открываем порт 80
EXPOSE 80

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]