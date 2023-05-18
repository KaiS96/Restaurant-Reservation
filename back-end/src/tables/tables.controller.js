const tablesService = require("./tables.service");
const reservationsService = require("../reservations/reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

const hasProperties = require("../errors/hasProperties");
const hasRequiredProperties = hasProperties("table_name", "capacity");

const VALID_PROPERTIES = ["table_name", "capacity", "reservation_id"];

// list table/s
async function list(req, res, next) {
  const data = await tablesService.list();
  res.status(200).json({ data });
}

// create a table
async function create(req, res, next) {
  const data = await tablesService.create(req.body.data);
  res.status(201).json({ data });
}

// update a table
async function update(req, res) {
  const updatedTable = {
    ...req.body.data,
    table_id: res.locals.table.table_id,
  };

  const updatedReservation = {
    ...res.locals.reservation,
    reservation_id: res.locals.reservation.reservation_id,
    status: "seated",
  };
  await reservationsService.updateStatus(updatedReservation);

  const data = await tablesService.update(updatedTable);
  res.status(200).json({ data });
}

// read a table
async function read(req, res, next) {
  res.status(200).json({ data: res.locals.table });
}

// delete a table
async function destroy(req, res, next) {
  const updatedTable = {
    ...res.locals.table,
    reservation_id: null,
  };

  const reservation_id = res.locals.table.reservation_id;
  const reservation = await reservationsService.read(reservation_id);

  const updatedReservation = {
    ...reservation,
    status: "finished",
  };

  const data = await tablesService.update(updatedTable);
  await reservationsService.updateStatus(updatedReservation);
  res.json({ data });
}

function validateReservationIsSeated(req, res, next) {
  const { status } = res.locals.reservation;

  if (status === "seated") {
    return next({
      status: 400,
      message: "This reservation is already seated",
    });
  }
  next();
}

// validate whether the input has valid properties
function hasOnlyValidProperties(req, res, next) {
  const { data = {} } = req.body;
  const invalidFields = Object.keys(data).filter(
    (field) => !VALID_PROPERTIES.includes(field)
  );
  if (invalidFields.length) {
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(", ")}`,
    });
  }
  next();
}

function hasData(req, res, next) {
  const data = req.body.data;
  if (!data) {
    return next({
      status: 400,
      message: `Request body must have data.`,
    });
  }
  next();
}

// validate that a table exists
async function tableExists(req, res, next) {
  const table = await tablesService.read(req.params.table_id);
  if (table) {
    res.locals.table = table;
    return next();
  }
  next({
    status: 404,
    message: `table ${req.params.table_id} cannot be found.`,
  });
}

// validate whether capacity is a number
function validateCapacityIsANumber(req, res, next) {
  const { data: { capacity } = {} } = req.body;
  if (Number.isInteger(capacity)) {
    next();
  } else {
    return next({
      status: 400,
      message: `capacity must be a number`,
    });
  }
}

// validate is more than two characters
function valiteTableNameIsNotOneCharacter(req, res, next) {
  const { table_name } = req.body.data;
  const table = String(table_name);
  if (table.length < 2) {
    return next({
      status: 400,
      message: `table_name must be longer than one character`,
    });
  }
  return next();
}

// validate that a reservation_id exists
async function validateReservationIdExists(req, res, next) {
  const { reservation_id } = req.body.data;
  if (!reservation_id) {
    next({
      status: 400,
      message: `reservation_id is missing.`,
    });
  }
  const reservation = await reservationsService.read(reservation_id);
  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  next({
    status: 404,
    message: `reservation_id ${reservation_id} cannot be found.`,
  });
}

// validate if table capacity is sufficient for reservation party
function validateTableCapacity(req, res, next) {
  const capacity = res.locals.table.capacity;
  if (capacity < res.locals.reservation.people) {
    next({
      status: 400,
      message: `table does not have sufficient capacity.`,
    });
  }
  next();
}

// validate if table is occupied or available
function validateTableAvailability(req, res, next) {
  const reservation = res.locals.table.reservation_id;
  if (reservation !== null) {
    next({
      status: 400,
      message: `table ${res.locals.table.table_id} is occupied.`,
    });
  }
  next();
}

function validateFinishedOccupiedTable(req, res, next) {
  const { table } = res.locals;

  if (!table.reservation_id) {
    return next({
      status: 400,
      message: "Table is not occupied.",
    });
  }
  next();
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    hasData,
    hasOnlyValidProperties,
    hasRequiredProperties,
    validateCapacityIsANumber,
    valiteTableNameIsNotOneCharacter,
    asyncErrorBoundary(create),
  ],
  read: [asyncErrorBoundary(tableExists), asyncErrorBoundary(read)],
  update: [
    hasData,
    asyncErrorBoundary(validateReservationIdExists),
    asyncErrorBoundary(tableExists),
    validateReservationIsSeated,
    validateTableCapacity,
    validateTableAvailability,
    asyncErrorBoundary(update),
  ],
  delete: [
    tableExists,
    validateFinishedOccupiedTable,
    asyncErrorBoundary(destroy),
  ],
};
