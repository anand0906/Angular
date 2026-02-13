# Angular Modules

## Index

1. [Introduction to Modules](#1-introduction-to-modules)
   - 1.1 [What are NgModules?](#11-what-are-ngmodules)
   - 1.2 [Why Use Modules?](#12-why-use-modules)
   - 1.3 [Module Organization](#13-module-organization)

2. [NgModule Decorator and Metadata](#2-ngmodule-decorator-and-metadata)
   - 2.1 [@NgModule Decorator](#21-ngmodule-decorator)
   - 2.2 [declarations](#22-declarations)
   - 2.3 [imports](#23-imports)
   - 2.4 [providers](#24-providers)
   - 2.5 [bootstrap](#25-bootstrap)
   - 2.6 [exports](#26-exports)
   - 2.7 [entryComponents (Deprecated)](#27-entrycomponents-deprecated)

3. [Root Module vs Feature Modules](#3-root-module-vs-feature-modules)
   - 3.1 [Root Module (AppModule)](#31-root-module-appmodule)
   - 3.2 [Feature Modules](#32-feature-modules)
   - 3.3 [Creating Feature Modules](#33-creating-feature-modules)
   - 3.4 [When to Create Feature Modules](#34-when-to-create-feature-modules)
   - 3.5 [Feature Module Structure](#35-feature-module-structure)

4. [Shared Modules](#4-shared-modules)
   - 4.1 [What are Shared Modules?](#41-what-are-shared-modules)
   - 4.2 [Creating Shared Modules](#42-creating-shared-modules)
   - 4.3 [What to Put in Shared Modules](#43-what-to-put-in-shared-modules)
   - 4.4 [What NOT to Put in Shared Modules](#44-what-not-to-put-in-shared-modules)
   - 4.5 [Best Practices](#45-best-practices)

5. [Core Modules](#5-core-modules)
   - 5.1 [What are Core Modules?](#51-what-are-core-modules)
   - 5.2 [Creating Core Modules](#52-creating-core-modules)
   - 5.3 [Preventing Re-import](#53-preventing-re-import)
   - 5.4 [What to Put in Core Modules](#54-what-to-put-in-core-modules)
   - 5.5 [Core vs Shared](#55-core-vs-shared)

6. [Lazy Loading Modules](#6-lazy-loading-modules)
   - 6.1 [What is Lazy Loading?](#61-what-is-lazy-loading)
   - 6.2 [Setting Up Lazy Loading](#62-setting-up-lazy-loading)
   - 6.3 [Lazy Loading Syntax](#63-lazy-loading-syntax)
   - 6.4 [Benefits of Lazy Loading](#64-benefits-of-lazy-loading)
   - 6.5 [When to Lazy Load](#65-when-to-lazy-load)

7. [Preloading Strategies](#7-preloading-strategies)
   - 7.1 [What is Preloading?](#71-what-is-preloading)
   - 7.2 [NoPreloading (Default)](#72-nopreloading-default)
   - 7.3 [PreloadAllModules](#73-preloadallmodules)
   - 7.4 [Custom Preloading Strategy](#74-custom-preloading-strategy)
   - 7.5 [Choosing a Strategy](#75-choosing-a-strategy)

8. [forRoot and forChild Patterns](#8-forroot-and-forchild-patterns)
   - 8.1 [What are forRoot and forChild?](#81-what-are-forroot-and-forchild)
   - 8.2 [forRoot Pattern](#82-forroot-pattern)
   - 8.3 [forChild Pattern](#83-forchild-pattern)
   - 8.4 [Creating Your Own forRoot](#84-creating-your-own-forroot)
   - 8.5 [Use Cases](#85-use-cases)

9. [Module vs Standalone Components Approach](#9-module-vs-standalone-components-approach)
   - 9.1 [Module-based Architecture](#91-module-based-architecture)
   - 9.2 [Standalone Components Architecture](#92-standalone-components-architecture)
   - 9.3 [Comparison](#93-comparison)
   - 9.4 [Migration Path](#94-migration-path)
   - 9.5 [Which to Choose?](#95-which-to-choose)

---

## 1. Introduction to Modules

### 1.1 What are NgModules?

**NgModules** are containers that group related components, directives, pipes, and services into cohesive blocks of functionality.

**Think of it like:**
A toolbox that organizes related tools together. Instead of having all tools scattered, you group them by purpose (carpentry box, plumbing box, electrical box).

**Key Points:**
- Organize application code
- Define compilation context
- Manage dependencies
- Provide services
- Enable lazy loading

**Simple Example:**
```typescript
@NgModule({
  declarations: [     // Components, directives, pipes
    AppComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [          // Other modules
    BrowserModule,
    FormsModule
  ],
  providers: [],      // Services
  bootstrap: [AppComponent]  // Root component
})
export class AppModule { }
```

### 1.2 Why Use Modules?

**1. Organization:**
```typescript
// Without modules: Everything in one place (messy)
AppComponent, UserComponent, ProductComponent, 
CartComponent, LoginComponent, etc.

// With modules: Organized by feature
AppModule
├── UserModule (user-related components)
├── ProductModule (product-related components)
└── CartModule (cart-related components)
```

**2. Encapsulation:**
```typescript
// Module keeps internal components private
// Only exports what other modules need
```

**3. Reusability:**
```typescript
// SharedModule can be imported by multiple modules
// CoreModule provides app-wide services
```

**4. Lazy Loading:**
```typescript
// Load modules only when needed
// Faster initial load time
```

**5. Dependency Management:**
```typescript
// Module declares its dependencies clearly
// No hidden dependencies
```

### 1.3 Module Organization

**Common Module Structure:**

```
src/app/
├── app.module.ts              (Root module)
├── core/
│   └── core.module.ts         (App-wide services)
├── shared/
│   └── shared.module.ts       (Reusable components)
├── features/
│   ├── user/
│   │   └── user.module.ts     (User feature)
│   ├── product/
│   │   └── product.module.ts  (Product feature)
│   └── cart/
│       └── cart.module.ts     (Cart feature)
└── app-routing.module.ts      (Routing)
```

**Module Types:**

```
Modules
├── Root Module (AppModule)
├── Feature Modules (UserModule, ProductModule)
├── Shared Module (SharedModule)
├── Core Module (CoreModule)
└── Routing Modules (AppRoutingModule, FeatureRoutingModule)
```

---

## 2. NgModule Decorator and Metadata

### 2.1 @NgModule Decorator

**@NgModule** marks a class as an Angular module and provides configuration metadata.

**Basic Structure:**
```typescript
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [],
  imports: [],
  providers: [],
  bootstrap: [],
  exports: []
})
export class MyModule { }
```

**Complete Example:**
```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { UserComponent } from './user.component';
import { DataService } from './data.service';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### 2.2 declarations

**declarations** lists components, directives, and pipes that belong to this module.

**Syntax:**
```typescript
@NgModule({
  declarations: [
    Component1,
    Component2,
    Directive1,
    Pipe1
  ]
})
```

**Simple Example:**
```typescript
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HighlightDirective,
    ReversePipe
  ]
})
export class AppModule { }
```

**Rules:**
- Each component/directive/pipe can be declared in **only one** module
- Must declare before using in templates
- Cannot re-declare in another module

**Error Example:**
```typescript
// ✗ Error: Component declared in two modules
@NgModule({
  declarations: [SharedComponent]
})
export class Module1 { }

@NgModule({
  declarations: [SharedComponent]  // Error!
})
export class Module2 { }

// ✓ Correct: Declare in one, export, import in other
@NgModule({
  declarations: [SharedComponent],
  exports: [SharedComponent]
})
export class SharedModule { }

@NgModule({
  imports: [SharedModule]  // Now can use SharedComponent
})
export class Module2 { }
```

### 2.3 imports

**imports** lists other modules whose exported classes are needed by component templates in this module.

**Syntax:**
```typescript
@NgModule({
  imports: [
    Module1,
    Module2
  ]
})
```

**Simple Example:**
```typescript
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,        // Basic browser support
    FormsModule,          // Template-driven forms
    HttpClientModule,     // HTTP requests
    ReactiveFormsModule,  // Reactive forms
    RouterModule,         // Routing
    SharedModule          // Custom shared module
  ]
})
export class AppModule { }
```

**What You Import:**
- Angular built-in modules (BrowserModule, FormsModule)
- Third-party modules (MaterialModule)
- Your own modules (SharedModule, FeatureModule)

**Common Imports:**
```typescript
// Platform modules
BrowserModule           // For web apps (use once in AppModule)
CommonModule           // For feature modules (ngIf, ngFor, etc.)

// Forms
FormsModule            // Template-driven forms
ReactiveFormsModule    // Reactive forms

// HTTP
HttpClientModule       // HTTP client

// Routing
RouterModule           // Routing support

// Animations
BrowserAnimationsModule  // Animations support
```

### 2.4 providers

**providers** lists services available for dependency injection in this module.

**Syntax:**
```typescript
@NgModule({
  providers: [
    Service1,
    Service2
  ]
})
```

**Simple Example:**
```typescript
@NgModule({
  providers: [
    DataService,
    AuthService,
    LoggerService
  ]
})
export class AppModule { }
```

**Different Provider Formats:**
```typescript
@NgModule({
  providers: [
    // Shorthand
    DataService,
    
    // Full syntax
    { provide: DataService, useClass: DataService },
    
    // Use value
    { provide: 'API_URL', useValue: 'https://api.example.com' },
    
    // Use factory
    {
      provide: LoggerService,
      useFactory: loggerFactory,
      deps: [HttpClient]
    },
    
    // Use existing
    { provide: OldService, useExisting: NewService }
  ]
})
```

**Modern Approach (Preferred):**
```typescript
// ✓ Better: Use providedIn in service itself
@Injectable({
  providedIn: 'root'
})
export class DataService { }

// Module doesn't need to list it in providers
@NgModule({
  providers: []  // Empty
})
```

### 2.5 bootstrap

**bootstrap** defines the root component(s) that Angular creates and inserts into the index.html host web page.

**Syntax:**
```typescript
@NgModule({
  bootstrap: [RootComponent]
})
```

**Simple Example:**
```typescript
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  bootstrap: [AppComponent]  // Root component
})
export class AppModule { }
```

**Usage:**
- **Only used in root module** (AppModule)
- Usually just one component (AppComponent)
- Can have multiple bootstrap components (rare)

**Multiple Bootstrap Components (Rare):**
```typescript
@NgModule({
  bootstrap: [
    AppComponent,
    AdminComponent  // Separate app entry point
  ]
})
export class AppModule { }
```

### 2.6 exports

**exports** makes components, directives, pipes, or modules available to other modules that import this module.

**Syntax:**
```typescript
@NgModule({
  declarations: [Component1, Directive1],
  exports: [Component1, Directive1]
})
```

**Simple Example:**
```typescript
// SharedModule exports components
@NgModule({
  declarations: [
    ButtonComponent,
    CardComponent,
    HighlightDirective
  ],
  exports: [
    ButtonComponent,      // Other modules can use this
    CardComponent,        // Other modules can use this
    HighlightDirective    // Other modules can use this
  ]
})
export class SharedModule { }

// FeatureModule uses exported components
@NgModule({
  imports: [SharedModule],  // Now can use Button, Card, Highlight
  declarations: [FeatureComponent]
})
export class FeatureModule { }
```

**Exporting Modules:**
```typescript
// Can re-export entire modules
@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    CommonModule,    // Re-export
    FormsModule      // Re-export
  ]
})
export class SharedModule { }

// Now importing SharedModule gives you CommonModule and FormsModule
```

**Rules:**
- Can only export what's declared in this module or imported
- Don't need to export services (they're injected, not used in templates)

### 2.7 entryComponents (Deprecated)

**entryComponents** was used to define components not referenced in templates (deprecated in Angular 9+).

**Old Way (No Longer Needed):**
```typescript
@NgModule({
  declarations: [DynamicComponent],
  entryComponents: [DynamicComponent]  // Deprecated
})
```

**Modern Way:**
```typescript
// Just declare the component
// Angular automatically handles it
@NgModule({
  declarations: [DynamicComponent]  // That's it!
})
```

---

## 3. Root Module vs Feature Modules

### 3.1 Root Module (AppModule)

**The root module** bootstraps the application and is loaded first.

**Simple Example:**
```typescript
// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],  // Only import BrowserModule here
  bootstrap: [AppComponent]  // Bootstrap component
})
export class AppModule { }
```

**Characteristics:**
- One per application
- Uses **BrowserModule** (not CommonModule)
- Has **bootstrap** property
- Imports all necessary modules

**Complete Root Module:**
```typescript
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,           // Required
    AppRoutingModule,        // Routing
    HttpClientModule,        // HTTP
    CoreModule,              // App-wide services
    SharedModule,            // Shared components
    UserModule,              // Feature module
    ProductModule            // Feature module
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### 3.2 Feature Modules

**Feature modules** organize code by feature or functionality.

**Simple Example:**
```typescript
// user.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list.component';
import { UserDetailComponent } from './user-detail.component';

@NgModule({
  declarations: [
    UserListComponent,
    UserDetailComponent
  ],
  imports: [
    CommonModule  // Use CommonModule, not BrowserModule
  ]
})
export class UserModule { }
```

**Characteristics:**
- Multiple per application
- Uses **CommonModule** (not BrowserModule)
- No **bootstrap** property
- Focused on specific feature

### 3.3 Creating Feature Modules

**Using Angular CLI:**
```bash
ng generate module user
# or
ng g m user
```

**With routing:**
```bash
ng generate module user --routing
```

**With component:**
```bash
ng generate module user --module=app
ng generate component user/user-list
```

**Manual Creation:**
```typescript
// user/user.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserService } from './user.service';

@NgModule({
  declarations: [
    UserListComponent,
    UserDetailComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ],
  providers: [UserService]
})
export class UserModule { }
```

### 3.4 When to Create Feature Modules

**Create Feature Module When:**
- Logical grouping of related components
- Potential for lazy loading
- Code organization needed
- Team separation (different teams work on different features)

**Examples:**
```typescript
// E-commerce app
AuthModule          // Login, register, forgot password
ProductModule       // Product list, product detail
CartModule          // Shopping cart, checkout
OrderModule         // Order history, order detail
AdminModule         // Admin dashboard, user management
```

**Structure:**
```
src/app/features/
├── auth/
│   ├── auth.module.ts
│   ├── login.component.ts
│   └── register.component.ts
├── product/
│   ├── product.module.ts
│   ├── product-list.component.ts
│   └── product-detail.component.ts
└── cart/
    ├── cart.module.ts
    └── cart.component.ts
```

### 3.5 Feature Module Structure

**Complete Feature Module:**

```typescript
// product/product.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Routing
import { ProductRoutingModule } from './product-routing.module';

// Components
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductFormComponent } from './product-form/product-form.component';

// Services
import { ProductService } from './product.service';

// Shared
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductFormComponent
  ],
  imports: [
    CommonModule,           // Required
    FormsModule,           // If needed
    ProductRoutingModule,  // Feature routing
    SharedModule           // Shared components
  ],
  providers: [
    ProductService         // Feature-specific service
  ]
})
export class ProductModule { }
```

**Routing Module:**
```typescript
// product/product-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: ':id', component: ProductDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
```

---

## 4. Shared Modules

### 4.1 What are Shared Modules?

**Shared modules** contain commonly used components, directives, and pipes that are used across multiple feature modules.

**Think of it like:**
A utility toolbox with tools (components) used by many features.

**Purpose:**
- Avoid code duplication
- Centralize reusable UI components
- Share common directives and pipes
- Re-export commonly used modules

### 4.2 Creating Shared Modules

**Generate:**
```bash
ng generate module shared
```

**Simple Example:**
```typescript
// shared/shared.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Components
import { ButtonComponent } from './components/button/button.component';
import { CardComponent } from './components/card/card.component';
import { LoaderComponent } from './components/loader/loader.component';

// Directives
import { HighlightDirective } from './directives/highlight.directive';

// Pipes
import { TruncatePipe } from './pipes/truncate.pipe';

@NgModule({
  declarations: [
    // Declare here
    ButtonComponent,
    CardComponent,
    LoaderComponent,
    HighlightDirective,
    TruncatePipe
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    // Export for other modules to use
    CommonModule,
    FormsModule,
    ButtonComponent,
    CardComponent,
    LoaderComponent,
    HighlightDirective,
    TruncatePipe
  ]
})
export class SharedModule { }
```

### 4.3 What to Put in Shared Modules

**Include:**

**1. Reusable Components:**
```typescript
ButtonComponent
CardComponent
ModalComponent
LoaderComponent
AlertComponent
```

**2. Reusable Directives:**
```typescript
HighlightDirective
TooltipDirective
ClickOutsideDirective
```

**3. Reusable Pipes:**
```typescript
TruncatePipe
DateAgoPipe
FileSizePipe
```

**4. Re-exported Modules:**
```typescript
CommonModule
FormsModule
ReactiveFormsModule
```

**Example:**
```typescript
@NgModule({
  declarations: [
    ButtonComponent,
    CardComponent,
    TruncatePipe
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    // Export declarations
    ButtonComponent,
    CardComponent,
    TruncatePipe,
    // Re-export modules
    CommonModule,
    FormsModule
  ]
})
export class SharedModule { }
```

### 4.4 What NOT to Put in Shared Modules

**Avoid:**

**1. Services:**
```typescript
// ✗ Don't put services in SharedModule
// They'll create multiple instances
providers: [DataService]  // NO!

// ✓ Use providedIn: 'root' instead
@Injectable({ providedIn: 'root' })
export class DataService { }
```

**2. Feature-Specific Components:**
```typescript
// ✗ Feature-specific
UserProfileComponent
ProductDetailComponent

// ✓ Generic reusable
ButtonComponent
CardComponent
```

**3. AppComponent or Bootstrap Components:**
```typescript
// ✗ Don't export AppComponent
bootstrap: [AppComponent]
```

### 4.5 Best Practices

**1. Import Shared Module Everywhere Needed:**
```typescript
// Feature Module 1
@NgModule({
  imports: [SharedModule]
})
export class Feature1Module { }

// Feature Module 2
@NgModule({
  imports: [SharedModule]
})
export class Feature2Module { }
```

**2. Re-export Common Modules:**
```typescript
@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    CommonModule,    // Re-export
    FormsModule      // Re-export
  ]
})
export class SharedModule { }
```

**3. No Providers:**
```typescript
@NgModule({
  providers: []  // Keep empty
})
export class SharedModule { }
```

**4. Organize by Type:**
```
shared/
├── components/
│   ├── button/
│   ├── card/
│   └── modal/
├── directives/
│   ├── highlight.directive.ts
│   └── tooltip.directive.ts
├── pipes/
│   ├── truncate.pipe.ts
│   └── date-ago.pipe.ts
└── shared.module.ts
```

---

## 5. Core Modules

### 5.1 What are Core Modules?

**Core modules** contain singleton services and app-wide components used once in the application.

**Think of it like:**
The foundation of a house - built once and used by everything.

**Purpose:**
- Provide app-wide services
- Import once in AppModule
- Prevent re-import
- Keep AppModule clean

### 5.2 Creating Core Modules

**Generate:**
```bash
ng generate module core
```

**Simple Example:**
```typescript
// core/core.module.ts
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

// Services
import { AuthService } from './services/auth.service';
import { LoggerService } from './services/logger.service';
import { ErrorHandlerService } from './services/error-handler.service';

// Interceptors
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';

// Guards
import { AuthGuard } from './guards/auth.guard';

// Components (used once)
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavComponent } from './components/nav/nav.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NavComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    NavComponent
  ],
  providers: [
    AuthService,
    LoggerService,
    ErrorHandlerService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ]
})
export class CoreModule {
  // Prevent re-import
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in AppModule only.');
    }
  }
}
```

### 5.3 Preventing Re-import

**Guard against multiple imports:**

```typescript
@NgModule({
  // ...
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in AppModule only.');
    }
  }
}
```

**How it works:**
- `@Optional()`: Makes parameter optional
- `@SkipSelf()`: Skip self, look in parent
- If parent has CoreModule, throw error

**Usage:**
```typescript
// ✓ Correct: Import once
@NgModule({
  imports: [CoreModule]
})
export class AppModule { }

// ✗ Error: Will throw error
@NgModule({
  imports: [CoreModule]
})
export class FeatureModule { }  // Error!
```

### 5.4 What to Put in Core Modules

**Include:**

**1. Singleton Services:**
```typescript
AuthService
LoggerService
ErrorHandlerService
ConfigService
```

**2. HTTP Interceptors:**
```typescript
AuthInterceptor
ErrorInterceptor
LoggingInterceptor
```

**3. Route Guards:**
```typescript
AuthGuard
RoleGuard
UnsavedChangesGuard
```

**4. App-wide Components (used once):**
```typescript
HeaderComponent
FooterComponent
NavComponent
SidebarComponent
```

**5. App-wide Directives/Pipes (if any):**
```typescript
// Rare, usually go in SharedModule
```

**Structure:**
```
core/
├── services/
│   ├── auth.service.ts
│   ├── logger.service.ts
│   └── config.service.ts
├── interceptors/
│   ├── auth.interceptor.ts
│   └── error.interceptor.ts
├── guards/
│   ├── auth.guard.ts
│   └── role.guard.ts
├── components/
│   ├── header/
│   ├── footer/
│   └── nav/
└── core.module.ts
```

### 5.5 Core vs Shared

**Comparison:**

| Aspect | Core Module | Shared Module |
|--------|-------------|---------------|
| **Import** | Once in AppModule | Multiple times |
| **Services** | Yes (singletons) | No |
| **Components** | App-wide (once) | Reusable (many) |
| **Re-import** | Prevented | Allowed |
| **Purpose** | App foundation | Code reuse |

**Example:**
```typescript
// Core: Imported once
@NgModule({
  imports: [CoreModule]  // Only in AppModule
})
export class AppModule { }

// Shared: Imported many times
@NgModule({
  imports: [SharedModule]  // In many modules
})
export class Feature1Module { }

@NgModule({
  imports: [SharedModule]  // In many modules
})
export class Feature2Module { }
```

---

## 6. Lazy Loading Modules

### 6.1 What is Lazy Loading?

**Lazy loading** loads feature modules on-demand rather than at application startup.

**Think of it like:**
Streaming a video - you don't download the entire movie upfront, you load it as you watch.

**Visual:**
```
Without Lazy Loading:
[App starts] → Load ALL modules → User waits → App ready

With Lazy Loading:
[App starts] → Load core modules → App ready
[User clicks] → Load feature module → Feature ready
```

**Benefits:**
- Faster initial load
- Smaller bundle size
- Better performance
- Load only what's needed

### 6.2 Setting Up Lazy Loading

**Step 1: Create Feature Module with Routing**
```bash
ng generate module admin --route admin --module app.module
```

**Step 2: Configure Routes**
```typescript
// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  
  // Lazy load admin module
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  
  // Lazy load user module
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

**Step 3: Feature Module Routing**
```typescript
// admin/admin-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { UserManagementComponent } from './user-management.component';

const routes: Routes = [
  { path: '', component: AdminDashboardComponent },
  { path: 'users', component: UserManagementComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
```

**Step 4: Feature Module**
```typescript
// admin/admin.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { UserManagementComponent } from './user-management.component';

@NgModule({
  declarations: [
    AdminDashboardComponent,
    UserManagementComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
```

### 6.3 Lazy Loading Syntax

**Modern Syntax (Angular 8+):**
```typescript
{
  path: 'admin',
  loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
}
```

**Old Syntax (Deprecated):**
```typescript
{
  path: 'admin',
  loadChildren: './admin/admin.module#AdminModule'  // Old way
}
```

**With Route Data:**
```typescript
{
  path: 'admin',
  loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
  data: { preload: true }
}
```

**With Guards:**
```typescript
{
  path: 'admin',
  loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
  canLoad: [AuthGuard]  // Check before loading module
}
```

### 6.4 Benefits of Lazy Loading

**1. Faster Initial Load:**
```
Without Lazy Loading:
Bundle size: 5 MB
Load time: 5 seconds

With Lazy Loading:
Initial bundle: 1 MB (1 second)
Admin module: 1 MB (loaded when needed)
User module: 1 MB (loaded when needed)
etc.
```

**2. Better User Experience:**
```typescript
// User doesn't wait for features they might never use
// Faster time-to-interactive
```

**3. Optimized Bandwidth:**
```typescript
// Only download what's actually used
// Save user's data
```

**4. Better Code Organization:**
```typescript
// Clear boundaries between features
// Independent deployment (if needed)
```

### 6.5 When to Lazy Load

**Lazy Load When:**
- Feature is large
- Feature not always needed
- Feature used by specific users (admin panel)
- Feature accessed less frequently

**Don't Lazy Load When:**
- Feature is small
- Feature always needed immediately
- Feature used on every page
- Performance gain is negligible

**Example:**
```typescript
// ✓ Lazy load these
AdminModule          // Not always needed
ReportsModule        // Large, occasional use
SettingsModule       // Accessed rarely

// ✗ Don't lazy load these
SharedModule         // Used everywhere
CoreModule          // Needed immediately
HomeModule          // First page user sees
```

---

## 7. Preloading Strategies

### 7.1 What is Preloading?

**Preloading** loads lazy-loaded modules in the background after the app has loaded.

**Think of it like:**
Buffering the next video while you're watching the current one.

**Visual:**
```
[App loads] → User sees home page
    ↓
[Background] → Preload other modules
    ↓
[User navigates] → Module already loaded (instant)
```

**Benefits:**
- Fast initial load (lazy loading)
- Fast navigation (preloaded)
- Best of both worlds

### 7.2 NoPreloading (Default)

**Default strategy - no preloading:**

```typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoPreloading } from '@angular/router';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: NoPreloading  // Default
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

**Behavior:**
- Modules loaded only when user navigates to them
- Slowest navigation
- Smallest initial load

### 7.3 PreloadAllModules

**Preload all lazy-loaded modules:**

```typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreloadAllModules } from '@angular/router';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules  // Preload all
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

**Behavior:**
- All modules preloaded in background
- Fast navigation
- Larger bandwidth usage

**When to use:**
```typescript
✓ Small number of lazy modules
✓ User likely to visit all pages
✓ Good network connection expected
```

### 7.4 Custom Preloading Strategy

**Selective preloading based on custom logic:**

**Create Custom Strategy:**
```typescript
// custom-preloading-strategy.ts
import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomPreloadingStrategy implements PreloadingStrategy {
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    // Preload if route has data.preload = true
    if (route.data && route.data['preload']) {
      console.log('Preloading:', route.path);
      return load();
    }
    return of(null);
  }
}
```

**Configure Routes:**
```typescript
const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    data: { preload: true }  // Will preload
  },
  {
    path: 'reports',
    loadChildren: () => import('./reports/reports.module').then(m => m.ReportsModule),
    data: { preload: false }  // Won't preload
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule)
    // No data.preload, won't preload
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: CustomPreloadingStrategy
    })
  ]
})
export class AppRoutingModule { }
```

**Advanced: Network-based Preloading:**
```typescript
@Injectable({
  providedIn: 'root'
})
export class NetworkAwarePreloadingStrategy implements PreloadingStrategy {
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    // Check network connection
    const connection = (navigator as any).connection;
    
    if (connection) {
      // Don't preload on slow connections
      if (connection.effectiveType === '2g' || connection.effectiveType === 'slow-2g') {
        return of(null);
      }
      
      // Don't preload if user has data saver on
      if (connection.saveData) {
        return of(null);
      }
    }
    
    // Preload if marked
    if (route.data && route.data['preload']) {
      return load();
    }
    
    return of(null);
  }
}
```

### 7.5 Choosing a Strategy

**Decision Matrix:**

| Strategy | Initial Load | Navigation | Use Case |
|----------|-------------|------------|----------|
| **NoPreloading** | Fastest | Slowest | Slow connections, many modules |
| **PreloadAllModules** | Fast | Fastest | Few modules, good connections |
| **Custom** | Fast | Fast | Selective preloading |

**Recommendations:**
```typescript
// Small app (2-3 lazy modules)
preloadingStrategy: PreloadAllModules

// Medium app (4-10 lazy modules)
preloadingStrategy: CustomPreloadingStrategy
// Preload most-used modules

// Large app (10+ lazy modules)
preloadingStrategy: NoPreloading or CustomPreloadingStrategy
// Preload only critical modules
```

---

## 8. forRoot and forChild Patterns

### 8.1 What are forRoot and forChild?

**forRoot and forChild** are static methods on modules that configure them differently based on where they're imported.

**Purpose:**
- **forRoot**: Configure module with providers (once in AppModule)
- **forChild**: Use module without providers (in feature modules)

**Think of it like:**
- forRoot: Set up the main office (with all equipment)
- forChild: Use branch offices (access main office equipment)

### 8.2 forRoot Pattern

**Use forRoot to provide services once:**

**Example: RouterModule**
```typescript
// AppModule (root)
@NgModule({
  imports: [
    RouterModule.forRoot(routes)  // Provides router services
  ]
})
export class AppModule { }

// Feature Module
@NgModule({
  imports: [
    RouterModule.forChild(featureRoutes)  // Uses router services, doesn't provide
  ]
})
export class FeatureModule { }
```

**What forRoot Does:**
```typescript
// Simplified RouterModule implementation
@NgModule({ })
export class RouterModule {
  static forRoot(routes: Routes): ModuleWithProviders<RouterModule> {
    return {
      ngModule: RouterModule,
      providers: [
        RouterService,        // Provide services
        RouteResolver,
        // ... other services
        { provide: ROUTES, useValue: routes }
      ]
    };
  }
  
  static forChild(routes: Routes): ModuleWithProviders<RouterModule> {
    return {
      ngModule: RouterModule,
      providers: [
        { provide: ROUTES, useValue: routes }  // Only route config, no services
      ]
    };
  }
}
```

### 8.3 forChild Pattern

**Use forChild in feature modules:**

```typescript
// Feature module
@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'list', component: ListComponent },
      { path: ':id', component: DetailComponent }
    ])
  ]
})
export class FeatureModule { }
```

**Why?**
- Doesn't re-provide services
- Avoids multiple service instances
- Only configures routes for this module

### 8.4 Creating Your Own forRoot

**Custom Module with forRoot:**

```typescript
// my-library.module.ts
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { LibraryComponent } from './library.component';

// Services
import { LibraryService } from './library.service';

// Configuration
export interface LibraryConfig {
  apiUrl: string;
  timeout: number;
}

export const LIBRARY_CONFIG = new InjectionToken<LibraryConfig>('LibraryConfig');

@NgModule({
  declarations: [LibraryComponent],
  imports: [CommonModule],
  exports: [LibraryComponent]
})
export class MyLibraryModule {
  // For AppModule
  static forRoot(config: LibraryConfig): ModuleWithProviders<MyLibraryModule> {
    return {
      ngModule: MyLibraryModule,
      providers: [
        LibraryService,  // Provide service once
        { provide: LIBRARY_CONFIG, useValue: config }
      ]
    };
  }
  
  // For feature modules
  static forChild(): ModuleWithProviders<MyLibraryModule> {
    return {
      ngModule: MyLibraryModule,
      providers: []  // No providers
    };
  }
}
```

**Usage:**
```typescript
// AppModule
@NgModule({
  imports: [
    MyLibraryModule.forRoot({
      apiUrl: 'https://api.example.com',
      timeout: 5000
    })
  ]
})
export class AppModule { }

// Feature Module
@NgModule({
  imports: [
    MyLibraryModule.forChild()  // No config, uses root config
  ]
})
export class FeatureModule { }
```

### 8.5 Use Cases

**1. Router Configuration:**
```typescript
RouterModule.forRoot(appRoutes)    // In AppModule
RouterModule.forChild(featureRoutes) // In feature modules
```

**2. Forms Configuration:**
```typescript
// Not typically used, but could be:
FormsModule  // No forRoot/forChild, safe to import anywhere
```

**3. Store Configuration (NgRx):**
```typescript
StoreModule.forRoot(reducers)      // In AppModule
StoreModule.forFeature('users', userReducer)  // In feature modules
```

**4. HTTP Configuration:**
```typescript
HttpClientModule  // No forRoot/forChild, safe to import anywhere
```

**5. Custom Library:**
```typescript
MyLibraryModule.forRoot(config)    // In AppModule
MyLibraryModule.forChild()         // In feature modules
```

---

## 9. Module vs Standalone Components Approach

### 9.1 Module-based Architecture

**Traditional approach using NgModules:**

**Structure:**
```
app/
├── app.module.ts
├── app.component.ts
├── features/
│   ├── user/
│   │   ├── user.module.ts
│   │   ├── user.component.ts
│   │   └── user.service.ts
│   └── product/
│       ├── product.module.ts
│       ├── product.component.ts
│       └── product.service.ts
└── shared/
    ├── shared.module.ts
    └── components/
```

**Example:**
```typescript
// app.module.ts
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    UserModule,
    ProductModule,
    SharedModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

// user.module.ts
@NgModule({
  declarations: [
    UserComponent,
    UserListComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class UserModule { }

// shared.module.ts
@NgModule({
  declarations: [
    ButtonComponent,
    CardComponent
  ],
  imports: [CommonModule],
  exports: [
    ButtonComponent,
    CardComponent,
    CommonModule
  ]
})
export class SharedModule { }
```

**Characteristics:**
- Organized by modules
- Declarations required
- Imports/exports needed
- More boilerplate

### 9.2 Standalone Components Architecture

**Modern approach without NgModules (Angular 14+):**

**Structure:**
```
app/
├── app.config.ts
├── app.component.ts (standalone)
├── features/
│   ├── user/
│   │   ├── user.component.ts (standalone)
│   │   └── user.service.ts
│   └── product/
│       ├── product.component.ts (standalone)
│       └── product.service.ts
└── shared/
    └── components/
        ├── button.component.ts (standalone)
        └── card.component.ts (standalone)
```

**Example:**
```typescript
// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes)
  ]
});

// app.component.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: '<router-outlet></router-outlet>'
})
export class AppComponent { }

// user.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../shared/button.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  template: `
    <h1>User Component</h1>
    <app-button>Click me</app-button>
  `
})
export class UserComponent { }

// button.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  template: '<button><ng-content></ng-content></button>'
})
export class ButtonComponent { }

// app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'user',
    loadComponent: () => import('./features/user/user.component').then(m => m.UserComponent)
  },
  {
    path: 'product',
    loadComponent: () => import('./features/product/product.component').then(m => m.ProductComponent)
  }
];
```

**Characteristics:**
- No modules needed
- Direct imports
- Less boilerplate
- Simpler mental model

### 9.3 Comparison

**Side-by-Side:**

| Feature | Module-based | Standalone |
|---------|-------------|------------|
| **Boilerplate** | More | Less |
| **Mental Model** | Complex | Simple |
| **Imports** | Module-level | Component-level |
| **Lazy Loading** | `loadChildren` | `loadComponent` |
| **Tree Shaking** | Good | Better |
| **Learning Curve** | Steeper | Gentler |

**Code Comparison:**

**Module-based:**
```typescript
// Need module
@NgModule({
  declarations: [MyComponent],
  imports: [CommonModule]
})
export class MyModule { }

// Component
@Component({
  selector: 'app-my',
  template: '<p>Hello</p>'
})
export class MyComponent { }

// Usage: Import MyModule
```

**Standalone:**
```typescript
// Just component
@Component({
  selector: 'app-my',
  standalone: true,
  imports: [CommonModule],
  template: '<p>Hello</p>'
})
export class MyComponent { }

// Usage: Import MyComponent
```

### 9.4 Migration Path

**Gradual Migration:**

**Step 1: Create Standalone Components**
```bash
ng generate component new-component --standalone
```

**Step 2: Convert Existing Components**
```typescript
// Before
@Component({
  selector: 'app-user',
  template: '<p>User</p>'
})
export class UserComponent { }

// After
@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule],
  template: '<p>User</p>'
})
export class UserComponent { }
```

**Step 3: Use in Module (Hybrid)**
```typescript
// Standalone components can be used in modules
@NgModule({
  imports: [
    UserComponent  // Standalone component
  ]
})
export class FeatureModule { }
```

**Step 4: Convert Module to Standalone**
```typescript
// Old module
@NgModule({
  declarations: [ComponentA, ComponentB],
  imports: [CommonModule]
})
export class FeatureModule { }

// Convert to standalone components
@Component({
  standalone: true,
  imports: [CommonModule]
})
export class ComponentA { }

@Component({
  standalone: true,
  imports: [CommonModule, ComponentA]
})
export class ComponentB { }
```

**Step 5: Remove AppModule (Optional)**
```typescript
// Replace bootstrapModule with bootstrapApplication
// in main.ts
```

### 9.5 Which to Choose?

**Use Standalone When:**
- ✓ Starting new project (Angular 14+)
- ✓ Want simpler architecture
- ✓ Less boilerplate desired
- ✓ Better tree-shaking needed

**Use Modules When:**
- ✓ Existing large codebase
- ✓ Team familiar with modules
- ✓ Angular version < 14
- ✓ Complex module patterns needed

**Recommendation:**
```typescript
// New projects (2023+)
→ Use Standalone Components

// Existing projects
→ Gradual migration or stay with modules

// Libraries
→ Support both (provide standalone + module versions)
```

**Future:**
```
Angular is moving toward standalone as the default.
Modules will still be supported but standalone is the future.
```

---

## Summary

You've mastered **Angular Modules**!

**Key Concepts:**

**1. NgModule Decorator:**
- **declarations**: Components, directives, pipes
- **imports**: Other modules
- **providers**: Services
- **exports**: Make available to other modules
- **bootstrap**: Root component (AppModule only)

**2. Module Types:**
- **Root Module**: AppModule (bootstraps app)
- **Feature Modules**: Organize by feature
- **Shared Module**: Reusable components
- **Core Module**: Singleton services (import once)

**3. Lazy Loading:**
- Load modules on-demand
- Faster initial load
- Use `loadChildren` in routes
- Smaller bundle size

**4. Preloading Strategies:**
- **NoPreloading**: Load on navigation
- **PreloadAllModules**: Preload all
- **Custom**: Selective preloading

**5. forRoot/forChild:**
- **forRoot**: Configure with providers (AppModule)
- **forChild**: Use without providers (feature modules)
- Prevents duplicate service instances

**6. Module vs Standalone:**
- **Modules**: Traditional, complex
- **Standalone**: Modern, simpler
- Can coexist during migration

**Module Checklist:**
```typescript
1. Create module: ng g m feature
2. Define declarations
3. Import dependencies
4. Export public API
5. Configure routing (if needed)
6. Import in AppModule
```

**Best Practices:**
- One module per feature
- Use SharedModule for reusables
- Use CoreModule for singletons
- Lazy load large features
- Prefer standalone for new code
- Keep modules focused
- Document module purpose

**Common Patterns:**
```typescript
// Feature module
@NgModule({
  declarations: [Components],
  imports: [CommonModule, SharedModule],
  providers: [FeatureService]
})

// Shared module
@NgModule({
  declarations: [ReusableComponents],
  imports: [CommonModule],
  exports: [ReusableComponents, CommonModule]
})

// Core module (prevent re-import)
@NgModule({
  providers: [SingletonServices]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parent: CoreModule) {
    if (parent) throw new Error('Import once only');
  }
}

// Lazy loading
{
  path: 'feature',
  loadChildren: () => import('./feature/feature.module')
    .then(m => m.FeatureModule)
}

// Standalone component
@Component({
  standalone: true,
  imports: [CommonModule, OtherComponents]
})
```

Master these module concepts to build well-organized, maintainable, and performant Angular applications!
