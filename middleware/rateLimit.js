const rateLimit = require("express-rate-limit");

exports.accessCreateAccountLimiter = rateLimit({
    windowMs: 3 * 60 * 1000,
    max: 10,
    message: "Too many attempts"
});

exports.seeProfileLimiter = rateLimit({
    windowMs: 3 * 60 * 60 * 1000,
    max: 300,
    message: "Too many attempts"
});

exports.deleteAccountLimiter = rateLimit({
    windowMs: 3 * 60 * 60 * 1000,
    max: 3,
    message: "Too many attempts"
});

exports.sendContentLimiter = rateLimit({
    windowMs: 3 * 60 * 60 * 1000,
    max: 200,
    message: "Too many attempts"
});

exports.getContentLimiter = rateLimit({
    windowMs: 3 * 60 * 60 * 1000,
    max: 400,
    message: "Too many attempts"
});

exports.deleteContentLimiter = rateLimit({
    windowMs: 3 * 60 * 60 * 1000,
    max: 50,
    message: "Too many attempts"
})

exports.postLimiter = rateLimit({
    windowMs: 3 * 60 * 60 * 1000,
    max: 100,
    message: "Too many attempts"
})

exports.seeLimiter = rateLimit({
    windowMs: 3 * 60 * 60 * 1000,
    max: 200,
    message: "Too many attempts"
})

exports.logOutLimiter = rateLimit({
    windowMs: 2 * 60 * 60 * 1000,
    max: 20,
    message: "Too many attempts"
})
