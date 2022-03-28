FROM nginx

RUN apt-get update && apt-get install -y supervisor python3-flask python3-gunicorn gunicorn
RUN mkdir -p /var/log/supervisor
RUN mkdir -p /app
run mkdir -p /var/www/application/
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf
COPY app /app
COPY static-html /usr/share/nginx/html

CMD ["/usr/bin/supervisord","-n"]

