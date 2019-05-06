class ExtendableError extends Error {
    constructor(message) {
        super();
        this.message = message;
        this.stack = (new Error()).stack;
    }
}

// now I can extend

class MyError extends ExtendableError {
    constructor(m, status = 500) {
        super(m);
        this.status = status;
    }
}

module.exports = MyError;