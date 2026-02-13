# Angular Build and Deployment 

## Index

1. [Introduction to Build and Deployment](#1-introduction-to-build-and-deployment)
   - 1.1 [Build Process Overview](#11-build-process-overview)
   - 1.2 [Why Building Matters](#12-why-building-matters)
   - 1.3 [Build vs Serve](#13-build-vs-serve)

2. [Development vs Production Builds](#2-development-vs-production-builds)
   - 2.1 [Development Build](#21-development-build)
   - 2.2 [Production Build](#22-production-build)
   - 2.3 [Key Differences](#23-key-differences)
   - 2.4 [Build Modes Comparison](#24-build-modes-comparison)

3. [Environment Configuration](#3-environment-configuration)
   - 3.1 [Environment Files](#31-environment-files)
   - 3.2 [Creating Environments](#32-creating-environments)
   - 3.3 [Using Environment Variables](#33-using-environment-variables)
   - 3.4 [Custom Environments](#34-custom-environments)
   - 3.5 [Runtime Configuration](#35-runtime-configuration)

4. [AOT vs JIT Compilation](#4-aot-vs-jit-compilation)
   - 4.1 [What is JIT?](#41-what-is-jit)
   - 4.2 [What is AOT?](#42-what-is-aot)
   - 4.3 [Comparison](#43-comparison)
   - 4.4 [AOT Benefits](#44-aot-benefits)
   - 4.5 [When to Use Each](#45-when-to-use-each)

5. [Build Optimization Techniques](#5-build-optimization-techniques)
   - 5.1 [Tree Shaking](#51-tree-shaking)
   - 5.2 [Code Splitting](#52-code-splitting)
   - 5.3 [Lazy Loading](#53-lazy-loading)
   - 5.4 [Bundle Size Analysis](#54-bundle-size-analysis)
   - 5.5 [Image Optimization](#55-image-optimization)
   - 5.6 [CSS Optimization](#56-css-optimization)

6. [Deployment Strategies](#6-deployment-strategies)
   - 6.1 [Static Hosting](#61-static-hosting)
   - 6.2 [Server Deployment](#62-server-deployment)
   - 6.3 [Docker Deployment](#63-docker-deployment)
   - 6.4 [Cloud Platforms](#64-cloud-platforms)
   - 6.5 [CDN Integration](#65-cdn-integration)

7. [CI/CD Integration](#7-cicd-integration)
   - 7.1 [What is CI/CD?](#71-what-is-cicd)
   - 7.2 [GitHub Actions](#72-github-actions)
   - 7.3 [GitLab CI](#73-gitlab-ci)
   - 7.4 [Jenkins](#74-jenkins)
   - 7.5 [Azure DevOps](#75-azure-devops)

8. [Source Maps](#8-source-maps)
   - 8.1 [What are Source Maps?](#81-what-are-source-maps)
   - 8.2 [Enabling Source Maps](#82-enabling-source-maps)
   - 8.3 [Source Map Types](#83-source-map-types)
   - 8.4 [Production Considerations](#84-production-considerations)
   - 8.5 [Debugging with Source Maps](#85-debugging-with-source-maps)

---

## 1. Introduction to Build and Deployment

### 1.1 Build Process Overview

**Build process transforms your source code into deployable files.**

**Think of it like:**
A factory that takes raw materials (TypeScript, SCSS) and produces finished products (JavaScript, CSS).

**Build Steps:**
```
1. TypeScript → JavaScript (compilation)
2. SCSS/SASS → CSS (preprocessing)
3. Templates → JavaScript (template compilation)
4. Bundle files (combine multiple files)
5. Minify (reduce file size)
6. Optimize (tree-shaking, code splitting)
```

**Visual:**
```
Source Code        Build Process       Output
├── .ts files   →  Compile          → .js files
├── .scss files →  Process          → .css files
├── .html files →  Inline/compile   → bundled.js
└── images      →  Optimize         → optimized images
```

### 1.2 Why Building Matters

**Without building:**
```
❌ Browser can't understand TypeScript
❌ Large file sizes
❌ Slow loading times
❌ Not optimized
```

**With building:**
```
✅ Browser-compatible JavaScript
✅ Small file sizes (minified)
✅ Fast loading (bundled)
✅ Optimized performance
```

### 1.3 Build vs Serve

**Development (ng serve):**
```bash
ng serve
# Compiles in memory
# Hot reload enabled
# Source maps enabled
# No optimization
# Fast rebuilds
```

**Production Build:**
```bash
ng build --configuration production
# Writes to disk
# Full optimization
# Minified
# Tree-shaken
# AOT compiled
```

---

## 2. Development vs Production Builds

### 2.1 Development Build

**Command:**
```bash
ng build
# or
ng build --configuration development
```

**Output:**
```
dist/
└── my-app/
    ├── index.html
    ├── main.js              (5 MB - not minified)
    ├── polyfills.js         (500 KB)
    ├── runtime.js           (50 KB)
    ├── styles.css           (200 KB)
    └── vendor.js            (10 MB)
```

**Characteristics:**
- Fast build time
- Large file sizes
- Source maps included
- No minification
- JIT compilation (optional)
- Easy debugging

### 2.2 Production Build

**Command:**
```bash
ng build --configuration production
# or shorthand
ng build --prod
```

**Output:**
```
dist/
└── my-app/
    ├── index.html
    ├── main.abc123.js       (500 KB - minified, hashed)
    ├── polyfills.xyz789.js  (100 KB)
    ├── runtime.def456.js    (10 KB)
    └── styles.ghi012.css    (50 KB)
```

**Characteristics:**
- Slower build time
- Small file sizes
- Minified
- AOT compilation
- Tree-shaking
- Dead code elimination
- File name hashing

### 2.3 Key Differences

**File Size Comparison:**
```
Development Build:
main.js: 5.2 MB
vendor.js: 8.1 MB
Total: ~15 MB

Production Build:
main.abc123.js: 487 KB
polyfills.xyz789.js: 87 KB
Total: ~800 KB

Reduction: ~95% smaller! 🎉
```

**Build Time:**
```
Development: ~10 seconds
Production: ~45 seconds

Production takes longer but results are much better
```

### 2.4 Build Modes Comparison

| Feature | Development | Production |
|---------|------------|------------|
| **Build Time** | Fast (~10s) | Slow (~45s) |
| **Bundle Size** | Large (15 MB) | Small (800 KB) |
| **Minification** | No | Yes |
| **Tree Shaking** | No | Yes |
| **AOT** | Optional | Always |
| **Source Maps** | Yes | Optional |
| **Hashing** | No | Yes |
| **Optimization** | Minimal | Maximum |

**Configuration in angular.json:**
```json
{
  "configurations": {
    "production": {
      "optimization": true,
      "outputHashing": "all",
      "sourceMap": false,
      "namedChunks": false,
      "aot": true,
      "extractLicenses": true,
      "vendorChunk": false,
      "buildOptimizer": true,
      "budgets": [
        {
          "type": "initial",
          "maximumWarning": "500kb",
          "maximumError": "1mb"
        }
      ]
    },
    "development": {
      "optimization": false,
      "sourceMap": true,
      "namedChunks": true,
      "aot": false
    }
  }
}
```

---

## 3. Environment Configuration

### 3.1 Environment Files

**Default structure:**
```
src/
└── environments/
    ├── environment.ts           (development)
    └── environment.prod.ts      (production)
```

**Development environment:**
```typescript
// environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  enableDebug: true,
  logLevel: 'debug',
  features: {
    newUI: true,
    analytics: false
  }
};
```

**Production environment:**
```typescript
// environment.prod.ts
export const environment = {
  production: true,
  apiUrl: 'https://api.example.com',
  enableDebug: false,
  logLevel: 'error',
  features: {
    newUI: false,
    analytics: true
  }
};
```

### 3.2 Creating Environments

**Create staging environment:**
```typescript
// environment.staging.ts
export const environment = {
  production: false,
  apiUrl: 'https://staging-api.example.com',
  enableDebug: true,
  logLevel: 'warn',
  features: {
    newUI: true,
    analytics: true
  }
};
```

**Configure in angular.json:**
```json
{
  "configurations": {
    "staging": {
      "fileReplacements": [
        {
          "replace": "src/environments/environment.ts",
          "with": "src/environments/environment.staging.ts"
        }
      ],
      "optimization": true,
      "sourceMap": true
    }
  }
}
```

**Build for staging:**
```bash
ng build --configuration staging
```

### 3.3 Using Environment Variables

**Import and use:**
```typescript
// app.component.ts
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root'
})
export class AppComponent {
  apiUrl = environment.apiUrl;
  
  ngOnInit() {
    if (environment.enableDebug) {
      console.log('Debug mode enabled');
    }
    
    // Use in HTTP calls
    this.http.get(`${environment.apiUrl}/users`);
  }
}
```

**In services:**
```typescript
// api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;
  
  constructor(private http: HttpClient) {}
  
  getUsers() {
    return this.http.get(`${this.apiUrl}/users`);
  }
}
```

### 3.4 Custom Environments

**Multiple environments:**
```
environments/
├── environment.ts          (local development)
├── environment.dev.ts      (dev server)
├── environment.qa.ts       (QA server)
├── environment.staging.ts  (staging server)
└── environment.prod.ts     (production)
```

**Example - QA environment:**
```typescript
// environment.qa.ts
export const environment = {
  production: false,
  name: 'QA',
  apiUrl: 'https://qa-api.example.com',
  enableDebug: true,
  logLevel: 'info',
  features: {
    newUI: true,
    analytics: true,
    mockData: true
  }
};
```

### 3.5 Runtime Configuration

**Load config at runtime (from JSON file):**

**config.json:**
```json
{
  "apiUrl": "https://api.example.com",
  "version": "1.0.0",
  "features": {
    "newUI": true
  }
}
```

**Config service:**
```typescript
// config.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private config: any;
  
  constructor(private http: HttpClient) {}
  
  loadConfig(): Promise<any> {
    return this.http.get('/assets/config.json')
      .toPromise()
      .then(config => {
        this.config = config;
      });
  }
  
  get(key: string) {
    return this.config[key];
  }
}
```

**Load before app starts:**
```typescript
// app.module.ts
import { APP_INITIALIZER } from '@angular/core';

export function initConfig(config: ConfigService) {
  return () => config.loadConfig();
}

@NgModule({
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initConfig,
      deps: [ConfigService],
      multi: true
    }
  ]
})
export class AppModule { }
```

---

## 4. AOT vs JIT Compilation

### 4.1 What is JIT?

**JIT (Just-In-Time) compilation happens in the browser at runtime.**

**Process:**
```
1. Download Angular compiler (~1 MB)
2. Download templates
3. Compile templates in browser
4. Execute app
```

**Visual:**
```
Browser Downloads:
├── App code
├── Templates (HTML)
└── Angular compiler (1 MB!)
     ↓
Compile in browser (slow)
     ↓
Run app
```

**Example:**
```typescript
// Component with template
@Component({
  template: '<h1>{{ title }}</h1>'
})
export class AppComponent {
  title = 'My App';
}

// JIT: Template compiled in browser
// Slower startup, includes compiler
```

### 4.2 What is AOT?

**AOT (Ahead-of-Time) compilation happens during build.**

**Process:**
```
1. Compile templates during build
2. Download pre-compiled code
3. Execute app immediately
```

**Visual:**
```
Build Process:
├── Compile templates
├── Generate optimized code
└── No compiler needed
     ↓
Browser Downloads:
├── Pre-compiled code (smaller)
└── No compiler needed (1 MB saved!)
     ↓
Run app immediately (fast)
```

**Example:**
```typescript
// Same component
@Component({
  template: '<h1>{{ title }}</h1>'
})
export class AppComponent {
  title = 'My App';
}

// AOT: Template already compiled
// Faster startup, smaller bundle
```

### 4.3 Comparison

| Aspect | JIT | AOT |
|--------|-----|-----|
| **Compilation** | In browser | During build |
| **Bundle Size** | Larger (+1 MB) | Smaller |
| **Startup Time** | Slower | Faster |
| **Build Time** | Fast | Slow |
| **Error Detection** | Runtime | Build time |
| **Production** | Not recommended | Recommended |

**File Size:**
```
JIT Build:
main.js: 2.5 MB
Angular compiler: 1.2 MB
Total: 3.7 MB

AOT Build:
main.js: 800 KB
No compiler needed!
Total: 800 KB

Savings: ~3 MB (80% smaller!)
```

### 4.4 AOT Benefits

**1. Faster Startup:**
```
JIT: Download (1s) → Compile (2s) → Run
Total: 3 seconds

AOT: Download (0.5s) → Run
Total: 0.5 seconds

6x faster! 🚀
```

**2. Earlier Error Detection:**
```typescript
// Template error
@Component({
  template: '<h1>{{ titles }}</h1>'  // Typo: 'titles' instead of 'title'
})
export class AppComponent {
  title = 'My App';
}

// JIT: Error at runtime (in production!)
// AOT: Error at build time (catch early)
```

**3. Better Security:**
```typescript
// No eval() in production
// Templates pre-compiled
// Less attack surface
```

**4. Smaller Bundle:**
```typescript
// No Angular compiler in production
// ~1 MB saved
```

### 4.5 When to Use Each

**Use JIT:**
```typescript
✓ Development (ng serve)
✓ Faster rebuilds
✓ Easier debugging

// angular.json
{
  "development": {
    "aot": false
  }
}
```

**Use AOT:**
```typescript
✓ Production builds
✓ Smaller bundles
✓ Faster runtime
✓ Early error detection

// angular.json
{
  "production": {
    "aot": true
  }
}
```

---

## 5. Build Optimization Techniques

### 5.1 Tree Shaking

**Tree shaking removes unused code.**

**Before tree shaking:**
```typescript
// lodash library (100 functions)
import * as _ from 'lodash';

// Only using 1 function
_.debounce(fn, 300);

// Bundle includes all 100 functions!
// Bundle size: 500 KB
```

**After tree shaking:**
```typescript
// Import only what you need
import { debounce } from 'lodash-es';

debounce(fn, 300);

// Bundle includes only debounce!
// Bundle size: 5 KB

Savings: 495 KB! 🎉
```

**Enable tree shaking:**
```json
// angular.json
{
  "production": {
    "optimization": true,  // Enables tree shaking
    "buildOptimizer": true
  }
}
```

### 5.2 Code Splitting

**Split code into smaller chunks:**

**Before:**
```
Single bundle:
main.js (5 MB)
```

**After:**
```
Multiple chunks:
main.js (500 KB)
vendor.js (1 MB)
feature1.js (200 KB)  ← Loaded on demand
feature2.js (300 KB)  ← Loaded on demand
```

**Automatic code splitting:**
```typescript
// Lazy loading automatically creates chunks
const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
    // Creates separate chunk: admin.chunk.js
  }
];
```

### 5.3 Lazy Loading

**Load modules on demand:**

```typescript
// app-routing.module.ts
const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
  },
  {
    path: 'products',
    loadChildren: () => import('./products/products.module').then(m => m.ProductsModule)
  }
];
```

**Impact:**
```
Without lazy loading:
Initial bundle: 5 MB
Load time: 3 seconds

With lazy loading:
Initial bundle: 1 MB (main app)
Users module: 500 KB (loaded when visiting /users)
Products module: 800 KB (loaded when visiting /products)
Initial load time: 0.5 seconds

6x faster initial load! 🚀
```

### 5.4 Bundle Size Analysis

**Analyze bundle size:**
```bash
# Install webpack-bundle-analyzer
npm install --save-dev webpack-bundle-analyzer

# Build with stats
ng build --stats-json

# Analyze
npx webpack-bundle-analyzer dist/my-app/stats.json
```

**Output:**
```
Opens browser showing:
├── main.js (500 KB)
│   ├── AppComponent (50 KB)
│   ├── UserModule (200 KB)
│   └── ProductModule (250 KB)
├── vendor.js (1 MB)
│   ├── @angular/core (400 KB)
│   ├── rxjs (300 KB)
│   └── lodash (300 KB)  ← Can we optimize this?
```

**Check bundle budgets:**
```json
// angular.json
{
  "budgets": [
    {
      "type": "initial",
      "maximumWarning": "500kb",
      "maximumError": "1mb"
    },
    {
      "type": "anyComponentStyle",
      "maximumWarning": "2kb",
      "maximumError": "4kb"
    }
  ]
}
```

### 5.5 Image Optimization

**Optimize images:**

```bash
# Install image optimizer
npm install --save-dev imagemin imagemin-mozjpeg imagemin-pngquant
```

**Use WebP format:**
```html
<picture>
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="Fallback">
</picture>
```

**Lazy load images:**
```html
<img src="placeholder.jpg" 
     data-src="actual-image.jpg" 
     loading="lazy" 
     alt="Description">
```

**Results:**
```
Original: image.jpg (2 MB)
Optimized: image.webp (200 KB)
Savings: 90% smaller!
```

### 5.6 CSS Optimization

**Remove unused CSS:**
```bash
# PurgeCSS removes unused styles
npm install --save-dev @fullhuman/postcss-purgecss
```

**Optimize with angular.json:**
```json
{
  "production": {
    "optimization": {
      "scripts": true,
      "styles": {
        "minify": true,
        "inlineCritical": true
      }
    }
  }
}
```

**Results:**
```
Before: styles.css (500 KB)
After: styles.css (50 KB)
Savings: 90% smaller!
```

---

## 6. Deployment Strategies

### 6.1 Static Hosting

**Deploy to static hosting (Netlify, Vercel, Firebase):**

**Build:**
```bash
ng build --configuration production
```

**Deploy to Netlify:**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist/my-app
```

**netlify.toml:**
```toml
[build]
  command = "ng build --configuration production"
  publish = "dist/my-app"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### 6.2 Server Deployment

**Deploy to server (Nginx, Apache):**

**Nginx configuration:**
```nginx
server {
  listen 80;
  server_name example.com;
  root /var/www/my-app;
  index index.html;

  # Serve files
  location / {
    try_files $uri $uri/ /index.html;
  }

  # Cache static assets
  location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
  }

  # Gzip compression
  gzip on;
  gzip_types text/plain text/css application/json application/javascript;
}
```

**Deploy:**
```bash
# Build
ng build --configuration production

# Copy to server
scp -r dist/my-app/* user@server:/var/www/my-app/

# Restart server
ssh user@server 'sudo systemctl restart nginx'
```

### 6.3 Docker Deployment

**Dockerfile:**
```dockerfile
# Build stage
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build -- --configuration production

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist/my-app /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**Build and run:**
```bash
# Build image
docker build -t my-angular-app .

# Run container
docker run -p 80:80 my-angular-app
```

**docker-compose.yml:**
```yaml
version: '3.8'
services:
  web:
    build: .
    ports:
      - "80:80"
    environment:
      - NODE_ENV=production
```

### 6.4 Cloud Platforms

**AWS S3 + CloudFront:**
```bash
# Build
ng build --configuration production

# Deploy to S3
aws s3 sync dist/my-app s3://my-bucket --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id E123456 --paths "/*"
```

**Azure Static Web Apps:**
```bash
# Install Azure CLI
npm install -g @azure/static-web-apps-cli

# Deploy
swa deploy dist/my-app --deployment-token $DEPLOYMENT_TOKEN
```

**Google Cloud Storage:**
```bash
# Build
ng build --configuration production

# Deploy
gsutil -m rsync -r -d dist/my-app gs://my-bucket
```

### 6.5 CDN Integration

**Use CDN for assets:**

**angular.json:**
```json
{
  "production": {
    "deployUrl": "https://cdn.example.com/",
    "baseHref": "/"
  }
}
```

**Result:**
```html
<!-- Assets loaded from CDN -->
<script src="https://cdn.example.com/main.js"></script>
<link href="https://cdn.example.com/styles.css">
```

---

## 7. CI/CD Integration

### 7.1 What is CI/CD?

**CI/CD automates build, test, and deployment.**

**Process:**
```
Code Push → CI/CD Pipeline → Deploy
    ↓
1. Install dependencies
2. Run tests
3. Build production
4. Deploy to server
```

### 7.2 GitHub Actions

**.github/workflows/deploy.yml:**
```yaml
name: Build and Deploy

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm run test -- --watch=false --browsers=ChromeHeadless
    
    - name: Build
      run: npm run build -- --configuration production
    
    - name: Deploy to Netlify
      uses: nwtgck/actions-netlify@v2
      with:
        publish-dir: './dist/my-app'
        production-deploy: true
      env:
        NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
        NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

### 7.3 GitLab CI

**.gitlab-ci.yml:**
```yaml
image: node:18

stages:
  - install
  - test
  - build
  - deploy

cache:
  paths:
    - node_modules/

install:
  stage: install
  script:
    - npm ci

test:
  stage: test
  script:
    - npm run test -- --watch=false --browsers=ChromeHeadless

build:
  stage: build
  script:
    - npm run build -- --configuration production
  artifacts:
    paths:
      - dist/

deploy:
  stage: deploy
  script:
    - npm install -g netlify-cli
    - netlify deploy --prod --dir=dist/my-app
  only:
    - main
```

### 7.4 Jenkins

**Jenkinsfile:**
```groovy
pipeline {
  agent any
  
  stages {
    stage('Install') {
      steps {
        sh 'npm ci'
      }
    }
    
    stage('Test') {
      steps {
        sh 'npm run test -- --watch=false --browsers=ChromeHeadless'
      }
    }
    
    stage('Build') {
      steps {
        sh 'npm run build -- --configuration production'
      }
    }
    
    stage('Deploy') {
      when {
        branch 'main'
      }
      steps {
        sh 'scp -r dist/my-app/* user@server:/var/www/my-app/'
      }
    }
  }
}
```

### 7.5 Azure DevOps

**azure-pipelines.yml:**
```yaml
trigger:
  - main

pool:
  vmImage: 'ubuntu-latest'

steps:
- task: NodeTool@0
  inputs:
    versionSpec: '18.x'
  displayName: 'Install Node.js'

- script: npm ci
  displayName: 'Install dependencies'

- script: npm run test -- --watch=false --browsers=ChromeHeadless
  displayName: 'Run tests'

- script: npm run build -- --configuration production
  displayName: 'Build'

- task: PublishBuildArtifacts@1
  inputs:
    pathToPublish: 'dist/my-app'
    artifactName: 'drop'
  displayName: 'Publish artifacts'

- task: AzureWebApp@1
  inputs:
    azureSubscription: 'Azure Subscription'
    appName: 'my-angular-app'
    package: '$(Build.ArtifactStagingDirectory)/drop'
  displayName: 'Deploy to Azure'
```

---

## 8. Source Maps

### 8.1 What are Source Maps?

**Source maps map minified code back to original source.**

**Without source maps:**
```javascript
// Production code (minified)
function a(){return b+c}

// Error:
// at a (main.abc123.js:1:234)
// Where is this in my code?? 😵
```

**With source maps:**
```javascript
// Production code (minified)
function a(){return b+c}

// Source map maps to:
// user.component.ts:45
// Error in calculateTotal() method
// Easy to debug! ✅
```

### 8.2 Enabling Source Maps

**angular.json:**
```json
{
  "configurations": {
    "production": {
      "sourceMap": false  // Disabled in production
    },
    "development": {
      "sourceMap": true   // Enabled in development
    }
  }
}
```

**Enable for production debugging:**
```json
{
  "production": {
    "sourceMap": {
      "scripts": true,
      "styles": true,
      "vendor": false,
      "hidden": true  // Don't link in bundle
    }
  }
}
```

### 8.3 Source Map Types

**Types:**

```json
{
  "sourceMap": {
    "scripts": true,      // JavaScript source maps
    "styles": true,       // CSS source maps
    "vendor": true,       // Third-party library maps
    "hidden": false       // Hidden or linked
  }
}
```

**Hidden source maps:**
```json
{
  "sourceMap": {
    "scripts": true,
    "hidden": true  // Generates .map files but doesn't link them
  }
}
```

**Result:**
```
dist/
├── main.js              (no source map reference)
└── main.js.map          (exists but not linked)

Upload .map files to error tracking service
Don't expose to public
```

### 8.4 Production Considerations

**Security concerns:**
```
Source maps expose source code
→ Don't deploy .map files to production
→ Or use hidden source maps
→ Upload to private error tracking
```

**Best practice:**
```json
// Production
{
  "sourceMap": false  // No source maps
}

// Or hidden for error tracking
{
  "sourceMap": {
    "scripts": true,
    "hidden": true
  }
}
```

**Deploy script:**
```bash
# Build with hidden source maps
ng build --configuration production

# Upload source maps to Sentry (private)
sentry-cli releases files VERSION upload-sourcemaps dist/my-app

# Delete source maps before deploy
rm dist/my-app/*.map

# Deploy without source maps
deploy dist/my-app
```

### 8.5 Debugging with Source Maps

**Browser DevTools:**
```
1. Open DevTools (F12)
2. Sources tab
3. webpack:// folder shows original TypeScript
4. Set breakpoints in TypeScript files
5. Debug original code!
```

**Error tracking (Sentry):**
```typescript
// Install Sentry
npm install @sentry/angular

// Configure
import * as Sentry from "@sentry/angular";

Sentry.init({
  dsn: "https://xxx@sentry.io/xxx",
  integrations: [
    new Sentry.BrowserTracing()
  ]
});
```

**Upload source maps:**
```bash
# Sentry CLI
sentry-cli releases new VERSION
sentry-cli releases files VERSION upload-sourcemaps dist/my-app
sentry-cli releases finalize VERSION
```

**Result:**
```
Error in production:
→ Sentry captures error
→ Uses source maps to show original code
→ Shows exact line in TypeScript
→ Easy debugging even in production!
```

---

## Summary

You've mastered **Angular Build and Deployment**!

**Key Concepts:**

**1. Development vs Production:**
- **Development**: Fast build, large files, easy debugging
- **Production**: Slow build, small files, optimized

**2. Environment Configuration:**
- Multiple environment files
- Build-time replacement
- Runtime configuration with APP_INITIALIZER

**3. AOT vs JIT:**
- **JIT**: Compile in browser (dev)
- **AOT**: Pre-compile (production, 80% smaller)

**4. Optimization:**
- Tree shaking (remove unused code)
- Code splitting (smaller chunks)
- Lazy loading (on-demand)
- Bundle analysis

**5. Deployment:**
- Static hosting (Netlify, Vercel)
- Server deployment (Nginx, Apache)
- Docker containers
- Cloud platforms (AWS, Azure, GCP)

**6. CI/CD:**
- Automated builds
- Automated tests
- Automated deployment
- GitHub Actions, GitLab CI, Jenkins

**7. Source Maps:**
- Debug minified code
- Hidden in production
- Upload to error tracking

**Build Checklist:**
```bash
✅ 1. Configure environments
✅ 2. Enable AOT compilation
✅ 3. Enable optimization
✅ 4. Set bundle budgets
✅ 5. Lazy load routes
✅ 6. Optimize images
✅ 7. Configure source maps
✅ 8. Build for production
✅ 9. Test build locally
✅ 10. Deploy via CI/CD
```

**Production Build Command:**
```bash
ng build --configuration production
```

**File Size Comparison:**
```
Before optimization: 15 MB
After optimization: 800 KB
Reduction: 95% 🎉
```

Master these build and deployment concepts to ship fast, optimized Angular applications! 🚀
