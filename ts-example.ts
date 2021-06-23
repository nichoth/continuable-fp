import c = require('./')

var test: c.Continuable<string> = c.of('hello')

c.of('hello')(function (err, val) {
    val.thisdoesnotexist()
    // Property 'thisdoesnotexist' does not exist on type 'string'
})

