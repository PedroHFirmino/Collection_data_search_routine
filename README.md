# Collection data search routine 📚🕘

This project was created to extract, periodically, datas from library stored at database named as "Corpore" with many tables and insert into a single table "acervoBibliotca" on database named as "Integracao".


# Requirements

- [Node](https://nodejs.org/en);
- [Xamp](https://www.apachefriends.org/index.html);
- [MySQL](https://www.mysql.com/).

## Steps

Clone the repository or download the project file.

```bash
# Copy code:
git clone https://github.com/PedroHFirmino/Collection_data_search_routine.git
```

Install dependencies to run the project.

```bash
# Yarn install:
npm install -g yarn
yarn install
```



# Project Structure
<pre><code>
│   ├── src/
│   │   └── config
│   │   |   └── Corpore.js   ←Database configuration.
│   │   |   └── integracao.js   ←Database configuration. 
│   │   └── repository
│   │   |   └── buscaDadosAcervo.js   ←Data query.
│   │   |   └── exportar.js   ←Routine configuration and insert into new table.
├── .env   ← Database configuration.
├── index.js   # To run the project.
├── package.json
├── scriptDataBase.txt   ←Script to create database and tables.
├── testconnection.js   ←Test connection with databases.
├── testinsert.js   ←Insert data in database Corpore.
├── yarn.lock
</code></pre>
