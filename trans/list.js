/**
 * List monad transformer.
 * 
 * Uses Javascript arrays.
 */
"use strict"
const core = require('akh.core')
const spec = require('akh.core.spec')

const liftM = core.liftM
const liftM2 = core.liftM2

const foldr = (f, z, a) => Array.prototype.reduceRight.call(a, f, z)

const map = (f, a) => Array.prototype.map.call(a, f)

const concat = Function.prototype.call.bind(Array.prototype.concat)

const flatten = Function.prototype.apply.bind(Array.prototype.concat, [])

const flip = f => (x, y) => f(y, x)

const flattenM = liftM.bind(null, flatten)

/* Transformer
 ******************************************************************************/
const runListT = x => x._run

/**
 * List monad transformer.
 * 
 * @param m Base monad.
 */
const ListT = m => {
    const Instance = function (run) {
        this._run = run
    }

    const sequence = foldr.bind(null, liftM2.bind(null, flip(concat)), m.of([]))

    const mapM = (f, m) => sequence(map(f, m))

    spec.Monoid(Instance,
        new Instance(m.of([])),

        function (b) {
            return new Instance(
                liftM2(concat,
                    runListT(this),
                    runListT(b)))
        })

    spec.Monad(Instance,
        x =>
            new Instance(m.of([x])),

        function (f) {
            return new Instance(
                flattenM(runListT(this)
                    .chain(mapM.bind(null, x => runListT(f(x))))))
        })

    spec.Transformer(Instance, m,
        t =>
            new Instance(
                liftM(x => [x], t)))

    Instance.prototype.run = function() {
        return ListT.run(this)
    }

    return Instance
}

/**
 * Perform a list computation.
 * 
 * @param m ListT computation.
 */
ListT.run = runListT

module.exports = ListT