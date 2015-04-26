var btree = require('behaviortree');
var btsexp = require('../index.js');

var test = require('tape');

test('succeeder', function(t) {
  t.plan(1);
  var tree = btsexp('(succeed)');
  tree.step();
  t.ok('nothing broke');
});

test('custom', function(t) {
  t.plan(1);

  btree.register('beep', new btree.Task({
    run: function(obj) {
      this.success();
      t.pass();
    }
  }));

  var tree = btsexp('(beep)');

  tree.step();

  t.end();
});

test('sequence', function(t) {
  t.plan(2);

  btree.register('beep', new btree.Task({
    run: function(obj) {
      this.success();
      t.pass();
    }
  }));

  btree.register('boop', new btree.Task({
    run: function(obj) {
      this.success();
      t.pass();
    }
  }));

  var tree = btsexp('(sequence (beep) (boop))');

  tree.step();
});

test('selector', function(t) {
  t.plan(2);

  btree.register('beep', new btree.Task({
    run: function(obj) {
      this.fail();
      t.pass();
    }
  }));

  btree.register('boop', new btree.Task({
    run: function(obj) {
      this.success();
      t.pass();
    }
  }));

  var tree = btsexp('(selector (beep) (boop))');

  tree.step();
});

test('random', function(t) {
  t.plan(1);

  btree.register('beep', new btree.Task({
    run: function(obj) {
      this.fail();
      t.pass();
    }
  }));

  btree.register('boop', new btree.Task({
    run: function(obj) {
      this.fail();
      t.pass();
    }
  }));

  var tree = btsexp('(random (beep) (boop))');

  tree.step();
});

test('invert', function(t) {
  t.plan(1);

  btree.register('beep', new btree.Task({
    run: function(obj) {
      this.success();
      t.pass();
    }
  }));

  var tree = btsexp('(sequence (beep) (invert (succeed)) (beep))');

  tree.step();

  t.end();
});
