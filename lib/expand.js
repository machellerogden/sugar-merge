'use strict';

const deepmerge = require('./deepmerge');
const { isObject } = require('./util');

const expand = (obj, key, value) => {
    hydrate(obj, key.split('.'), value);
    return obj;
};

const isPrimitive = (v) => [ 'boolean', 'string', 'number' ].includes(typeof v);

const hydrate = (obj, keys, value) => {
    var o = obj; // cursor
    keys.slice(0, -1).forEach((key) => {
        if (o[key] == null) o[key] = {};
        o = o[key];
    });
    const key = keys[keys.length - 1];
    if (o[key] === undefined || isPrimitive(o[key]) || isPrimitive(value)) {
        o[key] = value;
    } else if (Array.isArray(o[key])) {
        o[key].push(value);
    } else if (isObject(o[key])) {
        o[key] = deepmerge(o[key], value);
    } else {
        o[key] = value;
    }
};

module.exports = expand;
