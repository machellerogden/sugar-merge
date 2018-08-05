'use strict';
const chai = require('chai');
const expect = chai.expect;
const { merge } = require('..');

describe('merge', () => {
    it('[+] syntax should push to array', () => {

        expect(merge({
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
        }, {
            foo: {
                'bar[+]': { xyzzy: 'bah' }
            }
        })).to.eql({
               foo: {
                   bar: [
                       {
                           baz: 'sis'
                       },
                       {
                           qux: 'boom'
                       },
                       {
                           xyzzy: 'bah'
                       }
                   ]
               }
        });
    });

    it('[-] syntax should unshift to array', () => {

        expect(merge({
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
        }, {
            foo: {
                'bar[-]': { xyzzy: 'bah' }
            }
        })).to.eql({
            foo: {
                bar: [
                    {
                        xyzzy: 'bah'
                    },
                    {
                        baz: 'sis'
                    },
                    {
                        qux: 'boom'
                    }
                ]
            }
        });

    });

    it('[<int>,<int>] syntax should splice to array', () => {

        expect(merge({
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
        }, {
            foo: {
                'bar[1,0]': { xyzzy: 'bah' }
            }
        })).to.eql({
            foo: {
                bar: [
                    {
                        baz: 'sis'
                    },
                    {
                        xyzzy: 'bah'
                    },
                    {
                        qux: 'boom'
                    }
                ]
            }
        });

    });

    it('[<int>,<int>] syntax should splice even with large indexes', () => {

        expect(merge({
            foo: {
                bar: [
                    {
                        a: 'a'
                    },
                    {
                        b: 'b'
                    },
                    {
                        c: 'c'
                    },
                    {
                        d: 'd'
                    },
                    {
                        e: 'e'
                    },
                    {
                        f: 'f'
                    },
                    {
                        g: 'g'
                    },
                    {
                        h: 'h'
                    },
                    {
                        i: 'i'
                    },
                    {
                        j: 'j'
                    },
                    {
                        k: 'k'
                    },
                    {
                        m: 'm'
                    },
                    {
                        n: 'n'
                    }
                ]
            }
        }, {
            foo: {
                'bar[11,0]': { l: 'l' }
            }
        })).to.eql({
            foo: {
                bar: [
                    {
                        a: 'a'
                    },
                    {
                        b: 'b'
                    },
                    {
                        c: 'c'
                    },
                    {
                        d: 'd'
                    },
                    {
                        e: 'e'
                    },
                    {
                        f: 'f'
                    },
                    {
                        g: 'g'
                    },
                    {
                        h: 'h'
                    },
                    {
                        i: 'i'
                    },
                    {
                        j: 'j'
                    },
                    {
                        k: 'k'
                    },
                    {
                        l: 'l'
                    },
                    {
                        m: 'm'
                    },
                    {
                        n: 'n'
                    }
                ]
            }
        });

    });
});
