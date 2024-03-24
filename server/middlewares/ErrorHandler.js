// const notFound = async (req, res, next) => {
//     const error = new Error(`${req.originalUrl} not found`);
//     res.status(404);
//     next(error);
// }

// const errorHandler = (err, req, res, next) => {
//     const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
//     return res.status(statusCode).json({ message: "Error: " + err.message });
// };

// module.exports = { notFound, errorHandler };