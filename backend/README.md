NGINX Config for websocket server

```bash

events {
    # Event directives...
}

http {
	server {
    listen 80;
    server_name socket.akkilesh.in;

    location / {
        proxy_pass ws://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
	}
}
```
