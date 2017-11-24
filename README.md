<p align="center">
  <a href="http://www.enovum.cl">
    <img src="http://www.enovum.cl/assets/img/bg/enovum.png">
  </a>
</p>

  - [Instalar NVM](#instalar-nvm) 
    - [NVM Linux/MAC](#en-linuxmac)
    - [NVM Windows](#en-windows)
  - [Instalar NodeJS v8.9.1](#instalar-nodejs-891) 
  - [Instalar git](#instalar-git)
  - [Clonar repositorio](#clonar-repositorio)  
  - [Configuraciones adicionales](#configuraciones-adicionales)

## Instalar NVM

### En linux/mac 
Instalar [NVM](https://github.com/creationix/nvm) con cUrl o Wget

Usando cURL:
```bash
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.6/install.sh | bash
```
Usando Wget:
```bash
wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.6/install.sh | bash
```

### En windows 
Instalar [NVM For Windows](https://github.com/coreybutler/nvm-windows) descargando el [ultimo release](https://github.com/coreybutler/nvm/releases)


## Instalar NodeJS 8.9.1
Desde la consola ejecutar el siguiente comando para instalar [nodejs](https://nodejs.org)
```bash
nvm install v8.9.1
```
Verificar version de node con `node -v`  
Verificar que npm este al menos en la version v5.5.1 con `npm -v`

## Instalar Git

Desde linux ejecutar `apt-get install git`  
Desde windows descargar el instalador de [git](https://git-scm.com/download/win)

## Clonar repositorio
Crear carpeta git para almacenar el proyecto abrir consola, posicionarse en la carpeta git y ejecutar el siguiente comando

```bash
git clone https://github.com/Enovum/hrm.git
```

## Configuraciones adicionales

### Archivo .env
Hacer una copia del archivo .env.example y guardarlo como .env con el siguiente contenido:

```bash
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
```

### Dependencias
Entrar en la carpeta del proyecto (git/hrm) y ejecutar los siguientes comandos

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


