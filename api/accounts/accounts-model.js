const db = require('../../data/db-config')

const getAll = () => {
  // select * from accounts;
  return db('accounts')
}

const getById = id => {
  // select * from accounts where id = 1;
  return db('accounts').where('id', id).first()
}

const create = async account => {
  // insert into accounts (name, budget) values ('foo', 1000); <-- ; is not an option in SQL
  const [id] = await db('accounts').insert(account)
  return getById(id)
}

const updateById = async (id, account) => {
  // update accounts set name='foo', budget=1000 where id = 1;
  await db('accounts').where('id', id).update(account)
  return getById(id)
}

const deleteById = id => {
  // delete from accounts where id = 1;
  return db('accounts').where('id', id).del()
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}

// db('foo-table')      --> returns a promise that resolves to an **array** with all records in the table
// db('foo-table').where({ role: 'Student', active: true })      --> resolves to an **array** of all records that satisfy the where
// db('foo-table').where('name', 'Mary')      --> is an alternative for when there is just one where condition
// db('foo-table').where('id', 7).first()      --> will resolve to the **record** we want (if the id is unique for a table) or undefined
// db('foo-table').insert({ bar: 'baz' })      --> resolves to an **array** containing the **ids of the records** inserted into the table
// db('foo-table').where('id', id).update({ bar: 'new bar' })      --> resolves to the **number of records** affected by the update
// db('foo-table').where('id', id).delete()      --> resolves to the **number of records** affected by the delete