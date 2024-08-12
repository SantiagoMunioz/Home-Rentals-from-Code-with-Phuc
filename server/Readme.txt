instalar:
    nodemon
    express
    body-parser
    bcryptjs
    cors
    dotenv
    multer
    multer-gridfs-storage
    jsonwebtoken
    mongoose

ejecutar:
    npm init -y

crear una base de datos en mongodb online y copiar el enlance

en package.json cambiar:
    "test": "echo \"Error: no test specified\" && exit 1"
por:
    "start": "nodemon index.js"

se crean:
    modelos
    routes