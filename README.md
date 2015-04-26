# behaviortree-sexp

Parses S-expressions to create ready-to-go
[`behaviourtree`](https://github.com/Calamari/BehaviorTree.js) behaviour trees.

# background

Behaviour trees are a flexible toolset for amongst other things, video game AI.
For an introduction to the subject, try [Tamas Jano's
introduction](http://obviam.net/index.php/game-ai-an-introduction-to-behavior-trees/).

In particular, this module allows you to specify behaviour trees as
[S-expressions](http://en.wikipedia.org/wiki/S-expression), which are
transformed into `BehaviorTree` objects compatible with
[`behaviourtree`](https://github.com/Calamari/BehaviorTree.js) that are
ready-to-go.

# example

```
var btree = require('behaviortree')
var btree_sexp = require('behaviortree_sexp')

var expr = '(sequence (beep) (beep))'

btree.register('beep', new btree.Task({
  run: function(obj) {
    console.log('beep')
    this.success()
  }
}))

var tree = btsexp(expr)

tree.step()
})
```

outputs

```
beep
beep
```

# built-in nodes

## succeed

Always returns success.

```
(succeed)
```

## invert

Makes its successful node fail and its failed node succeed.

```
(invert (succeed))
```

## sequence

Processes nodes in sequence. Succeeds only if all nodes succeed. Equivalent to
logical AND.

```
(sequence (succeed) (invert succeed) (succeed))
```

This will only run the first two nodes.

## selector

Processes nodes in sequence. Succeeds and returns immediately as soon as one
node succeeds. Equivalent to logical OR.

```
(selector (invert succeed) (succeed) (succeed))
```

This will only run the first two nodes.

## random

Chooses a node at random.

```
(random (beep) (boop))
```

This will run exactly one of `beep` or `boop`.

## your own!

You can register your own nodes via `btree.register(name, task)` which will then
be available automatically in your S-expressions. See the above example.

# license

MIT

