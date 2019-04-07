'use strict';

const { merge:deepmerge } = require('needful');
const process = require('./lib/process');
const expand = require('./lib/expand');
const merge = (acc, ...args) => process(deepmerge(acc, ...args));
const set = (obj, keypath, value) => process(expand(obj, keypath, value));

const sugar = {
    expand,
    process,
    merge,
    set
};

module.exports = sugar;
