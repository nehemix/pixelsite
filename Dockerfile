FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY . /usr/share/nginx/html/

# Cambiar el puerto 80 a 8080 en la configuración de Nginx copiada
RUN sed -i 's/listen\(.*\)80;/listen\18080;/g' /etc/nginx/conf.d/default.conf

# Dar permisos al usuario 'nginx' (incluido en la imagen) para no depender de root
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html && \
    chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    chown -R nginx:nginx /etc/nginx/conf.d && \
    touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/run/nginx.pid

# Cambiar al usuario sin privilegios
USER nginx

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]