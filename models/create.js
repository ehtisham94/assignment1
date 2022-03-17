const knex = require('../data/db')
module.exports = async () => {
    await knex.schema
        .createTable('students', table => {
          table.increments('id');
          table.string('first_name');
          table.string('last_name');
          table.boolean('deleted');
        })
        // ...and another
        .createTable('books', table => {
          table.increments('id');
          table.string('name');
          table.string('author');
          table.date('date_of_borrow').nullable();
          table.date('date_of_return').nullable();
          table.boolean('deleted');
          table
            .integer('borrowed_by')
            .unsigned()
            .nullable()
            .references('students.id');
        })
    
}