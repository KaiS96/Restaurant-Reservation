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
  "status",
];

// list reservations
async function list(req, res) {
  const { date } = req.query;
  const { mobile_number } = req.query;
  let data;
  if (date) {
    data = await reservationsService.listReservationsByDate(date);
  }

  if (mobile_number) {
    data = await reservationsService.search(mobile_number);
  }
  res.json({ data });
}

// create a reservation
async function create(req, res, next) {
  const data = await reservationsService.create(req.body.data);
  res.status(201).json({ data });
}

// read a reservation
async function read(req, res, next) {
  res.status(200).json({ data: res.locals.reservation });
}

// update a reservation
async function update(req, res, next) {
  const updatedReservation = {
    ...req.body.data,
    reservation_id: res.locals.reservation.reservation_id,
  };
  const data = await reservationsService.updateStatus(updatedReservation);
  res.json({ data });
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

// validate that a reservation exists
async function reservationExists(req, res, next) {
  const reservation = await reservationsService.read(req.params.reservation_id);
  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  next({
    status: 404,
    message: `${req.params.reservation_id} cannot be found.`,
  });
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
  const newDay = new Date();
  const dayOfTheWeek = new Date(date);
  if (dayOfTheWeek.getUTCDay() == 2) {
    return next({
      status: 400,
      message: `The reservation_date is a Tuesday as the restaurant is closed on Tuesdays.`,
    });
  } else if (date && date > 0) {
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
  let timeRegex = new RegExp(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/);
  const { reservation_time } = req.body.data;
  const currentTime = new Date().toLocaleTimeString();
  if (reservation_time < "10:30") {
    return next({
      status: 400,
      message: `reservation_time must be after 10:30 am`,
    });
  } else if (reservation_time > "21:30") {
    return next({
      status: 400,
      message: `reservation_time must be before 9:30 pm`,
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

// validate date is a future date
function validateDateIsNotInThePast(req, res, next) {
  const { reservation_date, reservation_time } = req.body.data;
  let day = new Date(`${reservation_date} ${reservation_time}`);
  if (day < Date.now()) {
    return next({
      status: 400,
      message: `The reservation_date is in the past. Only future reservations are allowed.`,
    });
  }
  next();
}

// validate reservation status is booked when created
function validateBookedReservation(req, res, next) {
  const { status } = req.body.data;
  if (status) {
    if (status == "seated" || status == "finished") {
      return next({
        status: 400,
        message: "Cannot create seated or finished reservation.",
      });
    }
    if (status == "booked") {
      return next();
    }
  }
  return next();
}

// validate reservation status
function validateStatus(req, res, next) {
  const { status } = req.body.data;
  const validStatus = ["booked", "seated", "finished"];
  if (!validStatus.includes(status)) {
    return next({
      status: 400,
      message: `Status cannot be unknown`,
    });
  }
  res.locals.status = status;
  next();
}

// validate if reservation is finished -- cannot update
function validateFinishedReservation(req, res, next) {
  const { reservation } = res.locals;
  if (reservation.status === "finished") {
    return next({
      status: 400,
      message: `Status is currently finished`,
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
    validatePeopleIsANumber,
    validateDateIsNotInThePast,
    validateDateIsDate,
    validateTimeIsTime,
    validateBookedReservation,
    asyncErrorBoundary(create),
  ],
  read: [asyncErrorBoundary(reservationExists), asyncErrorBoundary(read)],
  update: [
    asyncErrorBoundary(reservationExists),
    validateStatus,
    validateFinishedReservation,
    asyncErrorBoundary(update),
  ],
};
