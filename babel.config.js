module.exports = function (api) {
  api.cache(true);

  const presets = [
  	"@babel/preset-env",
  	"minify"
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