ctags-webpack-plugin
====================

[Webpack][] plugin to generate accurate [ctags][]:

## Webpack 1

    const CTagsWebpackPlugin = require('ctags-webpack-plugin');

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

## Webpack 2 and up

    const CTagsWebpackPlugin = require('ctags-webpack-plugin');

    module.exports = {

      ...

      module: {
        rules: [
          {
            test: /\.js$/,
            enforce: 'pre',
            loader: 'ctags-webpack-plugin/loader',
          },
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
