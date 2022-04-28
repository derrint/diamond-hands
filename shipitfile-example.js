/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */
require('dotenv').config();

module.exports = (shipit) => {
  // Load shipit-deploy tasks
  require('shipit-deploy')(shipit);
  require('shipit-shared')(shipit);

  const appName = 'web-diamond-hands';

  shipit.initConfig({
    default: {
      deployTo: '/var/www/web-diamond-hands',
      repositoryUrl: process.env.URL_REPOSITORY,
      keepReleases: 3,
      shared: {
        overwrite: true,
        files: ['.env.local', '.env'],
      },
    },
    staging: {
      servers: 'root@34.136.191.16',
      // branch: 'develop'
    },
  });

  shipit.blTask('npm:clean', async () => {
    const command = 'nvm install v16.6.0 && nvm use v16.6.0 && npm cache clean --force && rm -rf node_modules yarn-lock.json';
    await shipit.remote(`cd ${shipit.releasePath} && ${command}`);
  });

  shipit.blTask('npm:install', async () => {
    const command = 'nvm use v16.6.0 && npm install --legacy-peer-deps';
    await shipit.remote(`cd ${shipit.releasePath} && ${command}`);
  });

  shipit.blTask('build:app', async () => {
    const command = 'nvm use v16.6.0 && npm run build';
    await shipit.remote(`cd ${shipit.releasePath} && ${command}`);
  });

  shipit.blTask('pm2:start', async () => {
    const command = `nvm use v16.6.0 && pm2 start npm --name "${appName}" -- start`;
    await shipit.remote(`nvm use v16.6.0 && pm2 stop ${appName} && pm2 delete ${appName}`);
    await shipit.remote(`cd ${shipit.releasePath} && ${command}`);
  });

  shipit.on('updated', async () => {
    // shipit.start('npm:clean', 'npm:install', 'build:app');
    shipit.start('npm:install', 'build:app');
  });

  shipit.on('published', () => {
    shipit.start('pm2:start');
  });
};
