ctags-webpack-plugin
====================

[Webpack][] plugin to generate accurate [ctags][]:

    var CTagsWebpackPlugin = require('ctags-webpack-plugin');

    module.exports = {

      ...

      module: {
        preLoaders: [
          {test: /\.js$/, loader: 'ctags-webpack-plugin/loader'}
        ]
      },

      plugins: [
        new CTagsWebpackPlugin('tags')
      ]

    }

Works best with [Vim][] and [CtrlP][].

[Webpack]: https://webpack.github.io/
[ctags]: https://en.wikipedia.org/wiki/Ctags
[Vim]: http://www.vim.org/
[CtrlP]: https://github.com/kien/ctrlp.vim
