module.exports = {
  apps: [
    {
      name: "frontend-nextjs",
      cwd: "/var/www/frontend.apidev.cloud/deploymentFrontend",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3000",
      env: {
        NODE_ENV: "development",
        PORT: 3000
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 3000
      }
    }
  ]
};
