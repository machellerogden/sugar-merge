# Sugar Merge

> Deep merge utils with a little sugar on top

## Merge

```js
const { merge } = require('sugarmerge');

const a = {
    foo: {
        bar: [
            {
                baz: 'sis'
            },
            {
                qux: 'boom'
            }
        ]
    }
};

const b = {
    foo: {
        'bar[+]': { xyzzy: 'bah' }
    }
};

merge(a, b);

/**
 * returns:
 *    {
 *        foo: {
 *            bar: [
 *                {
 *                    baz: 'sis'
 *                },
 *                {
 *                    qux: 'boom'
 *                },
 *                {
 *                    xyzzy: 'bah'
 *                }
 *            ]
 *        }
 *    }
 */

const c = {
    foo: {
        'bar[-]': { xyzzy: 'bah' }
    }
};

merge(a, c);

/**
 * returns:
 *    {
 *        foo: {
 *            bar: [
 *                {
 *                    xyzzy: 'bah'
 *                },
 *                {
 *                    baz: 'sis'
 *                },
 *                {
 *                    qux: 'boom'
 *                }
 *            ]
 *        }
 *    }
 */

const d = {
    foo: {
        'bar[1,0]': { xyzzy: 'bah' }
    }
};

merge(a, d);

/**
 * returns:
 *    {
 *        foo: {
 *            bar: [
 *                {
 *                    baz: 'sis'
 *                },
 *                {
 *                    xyzzy: 'bah'
 *                },
 *                {
 *                    qux: 'boom'
 *                }
 *            ]
 *        }
 *    }
 */

```

## Set

```js
const { set } = require('sugarmerge');

const obj = {
    foo: {
        bar: [
            {
                baz: [ 1, 2, 3 ]
            }
        ]
    }
};

set(obj, 'foo.bar[0].baz[+].qux', 'xyzzy');

/**
 * returns:
 *    {
 *        foo: {
 *            bar: [
 *                {
 *                    baz: [
 *                        1,
 *                        2,
 *                        3,
 *                        {
 *                            qux: 'xyzzy'
 *                        }
 *                    ]
 *                }
 *            ]
 *        }
 *   }
 */

set(obj, 'foo.bar[0].baz[-].qux', 'xyzzy');

/**
 * returns:
 *    {
 *        foo: {
 *            bar: [
 *                {
 *                    baz: [
 *                        {
 *                            qux: 'xyzzy'
 *                        },
 *                        1,
 *                        2,
 *                        3
 *                    ]
 *                }
 *            ]
 *        }
 *   }
 */

set(obj, 'foo.bar[0].baz[1,0].qux', 'xyzzy');

/**
 * returns:
 *    {
 *        foo: {
 *            bar: [
 *                {
 *                    baz: [
 *                        1,
 *                        {
 *                            qux: 'xyzzy'
 *                        },
 *                        2,
 *                        3
 *                    ]
 *                }
 *            ]
 *        }
 *   }
 */
```

#### License

MIT
