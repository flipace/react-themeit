const path = require('path');

module.exports = function (config) {
  config.module = {
    loaders: [
      {
        test: /\.css?$/,
        loaders: ['style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[local]_[hash:base64:5]'],
        include: path.resolve(__dirname, '../../'),
      },
    ],
  };
};
