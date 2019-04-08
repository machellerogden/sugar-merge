'use strict';

const process = require('./lib/process');
const expand = require('./lib/expand');
const set = (obj, keypath, value) => process(expand(obj, keypath, value));
const merge = (...args) => args.reduce((acc, obj) => {
    Object.keys(obj).reduce((a, k) => {
        acc = set(acc, k, obj[k]);
    }, Array.isArray(obj) ? [] : {});
    return acc;
}, Array.isArray(args[0]) ? [] : {});

const sugar = {
    expand,
    process,
    merge,
    set
};

module.exports = sugar;
