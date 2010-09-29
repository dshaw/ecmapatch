/**
 * ecmapatch.js
 * - Provide modern (awesome) functionality in browsers that aren't there yet.
 */

(function(global) {
  
  if (!!global.ecmapatch && !!global.ecmapath._version) return;

  var ecmapatch = global.ecmapatch = {
    _version: 'v0.1',
    Array: {
      indexOf: !!Array.prototype.indexOf,
      lastIndexOf: !!Array.prototype.lastIndexOf,
      every: !!Array.prototype.every,
      filter: !!Array.prototype.filter,
      forEach: !!Array.prototype.forEach,
      map: !!Array.prototype.map,
      reduce: !!Array.prototype.reduce,
      reduceRight: !!Array.prototype.reduceRight,
      some: !!Array.prototype.some
    },
    Object: {
      keys: !!Object.keys
    }
  };

  ecmapatch.patch = function(/* filter [not implemented yet] */) {
    // Array
    if (!ecmapatch.Array.indexOf) {
      Array.prototype.indexOf = ecmapatch.indexOf;
    }
    if (!ecmapatch.Array.lastIndexOf) {
      Array.prototype.lastIndexOf = ecmapatch.lastIndexOf;
    }
    if (!ecmapatch.Array.every) {
      Array.prototype.every = ecmapatch.every;
    }
    if (!ecmapatch.Array.filter) {
      Array.prototype.filter = ecmapatch.filter;
    }
    if (!ecmapatch.Array.forEach) {
      Array.prototype.forEach = ecmapatch.forEach;
    }
    if (!ecmapatch.Array.map) {
      Array.prototype.map = ecmapatch.map;
    }
    if (!ecmapatch.Array.reduce) {
      Array.prototype.reduce = ecmapatch.reduce;
    }
    if (!ecmapatch.Array.reduceRight) {
      Array.prototype.reduceRight = ecmapatch.reduceRight;
    }
    if (!ecmapatch.Array.some) {
      Array.prototype.some = ecmapatch.some;
    }
    // Object
    if (!ecmapatch.Object.keys) {
      Object.prototype.keys = ecmapatch.keys;
    }
  };

  // *******
  // Array
  // *******

  /**
   * Array.indexOf()
   *
   * Returns the index of the first occurrence of the element in the array.
   * Returns -1 if not found.
   *
   * ECMAScript 5
   *
   * @param {Function} elt
   * @param {Number} from [optional]
   * @return {Number}
   */
  ecmapatch.indexOf = Array.prototype.indexOf || function(elt /*, from*/) {
    var len = this.length >>> 0;
    var from = Number(arguments[1]) || 0;
    from = (from < 0) ? Math.ceil(from) : Math.floor(from);
    if (from < 0) {
      from += len;
    }

    for (; from < len; from++) {
      if (from in this && this[from] === elt) {
        return from;
      }
    }
    return -1;
  };

  /**
   * Array.lastIndexOf()
   *
   * Returns the index of the last occurrence of the element in the array.
   * Returns -1 if not found.
   *
   * ECMAScript 5
   *
   * @param {Function} elt
   * @param {Number} from [optional]
   * @return {Number}
   */
  ecmapatch.lastIndexOf = Array.prototype.lastIndexOf || function(elt /*, from*/) {
    var len = this.length;
    var from = Number(arguments[1]);
    if (isNaN(from)) {
      from = len - 1;
    } else {
      from = (from < 0) ? Math.ceil(from) : Math.floor(from);
      if (from < 0) {
        from += len;
      }
      else if (from >= len) {
        from = len - 1;
      }
    }

    for (; from > -1; from--) {
      if (from in this && this[from] === elt) {
        return from;
      }
    }
    return -1;
  };

  /**
   * Array.every()
   *
   * Returns true if every element in the array returns true for the test defined by the function.
   *
   * ECMAScript 5
   *
   * Ref. https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/every
   *
   * @param {Function} fun
   * @param {Object} thisp [optional]
   * @return {Array}
   */
  ecmapatch.every = Array.prototype.every || function(fun /*, thisp*/) {
    var len = this.length >>> 0;
    if (typeof fun != 'function') {
      throw new TypeError();
    }

    var thisp = arguments[1];
    for (var i = 0; i < len; i++) {
      if (i in this && !fun.call(thisp, this[i], i, this)) {
        return false;
      }
    }
    return true;
  };

  /**
   * Array.filter()
   *
   * Returns an array from the results of a filtering function which return true.
   *
   * ECMAScript 5
   *
   * @param {Function} fun
   * @param {Object} thisp [optional]
   * @return {Boolean}
   */
  ecmapatch.filter = Array.prototype.filter || function(fun /*, thisp*/) {
    var len = this.length >>> 0;
    if (typeof fun != 'function') {
      throw new TypeError();
    }
    var res = [];
    var thisp = arguments[1];
    for (var i = 0; i < len; i++) {
      if (i in this) {
        var val = this[i]; // in case fun mutates this
        if (fun.call(thisp, val, i, this)) {
          res.push(val);
        }
      }
    }
    return res;
  };


  /**
   * Array.forEach()
   *
   * Execute a function on every element of the Array.
   *
   * ECMAScript 5
   *
   * @param {Function} fun
   * @param {Object} thisp [optional]
   */
  ecmapatch.forEach = Array.prototype.forEach || function(fun /*, thisp*/) {
    var len = this.length >>> 0;
    if (typeof fun != 'function') {
      throw new TypeError();
    }

    var thisp = arguments[1];
    for (var i = 0; i < len; i++) {
      if (i in this) {
        fun.call(thisp, this[i], i, this);
      }
    }
  };

  /**
   * Array.map()
   *
   * Apply a function to every element in an array.
   *
   * Ref. https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/map
   *
   * ECMAScript 5
   */
  ecmapatch.map = Array.prototype.map || function(fun /*, thisp*/) {
    var len = this.length >>> 0;
    if (typeof fun != 'function') {
      throw new TypeError();
    }

    var res = new Array(len);
    var thisp = arguments[1];
    for (var i = 0; i < len; i++) {
      if (i in this) {
        res[i] = fun.call(thisp, this[i], i, this);
      }
    }

    return res;
  };

  /**
   * Array.reduce()
   *
   * Apply a function against an accumulator for each value of the array left-to-right.
   *
   * @promotejs: https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/Reduce
   *
   * ECMAScript 5
   */
  ecmapatch.reduce = Array.prototype.reduce || function(fun /*, initial*/) {
    var len = this.length >>> 0;
    if (typeof fun != "function") {
      throw new TypeError();
    }

    // no value to return if no initial value and an empty array
    if (len == 0 && arguments.length == 1) {
      throw new TypeError();
    }

    var i = 0;
    if (arguments.length >= 2) {
      var rv = arguments[1];
    } else {
      do {
        if (i in this) {
          var rv = this[i++];
          break;
        }

        // if array contains no values, no initial value to return
        if (++i >= len) {
          throw new TypeError();
        }

      } while (true);
    }

    for (; i < len; i++) {
      if (i in this) {
        rv = fun.call(undefined, rv, this[i], i, this);
      }
    }

    return rv;
  };


  /**
   * Array.reduceRight()
   *
   * Apply a function against an accumulator for each value of the array right-to-left.
   *
   * @promotejs: https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/ReduceRight
   *
   * ECMAScript 5
   */
  ecmapatch.reduceRight = Array.prototype.reduceRight || function(fun /*, initial*/) {
    var len = this.length >>> 0;
    if (typeof fun != "function") {
      throw new TypeError();
    }

    // no value to return if no initial value, empty array
    if (len == 0 && arguments.length == 1) {
      throw new TypeError();
    }

    var i = len - 1;
    if (arguments.length >= 2) {
      var rv = arguments[1];
    } else {
      do {
        if (i in this) {
          var rv = this[i--];
          break;
        }

        // if array contains no values, no initial value to return
        if (--i < 0) {
          throw new TypeError();
        }

      } while (true);
    }

    for (; i >= 0; i--) {
      if (i in this) {
        rv = fun.call(undefined, rv, this[i], i, this);
      }
    }

    return rv;
  };


  /**
   * Array.some()
   *
   * Tests whether one or more (some) element ina array passes the test of a specific function.
   *
   * @promotejs: https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/some
   *
   * ECMAScript 5
   */
  ecmapatch.some = Array.prototype.some || function(fun, thisp) {
    var i = 0,
        len = this.length >>> 0;

    if (typeof fun != "function") {
      throw new TypeError();
    }

    var thisp = arguments[1];
    for (; i < len; i++) {
      if (i in this && fun.call(thisp, this[i], i, this)) {
        return true;
      }
    }

    return false;
  };



  /**
   * Object.keys
   *
   * Return an array of enumerable keys in an object.
   *
   * @promotejs: https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Object/keys
   *
   * ECMAScript 5
   */
  ecmapatch.keys = Object.keys || function(o) {
    var result = [];
    for(var name in o) {
      if (o.hasOwnProperty(name)) {
        result.push(name);
      }
    }
    return result;
  };

})(this);
