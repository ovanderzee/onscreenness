module.exports = function (api) {
  api.cache(true);

  const presets = [
    ['@babel/preset-env', {
      "useBuiltIns": "entry"
    }],
    ['minify', {
      'builtIns': false
    }]
  ]
  const overrides = [{
    comments: false,
  }]
  const plugins = [];

  return {
    presets,
    overrides,
    plugins
  };
}