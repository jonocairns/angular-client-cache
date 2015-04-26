# angular-client-cache

[![Build Status](https://travis-ci.org/angular-client-cache.svg?branch=master)](https://travis-ci.org/jonocairns/Intergen.ClientCache) [![Code Climate](https://codeclimate.com/github/angular-client-cache/badges/gpa.svg)](https://codeclimate.com/github/angular-client-cache) [![Test Coverage](https://codeclimate.com/github/angular-client-cache/badges/coverage.svg)](https://codeclimate.com/github/angular-client-cache) [![NPM version][npm-image]][npm-url] [![License][license-image]][license-url] [![Dependency Status][david-image]][david-url]
 

Local storage and session storage wrapper for angular. Also has functionality to compress items to be stored in local/session storage.

Tests run across the lastest versions of IE/Firefox/Chrome

Uses http://caniuse.com/#search=web%20storage

Written in typescript

Options: interface IStorageOptions {
        storagePrefix?: string;
        useCompression?: boolean;
        storageType?: StorageType;
    }

Dependencies: 

LZ-string (https://github.com/pieroxy/lz-string/),
Angular

[npm-image]: https://img.shields.io/npm/v/angular-client-cache.svg?style=flat-square
[npm-url]: https://npmjs.org/package/angular-client-cache
[license-image]: http://img.shields.io/npm/l/angular-client-cache.svg?style=flat-square
[license-url]: LICENSE
[david-image]: http://img.shields.io/david/angular-client-cache.svg?style=flat-square
[david-url]: https://david-dm.org/angular-client-cache
