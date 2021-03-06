export default {
  MAX_ATTACHMENT_SIZE: 5000000,
  s3: {
    REGION: 'ap-southeast-2',
    BUCKET: 'lunch-picker-uploads'
  },
  apiGateway: {
    REGION: 'ap-southeast-2',
    //URL: 'http://localhost:8080'
    URL: 'https://h5nkdtbsn1.execute-api.ap-southeast-2.amazonaws.com/dev'
  },
  cognito: {
    REGION: 'ap-southeast-2',
    USER_POOL_ID: 'ap-southeast-2_NlXFaIhA0',
    APP_CLIENT_ID: '2r4kokrdpsbrl33u4vduh9d04',
    IDENTITY_POOL_ID: 'ap-southeast-2:6f7bda92-2956-4cdd-aef2-2586fced6fc1'
  }
};
