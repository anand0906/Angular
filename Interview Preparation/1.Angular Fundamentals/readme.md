# Angular Fundamentals

## Index

1. [Angular Architecture and Core Concepts](#1-angular-architecture-and-core-concepts)
   - 1.1 [What is Angular?](#11-what-is-angular)
   - 1.2 [Architecture Overview](#12-architecture-overview)
   - 1.3 [Components](#13-components)
   - 1.4 [Modules](#14-modules)
   - 1.5 [Templates](#15-templates)
   - 1.6 [Data Binding](#16-data-binding)
   - 1.7 [Directives](#17-directives)
   - 1.8 [Services](#18-services)
   - 1.9 [Dependency Injection](#19-dependency-injection)
   - 1.10 [Pipes](#110-pipes)

2. [Angular vs AngularJS Differences](#2-angular-vs-angularjs-differences)
   - 2.1 [Architecture Differences](#21-architecture-differences)
   - 2.2 [Language Differences](#22-language-differences)
   - 2.3 [Performance Differences](#23-performance-differences)
   - 2.4 [Mobile Support](#24-mobile-support)
   - 2.5 [Migration Path](#25-migration-path)

3. [TypeScript Basics and Its Role in Angular](#3-typescript-basics-and-its-role-in-angular)
   - 3.1 [What is TypeScript?](#31-what-is-typescript)
   - 3.2 [Basic Types](#32-basic-types)
   - 3.3 [Interfaces](#33-interfaces)
   - 3.4 [Classes](#34-classes)
   - 3.5 [Decorators](#35-decorators)
   - 3.6 [Why Angular Uses TypeScript](#36-why-angular-uses-typescript)

4. [Angular CLI Commands and Usage](#4-angular-cli-commands-and-usage)
   - 4.1 [Installing Angular CLI](#41-installing-angular-cli)
   - 4.2 [Creating New Projects](#42-creating-new-projects)
   - 4.3 [Generating Components](#43-generating-components)
   - 4.4 [Generating Services](#44-generating-services)
   - 4.5 [Serving Applications](#45-serving-applications)
   - 4.6 [Building for Production](#46-building-for-production)
   - 4.7 [Testing Commands](#47-testing-commands)
   - 4.8 [Other Useful Commands](#48-other-useful-commands)

5. [Project Structure and File Organization](#5-project-structure-and-file-organization)
   - 5.1 [Root Level Files](#51-root-level-files)
   - 5.2 [src Folder Structure](#52-src-folder-structure)
   - 5.3 [app Folder Organization](#53-app-folder-organization)
   - 5.4 [Best Practices for File Organization](#54-best-practices-for-file-organization)

6. [Angular Versioning and Update Strategies](#6-angular-versioning-and-update-strategies)
   - 6.1 [Semantic Versioning](#61-semantic-versioning)
   - 6.2 [Release Schedule](#62-release-schedule)
   - 6.3 [Update Commands](#63-update-commands)
   - 6.4 [Breaking Changes](#64-breaking-changes)
   - 6.5 [Best Practices for Updates](#65-best-practices-for-updates)

---

## 1. Angular Architecture and Core Concepts

### 1.1 What is Angular?

Angular is a **platform and framework** for building single-page client applications using HTML, CSS, and TypeScript.

**Key Points:**
- Developed and maintained by Google
- Complete rewrite of AngularJS (version 1.x)
- Current versions: Angular 2+ (commonly just called "Angular")
- Uses component-based architecture
- Built with TypeScript

**Simple Example:**
Think of Angular like a car manufacturing system. Instead of building each car part separately, you have a blueprint (framework) that tells you how to assemble components (engine, wheels, body) to create a complete car (application).

### 1.2 Architecture Overview

Angular applications follow a **modular architecture** with these key building blocks:

```
Application
    ├── Modules (containers)
    │   ├── Components (UI logic)
    │   ├── Services (business logic)
    │   ├── Directives (DOM behavior)
    │   └── Pipes (data transformation)
    └── Dependency Injection (connects everything)
```

**How it Works:**
1. **Modules** organize the application
2. **Components** control views (what users see)
3. **Services** provide business logic and data
4. **Dependency Injection** connects components with services

**Simple Example:**
```
Restaurant App
├── Module: Restaurant Module
│   ├── Component: Menu Component (displays menu)
│   ├── Component: Order Component (shows orders)
│   ├── Service: Menu Service (gets menu data)
│   └── Service: Order Service (processes orders)
```

### 1.3 Components

Components are the **basic building blocks** of Angular applications. Each component controls a portion of the screen called a view.

**Component Structure:**
- **Template** (HTML) - What users see
- **Class** (TypeScript) - Logic and data
- **Styles** (CSS) - How it looks
- **Metadata** (Decorator) - Additional info for Angular

**Simple Example:**
```typescript
// greeting.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-greeting',
  template: '<h1>Hello {{ name }}!</h1>',
  styles: ['h1 { color: blue; }']
})
export class GreetingComponent {
  name = 'John';
}
```

**Explanation:**
- `@Component` is a decorator (tells Angular this is a component)
- `selector` is the HTML tag name (`<app-greeting>`)
- `template` is the HTML to display
- `name` is a property that holds data
- `{{ name }}` displays the value of name

**Usage in HTML:**
```html
<app-greeting></app-greeting>
<!-- Displays: Hello John! -->
```

### 1.4 Modules

Modules are **containers** that group related components, services, and other code into cohesive blocks.

**Every Angular app has at least one module:** the root module (AppModule).

**Simple Example:**
```typescript
// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { GreetingComponent } from './greeting.component';

@NgModule({
  declarations: [    // Components, directives, pipes
    AppComponent,
    GreetingComponent
  ],
  imports: [         // Other modules needed
    BrowserModule
  ],
  providers: [],     // Services
  bootstrap: [AppComponent]  // Root component
})
export class AppModule { }
```

**Explanation:**
- `declarations`: List all components in this module
- `imports`: Other modules this module needs
- `providers`: Services available in this module
- `bootstrap`: The starting component

**Think of it like:**
A module is like a **package box**. You put related items (components, services) together in one box for easy organization and shipping.

### 1.5 Templates

Templates are **HTML files** that tell Angular how to render the component. They combine HTML with Angular-specific syntax.

**Simple Example:**
```html
<!-- user.component.html -->
<div>
  <h2>{{ userName }}</h2>
  <p>Age: {{ userAge }}</p>
  <button (click)="sayHello()">Greet</button>
</div>
```

**Template Syntax:**
- `{{ }}` - Interpolation (display data)
- `( )` - Event binding (handle events)
- `[ ]` - Property binding (set properties)
- `[( )]` - Two-way binding (both ways)

**Component TypeScript:**
```typescript
export class UserComponent {
  userName = 'Alice';
  userAge = 25;
  
  sayHello() {
    alert('Hello!');
  }
}
```

### 1.6 Data Binding

Data binding is **communication** between the TypeScript code (component) and the HTML (template).

**Four Types:**

**1. Interpolation** (Component → Template)
```html
<h1>{{ title }}</h1>
```
```typescript
title = 'My App';  // Displays: My App
```

**2. Property Binding** (Component → Template)
```html
<img [src]="imageUrl">
```
```typescript
imageUrl = 'photo.jpg';
```

**3. Event Binding** (Template → Component)
```html
<button (click)="save()">Save</button>
```
```typescript
save() {
  console.log('Saved!');
}
```

**4. Two-Way Binding** (Both directions)
```html
<input [(ngModel)]="username">
<p>Hello {{ username }}</p>
```
```typescript
username = '';  // Updates as user types
```

### 1.7 Directives

Directives are **instructions** to the DOM. They tell Angular how to manipulate HTML elements.

**Three Types:**

**1. Component Directives** (components are directives with templates)

**2. Structural Directives** (change DOM structure)

**Simple Examples:**
```html
<!-- *ngIf: Show/hide elements -->
<p *ngIf="isLoggedIn">Welcome back!</p>

<!-- *ngFor: Loop through items -->
<ul>
  <li *ngFor="let fruit of fruits">{{ fruit }}</li>
</ul>

<!-- *ngSwitch: Choose one option -->
<div [ngSwitch]="color">
  <p *ngSwitchCase="'red'">Red color</p>
  <p *ngSwitchCase="'blue'">Blue color</p>
  <p *ngSwitchDefault>Other color</p>
</div>
```

**Component:**
```typescript
isLoggedIn = true;
fruits = ['Apple', 'Banana', 'Orange'];
color = 'red';
```

**3. Attribute Directives** (change appearance or behavior)

```html
<!-- ngClass: Add/remove CSS classes -->
<div [ngClass]="{'active': isActive, 'disabled': !isActive}">Status</div>

<!-- ngStyle: Set inline styles -->
<p [ngStyle]="{'color': textColor, 'font-size': fontSize}">Styled text</p>
```

```typescript
isActive = true;
textColor = 'blue';
fontSize = '20px';
```

### 1.8 Services

Services are **classes** that contain business logic, data, or functions that are used across multiple components.

**Purpose:**
- Keep components lean and focused on user experience
- Share data and logic between components
- Fetch data from servers
- Handle business logic

**Simple Example:**
```typescript
// data.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'  // Available throughout app
})
export class DataService {
  private users = ['Alice', 'Bob', 'Charlie'];
  
  getUsers() {
    return this.users;
  }
  
  addUser(name: string) {
    this.users.push(name);
  }
}
```

**Using in Component:**
```typescript
// user.component.ts
import { Component } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-user',
  template: '<ul><li *ngFor="let user of users">{{ user }}</li></ul>'
})
export class UserComponent {
  users: string[];
  
  constructor(private dataService: DataService) {
    this.users = this.dataService.getUsers();
  }
}
```

**Think of it like:**
A service is like a **utility company**. Multiple houses (components) use the same water service (data service) instead of each having its own well.

### 1.9 Dependency Injection

Dependency Injection (DI) is a **design pattern** where Angular provides dependencies (services) to components instead of components creating them.

**How it Works:**
1. You define what you need (service)
2. Angular provides it to you (injection)
3. You use it without creating it yourself

**Simple Example:**
```typescript
// Without DI (manual creation - NOT recommended)
export class UserComponent {
  dataService = new DataService();  // Component creates service
}

// With DI (Angular way - RECOMMENDED)
export class UserComponent {
  constructor(private dataService: DataService) {
    // Angular creates and provides service
  }
}
```

**Benefits:**
- **Reusability**: Same service instance shared across components
- **Testability**: Easy to replace with mock services for testing
- **Maintainability**: Change service implementation without changing components

**Think of it like:**
Instead of building your own car (creating service), you **rent** one (inject service). Someone else maintains it, and you just use it.

### 1.10 Pipes

Pipes are **functions** that transform data in templates before displaying it.

**Built-in Pipes:**

```html
<!-- Uppercase -->
<p>{{ 'hello' | uppercase }}</p>
<!-- Displays: HELLO -->

<!-- Lowercase -->
<p>{{ 'WORLD' | lowercase }}</p>
<!-- Displays: world -->

<!-- Date -->
<p>{{ today | date:'short' }}</p>
<!-- Displays: 2/12/26, 10:30 AM -->

<!-- Currency -->
<p>{{ price | currency:'USD' }}</p>
<!-- Displays: $99.99 -->

<!-- Decimal -->
<p>{{ 3.14159 | number:'1.2-2' }}</p>
<!-- Displays: 3.14 -->

<!-- Chaining pipes -->
<p>{{ 'hello' | uppercase | slice:0:3 }}</p>
<!-- Displays: HEL -->
```

**Custom Pipe Example:**
```typescript
// reverse.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {
  transform(value: string): string {
    return value.split('').reverse().join('');
  }
}
```

**Usage:**
```html
<p>{{ 'hello' | reverse }}</p>
<!-- Displays: olleh -->
```

---

## 2. Angular vs AngularJS Differences

### 2.1 Architecture Differences

**AngularJS (1.x):**
- Uses **MVC** (Model-View-Controller) architecture
- Controller-based
- Uses $scope for data binding
- Two-way data binding by default

**Angular (2+):**
- Uses **Component-based** architecture
- Everything is a component
- Uses TypeScript classes
- One-way data flow (can opt-in for two-way)

**Simple Example:**

**AngularJS:**
```javascript
// Controller
app.controller('UserCtrl', function($scope) {
  $scope.name = 'John';
});
```
```html
<!-- View -->
<div ng-controller="UserCtrl">
  {{ name }}
</div>
```

**Angular:**
```typescript
// Component
@Component({
  selector: 'app-user',
  template: '{{ name }}'
})
export class UserComponent {
  name = 'John';
}
```

### 2.2 Language Differences

| Feature | AngularJS | Angular |
|---------|-----------|---------|
| **Language** | JavaScript | TypeScript |
| **Types** | No static typing | Strong typing |
| **ES6 Features** | Limited | Full support |
| **Decorators** | No | Yes |

**Simple Example:**

**AngularJS (JavaScript):**
```javascript
var name = 'John';  // No type checking
name = 123;  // Allowed, but can cause errors
```

**Angular (TypeScript):**
```typescript
let name: string = 'John';  // Type specified
name = 123;  // Error: Type 'number' not assignable to 'string'
```

### 2.3 Performance Differences

**AngularJS:**
- Uses dirty checking for change detection
- Slower with large data sets
- Can have performance issues with many watchers

**Angular:**
- Uses Zone.js for change detection
- Much faster rendering
- Ahead-of-Time (AOT) compilation
- Better mobile performance

**Performance Comparison:**
```
Load Time:
AngularJS: ~3 seconds (for medium app)
Angular:   ~1 second (with AOT)

Change Detection:
AngularJS: Checks all watchers
Angular:   Only checks changed components
```

### 2.4 Mobile Support

**AngularJS:**
- Not designed for mobile
- Performance issues on mobile devices
- No native mobile support

**Angular:**
- Built with mobile in mind
- Better touch support
- Works with NativeScript and Ionic for mobile apps
- Progressive Web Apps (PWA) support

### 2.5 Migration Path

**Not a Direct Upgrade:**
Angular is a complete rewrite, not an update to AngularJS.

**Migration Options:**

**1. Hybrid Approach** (gradual migration)
- Run AngularJS and Angular together
- Use ngUpgrade library
- Migrate component by component

**2. Complete Rewrite**
- Start fresh with Angular
- Rewrite all components
- Better for new features

**Simple Migration Example:**
```typescript
// AngularJS directive
app.directive('myButton', function() {
  return {
    template: '<button>Click</button>'
  };
});

// Angular component
@Component({
  selector: 'my-button',
  template: '<button>Click</button>'
})
export class MyButtonComponent { }
```

---

## 3. TypeScript Basics and Its Role in Angular

### 3.1 What is TypeScript?

TypeScript is a **superset of JavaScript** that adds static typing and other features.

**Key Points:**
- Compiles to JavaScript
- Adds type safety
- Catches errors during development
- Better IDE support (autocomplete, refactoring)

**Relationship:**
```
TypeScript Code (.ts)
        ↓ (compiles to)
JavaScript Code (.js)
        ↓ (runs in)
Browser
```

**Simple Example:**
```typescript
// TypeScript
function add(a: number, b: number): number {
  return a + b;
}

add(5, 3);      // ✓ Correct
add('5', '3');  // ✗ Error: Arguments must be numbers
```

### 3.2 Basic Types

**Primitive Types:**

```typescript
// String
let name: string = 'John';
let greeting: string = `Hello ${name}`;

// Number
let age: number = 25;
let price: number = 99.99;

// Boolean
let isActive: boolean = true;
let isLoggedIn: boolean = false;

// Array
let numbers: number[] = [1, 2, 3];
let names: string[] = ['Alice', 'Bob'];

// Any (avoid when possible)
let anything: any = 'hello';
anything = 42;  // No error

// Void (no return value)
function log(): void {
  console.log('Logging...');
}

// Null and Undefined
let empty: null = null;
let notDefined: undefined = undefined;
```

### 3.3 Interfaces

Interfaces define the **structure** of objects. They're like contracts that objects must follow.

**Simple Example:**
```typescript
// Define interface
interface User {
  name: string;
  age: number;
  email?: string;  // Optional property (?)
}

// Use interface
let user1: User = {
  name: 'Alice',
  age: 30,
  email: 'alice@example.com'
};

let user2: User = {
  name: 'Bob',
  age: 25
  // email is optional, so this is valid
};

// Error example
let user3: User = {
  name: 'Charlie'
  // Error: Property 'age' is missing
};
```

**Interface with Functions:**
```typescript
interface Calculator {
  add(a: number, b: number): number;
  subtract(a: number, b: number): number;
}

let calc: Calculator = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b
};
```

### 3.4 Classes

Classes are **blueprints** for creating objects with properties and methods.

**Simple Example:**
```typescript
class Person {
  // Properties
  name: string;
  age: number;
  
  // Constructor
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
  
  // Method
  greet(): void {
    console.log(`Hello, I'm ${this.name}`);
  }
}

// Create instance
let person1 = new Person('Alice', 30);
person1.greet();  // Output: Hello, I'm Alice
```

**Access Modifiers:**
```typescript
class BankAccount {
  public accountNumber: string;    // Accessible everywhere
  private balance: number;         // Only inside class
  protected owner: string;         // Inside class and subclasses
  
  constructor(accountNumber: string, initialBalance: number) {
    this.accountNumber = accountNumber;
    this.balance = initialBalance;
    this.owner = 'Unknown';
  }
  
  // Public method to access private property
  getBalance(): number {
    return this.balance;
  }
  
  deposit(amount: number): void {
    this.balance += amount;
  }
}

let account = new BankAccount('123456', 1000);
console.log(account.accountNumber);  // ✓ Works (public)
console.log(account.getBalance());   // ✓ Works (public method)
console.log(account.balance);        // ✗ Error (private)
```

**Inheritance:**
```typescript
class Animal {
  name: string;
  
  constructor(name: string) {
    this.name = name;
  }
  
  makeSound(): void {
    console.log('Some sound');
  }
}

class Dog extends Animal {
  breed: string;
  
  constructor(name: string, breed: string) {
    super(name);  // Call parent constructor
    this.breed = breed;
  }
  
  makeSound(): void {
    console.log('Woof!');
  }
}

let dog = new Dog('Max', 'Labrador');
dog.makeSound();  // Output: Woof!
```

### 3.5 Decorators

Decorators are **special functions** that add metadata to classes, methods, or properties. They start with `@`.

**Simple Example:**
```typescript
// Component decorator
@Component({
  selector: 'app-user',
  template: '<h1>User Component</h1>'
})
export class UserComponent { }

// Injectable decorator (for services)
@Injectable({
  providedIn: 'root'
})
export class DataService { }

// Input decorator (for component inputs)
export class ChildComponent {
  @Input() userName: string;
}

// Output decorator (for component outputs)
export class ChildComponent {
  @Output() userClicked = new EventEmitter<string>();
}
```

**What Decorators Do:**
- `@Component`: Tells Angular this is a component
- `@Injectable`: Tells Angular this can be injected
- `@Input`: Creates an input property
- `@Output`: Creates an output event

### 3.6 Why Angular Uses TypeScript

**Benefits for Angular:**

**1. Type Safety**
```typescript
// Catches errors early
function calculateTotal(price: number, quantity: number): number {
  return price * quantity;
}

calculateTotal(10, 5);      // ✓ Correct
calculateTotal('10', 5);    // ✗ Error caught before running
```

**2. Better IDE Support**
- Autocomplete suggestions
- Inline documentation
- Instant error detection
- Refactoring tools

**3. Advanced Features**
```typescript
// Generics
class DataStore<T> {
  private data: T[] = [];
  
  add(item: T): void {
    this.data.push(item);
  }
  
  getAll(): T[] {
    return this.data;
  }
}

let stringStore = new DataStore<string>();
stringStore.add('hello');
stringStore.add(123);  // Error: number not assignable to string
```

**4. Decorators for Metadata**
Essential for Angular's dependency injection and component system.

**5. Object-Oriented Programming**
Classes, inheritance, and interfaces make code more organized.

---

## 4. Angular CLI Commands and Usage

### 4.1 Installing Angular CLI

**Angular CLI** (Command Line Interface) is a tool to create, build, and manage Angular applications.

**Installation:**
```bash
# Install globally using npm
npm install -g @angular/cli

# Verify installation
ng version

# Check help
ng help
```

**Output:**
```
Angular CLI: 17.0.0
Node: 20.10.0
Package Manager: npm 10.2.0
```

### 4.2 Creating New Projects

**Create a new Angular application:**

```bash
# Basic syntax
ng new my-app

# You'll be asked:
# 1. Add routing? (Yes/No)
# 2. Stylesheet format? (CSS/SCSS/SASS/LESS)
```

**With Options:**
```bash
# Create with routing and SCSS
ng new my-app --routing --style=scss

# Skip initial git commit
ng new my-app --skip-git

# Use specific package manager
ng new my-app --package-manager=yarn

# Strict mode (stricter TypeScript rules)
ng new my-app --strict
```

**Project Created:**
```
my-app/
├── src/
├── node_modules/
├── angular.json
├── package.json
└── tsconfig.json
```

### 4.3 Generating Components

**Generate components and other files:**

```bash
# Generate component
ng generate component user
# or shorthand
ng g c user

# Creates:
# - user.component.ts
# - user.component.html
# - user.component.css
# - user.component.spec.ts
```

**Component Options:**
```bash
# Skip test file
ng g c user --skip-tests

# Inline template (no HTML file)
ng g c user --inline-template

# Inline styles (no CSS file)
ng g c user --inline-style

# Create in specific folder
ng g c components/user

# Flat (no folder created)
ng g c user --flat
```

### 4.4 Generating Services

```bash
# Generate service
ng generate service data
# or shorthand
ng g s data

# Creates:
# - data.service.ts
# - data.service.spec.ts

# Generate in specific folder
ng g s services/data

# Skip tests
ng g s data --skip-tests
```

**Other Generators:**
```bash
# Module
ng g module admin

# Directive
ng g directive highlight

# Pipe
ng g pipe reverse

# Guard
ng g guard auth

# Interface
ng g interface user

# Enum
ng g enum status
```

### 4.5 Serving Applications

**Run development server:**

```bash
# Start server
ng serve

# Server runs at: http://localhost:4200
```

**Serve Options:**
```bash
# Open browser automatically
ng serve --open
# or
ng serve -o

# Use different port
ng serve --port 4500

# Use specific host
ng serve --host 0.0.0.0

# Enable production mode
ng serve --prod
```

**Live Reload:**
- Changes to files automatically refresh browser
- Compilation errors shown in terminal and browser

### 4.6 Building for Production

**Create production build:**

```bash
# Build for production
ng build

# Output folder: dist/my-app/
```

**Build Options:**
```bash
# Production build (optimized)
ng build --configuration production
# or
ng build --prod

# Specific output path
ng build --output-path dist/my-custom-folder

# Base href for deployment
ng build --base-href /my-app/

# Extract CSS to separate file
ng build --extract-css
```

**What Production Build Does:**
- Minifies code
- Removes unused code (tree shaking)
- Optimizes bundle size
- Enables Ahead-of-Time (AOT) compilation

**Build Output:**
```
dist/my-app/
├── index.html
├── main.[hash].js
├── polyfills.[hash].js
├── runtime.[hash].js
└── styles.[hash].css
```

### 4.7 Testing Commands

```bash
# Run unit tests (Karma + Jasmine)
ng test

# Run tests once (no watch mode)
ng test --watch=false

# Code coverage
ng test --code-coverage

# Run end-to-end tests
ng e2e
```

### 4.8 Other Useful Commands

```bash
# Lint code
ng lint

# Update Angular packages
ng update

# Check available updates
ng update --all

# Add new capability
ng add @angular/material

# Get Angular documentation
ng doc component

# Analyze bundle size
ng build --stats-json
# Then use webpack-bundle-analyzer
```

**Configuration:**
```bash
# Generate configuration
ng config

# Set default values
ng config schematics.@schematics/angular.component.style scss
```

---

## 5. Project Structure and File Organization

### 5.1 Root Level Files

**Standard Angular Project Structure:**
```
my-app/
├── e2e/                    # End-to-end tests
├── node_modules/           # Dependencies
├── src/                    # Source code
├── .editorconfig          # Editor configuration
├── .gitignore             # Git ignore rules
├── angular.json           # Angular CLI configuration
├── package.json           # npm dependencies
├── README.md              # Project documentation
├── tsconfig.json          # TypeScript configuration
└── tsconfig.app.json      # App-specific TypeScript config
```

**Key Files Explained:**

**angular.json**
- Angular CLI configuration
- Build settings
- Project paths
- Styles and scripts to include

**package.json**
```json
{
  "name": "my-app",
  "version": "1.0.0",
  "scripts": {
    "start": "ng serve",
    "build": "ng build",
    "test": "ng test"
  },
  "dependencies": {
    "@angular/core": "^17.0.0",
    "@angular/common": "^17.0.0"
  }
}
```

**tsconfig.json**
- TypeScript compiler options
- Module resolution
- Path mappings

### 5.2 src Folder Structure

```
src/
├── app/                   # Application code
├── assets/                # Static files (images, fonts)
├── environments/          # Environment configurations
├── index.html            # Main HTML page
├── main.ts               # Application entry point
├── styles.css            # Global styles
└── polyfills.ts          # Browser compatibility
```

**Key Files:**

**index.html**
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>MyApp</title>
  <base href="/">
</head>
<body>
  <app-root></app-root>  <!-- Angular app loads here -->
</body>
</html>
```

**main.ts** (Bootstrap file)
```typescript
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));
```

**environments/environment.ts**
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000'
};
```

**environments/environment.prod.ts**
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://api.example.com'
};
```

### 5.3 app Folder Organization

**Basic Structure:**
```
app/
├── app.component.ts       # Root component TypeScript
├── app.component.html     # Root component template
├── app.component.css      # Root component styles
├── app.component.spec.ts  # Root component tests
└── app.module.ts          # Root module
```

**app.component.ts** (Root Component)
```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-app';
}
```

**app.module.ts** (Root Module)
```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### 5.4 Best Practices for File Organization

**Feature-Based Structure (Recommended):**
```
app/
├── core/                  # Singleton services, guards
│   ├── services/
│   │   ├── auth.service.ts
│   │   └── data.service.ts
│   ├── guards/
│   │   └── auth.guard.ts
│   └── core.module.ts
│
├── shared/                # Shared components, directives, pipes
│   ├── components/
│   │   ├── button/
│   │   └── card/
│   ├── directives/
│   ├── pipes/
│   └── shared.module.ts
│
├── features/              # Feature modules
│   ├── user/
│   │   ├── components/
│   │   ├── services/
│   │   ├── user-routing.module.ts
│   │   └── user.module.ts
│   │
│   └── product/
│       ├── components/
│       ├── services/
│       ├── product-routing.module.ts
│       └── product.module.ts
│
├── app-routing.module.ts
├── app.component.ts
└── app.module.ts
```

**Component Folder Structure:**
```
user-list/
├── user-list.component.ts
├── user-list.component.html
├── user-list.component.css
└── user-list.component.spec.ts
```

**Naming Conventions:**

| Type | Pattern | Example |
|------|---------|---------|
| Component | name.component.ts | user.component.ts |
| Service | name.service.ts | data.service.ts |
| Module | name.module.ts | user.module.ts |
| Directive | name.directive.ts | highlight.directive.ts |
| Pipe | name.pipe.ts | reverse.pipe.ts |
| Guard | name.guard.ts | auth.guard.ts |

**File Naming Rules:**
- Use lowercase with dashes (kebab-case)
- Include file type in name
- Keep names descriptive but concise

**Examples:**
```
✓ user-profile.component.ts
✓ data-service.service.ts
✓ app-routing.module.ts

✗ UserProfile.component.ts
✗ dataService.ts
✗ routing.ts
```

**Module Organization:**

**Core Module** (Import once in AppModule)
```typescript
// core.module.ts
@NgModule({
  providers: [
    AuthService,
    DataService
  ]
})
export class CoreModule {
  // Prevent re-import
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded');
    }
  }
}
```

**Shared Module** (Import in feature modules)
```typescript
// shared.module.ts
@NgModule({
  declarations: [
    ButtonComponent,
    CardComponent
  ],
  exports: [
    ButtonComponent,
    CardComponent,
    CommonModule
  ]
})
export class SharedModule { }
```

**Feature Module**
```typescript
// user.module.ts
@NgModule({
  declarations: [
    UserListComponent,
    UserDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    UserRoutingModule
  ]
})
export class UserModule { }
```

---

## 6. Angular Versioning and Update Strategies

### 6.1 Semantic Versioning

Angular follows **Semantic Versioning** (SemVer): MAJOR.MINOR.PATCH

**Format:** X.Y.Z

**Example:** 17.2.5
- **17** = Major version
- **2** = Minor version
- **5** = Patch version

**Version Meanings:**

**MAJOR (X)** - Breaking changes
```
16.0.0 → 17.0.0
- May require code changes
- Could break existing features
- New major features
```

**MINOR (Y)** - New features (backward compatible)
```
17.1.0 → 17.2.0
- New features added
- No breaking changes
- Existing code still works
```

**PATCH (Z)** - Bug fixes
```
17.2.4 → 17.2.5
- Bug fixes only
- Security patches
- Performance improvements
```

**Simple Example:**
```json
// package.json
{
  "dependencies": {
    "@angular/core": "^17.2.5"
  }
}
```

**Version Prefixes:**
- `^17.2.5` - Allow minor and patch updates (17.x.x)
- `~17.2.5` - Allow only patch updates (17.2.x)
- `17.2.5` - Exact version only

### 6.2 Release Schedule

Angular follows a **predictable release schedule**:

**Regular Schedule:**
- **Major release**: Every 6 months
- **Minor release**: Every 1-3 months
- **Patch release**: Every week (if needed)

**Timeline Example:**
```
May 2024:   Angular 18.0.0 (Major)
June 2024:  Angular 18.1.0 (Minor)
July 2024:  Angular 18.2.0 (Minor)
Nov 2024:   Angular 19.0.0 (Major)
```

**Long-Term Support (LTS):**
- Major versions supported for 18 months
- Active support: 6 months
- LTS period: 12 months (security fixes only)

**Support Timeline:**
```
Version 17:
├── May 2023: Released
├── Nov 2023: Active support ends (v18 released)
└── May 2024: LTS ends

Version 18:
├── Nov 2023: Released
├── May 2024: Active support ends (v19 released)
└── Nov 2024: LTS ends
```

### 6.3 Update Commands

**Check Current Version:**
```bash
ng version
```

**Check for Updates:**
```bash
ng update
```

**Output Example:**
```
We analyzed your package.json and found:
- @angular/core can be updated to 17.2.0
- @angular/cli can be updated to 17.2.0
```

**Update Angular Core:**
```bash
# Update to latest version
ng update @angular/core

# Update to specific version
ng update @angular/core@17.0.0

# Update CLI
ng update @angular/cli
```

**Update All Angular Packages:**
```bash
ng update @angular/core @angular/cli
```

**Update with Migration:**
```bash
# Angular runs migrations automatically
ng update @angular/core --migrate-only

# Force update (skip compatibility check)
ng update @angular/core --force

# Create commits for each migration
ng update @angular/core --create-commits
```

**Update Third-Party Packages:**
```bash
# Update Material
ng update @angular/material

# Update other packages
npm update
```

### 6.4 Breaking Changes

**What are Breaking Changes?**
Changes that require you to modify your code when updating.

**Common Breaking Changes:**

**1. API Changes**
```typescript
// Angular 16
import { Component } from '@angular/core';

// Angular 17 (hypothetical)
import { Component } from '@angular/core/component';
```

**2. Deprecated Features Removed**
```typescript
// Deprecated in v16, removed in v17
// Old way (no longer works)
@ViewChild('myDiv') myDiv: ElementRef;

// New way
@ViewChild('myDiv', {static: false}) myDiv: ElementRef;
```

**3. Configuration Changes**
```json
// angular.json changes
// Old format
"budgets": [{"type": "initial"}]

// New format
"budgets": [{"type": "bundle"}]
```

**How Angular Handles Breaking Changes:**
1. **Deprecation warnings** in older versions
2. **Migration scripts** run automatically
3. **Update guide** at update.angular.io

### 6.5 Best Practices for Updates

**1. Update Regularly**
```bash
# Don't skip major versions
✗ Jump from v14 to v17 directly
✓ Update v14 → v15 → v16 → v17
```

**2. Test Before Updating**
```bash
# Run tests
ng test

# Run e2e tests
ng e2e

# Build production
ng build --prod
```

**3. Use Version Control**
```bash
# Create branch for update
git checkout -b update-angular-17

# Commit before update
git commit -am "Before Angular update"

# Update
ng update @angular/core

# Test and commit
git commit -am "Updated to Angular 17"
```

**4. Read Update Guide**
Visit: https://update.angular.io
- Select current version
- Select target version
- Follow step-by-step instructions

**5. Check Dependencies**
```bash
# Check compatibility
npm outdated

# Update package.json versions
# Test application
# Update one package at a time
```

**6. Update in Development First**
```
Development → Staging → Production
```

**Safe Update Process:**
```bash
# 1. Backup
git commit -am "Pre-update backup"

# 2. Check updates
ng update

# 3. Update CLI first
ng update @angular/cli

# 4. Update core
ng update @angular/core

# 5. Test
ng test
ng build --prod

# 6. Update other packages
ng update @angular/material
```

**Common Update Issues:**

**Issue 1: Peer Dependency Conflicts**
```bash
# Error: Incompatible peer dependencies
# Solution: Update related packages together
ng update @angular/core @angular/material
```

**Issue 2: Breaking Changes**
```bash
# Error: Property 'xyz' does not exist
# Solution: Check migration guide
# Visit: update.angular.io
```

**Issue 3: Third-Party Library Incompatibility**
```bash
# Error: Library not compatible with Angular 17
# Solution: Wait for library update or use older Angular version
# Check library's GitHub for updates
```

**Rollback if Needed:**
```bash
# Revert to previous commit
git reset --hard HEAD~1

# Or checkout specific commit
git checkout <commit-hash>

# Reinstall dependencies
npm install
```

---

## Summary

You've learned the **fundamentals of Angular**:

**1. Architecture & Concepts**
- Components (building blocks)
- Modules (containers)
- Services (business logic)
- Dependency Injection (providing dependencies)
- Templates & Data Binding (UI communication)
- Directives & Pipes (DOM manipulation & data transformation)

**2. Angular vs AngularJS**
- Component-based vs Controller-based
- TypeScript vs JavaScript
- Better performance and mobile support

**3. TypeScript Basics**
- Type safety
- Interfaces and Classes
- Decorators
- Why Angular uses it

**4. Angular CLI**
- Create projects: `ng new`
- Generate files: `ng generate`
- Serve app: `ng serve`
- Build: `ng build`

**5. Project Structure**
- Root files (configuration)
- src folder (source code)
- app folder (application)
- Best practices (feature-based organization)

**6. Versioning & Updates**
- Semantic versioning (Major.Minor.Patch)
- 6-month release cycle
- Update commands: `ng update`
- Breaking changes and migrations

---

## Next Steps

**To Master Angular:**

1. **Build Projects** - Practice is essential
2. **Learn Routing** - Navigate between views
3. **Study Forms** - Template-driven and Reactive
4. **Master RxJS** - Reactive programming
5. **Explore HTTP** - API communication
6. **Learn State Management** - NgRx or Akita
7. **Practice Testing** - Unit and E2E tests

**Resources:**
- Official Docs: angular.io
- Update Guide: update.angular.io
- Style Guide: angular.io/guide/styleguide

Keep practicing and building applications!
