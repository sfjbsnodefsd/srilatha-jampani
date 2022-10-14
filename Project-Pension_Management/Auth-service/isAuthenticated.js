const jwt = require('jsonwebtoken');

module.exports = async function isAuthenticated(req, res, next) {
    const token = req.headers['authorization'] ? req.headers['authorization'].split(' ')[1] : null;

    jwt.verify(token, 'secret', (err, user) => {
        if (err) {
            return res.send({
                sucess: 0,
                err: 'Unauthorized',
                err
            });
        } else {
            req.user = user;
            next();
        }
    })
}