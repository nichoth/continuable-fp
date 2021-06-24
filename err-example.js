var compose = require('compose-function')
var c = require('./')

var myFn = c.either(
    function onErr (err) {
        return c.of('baaaa')
    },
    function onData (data) {
        return c.of('ok')
    }
)

myFn(someIO('woooo'))(function (err, done) {
    console.log('it worked...', err, done)
})

myFn(ioError('booo'))(function (err, ok) {
    console.log('err result...', err, ok)
})

function someIO (data, cb) {
    if (!cb) return function (_cb) {
        return someIO(data, _cb)
    }
    process.nextTick(function () {
        cb(null, data)
    })
}

function ioError (data, cb) {
    if (!cb) return function (_cb) {
        return ioError(data, _cb)
    }
    process.nextTick(function () {
        cb(new Error('rarrr'))
    })
}

