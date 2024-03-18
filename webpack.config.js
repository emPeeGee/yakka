const path = require('path');

const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);
  config.resolve.alias['@/ui'] = path.resolve('./src/ui');
  config.resolve.alias['@/core'] = path.resolve('./src/core');
  config.resolve.alias['@/navigation'] = path.resolve('./src/navigation');
  config.resolve.alias['@/types'] = path.resolve('./src/types');
  config.resolve.alias['@/screens'] = path.resolve('./src/screens');
  config.resolve.alias['@/api'] = path.resolve('./src/api');

  return config;
};
