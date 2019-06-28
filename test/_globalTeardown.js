
module.exports = async function() {
  await global.__BROWSER__.close()
  await global.__HTTPSERVER__.stop(function () {
    console.log('test server stopped')
  })
};
