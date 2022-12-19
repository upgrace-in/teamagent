ssh root@167.86.127.254
wJ3aJedHbSQqc

To deploy:

change endpoint 
npm run build
kill the process

lsof -i:7070

######team.conf:
[program:teamagent]
command=/opt/teamagent/teambackend/start.sh
autostart=true
autorestart=true
stderr_logfile=/opt/teamagent/start.err.log
stdout_logfile=/opt/teamagent/start.out.log

######teamagent.conf:
server {
 listen 80;
 server_name teamagentadvantage.upgrace.in;
 return 301 https://teamagentadvantage.upgrace.in$request_uri;
}

server {
  listen 443 ssl;
  root /opt/teamagent/team_app/build/;
  index index.html index.htm;
  server_name teamagentadvantage.upgrace.in;
  ssl_certificate /etc/letsencrypt/live/teamagentadvantage.upgrace.in/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/teamagentadvantage.upgrace.in/privkey.pem;
location / {
  try_files $uri /index.html;
}
}

######teamng.conf:
server {
listen 443 ssl;
index index.html index.htm;
server_name teamapi.upgrace.in;
ssl_certificate /etc/letsencrypt/live/teamapi.upgrace.in/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/teamapi.upgrace.in/privkey.pem;
location / {
  proxy_pass http://localhost:7070;
  proxy_http_version 1.1;
  proxy_set_header Upgrade $http_upgrade;
  proxy_set_header Connection 'upgrade';
  proxy_set_header Host $host;
  proxy_cache_bypass $http_upgrade;
}
location ~ /\.ht {
    deny all;
}
}
