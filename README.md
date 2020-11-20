# Scotiabank assessment Server

This project use Graphql

## Steps (local)

1- Install all packages

`npm install`

2- Create a .env file in the root file with the key APP_SECRET, for example

```
APP_SECRET="doNotGiveAnyoneThisKey"
```

3- Raise [scotiabank-assesment-client](https://github.com/adavis9012/scotiabank-assesment-client)

4- Have fun!

### Scripts

#### `npm run start:watch`

Starts the application in development using `nodemon` and `ts-node` to do hot reloading.

#### `npm run start`

Starts the app in production by first building the project with `npm run build`, and then executing the compiled JavaScript at `build/index.js`.

#### `npx prisma studio`

Start Prisma Studio to have a visual editor for the database.

#### `npx prisma migrate save --experimental`

Saves a new migration to the prisma/migrations directory

#### `npx prisma migrate up --experimental`

Executes the migration against the database

#### `npx prisma generate`

Reads the Prisma Schema and generates the Prisma Client library into *node_modules/@prisma/client* 

#### `node src/script.js`

Generates default data for database

#### `npm run build`

Builds the app at `build`, cleaning the folder first.

#### `npm run test`

Runs the `jest` tests once.

#### `npm run test:dev`

Run the `jest` tests in watch mode, waiting for file changes.

#### `npm run prettier-format`

Format your code.

#### `npm run prettier-watch`

Format your code in watch mode, waiting for file changes.

