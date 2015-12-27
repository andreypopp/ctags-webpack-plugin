/**
 * @copyright 2016 Andrey Popp <8mayday@gmail.com>
 * @license MIT
 */

import path from 'path';
import invariant from 'invariant';
import findTags from './findTags';

export default function(source) {
  invariant(
    this._compiler._cTagsWebpackPlugin,
    'ctags-webpack-plugin is not configured'
  );
  this.cacheable();
  let filename = path.relative(this._compiler.context, this.resource);
  let tags = findTags(filename, source);
  this._compiler._cTagsWebpackPlugin.tags[this.resource] = tags;
  return source;
}
