# About The Project

Web application KELONTONG KAMI for listing products and creating new products

# Framework

1. [NodeJs](https://nodejs.org/en/)
2. [ExpressJs](https://expressjs.com/en/starter/installing.html)

# Technology

- [NodeJs](https://nodejs.org/id)
- [ExpressJs](https://expressjs.com/)
- [Sequelize](https://sequelize.org/)
- [jsonwebtoken](https://jwt.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [dotenv](https://www.dotenv.org/)

# How to use

### 1. Clone the repository

### 2. Run with terminal, npm install to install all dependencies

```bash
npm install
```

### 3. create your .env:

```env
NODE_ENV=development
PORT=8888
APP_SECRET=secret words

# DATABASE ENVIRONMENT ======
DB_USERNAME=database username
DB_PASSWORD=databse password
DB_NAME=database name
DB_HOST=database host
# END DATABASE ENVIRONMENT ==

```

### 4. Create Database with postgreSQL(Recomended)

```bash
db_kelontong
```

### 5. Migrate database with sequelize-cli:

```bash
npx sequelize-cli db:migrate
```

### 6. Seed data with sequelize-cli:

```bash
npx sequelize-cli db:seed:all
```

### 7. Run this project:

```bash
npm run dev
```
