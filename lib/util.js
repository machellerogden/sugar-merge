'use strict';

const notNil = exports.notNil = v => v != undefined;
exports.isObject = v => notNil(v) && typeof v === 'object';
