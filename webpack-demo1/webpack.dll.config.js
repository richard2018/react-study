const path    = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
      vendor: ['react', 'react-dom']
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].dll.js',
    /**
     * output.library
     * window.
     * `window.vendor_library`になる
     */
    library: '[name]_library'
  },
  plugins: [
    new webpack.DllPlugin({
      /**
       * path
       * manifest
       * [name]
       */
      path: path.join(__dirname, 'dist', '[name]-manifest.json'),
      /**
       * name
       * 
       * output.library
       */
      name: '[name]_library'
    })
  ]
};