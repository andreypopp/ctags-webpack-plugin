/**
 * @copyright 2016 Andrey Popp <8mayday@gmail.com>
 * @license MIT
 */

import fs from 'fs';

export default class CTagsWebpackPlugin {

  constructor(filename = 'tags') {
    this.filename = filename;
    this.tags = {};
  }

  apply(compiler) {
    compiler._cTagsWebpackPlugin = this;
    compiler.plugin('emit', (compilation, callback) => {
      this.flush(callback);
    });
  }

  flush(callback) {
    let out = [TAGS_BANNER];
    let filenames = Object.keys(this.tags);
    for (let i = 0; i < filenames.length; i++) {
      let filename = filenames[i];
      let tags = this.tags[filename];
      for (let j = 0; j < tags.length; j++) {
        out.push(formatTag(tags[j]));
      }
    }
    fs.writeFile(this.filename, out.join('\n'), {flags: 'w'}, err => callback(err));
  }
}

function formatTag(tag) {
  let line = [
    tag.tagname,
    tag.filename,
    tag.loc.start.line,
    ';"',
    tag.type
  ];
  if (tag.options) {
    let keys = Object.keys(tag.options);
    for (let i = 0; i < keys.length; i++) {
      line.push(keys[i] + ':' + tag.options[keys[i]]);
    }
  }
  return line.join('\t');
}

const TAGS_BANNER = [
  '!_TAG_FILE_FORMAT	2	/extended format/',
  '!_TAG_FILE_SORTED	0	/0=unsorted, 1=sorted, 2=foldcase/',
].join('\n');
