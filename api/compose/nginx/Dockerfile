FROM nginx:1.17.5-alpine

RUN rm /etc/nginx/conf.d/default.conf

COPY uwsgi_params /etc/nginx/uwsgi_params
COPY prontolista.conf /etc/nginx/conf.d/prontolista.conf

CMD /usr/sbin/nginx -g "daemon off;"
