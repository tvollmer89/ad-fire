[![Build Status](https://travis-ci.org/tkoomzaaskz/tree.png?branch=master)](https://travis-ci.org/tkoomzaaskz/tree)
[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

[![Dependency Status](https://david-dm.org/tkoomzaaskz/tree.svg)](https://david-dm.org/tkoomzaaskz/tree)
[![devDependency Status](https://david-dm.org/tkoomzaaskz/tree/dev-status.svg)](https://david-dm.org/tkoomzaaskz/tree#info=devDependencies)

     ____  ____  ____  ____     ____  ___
    (_  _)(  _ \( ___)( ___)   (_  _)/ __)
      )(   )   / )__)  )__)   .-_)(  \__ \
     (__) (_)\_)(____)(____)()\____) (___/

Prototype-based Javascript tree implementation
----------------------------------------------

_Tree_ implements basic tree structure in JavaScript. It overrides native JS
arrays, so that it has similar API. The benefit of using _Tree_ is that its
objects (which inherit from Array.prototype) can be nested internally, forming
a recursive, hierarchical structure.

Features
--------

 * standard and minified version
 * basic QUnit tests integrated with travis-ci

Node.js support
---------------

`Tree` can be easily used within node.js projects:

    > var Tree = require('./src/tree')
    undefined

    > var t = new Tree();
    undefined

    > t.push(1,2,3)
    3

    > t
    { '0': 1,
      '1': 2,
      '2': 3,
      children:
       { '1': { children: {} },
         '2': { children: {} },
         '3': { children: {} } },
      length: 3 }

    > t.children[2].push(98, 56);
    2

    > t
    { '0': 1,
      '1': 2,
      '2': 3,
      children:
       { '1': { children: {} },
         '2':
          { '0': 98,
            '1': 56,
            children: [Object],
            length: 2 },
         '3': { children: {} } },
      length: 3 }

Inspirations
------------

 * QUnit & requireJS solution based on https://github.com/jonnyreeves/qunit-require

Contribution
------------

Any feedback and contribution is very welcome.
