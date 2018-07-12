// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyAiYjnJGmR3h1g6srH0dzi80SeihbfDhGM',
    authDomain: 'counting-fish-collector.firebaseapp.com',
    databaseURL: 'https://counting-fish-collector.firebaseio.com',
    projectId: 'counting-fish-collector',
    storageBucket: 'counting-fish-collector.appspot.com',
    messagingSenderId: '163886120499'
  }
};
