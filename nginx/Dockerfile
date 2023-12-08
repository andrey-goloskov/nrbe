FROM nginx:1.25.3-bookworm
COPY ./frontend/build /var/www/magnus
COPY nginx.conf /etc/nginx/
COPY default.conf /etc/nginx/conf.d/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]