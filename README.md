# behaviortree-sexp

Parses S-expressions to create working
[`behaviourtree`](https://github.com/Calamari/BehaviorTree.js) behaviour trees.

# example

```
var btree = require('behaviortree');
var btree_sexp = require('behaviortree_sexp');

btree.register('beep', new btree.Task({
  run: function(obj) {
    console.log('beep');
    this.success();
  }
}));

var tree = btsexp('(sequence (beep) (beep))');

tree.step();
});
```

outputs

```
beep
beep
```

# license

MIT

