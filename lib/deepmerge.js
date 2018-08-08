'use strict';

const reduce = require('lodash/reduce');
const forEach = require('lodash/forEach');
const { notNil, isObject } = require('./util');

function deepmerge(acc, ...args) {
    return reduce(args, (a, arg) => {
        forEach(arg, (v, k) => {
            if (isObject(v)) {
                a[k] = deepmerge(a[k] || (Array.isArray(v) ? [] : {}), v);
            } else if (notNil(v)) {
                a[k] = v;
            }
        });
        return a;
    }, acc);
}

module.exports = deepmerge;
