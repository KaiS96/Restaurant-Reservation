const knex = require("../db/connection");

function create(reservation) {
  return knex("reservations")
    .insert(reservation)
    .returning("*")
    .then((createdReservation) => createdReservation[0]);
}

function listReservationsByDate(date) {
  return knex("reservations")
    .where({ reservation_date: date })
    .whereNot({ status: "finished" })
    .orderBy("reservation_time");
}

function read(reservation_id) {
  return knex("reservations").select("*").where({ reservation_id }).first();
}

function updateStatus(updatedReservation) {
  return knex("reservations")
    .where({ reservation_id: updatedReservation.reservation_id })
    .whereNot({ status: "finished" })
    .update(updatedReservation, "*")
    .then((updatedRecords) => updatedRecords[0]);
}

module.exports = {
  create,
  listReservationsByDate,
  read,
  updateStatus,
};
