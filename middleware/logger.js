// @desc    Logs request to console
const logger = (req, res, next) => {
	console.log(
		`${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`
	);
	next(); // this might be changed in new versions
};

module.exports = logger;
