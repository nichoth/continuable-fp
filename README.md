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
    // remove a level of nesting
    c.join,
    c.map(function (data) {
        // return a nested continuable
        // here you can make a call to a new continuable (`someIO` below),
        // using the data inside this continuable
        return c.either(
            // call this if `someIO` returns an error
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

## example of errors

```js
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
```

```
$ node err-example.js
it worked... null ok
err result... null baaaa
```

## typescript

You can use typescript too

```
npx tsc ts-example.ts
ts-example.ts:7:9 - error TS2339: Property 'thisdoesnotexist' does not exist on type 'string'.

7     val.thisdoesnotexist()
          ~~~~~~~~~~~~~~~~

```

```typescript
import c = require('continuable-fp')

var test: c.Continuable<string> = c.of('hello')

c.of('hello')(function (err, val) {
    val.thisdoesnotexist()
    // Property 'thisdoesnotexist' does not exist on type 'string'
})
```

## operators

### join
Take a nested continuable and return the inner one

### map
Map a value through a predicate function

### either
Return the left function if there is an error, right function if there's no error.

```js
either (left, right, continuable)
```

### of
Take a value, and create a continuable of it





