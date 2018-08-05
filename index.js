'use strict';

const merge = require('./lib/merge');
const process = require('./lib/process');
const expand = require('./lib/expand');

const sugar = {
    process,
    merge: (acc, ...args) => process(merge(acc, ...args)),
    set: (obj, keypath, value) => process(expand(obj, keypath, value))
};


module.exports = sugar;
