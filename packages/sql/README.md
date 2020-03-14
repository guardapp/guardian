# `@guardapp/sql`

Abstraction layer to interact with a SQL DBs

> TODO: add models export

## Usage

```javascript
const {sql} = require('@guardapp/sql');

const {user} = await sql({
    dialect: 'mysql', // default mysql, one of 'mysql' | 'mariadb' | 'postgres' | 'mssql'
    maxRetries: 3, //default 2
    modelPath: path.resolve(__dirname, 'path/to/models'), // default to "/models/sql"
    seedPath: path.resolve(__dirname, 'path/to/seed.js'), //default to "seeders/sql.js"
});

const sql_user = await user.findById(3);
console.log(sql_user); // {username: 'sql_user', password: 'encrypted'}
```


## Environment Variables

- **GUARD_SQL_HOST**    - [required] the DB host
- **GUARD_SQL_PORT**   - [optional] will use the default port for specified dialect (e.g - 3306 for mysql)
- **GUARD_SQL_DB**      - [required] the DB name
- **GUARD_SQL_USER**    - [required] the DB username
- **GUARD_SQL_PW**      - [required] the DB password

## Model Decleration

Model declaration is the same way you declare models in `sequelize` package.

### model

The model module file is a function called by this library with 2 arguement:
- `sequelize` - the sequelize instance
- `DataTypes` - the types to declare the DB columns
- `Model`     - the model base class

### associations

Association is performed in a function call to a specific method
```javascript
function associate(models) {}
```
models are all the models declared in the models folder and can be associate to them for a One-To-One / One-To-Many / Many-To-Many associations

### model example

in this example we will see 2 options to decalre a model and associate it with a One-To-Many roles model *(`role` is declared in role.js)*

```javascript
// user.js
const {Model} = require('@guardapp/sql');

module.exports = (sequelize, DataTypes, Model) => {
    //option 1 - class
    class User extends Model {
        associate(models) {
            this.hasMany(models.role);
        }
    }
    User.init({
        username: DataTypes.STRING,
        password: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'user'
    });

    //option 2 - function
    const User = sequelize.define('user', {
        username: DataTypes.STRING,
        password: DataTypes.STRING
    });

    User.associate(models) {
        User.hasMany(models.role);
    }
}
````

## Seeders

The seeder is a module that exposes a function that seed the DB with initiale information.

seeder example:
```javascript
module.exports = async (sequelize) => {
    sequelize.transaction(t => {
        sequelize.models.role.bulkCreate([
            { username: 'example', password: 'secret'}
        ], {transaction: t});

        // do more here... 
    });
}
```