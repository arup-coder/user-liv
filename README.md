# SeedLibrary

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.3.

## Chrome Debugger / Source Maps

 "webRoot": "${workspaceFolder}/projects/test-app",
            "sourceMapPathOverrides": {
              "webpack:///ng://@nxl/seed-lib/lib/*": "${workspaceFolder}/projects/nxl/seed-lib/src/lib/*"


  "build:seed-lib": "ng build @nxl/seed-lib --watch",    // 1:node
    "start:source-maps": "ng serve test-app --vendorSourceMap",  //2:node

 "serve": {
          "builder": "@angular-devkit/build-angular:dev-server",
          "options": {
            "browserTarget": "test-app:build",
            "sourceMap": {
              "scripts": true,
              "styles": true,
              "vendor": true
            }
          },


## NGRX Version 8 Schematics
ng generate @ngrx/schematics:action element --creators
ng generate @ngrx/schematics:reducer element --creators

1. clone seed
2. ng g library @nxl/...
3. change seed naming
4. 

