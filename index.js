'use strict';

const deepmerge = require('./lib/deepmerge');
const process = require('./lib/process');
const expand = require('./lib/expand');
const merge = (acc, ...args) => process(deepmerge(acc, ...args));
const set = (obj, keypath, value) => process(expand(obj, keypath, value));

const sugar = {
    expand,
    process,
    deepmerge,
    merge,
    set
};

module.exports = sugar;
