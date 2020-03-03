module.exports = {
  pluginOptions: {
    s3Deploy: {
      awsProfile: 'ethkids',
      region: 'eu-west-1',
      bucket: 'ethkids.io',
      createBucket: false,
      staticHosting: true,
      assetPath: 'dist',
      assetMatch: '**',
      deployPath: '/',
      acl: 'public-read',
      pwa: false,
      enableCloudfront: true,
      cloudfrontId: 'EZ2HHWQELGI8Q',
      cloudfrontMatchers: '/*',
      uploadConcurrency: 5,
      pluginVersion: '3.0.0'
    }
  }
}
