const { UnauthenticatedError } = require('../errors');

const isAdmin = (req, res, next) => {
    try {
        if (req.user && req.user.role === 'admin') {
            next();
        } else {
            throw new UnauthenticatedError('You are not authorized to perform this action');
        }
    } catch (error) {
        console.log(error);
        next(error); 
    }
};

module.exports = isAdmin;
