"use strict"

const ListT = require('./trans/list');
const List = require('./type/list');

module.exports = {
    ListT: ListT,
    List: List,

    trans: { list: ListT },
    type: { list: List }
};
