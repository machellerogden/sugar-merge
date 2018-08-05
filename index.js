'use strict';

const deepmerge = require('./lib/deepmerge');
const process = require('./lib/process');
const expand = require('./lib/expand');

const sugar = {
    expand,
    process,
    deepmerge,
    merge: (acc, ...args) => process(deepmerge(acc, ...args)),
    set: (obj, keypath, value) => process(expand(obj, keypath, value))
};


module.exports = sugar;
