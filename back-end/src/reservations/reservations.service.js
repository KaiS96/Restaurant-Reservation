const knex = require("../db/connection");

function create(reservation) {
  return knex("reservations")
    .insert(reservation)
    .returning("*")
    .then((createdReservation) => createdReservation[0]);
}

function list() {
  return knex("reservations").select("*");
}

function listReservationsByDate(date) {
  return knex("reservations")
    .where({ reservation_date: date })
    .orderBy("reservation_time");
}

function read(reservation_id) {
  return knex("reservations").select("*").where({ reservation_id }).first();
}

module.exports = {
  create,
  list,
  listReservationsByDate,
  read,
};
