var continuable = {
    // take a nested continuable and return the inner one
    join: function join (con) {
        return function (cb) {
            con(function (err, _con) {
                if (err) return cb(err)
                _con(cb)
            })
        }
    },

    map: function map (fn, con) {
        if (!con) return function (c) {
            return map(fn, c)
        }
        return function (cb) {
            con(function (err, val) {
                if (err) return cb(err)
                cb(null, fn(val))
            })
        }
    },

    either: function either (left, right, con) {
        if (!con) return function (_con) {
            return either(left, right, _con)
        }

        return function (cb) {
            con(function (err, val) {
                if (err) return left(err)(cb)
                return right(val)(cb)
            })
        }
    },

    of: function (val) {
        return function (cb) {
            cb(null, val)
        }
    }
}

module.exports = continuable

