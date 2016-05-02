/**
 * Originally based on code in btags npm package.
 *
 * @copyright 2016 Andrey Popp <8mayday@gmail.com>
 * @copyright 2015 Yahoo Inc. All rights reserved.
 * @license MIT
 */

import invariant from 'invariant';
import * as babylon from 'babylon';
import traverse from 'babel-traverse';

export default function findTags(filename, source) {
  let ast = babylon.parse(source, {
    sourceType: 'module',
    plugins: ['jsx', 'flow'],
  });
  let tags = [];

  function collect(tag, node) {
    invariant(tag.loc, 'Missing loc, from node: %s', node.type);
    invariant(tag.tagname, 'Missing tagname, from node: %s', node.type);
    tags.push(tag);
  }

  traverse(ast, {
    ClassDeclaration({node}) {
      let tagname = node.id.name;
      collect({tagname, filename, loc: node.loc, type: 'c'}, node);
    },
    ClassMethod({node, parentPath}) {
      if (node.key.name !== 'constructor') {
        let tagname = node.key.name;
        let options = {class: parentPath.parentPath.node.id.name};
        collect({tagname, filename, loc: node.loc, type: 'f', options}, node);
      }
    },
    VariableDeclarator({node}) {
      let tagname = node.id.name;
      if (tagname) {
        collect({ tagname: tagname, filename: filename, loc: node.loc, type: 'v' }, node);
      } else {
        // for array desctructuring
        let elements = node.id.elements;
        for (let i = 0; i < elements.length; i++) {
          let el = elements[i];
          collect({ tagname: el.name, filename: filename, loc: el.loc, type: 'v' }, node);
        }
      }
    },
    ImportDefaultSpecifier({node}) {
      let tagname = node.local.name;
      collect({tagname, filename, loc: node.loc, type: 'i'}, node);
    },
    ImportSpecifier({node}) {
      // id may be null for flow function declarations
      if (node.id) {
        let tagname = node.id.name;
        collect({tagname, filename, loc: node.loc, type: 'i'}, node);
      }
    },
    FunctionDeclaration({node}) {
      // id may be null for flow function declarations
      if (node.id) {
        let tagname = node.id.name;
        collect({tagname, filename, loc: node.loc, type: 'f'}, node);
      }
    }
  });

  return tags;
}
