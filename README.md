## Consideraciones
1. Importante instalar la dependencia ts-node para que se pueda ejecutar código de typeScript en node, mediante el comando `npm i -D ts-node`
2. El paso anterior para el Seed y cargar la información inicial de la base de datos
3. La carpeta Seed en src donde se crea un archivo en este caso de nombre `seed-database.ts` que contiene el código y la lógica para la información inicial de la base de datos
4. Desde la terminal ingresar a la carpeta seed que se encuentra dentro de src e insertar el comando `npx tsc --init` que se encargará de crear el archivo tsconfig.json.
5. Para ejecutar el archivo seed-database.ts desde node, se ingresa al archivo package.json y se agrega el script "seed": "ts-node src/seed/seed-database.ts"
6. Para ejecutar el archivo database.ts se ejecuta el comando `npm run seed`




## Correr en dev

1. Clonar el repositorio
2. Crear una copia del .env.template y renombrarlo a .env cambiando las variables de entorno
3. Instalar dependencias ``` npm install ```
4. Levantar la base de datos  ```docker compose up -d ```
5. Correr las migraciones de Prisma `npx prisma migrate dev`
6. Ejecutar el Seed `npm run seed`
6. Correr el proyecto `npm run dev`



# Correr en producción

