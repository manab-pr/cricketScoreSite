const customAPIError = require("./custom-api");
const BadRequestError = require("./bad-request");
const NotFoundError = require("./not-found");
const UnauthenticatedError = require("./unauthenticated");

module.exports = {
  customAPIError,
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
};
