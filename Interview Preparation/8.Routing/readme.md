# Angular Routing and Navigation
## Index

1. [Introduction to Routing](#1-introduction-to-routing)
   - 1.1 [What is Routing?](#11-what-is-routing)
   - 1.2 [Why Use Routing?](#12-why-use-routing)
   - 1.3 [Basic Concepts](#13-basic-concepts)

2. [Router Configuration](#2-router-configuration)
   - 2.1 [Route Definition](#21-route-definition)
   - 2.2 [Route Properties](#22-route-properties)
   - 2.3 [Wildcard Routes](#23-wildcard-routes)
   - 2.4 [Redirect Routes](#24-redirect-routes)
   - 2.5 [Route Order](#25-route-order)

3. [RouterModule Setup](#3-routermodule-setup)
   - 3.1 [Setting Up Routes](#31-setting-up-routes)
   - 3.2 [forRoot vs forChild](#32-forroot-vs-forchild)
   - 3.3 [App Routing Module](#33-app-routing-module)
   - 3.4 [Feature Routing Modules](#34-feature-routing-modules)

4. [Router Outlet](#4-router-outlet)
   - 4.1 [Primary Router Outlet](#41-primary-router-outlet)
   - 4.2 [Named Router Outlets](#42-named-router-outlets)
   - 4.3 [Multiple Router Outlets](#43-multiple-router-outlets)

5. [Route Parameters](#5-route-parameters)
   - 5.1 [Required Parameters](#51-required-parameters)
   - 5.2 [Optional Parameters](#52-optional-parameters)
   - 5.3 [Accessing Route Parameters](#53-accessing-route-parameters)
   - 5.4 [Parameter Observables](#54-parameter-observables)

6. [Query Parameters](#6-query-parameters)
   - 6.1 [Setting Query Parameters](#61-setting-query-parameters)
   - 6.2 [Reading Query Parameters](#62-reading-query-parameters)
   - 6.3 [Query Params Handling](#63-query-params-handling)

7. [Route Guards](#7-route-guards)
   - 7.1 [CanActivate Guard](#71-canactivate-guard)
   - 7.2 [CanDeactivate Guard](#72-candeactivate-guard)
   - 7.3 [CanLoad Guard](#73-canload-guard)
   - 7.4 [CanActivateChild Guard](#74-canactivatechild-guard)
   - 7.5 [Resolve Guard](#75-resolve-guard)

8. [Child Routes and Nested Routing](#8-child-routes-and-nested-routing)
   - 8.1 [Defining Child Routes](#81-defining-child-routes)
   - 8.2 [Nested Router Outlets](#82-nested-router-outlets)
   - 8.3 [Multi-Level Nesting](#83-multi-level-nesting)

9. [Lazy Loading Routes](#9-lazy-loading-routes)
   - 9.1 [Setting Up Lazy Loading](#91-setting-up-lazy-loading)
   - 9.2 [Lazy Loading Syntax](#92-lazy-loading-syntax)
   - 9.3 [Lazy Loading with Guards](#93-lazy-loading-with-guards)

10. [Preloading Strategies](#10-preloading-strategies)
    - 10.1 [PreloadAllModules](#101-preloadallmodules)
    - 10.2 [Custom Preloading Strategy](#102-custom-preloading-strategy)
    - 10.3 [Conditional Preloading](#103-conditional-preloading)

11. [Router Events](#11-router-events)
    - 11.1 [Navigation Events](#111-navigation-events)
    - 11.2 [Listening to Events](#112-listening-to-events)
    - 11.3 [Loading Indicators](#113-loading-indicators)

12. [Navigation Extras and State](#12-navigation-extras-and-state)
    - 12.1 [Navigation Extras](#121-navigation-extras)
    - 12.2 [State Object](#122-state-object)
    - 12.3 [Preserve Query Params](#123-preserve-query-params)

13. [Hash vs Path Location Strategy](#13-hash-vs-path-location-strategy)
    - 13.1 [PathLocationStrategy (Default)](#131-pathlocationstrategy-default)
    - 13.2 [HashLocationStrategy](#132-hashlocationstrategy)
    - 13.3 [Choosing a Strategy](#133-choosing-a-strategy)

14. [Functional Guards (Angular 15+)](#14-functional-guards-angular-15)
    - 14.1 [Creating Functional Guards](#141-creating-functional-guards)
    - 14.2 [Functional CanActivate](#142-functional-canactivate)
    - 14.3 [Functional Resolve](#143-functional-resolve)
    - 14.4 [Benefits of Functional Guards](#144-benefits-of-functional-guards)

---

## 1. Introduction to Routing

### 1.1 What is Routing?

**Routing** is the mechanism that allows navigation between different views/pages in a single-page application (SPA).

**Think of it like:**
A GPS system that shows different destinations (components) based on the address (URL) you enter.

**Simple Example:**
```
URL: /home      → Shows HomeComponent
URL: /about     → Shows AboutComponent
URL: /products  → Shows ProductsComponent
```

**Key Points:**
- Changes URL without page reload
- Maps URLs to components
- Enables browser back/forward buttons
- Supports bookmarking

### 1.2 Why Use Routing?

**1. Single Page Application (SPA):**
```typescript
// Traditional multi-page app
/home.html → Server request → New page load
/about.html → Server request → New page load

// Angular SPA with routing
/home → Client-side navigation → Instant
/about → Client-side navigation → Instant
```

**2. Better User Experience:**
- No page flicker
- Faster navigation
- Smooth transitions

**3. State Management:**
- URL represents app state
- Shareable links
- Browser history works

**4. Code Organization:**
- Separate concerns
- Lazy loading
- Feature modules

### 1.3 Basic Concepts

**Core Concepts:**

```
Router → Manages navigation
Routes → Configuration (URL to component mapping)
RouterModule → Angular routing module
RouterOutlet → Placeholder where components are displayed
RouterLink → Navigation directive
ActivatedRoute → Current route information
```

**Visual Flow:**
```
User clicks link → Router checks routes → Finds match → 
Displays component in RouterOutlet
```

---

## 2. Router Configuration

### 2.1 Route Definition

**Routes are defined as an array of route objects:**

**Basic Syntax:**
```typescript
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent }
];
```

**Simple Example:**
```typescript
import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { AboutComponent } from './about.component';
import { ContactComponent } from './contact.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent }
];
```

### 2.2 Route Properties

**Common Route Properties:**

```typescript
const routes: Routes = [
  {
    path: 'users',              // URL path
    component: UsersComponent,  // Component to display
    data: { title: 'Users' },  // Static data
    canActivate: [AuthGuard],  // Guards
    children: [],              // Child routes
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  }
];
```

**Property Explanation:**

| Property | Description | Example |
|----------|-------------|---------|
| **path** | URL segment | `'users'` |
| **component** | Component to display | `UsersComponent` |
| **redirectTo** | Redirect path | `'/home'` |
| **pathMatch** | How to match | `'full'` or `'prefix'` |
| **children** | Child routes | `[...]` |
| **loadChildren** | Lazy load module | `() => import(...)` |
| **data** | Static data | `{ title: 'Page' }` |
| **canActivate** | Activation guards | `[AuthGuard]` |
| **canDeactivate** | Deactivation guards | `[UnsavedChangesGuard]` |
| **resolve** | Pre-fetch data | `{ user: UserResolver }` |

### 2.3 Wildcard Routes

**Catch-all route for 404 pages:**

```typescript
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', component: PageNotFoundComponent }  // Wildcard (must be last)
];
```

**Important:**
- Must be the **last** route
- Matches any URL
- Used for 404 pages

**Example:**
```typescript
// page-not-found.component.ts
@Component({
  selector: 'app-page-not-found',
  template: `
    <h1>404 - Page Not Found</h1>
    <p>The page you're looking for doesn't exist.</p>
    <a routerLink="/home">Go Home</a>
  `
})
export class PageNotFoundComponent { }
```

### 2.4 Redirect Routes

**Redirect from one path to another:**

```typescript
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent }
];
```

**pathMatch Options:**

**1. 'full' - Exact match:**
```typescript
{ path: '', redirectTo: '/home', pathMatch: 'full' }
// '' → Redirects to /home
// 'abc' → No redirect
```

**2. 'prefix' - Starts with:**
```typescript
{ path: 'old', redirectTo: '/new', pathMatch: 'prefix' }
// 'old' → Redirects to /new
// 'old/page' → Redirects to /new/page
```

**Common Redirects:**
```typescript
const routes: Routes = [
  // Default route
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  
  // Legacy routes
  { path: 'old-about', redirectTo: '/about', pathMatch: 'full' },
  
  // Alias
  { path: 'products', redirectTo: '/catalog', pathMatch: 'full' }
];
```

### 2.5 Route Order

**Routes are matched in order - first match wins:**

```typescript
// ✗ Bad: Specific route after wildcard
const routes: Routes = [
  { path: '**', component: PageNotFoundComponent },
  { path: 'users', component: UsersComponent }  // Never reached!
];

// ✓ Good: Specific routes first
const routes: Routes = [
  { path: 'users', component: UsersComponent },
  { path: 'users/:id', component: UserDetailComponent },
  { path: '**', component: PageNotFoundComponent }
];
```

**Order Rules:**
1. Static routes first
2. Parameterized routes second
3. Wildcard route last

**Example:**
```typescript
const routes: Routes = [
  // 1. Exact matches
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  
  // 2. Static paths
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  
  // 3. Parameterized paths
  { path: 'users/:id', component: UserDetailComponent },
  { path: 'products/:id', component: ProductDetailComponent },
  
  // 4. Wildcard (last!)
  { path: '**', component: PageNotFoundComponent }
];
```

---

## 3. RouterModule Setup

### 3.1 Setting Up Routes

**Import RouterModule and configure routes:**

```typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { AboutComponent } from './about.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

### 3.2 forRoot vs forChild

**forRoot - Use in AppModule:**
```typescript
// app-routing.module.ts
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

**forChild - Use in feature modules:**
```typescript
// user-routing.module.ts
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
```

**Why?**
- `forRoot()` registers router service (once)
- `forChild()` registers routes only (multiple times)

### 3.3 App Routing Module

**Complete app routing module:**

```typescript
// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

**Import in AppModule:**
```typescript
// app.module.ts
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule  // Import routing module
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### 3.4 Feature Routing Modules

**Feature module with routing:**

```typescript
// user-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';

const routes: Routes = [
  { path: '', component: UserListComponent },
  { path: ':id', component: UserDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
```

**Feature module:**
```typescript
// user.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';

@NgModule({
  declarations: [
    UserListComponent,
    UserDetailComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule  // Import feature routing
  ]
})
export class UserModule { }
```

**App routing with feature:**
```typescript
// app-routing.module.ts
const routes: Routes = [
  { path: 'users', loadChildren: () => import('./user/user.module').then(m => m.UserModule) }
];
```

---

## 4. Router Outlet

### 4.1 Primary Router Outlet

**`<router-outlet>` is where routed components are displayed:**

```typescript
// app.component.html
<nav>
  <a routerLink="/home">Home</a>
  <a routerLink="/about">About</a>
</nav>

<router-outlet></router-outlet>

<footer>
  <p>Footer content</p>
</footer>
```

**How it works:**
```
URL: /home
<router-outlet></router-outlet> → Replaced with HomeComponent

URL: /about
<router-outlet></router-outlet> → Replaced with AboutComponent
```

**Complete Example:**
```typescript
// app.component.ts
@Component({
  selector: 'app-root',
  template: `
    <header>
      <h1>My App</h1>
      <nav>
        <a routerLink="/home" routerLinkActive="active">Home</a>
        <a routerLink="/about" routerLinkActive="active">About</a>
        <a routerLink="/contact" routerLinkActive="active">Contact</a>
      </nav>
    </header>
    
    <main>
      <router-outlet></router-outlet>
    </main>
    
    <footer>
      <p>&copy; 2026 My App</p>
    </footer>
  `,
  styles: [`
    .active { font-weight: bold; color: blue; }
  `]
})
export class AppComponent { }
```

### 4.2 Named Router Outlets

**Multiple outlets with names:**

```typescript
// app.component.html
<div class="container">
  <div class="main">
    <router-outlet></router-outlet>  <!-- Primary outlet -->
  </div>
  
  <div class="sidebar">
    <router-outlet name="sidebar"></router-outlet>  <!-- Named outlet -->
  </div>
</div>
```

**Route configuration:**
```typescript
const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: HomeSidebarComponent,
        outlet: 'sidebar'
      }
    ]
  }
];
```

**Navigation:**
```html
<a [routerLink]="[{ outlets: { primary: 'home', sidebar: 'info' } }]">
  Home with Sidebar
</a>
```

### 4.3 Multiple Router Outlets

**Complex layout with multiple outlets:**

```typescript
// app.component.html
<div class="layout">
  <header>
    <router-outlet name="header"></router-outlet>
  </header>
  
  <main>
    <router-outlet></router-outlet>  <!-- Primary -->
  </main>
  
  <aside>
    <router-outlet name="sidebar"></router-outlet>
  </aside>
  
  <footer>
    <router-outlet name="footer"></router-outlet>
  </footer>
</div>
```

**Routes:**
```typescript
const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: '', component: HeaderComponent, outlet: 'header' },
      { path: '', component: SidebarComponent, outlet: 'sidebar' },
      { path: '', component: FooterComponent, outlet: 'footer' }
    ]
  }
];
```

---

## 5. Route Parameters

### 5.1 Required Parameters

**Parameters in the URL path:**

**Define route:**
```typescript
const routes: Routes = [
  { path: 'users/:id', component: UserDetailComponent }
];
```

**Navigate:**
```html
<a routerLink="/users/123">User 123</a>
<a [routerLink]="['/users', userId]">User Details</a>
```

```typescript
// Programmatic navigation
this.router.navigate(['/users', userId]);
```

**Example:**
```
URL: /users/123
Parameter: id = 123
```

### 5.2 Optional Parameters

**Matrix URL notation:**

```typescript
// Navigate with optional params
this.router.navigate(['/users', { page: 1, sort: 'name' }]);

// URL: /users;page=1;sort=name
```

**Example:**
```html
<a [routerLink]="['/users', { page: 2, sort: 'age' }]">
  Sorted Users
</a>
```

### 5.3 Accessing Route Parameters

**Using ActivatedRoute:**

```typescript
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  template: '<h1>User {{ userId }}</h1>'
})
export class UserDetailComponent implements OnInit {
  userId: string;
  
  constructor(private route: ActivatedRoute) { }
  
  ngOnInit() {
    // Snapshot (one-time read)
    this.userId = this.route.snapshot.paramMap.get('id');
  }
}
```

**Get all parameters:**
```typescript
ngOnInit() {
  const params = this.route.snapshot.paramMap;
  
  const id = params.get('id');
  const name = params.get('name');
  
  console.log('ID:', id);
  console.log('Name:', name);
}
```

### 5.4 Parameter Observables

**Subscribe to parameter changes:**

```typescript
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-detail',
  template: '<h1>User {{ userId }}</h1>'
})
export class UserDetailComponent implements OnInit, OnDestroy {
  userId: string;
  private subscription: Subscription;
  
  constructor(private route: ActivatedRoute) { }
  
  ngOnInit() {
    // Observable (reacts to changes)
    this.subscription = this.route.paramMap.subscribe(params => {
      this.userId = params.get('id');
      console.log('User ID changed to:', this.userId);
      this.loadUser();
    });
  }
  
  loadUser() {
    // Load user data based on userId
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
```

**When to use each:**
```typescript
// Snapshot: Component won't be reused
this.userId = this.route.snapshot.paramMap.get('id');

// Observable: Component might be reused (same component, different params)
this.route.paramMap.subscribe(params => {
  this.userId = params.get('id');
});
```

---

## 6. Query Parameters

### 6.1 Setting Query Parameters

**Add query parameters to URLs:**

**Template:**
```html
<!-- Static -->
<a routerLink="/products" [queryParams]="{ category: 'electronics', page: 1 }">
  Products
</a>

<!-- Dynamic -->
<a [routerLink]="['/products']" 
   [queryParams]="{ search: searchTerm, page: currentPage }">
  Search
</a>
```

**Component:**
```typescript
// Programmatic navigation
this.router.navigate(['/products'], {
  queryParams: { category: 'electronics', page: 1 }
});
```

**Result:**
```
URL: /products?category=electronics&page=1
```

### 6.2 Reading Query Parameters

**Access query parameters:**

```typescript
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  template: `
    <h1>Products</h1>
    <p>Category: {{ category }}</p>
    <p>Page: {{ page }}</p>
  `
})
export class ProductsComponent implements OnInit {
  category: string;
  page: number;
  
  constructor(private route: ActivatedRoute) { }
  
  ngOnInit() {
    // Snapshot
    this.category = this.route.snapshot.queryParamMap.get('category');
    this.page = +this.route.snapshot.queryParamMap.get('page');
    
    // Observable (for updates)
    this.route.queryParamMap.subscribe(params => {
      this.category = params.get('category');
      this.page = +params.get('page');
      this.loadProducts();
    });
  }
  
  loadProducts() {
    console.log(`Loading ${this.category} products, page ${this.page}`);
  }
}
```

### 6.3 Query Params Handling

**Merge or preserve query params:**

```typescript
// Replace all query params
this.router.navigate(['/products'], {
  queryParams: { page: 2 }
});

// Merge with existing params
this.router.navigate(['/products'], {
  queryParams: { page: 2 },
  queryParamsHandling: 'merge'  // Preserve existing params
});

// Preserve all existing params
this.router.navigate(['/products'], {
  queryParamsHandling: 'preserve'
});
```

**Example:**
```typescript
// Current URL: /products?category=electronics&sort=price

// Replace
this.router.navigate(['/products'], {
  queryParams: { page: 2 }
});
// Result: /products?page=2

// Merge
this.router.navigate(['/products'], {
  queryParams: { page: 2 },
  queryParamsHandling: 'merge'
});
// Result: /products?category=electronics&sort=price&page=2
```

---

## 7. Route Guards

### 7.1 CanActivate Guard

**Prevent unauthorized access to routes:**

**Create Guard:**
```bash
ng generate guard auth
```

**Guard Implementation:**
```typescript
// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.authService.isLoggedIn()) {
      return true;  // Allow access
    }
    
    // Redirect to login
    this.router.navigate(['/login']);
    return false;  // Deny access
  }
}
```

**Apply Guard:**
```typescript
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]  // Protected route
  }
];
```

**With Role Check:**
```typescript
@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService) { }
  
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const requiredRole = route.data['role'];
    
    if (this.authService.hasRole(requiredRole)) {
      return true;
    }
    
    return false;
  }
}
```

**Route with role:**
```typescript
{
  path: 'admin',
  component: AdminComponent,
  canActivate: [AuthGuard, RoleGuard],
  data: { role: 'admin' }
}
```

### 7.2 CanDeactivate Guard

**Warn before leaving unsaved changes:**

**Interface:**
```typescript
// can-deactivate.interface.ts
export interface CanComponentDeactivate {
  canDeactivate: () => boolean | Promise<boolean>;
}
```

**Guard:**
```typescript
// unsaved-changes.guard.ts
import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { CanComponentDeactivate } from './can-deactivate.interface';

@Injectable({
  providedIn: 'root'
})
export class UnsavedChangesGuard implements CanDeactivate<CanComponentDeactivate> {
  canDeactivate(component: CanComponentDeactivate): boolean | Promise<boolean> {
    return component.canDeactivate ? component.canDeactivate() : true;
  }
}
```

**Component:**
```typescript
// edit.component.ts
import { Component } from '@angular/core';
import { CanComponentDeactivate } from './can-deactivate.interface';

@Component({
  selector: 'app-edit',
  template: `
    <h1>Edit Form</h1>
    <form>
      <input [(ngModel)]="name" name="name">
      <button (click)="save()">Save</button>
    </form>
  `
})
export class EditComponent implements CanComponentDeactivate {
  name = '';
  isSaved = false;
  
  save() {
    this.isSaved = true;
  }
  
  canDeactivate(): boolean {
    if (!this.isSaved && this.name) {
      return confirm('You have unsaved changes. Do you want to leave?');
    }
    return true;
  }
}
```

**Route:**
```typescript
{
  path: 'edit/:id',
  component: EditComponent,
  canDeactivate: [UnsavedChangesGuard]
}
```

### 7.3 CanLoad Guard

**Prevent loading lazy modules:**

```typescript
// auth-can-load.guard.ts
import { Injectable } from '@angular/core';
import { CanLoad, Route, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthCanLoadGuard implements CanLoad {
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }
  
  canLoad(route: Route): boolean {
    if (this.authService.isLoggedIn()) {
      return true;  // Load module
    }
    
    this.router.navigate(['/login']);
    return false;  // Don't load module
  }
}
```

**Route:**
```typescript
{
  path: 'admin',
  loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
  canLoad: [AuthCanLoadGuard]  // Check before loading
}
```

**CanActivate vs CanLoad:**
```typescript
// CanActivate: Module loaded, but route not activated
// CanLoad: Module not loaded at all (better for security/performance)
```

### 7.4 CanActivateChild Guard

**Protect child routes:**

```typescript
// parent-auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ParentAuthGuard implements CanActivateChild {
  constructor(private authService: AuthService) { }
  
  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.authService.isLoggedIn();
  }
}
```

**Route:**
```typescript
{
  path: 'admin',
  component: AdminComponent,
  canActivateChild: [ParentAuthGuard],  // Protects all children
  children: [
    { path: 'users', component: UsersComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'settings', component: SettingsComponent }
  ]
}
```

### 7.5 Resolve Guard

**Pre-fetch data before activating route:**

```typescript
// user-resolver.ts
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<User> {
  constructor(private userService: UserService) { }
  
  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    const id = route.paramMap.get('id');
    return this.userService.getUser(id);
  }
}
```

**Route:**
```typescript
{
  path: 'user/:id',
  component: UserDetailComponent,
  resolve: { user: UserResolver }  // Pre-fetch user data
}
```

**Component:**
```typescript
// user-detail.component.ts
@Component({
  selector: 'app-user-detail',
  template: `
    <h1>{{ user.name }}</h1>
    <p>{{ user.email }}</p>
  `
})
export class UserDetailComponent implements OnInit {
  user: User;
  
  constructor(private route: ActivatedRoute) { }
  
  ngOnInit() {
    // Data already loaded by resolver
    this.user = this.route.snapshot.data['user'];
  }
}
```

---

## 8. Child Routes and Nested Routing

### 8.1 Defining Child Routes

**Child routes create nested navigation:**

```typescript
const routes: Routes = [
  {
    path: 'products',
    component: ProductsComponent,
    children: [
      { path: '', component: ProductListComponent },
      { path: ':id', component: ProductDetailComponent },
      { path: ':id/edit', component: ProductEditComponent }
    ]
  }
];
```

**URLs:**
```
/products → ProductsComponent + ProductListComponent
/products/123 → ProductsComponent + ProductDetailComponent
/products/123/edit → ProductsComponent + ProductEditComponent
```

### 8.2 Nested Router Outlets

**Parent component with child outlet:**

```typescript
// products.component.ts
@Component({
  selector: 'app-products',
  template: `
    <div class="products-container">
      <h1>Products</h1>
      <nav>
        <a routerLink="/products">List</a>
      </nav>
      
      <!-- Child components displayed here -->
      <router-outlet></router-outlet>
    </div>
  `
})
export class ProductsComponent { }
```

**Complete Example:**
```typescript
// Routes
const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'overview', component: OverviewComponent },
      { path: 'stats', component: StatsComponent },
      { path: 'settings', component: SettingsComponent }
    ]
  }
];

// dashboard.component.ts
@Component({
  selector: 'app-dashboard',
  template: `
    <div class="dashboard">
      <aside>
        <nav>
          <a routerLink="overview" routerLinkActive="active">Overview</a>
          <a routerLink="stats" routerLinkActive="active">Stats</a>
          <a routerLink="settings" routerLinkActive="active">Settings</a>
        </nav>
      </aside>
      
      <main>
        <router-outlet></router-outlet>
      </main>
    </div>
  `
})
export class DashboardComponent { }
```

### 8.3 Multi-Level Nesting

**Multiple levels of nested routes:**

```typescript
const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: 'users',
        component: UsersComponent,
        children: [
          { path: '', component: UserListComponent },
          { path: ':id', component: UserDetailComponent }
        ]
      },
      {
        path: 'products',
        component: ProductsComponent,
        children: [
          { path: '', component: ProductListComponent },
          { path: ':id', component: ProductDetailComponent }
        ]
      }
    ]
  }
];
```

**Structure:**
```
AdminComponent (router-outlet)
├── UsersComponent (router-outlet)
│   ├── UserListComponent
│   └── UserDetailComponent
└── ProductsComponent (router-outlet)
    ├── ProductListComponent
    └── ProductDetailComponent
```

**URLs:**
```
/admin/users → AdminComponent + UsersComponent + UserListComponent
/admin/users/123 → AdminComponent + UsersComponent + UserDetailComponent
/admin/products → AdminComponent + ProductsComponent + ProductListComponent
```

---

## 9. Lazy Loading Routes

### 9.1 Setting Up Lazy Loading

**Create feature module:**
```bash
ng generate module admin --route admin --module app.module
```

**Feature module:**
```typescript
// admin.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';

@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
```

**Feature routing:**
```typescript
// admin-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  { path: '', component: AdminComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
```

### 9.2 Lazy Loading Syntax

**App routing with lazy loading:**

```typescript
// app-routing.module.ts
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  
  // Lazy load admin module
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  
  // Lazy load user module
  {
    path: 'users',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  }
];
```

**Standalone component lazy loading:**
```typescript
{
  path: 'about',
  loadComponent: () => import('./about/about.component').then(m => m.AboutComponent)
}
```

### 9.3 Lazy Loading with Guards

**Protect lazy-loaded routes:**

```typescript
const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canLoad: [AuthGuard],      // Check before loading
    canActivate: [RoleGuard]   // Check before activating
  }
];
```

---

## 10. Preloading Strategies

### 10.1 PreloadAllModules

**Preload all lazy modules in background:**

```typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
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

### 10.2 Custom Preloading Strategy

**Selective preloading:**

```typescript
// custom-preloading.strategy.ts
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

**Configure routes:**
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

### 10.3 Conditional Preloading

**Network-aware preloading:**

```typescript
@Injectable({ providedIn: 'root' })
export class NetworkAwarePreloadingStrategy implements PreloadingStrategy {
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    const connection = (navigator as any).connection;
    
    // Don't preload on slow connections
    if (connection && (connection.effectiveType === '2g' || connection.saveData)) {
      return of(null);
    }
    
    // Preload if marked
    if (route.data && route.data['preload']) {
      return load();
    }
    
    return of(null);
  }
}
```

---

## 11. Router Events

### 11.1 Navigation Events

**Router emits events during navigation:**

```typescript
NavigationStart       // Navigation starts
RouteConfigLoadStart  // Lazy route config loading starts
RouteConfigLoadEnd    // Lazy route config loading ends
RoutesRecognized      // Routes recognized
GuardsCheckStart      // Guards check starts
GuardsCheckEnd        // Guards check ends
ResolveStart          // Resolvers start
ResolveEnd            // Resolvers end
NavigationEnd         // Navigation ends
NavigationCancel      // Navigation cancelled
NavigationError       // Navigation error
```

### 11.2 Listening to Events

**Subscribe to router events:**

```typescript
import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {
  constructor(private router: Router) { }
  
  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        console.log('Navigation started:', event.url);
      }
      
      if (event instanceof NavigationEnd) {
        console.log('Navigation ended:', event.url);
      }
    });
  }
}
```

**Filter specific events:**
```typescript
ngOnInit() {
  this.router.events.pipe(
    filter(event => event instanceof NavigationEnd)
  ).subscribe((event: NavigationEnd) => {
    console.log('Navigated to:', event.url);
    this.trackPageView(event.url);
  });
}
```

### 11.3 Loading Indicators

**Show loader during navigation:**

```typescript
import { Component } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
    <div *ngIf="loading" class="loader">Loading...</div>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  loading = false;
  
  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.loading = true;
      }
      
      if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        this.loading = false;
      }
    });
  }
}
```

---

## 12. Navigation Extras and State

### 12.1 Navigation Extras

**Additional navigation options:**

```typescript
this.router.navigate(['/users'], {
  queryParams: { page: 1 },
  queryParamsHandling: 'merge',
  fragment: 'top',
  preserveFragment: true,
  skipLocationChange: false,
  replaceUrl: false,
  state: { customData: 'value' }
});
```

**Options:**

| Option | Description |
|--------|-------------|
| `queryParams` | Set query parameters |
| `queryParamsHandling` | 'merge' or 'preserve' |
| `fragment` | URL fragment (#section) |
| `preserveFragment` | Keep existing fragment |
| `skipLocationChange` | Don't update URL |
| `replaceUrl` | Replace history instead of push |
| `state` | Pass hidden state |

### 12.2 State Object

**Pass data without URL:**

```typescript
// Navigate with state
this.router.navigate(['/details'], {
  state: { user: { name: 'John', age: 25 } }
});

// Read state in target component
export class DetailsComponent implements OnInit {
  user: any;
  
  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.user = navigation?.extras?.state?.['user'];
  }
  
  // Or use window.history
  ngOnInit() {
    this.user = window.history.state.user;
  }
}
```

### 12.3 Preserve Query Params

**Keep query params across navigation:**

```typescript
// Current URL: /products?category=electronics&page=2

// Preserve all params
this.router.navigate(['/details', 123], {
  queryParamsHandling: 'preserve'
});
// Result: /details/123?category=electronics&page=2

// Merge new params
this.router.navigate(['/details', 123], {
  queryParams: { sort: 'price' },
  queryParamsHandling: 'merge'
});
// Result: /details/123?category=electronics&page=2&sort=price
```

---

## 13. Hash vs Path Location Strategy

### 13.1 PathLocationStrategy (Default)

**Clean URLs using HTML5 pushState:**

```typescript
// URLs look like:
http://example.com/home
http://example.com/products/123
```

**Configuration (default):**
```typescript
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: []  // PathLocationStrategy is default
})
export class AppRoutingModule { }
```

**Requires server configuration:**
```
All routes must return index.html
```

### 13.2 HashLocationStrategy

**URLs with hash (#):**

```typescript
// URLs look like:
http://example.com/#/home
http://example.com/#/products/123
```

**Configuration:**
```typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true  // Enable hash location strategy
    })
  ]
})
export class AppRoutingModule { }
```

**No server configuration needed:**
```
Server always returns index.html for /
```

### 13.3 Choosing a Strategy

**PathLocationStrategy (Recommended):**
```typescript
✓ Clean URLs
✓ Better SEO
✓ Modern approach
✗ Requires server configuration
```

**HashLocationStrategy:**
```typescript
✓ Works on all servers
✓ No server configuration needed
✗ Ugly URLs with #
✗ Worse SEO
```

**Use HashLocationStrategy when:**
- No server configuration access
- Static file hosting
- Legacy browser support

**Server Configuration for PathLocationStrategy:**

**Apache (.htaccess):**
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

**Nginx:**
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

---

## 14. Functional Guards (Angular 15+)

### 14.1 Creating Functional Guards

**Modern approach using functions instead of classes:**

**Old Way (Class-based):**
```typescript
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  canActivate(): boolean {
    return true;
  }
}
```

**New Way (Functional):**
```typescript
// auth.guard.ts
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  if (authService.isLoggedIn()) {
    return true;
  }
  
  router.navigate(['/login']);
  return false;
};
```

### 14.2 Functional CanActivate

**Simple functional guard:**

```typescript
// auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  if (authService.isLoggedIn()) {
    return true;
  }
  
  // Store attempted URL for redirect after login
  router.navigate(['/login'], {
    queryParams: { returnUrl: state.url }
  });
  return false;
};
```

**Usage:**
```typescript
const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard]  // Use functional guard
  }
];
```

**Role-based guard:**
```typescript
// role.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const roleGuard = (requiredRole: string): CanActivateFn => {
  return (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);
    
    if (authService.hasRole(requiredRole)) {
      return true;
    }
    
    router.navigate(['/unauthorized']);
    return false;
  };
};
```

**Usage:**
```typescript
const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [authGuard, roleGuard('admin')]
  }
];
```

### 14.3 Functional Resolve

**Data resolver function:**

```typescript
// user.resolver.ts
import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { UserService } from './user.service';
import { User } from './user.model';

export const userResolver: ResolveFn<User> = (route, state) => {
  const userService = inject(UserService);
  const id = route.paramMap.get('id');
  return userService.getUser(id);
};
```

**Usage:**
```typescript
const routes: Routes = [
  {
    path: 'user/:id',
    component: UserDetailComponent,
    resolve: { user: userResolver }
  }
];
```

**Component:**
```typescript
export class UserDetailComponent implements OnInit {
  user: User;
  
  constructor(private route: ActivatedRoute) { }
  
  ngOnInit() {
    this.user = this.route.snapshot.data['user'];
  }
}
```

### 14.4 Benefits of Functional Guards

**Advantages:**

**1. Less Boilerplate:**
```typescript
// Class-based: ~15 lines
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }
  
  canActivate(): boolean {
    return this.authService.isLoggedIn();
  }
}

// Functional: ~7 lines
export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  return authService.isLoggedIn();
};
```

**2. Better Tree-shaking:**
```typescript
// Unused guards are removed from bundle
```

**3. Easier Testing:**
```typescript
// No need to mock constructor dependencies
```

**4. Composability:**
```typescript
// Combine guards easily
export const adminGuard: CanActivateFn = (route, state) => {
  return authGuard(route, state) && roleGuard('admin')(route, state);
};
```

**Complete Example:**
```typescript
// guards/index.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  if (authService.isLoggedIn()) {
    return true;
  }
  
  router.navigate(['/login']);
  return false;
};

export const roleGuard = (role: string): CanActivateFn => {
  return () => {
    const authService = inject(AuthService);
    return authService.hasRole(role);
  };
};

export const adminGuard: CanActivateFn = (route, state) => {
  const isAuthenticated = authGuard(route, state);
  const isAdmin = roleGuard('admin')(route, state);
  return isAuthenticated && isAdmin;
};

// routes
const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [adminGuard]
  }
];
```

---

## Summary

You've mastered **Angular Routing and Navigation**!

**Key Concepts:**

**1. Router Configuration:**
- Routes array with path/component mapping
- Wildcard routes for 404
- Redirect routes
- Route order matters

**2. RouterModule:**
- `forRoot()` in AppModule
- `forChild()` in feature modules
- Routing modules organization

**3. Router Outlet:**
- `<router-outlet>` displays components
- Named outlets for complex layouts
- Nested outlets for child routes

**4. Route Parameters:**
- Required: `/users/:id`
- Optional: `/users;page=1`
- Access via `ActivatedRoute`
- Use observables for dynamic updates

**5. Query Parameters:**
- Set: `[queryParams]="{ page: 1 }"`
- Read: `route.queryParamMap`
- Merge/preserve options

**6. Route Guards:**
- **CanActivate**: Protect routes
- **CanDeactivate**: Warn before leaving
- **CanLoad**: Prevent module loading
- **Resolve**: Pre-fetch data
- Functional guards (modern)

**7. Lazy Loading:**
- `loadChildren` for modules
- `loadComponent` for standalone
- Guards with lazy routes

**8. Preloading:**
- `PreloadAllModules`
- Custom strategies
- Conditional preloading

**9. Router Events:**
- Navigation lifecycle events
- Loading indicators
- Analytics tracking

**10. Location Strategies:**
- PathLocationStrategy (clean URLs)
- HashLocationStrategy (hash URLs)

**Routing Checklist:**
```typescript
1. Define routes
2. Import RouterModule
3. Add <router-outlet>
4. Add navigation links
5. Apply guards (if needed)
6. Configure lazy loading
7. Add preloading strategy
```

**Best Practices:**
- Lazy load feature modules
- Use functional guards
- Protect sensitive routes
- Preload important routes
- Clean URL structure
- Proper route hierarchy
- Handle 404 errors
- Use resolvers for data

**Common Patterns:**
```typescript
// Lazy loading with guard
{
  path: 'admin',
  loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
  canLoad: [authGuard]
}

// Functional guard
export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  return auth.isLoggedIn();
};

// Nested routes
{
  path: 'dashboard',
  component: DashboardComponent,
  children: [
    { path: 'overview', component: OverviewComponent }
  ]
}
```

Master these routing concepts to build sophisticated navigation systems in Angular applications!
