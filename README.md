# continuable fp

Continuable operators, but with the arguments flipped so they compose better. 

## example

```js
var compose = require('compose-function')
var c = require('./')

var excitedly = compose(
    c.join,
    c.map(function (data) {
        return c.either(
            function onErr (err) {
                return c.of('booo')
            },
            function (val) {
                return c.of(val)
            },
            someIO(data + ' wooo')
        )
    }),
    c.map(function (data) {
        return data + '!!!'
    })
)

excitedly(someIO('this is a value'))(function (err, val) {
    console.log(err, val)
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
```

