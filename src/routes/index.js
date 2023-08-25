const newsRouter = require('./news');
const meRouter = require('./me');
const coursesRouter = require('./courses');
const siteRouter = require('./site');
const loginRouter = require('./security');
const adminRouter = require('./admin/index');
const cookieParser = require('cookie-parser')
const { checkLogin, checkTeacher } = require('../app/middelware/verifyUser');

function route(app) {
    app.use(cookieParser());
    app.use('/api/admin',checkLogin,checkTeacher, adminRouter);
    app.use('/news', newsRouter);
    app.use('/me', meRouter);
    app.use('/courses', coursesRouter);
    app.use('/login', loginRouter);
    app.use('/', siteRouter);
}

module.exports = route;
