const ErrorResponse = require('../utils/errorResponse');
const errorHandler = (err, req, res, next) => {
	let error = { ...err };

	error.message = err.message;

	// Log to console
	console.log(err);

	// Mongoose bad ObjectId
	if (err.name === 'CastError') {
		const message = `Bootcamp not found with id of ${err.value}`;
		error = new ErrorResponse(message, 404);
	}
	console.log(err.name.brightRed);

	// Mongoose duplicate key
	if (err.code === 11000) {
		const message = 'Duplicate field value entered';
		error = new ErrorResponse(message, 400);
	}

	// Mongoose validation error
	if (err.name === 'ValidationError') {
		// As error messages are in an array, need to extract
		const message = Object.values(err.errors).map(val => val.message);
		error = new ErrorResponse(message, 400);
	}

	res.status(error.statusCode || 500).json({
		sucess: false,
		error: error.message || 'Server Error'
	});
};

module.exports = errorHandler;
