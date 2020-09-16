# Generate Migration File
knex migrate:make --migrations-directory ./src/migrations -x ts migration_name

# Run Migration file
knex migrate:latest --knexfile ./build/knexfile.js 

# Run seed File
knex seed:run --knexfile ./build/knexfile.js 