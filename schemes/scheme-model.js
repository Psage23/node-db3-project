const db = require('../data/db-config.js');

module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove
}

function find() {
    return db('schemes');
}

function findById(id) {
    return db('schemes')
    .where({ id })
    .first();
}

function findSteps(id) {
    return  db('steps')
    .where({scheme_id: id})
    .join('schemes', 'steps.scheme_id', 'schemes.id')
    .select(
        'steps.id',
        'schemes.scheme_name',
        'steps.step_number',
        'steps.instructions'
    );
}

function add(scheme) {
    return db('schemes')
    .insert(scheme)
    .then(newScheme => findById(newScheme[0].id));
}

function update(changes, id) {
    return db('schemes').where({id: id}).update(changes)
    .then(updated => findById(updated[0].id));
}

function remove(id) {
    return db('schemes').where({id: id}).del();
}