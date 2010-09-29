/**
 * ecmapatch.js tests
 */

module("ecmapatch setup");

test('ecmapatch is setup', function() {
  expect(4);
  ok( ecmapatch, 'ecmapatch is go' );
  ok( ecmapatch._version, 'ecmapatch version is defined' );
  ok( ecmapatch.patch, 'ecmapatch.patch() function exists' );

  // force update to test on version rev.
  equal( ecmapatch._version, 'v0.1', 'current version');
});


module("ES5 Feature Support");

test("Current Browser ECMAScript 5 Support", function () {
  // Array
  ok( Array.prototype.indexOf, 'Array.prototype.indexOf' );
  ok( Array.prototype.lastIndexOf, 'Array.prototype.lastIndexOf' );
  ok( Array.prototype.every, 'Array.prototype.every' );
  ok( Array.prototype.filter, 'Array.prototype.filter' );
  ok( Array.prototype.forEach, 'Array.prototype.forEach' );
  ok( Array.prototype.map, 'Array.prototype.map' );
  ok( Array.prototype.reduce, 'Array.prototype.reduce' );
  ok( Array.prototype.reduceRight, 'Array.prototype.reduceRight' );
  ok( Array.prototype.some, 'Array.prototype.some' );
  // Object
  ok( Object.keys, 'Object.keys' );
  // Object [not implemented in ecmapatch yet]
  ok( Object.create, 'Object.create' );
  ok( Object.getPrototypeOf, 'Object.getPrototypeOf' );
  ok( Object.defineProperty, 'Object.defineProperty' );
});

test("ecmapatch ECMAScript feature implementations", function () {
  equals( ecmapatch.Array.indexOf, !!Array.prototype.indexOf, 'ecmapatch.Array.indexOf' );
  equals( ecmapatch.Array.lastIndexOf, !!Array.prototype.lastIndexOf, 'ecmapatch.Array.lastIndexOf' );
  equals( ecmapatch.Array.every, !!Array.prototype.every, 'ecmapatch.Array.every' );
  equals( ecmapatch.Array.filter, !!Array.prototype.filter, 'ecmapatch.Array.filter' );
  equals( ecmapatch.Array.forEach, !!Array.prototype.forEach, 'ecmapatch.Array.forEach' );
  equals( ecmapatch.Array.map, !!Array.prototype.map, 'ecmapatch.Array.map' );
  equals( ecmapatch.Array.reduce, !!Array.prototype.reduce, 'ecmapatch.Array.reduce' );
  equals( ecmapatch.Array.reduceRight, !!Array.prototype.reduceRight, 'ecmapatch.Array.reduceRight' );
  equals( ecmapatch.Array.some, !!Array.prototype.some, 'ecmapatch.Array.some' );
  equals( ecmapatch.Object.keys, !!Object.keys, 'ecmapatch.Object.keys' );
});

module("ecmapatch functions");

test("ecmapatch Array functions", function() {
  // Array
  ok( ecmapatch.indexOf, 'ecmapatch.indexOf' );
  ok( ecmapatch.lastIndexOf, 'ecmapatch.lastIndexOf' );
  ok( ecmapatch.every, 'ecmapatch.every' );
  ok( ecmapatch.filter, 'ecmapatch.filter' );
  ok( ecmapatch.forEach, 'ecmapatch.forEach' );
  ok( ecmapatch.map, 'ecmapatch.map' );
  ok( ecmapatch.reduce, 'ecmapatch.reduce' );
  ok( ecmapatch.reduceRight, 'ecmapatch.reduceRight' );
  ok( ecmapatch.some, 'ecmapatch.some' );
  // Object
  ok( ecmapatch.keys, 'ecmapatch.keys' );
});

