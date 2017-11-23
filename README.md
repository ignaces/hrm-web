# HRM

## Instalacion

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coveralls Status][coveralls-image]][coveralls-url] [![OpenCollective Backers][backer-badge]][backer-url] [![OpenCollective Sponsors][sponsor-badge]][sponsor-url] [![Gitter chat][gitter-image]][gitter-url]

### Instalar NVM
```bash
wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.6/install.sh | bash
```
### Instalar NODE 8.9.1
```bash
nvm install v8.9.1
```
### Verificar que npm este al menos en la version v5.5.1
```bash
npm -v
```
### Clonar repositorio
```bash
git clone https://github.com/Enovum/hrm.git
```

Hacer una copia del archivo .env.example y guardarlo como .env

Entrar en la carpeta del proyecto y ejecutar los siguientes comandos

```bash
npm install --save-dev webpack
npm install -g @adonisjs/cli
npm install gulp-cli -g
npm install gulp -D
```

Para iniciar el proyecto ejecutar 
```bash
gulp
```

# Archivo .env
HOST=127.0.0.1  
PORT=3335  
NODE_ENV=development  
APP_URL=http://${HOST}:${PORT}  
CACHE_VIEWS=false  
APP_KEY=n96M1TPG821EdN4mMIjnGKxGytx9W2UJ  
DB_CONNECTION=mysql  
DB_HOST=192.168.3.18  
DB_PORT=  
DB_USER=root  
DB_PASSWORD=Qwerty123  
DB_DATABASE=KH  
API_SERVER=localhost:3334  
SESSION_DRIVER=cookie  
