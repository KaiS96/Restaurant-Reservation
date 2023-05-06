/**
 * List handler for reservation resources
 */
const reservationsService = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

const hasProperties = require("../errors/hasProperties");
const hasRequiredProperties = hasProperties(
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people"
);

const VALID_PROPERTIES = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
];

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

// list reservations
async function list(req, res) {
  const { date } = req.query;
  let data;
  if (date) {
    data = await reservationsService.listReservationsByDate(date);
  } else {
    data = await reservationsService.list(date);
  }
  res.json({ data });
}

// async function read(req, res) {
//   res.status(200).json({ data: res.locals.reservation });
// }

// create a reservation
async function create(req, res, next) {
  const data = await reservationsService.create(req.body.data);
  res.status(201).json({ data });
}

// validate whether people is a number
function validatePeopleIsANumber(req, res, next) {
  const { data: { people } = {} } = req.body;
  if (Number.isInteger(people)) {
    next();
  } else {
    return next({
      status: 400,
      message: `people must be a number`,
    });
  }
}

// validate whether reservation_date is a date
function validateDateIsDate(req, res, next) {
  const { reservation_date } = req.body.data;
  const date = Date.parse(reservation_date);
  if (date && date > 0) {
    return next();
  } else {
    return next({
      status: 400,
      message: `reservation_date must be a date`,
    });
  }
}

// validate whether reservation_time is a time
function validateTimeIsTime(req, res, next) {
  let timeRegex = new RegExp(/^([01]\d|2[0-3]):?([0-5]\d)$/);
  const { reservation_time } = req.body.data;
  if (reservation_time == null) {
    return next({
      status: 400,
      message: `reservation_time must be a time`,
    });
  } else if (timeRegex.test(reservation_time) == true) {
    return next();
  } else {
    return next({
      status: 400,
      message: `reservation_time must be a time`,
    });
  }
}

// // validate that a movie exists
// async function reservationExists(req, res, next) {
//   const reservation = await reservationsService.read(req.params.reservation_id);
//   if (reservation) {
//     res.locals.reservation = reservation;
//     return next();
//   }
//   next({
//     status: 404,
//     message: `Reservation: ${req.params.reservation_id} cannot be found.`,
//   });
// }

module.exports = {
  // read: [reservationExists, asyncErrorBoundary(read)],
  list: asyncErrorBoundary(list),
  create: [
    //reservationExists,
    hasData,
    hasOnlyValidProperties,
    hasRequiredProperties,
    validatePeopleIsANumber,
    validateDateIsDate,
    validateTimeIsTime,
    asyncErrorBoundary(create),
  ],
};
