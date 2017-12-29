// import 'zone.js/dist/zone-node';
// import 'reflect-metadata';
// import { renderModuleFactory } from '@angular/platform-server';
// import { enableProdMode } from '@angular/core';

// import * as express from 'express';
// import { join } from 'path';
// import { readFileSync } from 'fs';

// // Faster server renders w/ Prod mode (dev mode never needed)
// enableProdMode();

// // Express server
// export const app = express();

// const PORT = process.env.PORT || 4000;
// const DIST_FOLDER = join(process.cwd(), 'dist');

// // Our index.html we'll use as our template
// const template = readFileSync(join(DIST_FOLDER, 'browser', 'index.html')).toString();

// // * NOTE :: leave this as require() since this file is built Dynamically from webpack
// const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('../dist/server/main.bundle');

// // Express Engine
// import { ngExpressEngine } from '@nguniversal/express-engine';
// // Import module map for lazy loading
// import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

// // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
// app.engine('html', ngExpressEngine({
//   bootstrap: AppServerModuleNgFactory,
//   providers: [
//     provideModuleMap(LAZY_MODULE_MAP)
//   ]
// }));

// app.set('view engine', 'html');
// // app.set('views', join(DIST_FOLDER, 'browser'));

// // // Server static files from /browser
// // app.get('*.*', express.static(join(DIST_FOLDER, 'browser'), {
// //   maxAge: '1y'
// // }));

// // // ALl regular routes use the Universal engine
// // app.get('*', (req, res) => {
// //   res.render('index', { req });
// // });

// app.set('views', join(DIST_FOLDER, 'browser'));

// // Server static files from /browser
// app.get('*.*', express.static(join(DIST_FOLDER, 'browser')));

// // All regular routes use the Universal engine
// app.get('*', (req, res) => {
//   res.render(join(DIST_FOLDER, 'browser', 'index.html'), {req});
// });
import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import {enableProdMode} from '@angular/core';

import * as express from 'express';
import {join} from 'path';

// Faster server renders w/ Prod mode (dev mode never needed)
// enableProdMode();

// Express server
export const app = express();

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const {AppServerModuleNgFactory, LAZY_MODULE_MAP} = require('../dist/server/main.bundle');

// Express Engine
import {ngExpressEngine} from '@nguniversal/express-engine';
// Import module map for lazy loading
import {provideModuleMap} from '@nguniversal/module-map-ngfactory-loader';

app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,

  providers: [
    provideModuleMap(LAZY_MODULE_MAP)
  ],
}));

app.set('view engine', 'html');
app.set('views', join(process.cwd(), 'dist', 'browser'));

// Server static files from /browser
app.get('*.*', express.static(join(process.cwd(), 'dist', 'browser')));

// All regular routes use the Universal engine
app.get('*', (req, res) => {
  res.render(join(process.cwd(), 'dist', 'browser', 'index.html'), {req});
});
