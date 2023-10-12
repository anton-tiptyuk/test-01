## Set up

- Copy `.sample.env` into `.env`. If you don't need no specific configuration you should be fine to go without any editing.
- Run `docker-compose` to create a PostgreSQL container. Make sure your `5432` port is not being used. If it is or you would like to use an existing PostgreSQL server - update the `.env` and either remap ports in `docker-compose.yml` or create a database in your server accordingly
- I've used node v.18 for this project and have no idea what's gonna happen with a different node version. `.nvmrc` is in place.
- Run `yarn` to install dependencies
- Run `yarn db migration:run` to run migrations for the database. There's also a helpful shell script `./db-re-create.sh` to recreate database structures from scratch any moment.

## Importing the dump into the database

The database import will delete all records from all tables before inserting data from the dump.

### CLI

To upload the dump file into the database using the command line interface do:

```bash
yarn cli LoadDumpWithFixedRatesCommand _pathToYourDumpFile_
```

### web interface

To upload the dump file into the database using the web interface:
- start the web server with `yarn start`
- the default web server port is 3000 and it can be changed in `.env`
- the swagger should be available at http://localhost:3000/api
- use the `POST /dump-loader/upload` endpoint to upload a dump and get it loaded it into the database. please select `true` for the `fixedRates` parameter

## Reporting
### CLI
```bash
yarn cli ReportCommand _destinationPath_
```

### web interface
please use `GET /reporting/report` endpoint

### Questions

#### 1. How to change the code to support different file versions?

[Here](src/domain/ast-parser/v1/ast-node-v1.ts) is the implementation for the poor man's Abstract Syntax Tree Node capable of parsing lines of the dump in the current format. If the format changes are not dramatical and it is possible to stay within this approach it is possible to introduce another `AstNode` implementation descending from the same abstract ancestor class and make it possible to use that new file version updating the [factory method](src/domain/ast-parser/ast-node-factory.ts) accordingly. If structure changes are beyond this compatibility - that case should be considered separately. Probably more layers of implementation would get affected.

#### 2. How the import system will change if data on exchange rates disappears from the file, and it will need to be received asynchronously (via API)?

### Before trying
I have changed your task a little bit. I've introduced a db entity to store that rates and it is possible to use it (requesting rates from the database still is asynchronous). There's no chance in real world you would be fetching those from API every time you need those. I've used a [thirdparty API](https://apilayer.com/marketplace/fixer-api) to get those rates. I've dumped a response I needed and mocked it, however, there's a really easy way to make it use real API.

To use the real API you can patch this [place](src/modules/rate-resolver/rate-resolver.service.ts):
```js
// replace this:
private readonly apilayerApi = new ApilayerApi();

// with this
private readonly apilayerApi = new ApilayerApi(false);
```

Also, you would have to use an API key in `.env` for `APILAYER_API_KEY` parameter, here's mine free one: `muLcN3qXtPQFSXRR4RW4IGi2wuSY0BWZ`.

It has a 1000 requests per month limit.

Soooo - before trying you should fill in that rates into the database. You can do it with `POST /rate-resolver/poll-and-update` endpoint or `UpdateCurrencyRatesCommand` CLI command which has no parameters.

Once you did it you can load dump using that rates in the database like:

### CLI
```bash
yarn cli LoadDumpWithApiRatesCommand _pathToYourDumpFile_
```

### web interface
It is still `POST /dump-loader/upload` endpoint, but `fixedRates` parameter should be set to `false`.


#### 3. In the future the client may want to import files via the web interface, how can the system be modified to allow this?

Obviously it is already capable, see above.


