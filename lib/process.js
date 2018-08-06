'use strict';

const get = require('lodash/get');
const set = require('lodash/set');
const deepmerge = require('./deepmerge');
const notNil = v => v != undefined;
const isObject = v => notNil(v) && typeof v === 'object';

function process(subject = {}) {
    return Object.entries(subject).reduce((acc, [ key, value ]) => {
        const current = get(acc, key);
        // handle prop[<int>].prop syntax (array index expand)
        if (/\[\d\]$/.test(key)) {
            if (isObject(value) && isObject(current)) {
                set(acc, key, process(deepmerge(current, value)));
            } else if (Array.isArray(value)) {
                set(acc, key, value.map(process));
            } else {
                set(acc, key, value);
            }
        // handle prop[+] syntax (array push)
        } else if (/\[\+\]$/.test(key)) {
            const parentKey = key.split('[')[0];
            const parent = get(acc, parentKey, []);
            if (isObject(value)) {
                parent.push(process(value));
            } else if (Array.isArray(value)) {
                value.forEach((v) => parent.push(process(v)));
            } else {
                parent.push(value);
            }
            set(acc, parentKey, parent);
        // handle prop[-] syntax (array unshift)
        } else if (/\[-\]$/.test(key)) {
            const parentKey = key.split('[')[0];
            const parent = get(acc, parentKey, []);
            if (isObject(value)) {
                parent.unshift(process(value));
            } else if (Array.isArray(value)) {
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
            const parentKey = key.split('[')[0];
            const parent = get(acc, parentKey, []);
            if (Array.isArray(value)) {
                value.forEach((v) => parent.splice(idx, rm, v));
            } else {
                parent.splice(idx, rm, value);
            }
            set(acc, parentKey, parent);
        // set objects via recurive call
        } else if (isObject(value)) {
            set(acc, key, process(value));
        // set arrays via recurive map
        } else if (Array.isArray(value)) {
            set(acc, key, value.map(process));
        // set primitives
        } else {
            set(acc, key, value);
        }
        return acc;
    }, Array.isArray(subject) ? [] : {});
}


module.exports = process;
