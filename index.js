var sexp = require('sexp')

var BehaviorTree = require('behaviortree')

module.exports = function (str) {
  var stree = sexp(str)

  var root = process(stree)

  return new BehaviorTree({
    tree: root
  })
}

function processChildren (stree) {
  var nodes = []
  for (var i = 1; i < stree.length; i++) {
    nodes.push(process(stree[i]))
  }
  return nodes
}

function process (stree) {
  switch (stree[0]) {
    case 'succeed':
      return new BehaviorTree.Task({
        run: function () {
          this.success()
        }
      })
    case 'sequence':
    case 'seq':
      return new BehaviorTree.Sequence({
        nodes: processChildren(stree)
      })
    case 'selector':
    case 'sel':
      return new BehaviorTree.Priority({
        nodes: processChildren(stree)
      })
    case 'random':
    case 'rand':
      return new BehaviorTree.Random({
        nodes: processChildren(stree)
      })
    case 'invert':
    case 'inv':
      return new BehaviorTree.InvertDecorator({
        node: process(stree[1])
      })
    default:
      try {
        BehaviorTree.getNode(stree[0])
        return stree[0]
      } catch (e) {
        throw new Error('No such node (' + stree[0] + ')')
      }
      break
  }
}
