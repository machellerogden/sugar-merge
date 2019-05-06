'use strict';

const {
    get,
    set,
    merge,
    isObject,
    isArray,
    entries,
    map,
    reduce
} = require('needful');

function process(subject = {}) {
    return reduce(entries(subject), (acc, [ key, value ]) => {
        const current = get(acc, key);
        // handle prop[<int>].prop syntax (array index expand)
        if (/\[\d\]$/.test(key)) {
            if (isObject(value) && isObject(current)) {
                set(acc, key, process(merge(current, value)));
            } else if (isArray(value)) {
                set(acc, key, map(value, process));
            } else {
                set(acc, key, value);
            }
        // handle prop[] and prop[+] syntax (array push)
        } else if (/\[\+?\]$/.test(key)) {
            const parentKey = ('' + key).split('[')[0];
            const parent = get(acc, parentKey, []);
            if (isObject(value)) {
                parent.push(process(value));
            } else if (isArray(value)) {
                value.forEach((v) => parent.push(process(v)));
            } else {
                parent.push(value);
            }
            set(acc, parentKey, parent);
        // handle prop[-] syntax (array unshift)
        } else if (/\[-\]$/.test(key)) {
            const parentKey = ('' + key).split('[')[0];
            const parent = get(acc, parentKey, []);
            if (isObject(value)) {
                parent.unshift(process(value));
            } else if (isArray(value)) {
                value.forEach((v) => parent.unshift(process(v)));
            } else {
                parent.unshift(value);
            }
            set(acc, parentKey, parent);
        // handle prop[<int>, <int>] syntax (array splice)
        } else if (/\[\d+,\d+\]$/.test(key)) {
            const matches = /\[(\d+),(\d+)\]$/.exec(key);
            const idx = matches[1];
            const rm = matches[2];
            const parentKey = ('' + key).split('[')[0];
            const parent = get(acc, parentKey, []);
            if (isArray(value)) {
                value.forEach((v) => parent.splice(idx, rm, v));
            } else {
                parent.splice(idx, rm, value);
            }
            set(acc, parentKey, parent);
        // set objects via recurive call
        } else if (isObject(value)) {
            set(acc, key, process(value));
        // set arrays via recurive map
        } else if (isArray(value)) {
            set(acc, key, map(value, process));
        // set primitives
        } else {
            set(acc, key, value);
        }
        return acc;
    }, isArray(subject) ? [] : {});
}


module.exports = process;
