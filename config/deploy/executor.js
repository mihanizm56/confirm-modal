const { spawn } = require('child_process');
const dotenv = require('dotenv');
const packageJson = require('../../package.json');

dotenv.config();
const releaseTag = packageJson.version;

try {
  spawn('bash ', [`config/deploy/deploy-script.sh ${releaseTag}`], {
    shell: true,
    stdio: 'inherit',
  });
} catch (error) {
  console.error(error);
}
