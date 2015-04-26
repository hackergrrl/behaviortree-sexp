var fs = require('fs');
var sexp = require('sexp');

var btree = require('behaviortree');

module.exports = function(str) {
  var stree = sexp(str);

  var root = process(stree);

  return new btree({
    tree: root
  });
};

function processChildren(stree) {
  var nodes = [];
  for (var i=1; i < stree.length; i++) {
    nodes.push(process(stree[i]));
  }
  return nodes;
}

function process(stree) {
  switch (stree[0]) {
    case 'succeed':
      return new btree.Task({
        run: function() {
          this.success();
        }
      });
      break;
    case 'sequence':
    case 'seq':
      return new btree.Sequence({
        nodes: processChildren(stree)
      });
      break;
    case 'selector':
    case 'sel':
      return new btree.Priority({
        nodes: processChildren(stree)
      });
      break;
    case 'random':
    case 'rand':
      return new btree.Random({
        nodes: processChildren(stree)
      });
      break;
    case 'invert':
    case 'inv':
      return new btree.InvertDecorator({
        node: process(stree[1])
      });
      break;
    default:
      try {
        btree.getNode(stree[0])
        return stree[0];
      } catch (e) {
        throw new Error('No such node (' + stree[0] + ')');
      }
      break;
  }
}

