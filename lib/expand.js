'use strict';

const expand = (obj, key, value) => {
    hydrate(obj, key.split('.'), value);
    return obj;
};

const hydrate = (obj, keys, value) => {
    var o = obj; // cursor
    keys.slice(0, -1).forEach((key) => {
        if (o[key] === undefined) o[key] = {};
        o = o[key];
    });
    const key = keys[keys.length - 1];
    if (o[key] === undefined || typeof o[key] === 'boolean') {
        o[key] = value;
    } else if (Array.isArray(o[key])) {
        o[key].push(value);
    } else {
        o[key] = [ o[key], value ];
    }
};

module.exports = expand;
