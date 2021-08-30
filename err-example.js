var c = require('./')

var myFn = c.either(
    function onErr (err) {
        return c.of(err + ' baaaa')
    },
    function onData (data) {
        return c.of('ok')
    }
)

myFn(someIO('woooo'))(function (err, done) {
    console.log('it worked...', err, done)
    // it worked... null ok
})

myFn(ioError('booo'))(function (err, ok) {
    console.log('err result...', err, ok)
    // err result... null Error: booo baaaa
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
        cb(new Error('' + data))
    })
}

