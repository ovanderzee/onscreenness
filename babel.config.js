
module.exports = function (api) {
  api.cache(true);

  const presets = [
    ['@babel/env', {
      "corejs": 3,
      "useBuiltIns": "usage"
    }]
  ]
  const plugins = [
    '@babel/plugin-transform-runtime'
  ];

  return {
    presets,
    plugins
  };
}
