ctags-webpack-plugin
====================

Webpack plugin to generate accurate ctags:

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

Works best with Vim and CtrlP.
