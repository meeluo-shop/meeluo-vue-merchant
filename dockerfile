FROM nginx
COPY dist/  /home/web
COPY nginx.conf /etc/nginx/nginx.conf
