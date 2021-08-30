import c = require('./')

var test: c.Continuable<string> = c.of('hello')

test(function (err, val) {
    // console.log(val + ' world')
    val.thisdoesnotexist()
    // Property 'thisdoesnotexist' does not exist on type 'string'
})