test("ecmapatch Array tests", function() {
  // Array.indexOf()
  equals( ecmapatch.indexOf.call([1,2,3], 2), 1, 'index in array' );
  equals( ecmapatch.indexOf.call([1,2,3], 0), -1, 'index not in array' );
  equals( ecmapatch.indexOf.call('dshaw'.split(''), 'd'), 0, 'index in array' );
  // Array.lastIndexOf()
  equals( ecmapatch.lastIndexOf.call([1,2,3,1], 2), 1, 'index in array' );
  equals( ecmapatch.lastIndexOf.call([1,2,3,1], 0), -1, 'index not in array' );
  equals( ecmapatch.lastIndexOf.call('dshawddd'.split(''), 'd'), 7  , 'index in array' );
  // Array.every()
  equals( ecmapatch.every.call([1,2,3], function(n) { return !isNaN(n); }),
      true, 'array every element is a number' );
  equals( ecmapatch.every.call(['dshaw',1,2,3], function(n) { return !isNaN(n); }),
      false, 'array not every element is a number' );
  // Array.filter()
  same( ecmapatch.filter.call([1,2,3], function(n) { return (n === 2); }),
      [2], 'array filter elements not 2' );
  same( ecmapatch.filter.call('dshaw'.split(''), function(n) { return n === 2; }),
      [], 'array filter not in array' );
  // Array.forEach()
  function listConcat(elm) {
    forEached += '<li>'+elm+'</li>';
  }
  //
  var forEached = '';
  ecmapatch.forEach.call( ['@dshaw','@rhussmann','@getify','@teleject'], listConcat );
  var ExpectedForEached = '<li>@dshaw</li><li>@rhussmann</li><li>@getify</li><li>@teleject</li>';
  equals ( forEached, ExpectedForEached, 'forEach() concat result' );
  //
  var forEached = '';
  ecmapatch.forEach.call( [null,undefined,null], listConcat );
  var ExpectedForEached = '<li>null</li><li>undefined</li><li>null</li>';
  equals ( forEached, ExpectedForEached, 'forEach() null/undefined result' );
  //
  var forEached = '';
  ecmapatch.forEach.call( [], listConcat );
  equals ( forEached, '', 'forEach() empty array' );
  // Array.map()
  same ( ecmapatch.map.call( [1, 4, 9], Math.sqrt ), [1, 2, 3], 'Map numbers to square roots' );
  same ( ecmapatch.map.call( 'Hello World', function(x) { return x.charCodeAt(0); }),
         [72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100],
         'Map characters to character codes' );
  // Array.reduce()
  equals ( ecmapatch.reduce.call( [0, 1, 2, 3], function(prev, curr) { return prev + curr; }),
           6,
           'reduce() integer accumulator' );
  same ( (ecmapatch.reduce.call( [[0,1], [2,3], [4,5]],
              function(prev, curr) { return prev.concat(curr); })),
         [0, 1, 2, 3, 4, 5],
         'reduce() array accumulator' );
  // Array.reduceRight()
  equals ( ecmapatch.reduceRight.call( [0, 1, 2, 3], function(prev, curr) { return prev + curr; }),
           6,
           'reduceRight() integer accumulator' );
  same ( ecmapatch.reduceRight.call( [[0,1], [2,3], [4,5]],
              function(prev, curr) { return prev.concat(curr); }),
         [4, 5, 2, 3, 0, 1],
         'reduceRight() array accumulator' );
  // Array.some()
  equals ( ecmapatch.some.call( [], function() {}), false, 'some() empty array noop function');
  //
  function isBigEnough(element, index, array) {
    return (element >= 10);
  }
  //
  equals ( ecmapatch.some.call( [2, 5, 8, 1, 4], isBigEnough ),
           false,
           'some() not big enough array elements');
  //
  equals ( ecmapatch.some.call( [12, 5, 8, 1, 4], isBigEnough ),
           true,
           'some() some big enough array elements');
});

test("ecmapatch Object", function() {
  // Object.keys()
  ok ( !ecmapatch.keys, 'keys() needs tests' );
});
