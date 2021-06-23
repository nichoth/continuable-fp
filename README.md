# continuable fp

[Continuable](https://github.com/Raynos/continuable) operators, but with the arguments flipped so they compose better, and also they curry automatically. So this is `operator(function, data)`.

This is a fun way to play with IO and functional patterns.

## install
```
npm i -S continuable-fp
```

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
    // null 'this is a value!!! wooo'
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

You can use typescript too

```
npm install -g typescript
tsc ts-example.ts
```

```typescript
import c = require('continuable-fp')

var test: c.Continuable<string> = c.of('hello')

c.of('hello')(function (err, val) {
    val.thisdoesnotexist()
    // Property 'thisdoesnotexist' does not exist on type 'string'
})
```
