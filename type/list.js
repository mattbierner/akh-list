/**
 * List monad
 */
"use strict"
const Identity = require('akh.identity').Identity
const ListT = require('../trans/list')

/**
 * List monad.
 */
const List = ListT(Identity)

/**
 * Perform a list computation.
 * 
 * @param m Computation.
 */
List.run = m => Identity.run(ListT.run(m))

List.prototype.run = function() {
    return List.run(this)
}

module.exports = List