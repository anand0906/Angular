<h1>Routing And Navigation</h1>
<p>Routing, in the context of web development, refers to the process of determining how an application responds to a specific URL or path. It involves mapping URLs to different components or views within the application and rendering the appropriate content based on the requested URL.</p>
<p>In a client-side web application, such as a single-page application (SPA) built with Angular, routing allows users to navigate between different views or pages without actually loading a new HTML page from the server. Instead, the application dynamically updates the content in the browser by loading the necessary components and data based on the requested route.</p>

<h2>Routing example in Angular</h2>
<p>Create a new Angular Application. <code>ng new Routing-project --no-standalone</code></p>
<p>By default, we will get app routing module which consists of code as follows</p>

```typescript		
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

<p>This module has imports and exports</p>
<p><strong>imports: [RouterModule.forRoot(routes)]:</strong> This line imports the RouterModule and calls its forRoot method, which initializes the router with the provided routes.</p>
<p><strong>const routes: Routes = [];</strong>The routes variable is an array of route configurations, defining the mapping between URL paths and component views.</p>
<p><strong>exports: [RouterModule]:</strong> This line exports the RouterModule so that it can be used in other modules. This is necessary because components in other modules might also need to navigate through the routes defined in this module.</p>
<p>this @NgModule configuration is setting up the main routing module for your Angular application. It imports the RouterModule with the application's route configuration and exports it for use in other parts of the application. The forRoot method is used to configure the router with the provided routes during the application's initialization.</p>

<p>This Routing Module `AppRoutingModule` will be imported by Main App Module so tha the routing functionality available throughout your application.</p>

```Typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

<p>Now we can create our components and can register the components with custom url paths in Routes Arrays as follows</p>

```typescript
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
];
```
<p>Now that you have defined your routes, added them to our application</p>
<p>When you define routes in your Angular application, each route corresponds to a specific component. The router-outlet directive acts as a container where the component associated with the active route is dynamically loaded and displayed.</p>
<p>As the user navigates through your application, Angular's router determines which route is active based on the URL. The associated component for that route is then rendered inside the router-outlet.</p>
<p>lets, place router-outlet in out app-component as follows</p>

```html
<router-outlet></router-outlet>
```

<p>When the user navigates to /home, the HomeComponent will be dynamically loaded and displayed within the router-outlet.</p>

<h2>RouterLink</h2>
<p>In Angular, the routerLink directive is used to create navigation links within your application. It is specifically designed to work with Angular's router, facilitating the navigation between different views or components in a single-page application (SPA).</p>
<p>The primary use of routerLink is within your component templates, typically associated with HTML anchor (a) elements. For example:</p>

```html
<a routerLink="/home">Home</a>
```
<p>It is present in html page, so when we click on Home link, it will redirect the current path to '/home'</p>
<p>The value of routerLink is set to the desired route path. In the example above, clicking the "Home" link will trigger navigation to the "/home" route. You can use both absolute and relative paths.</p>

<p>routerLink can also take dynamic values or expressions. For instance, if you have a route with parameters, you can pass them dynamically:</p>

```html
<a [routerLink]="['/user', userId]">User Profile</a>
```
<p>In this example, userId is a variable in your component, and the link will navigate to a route like "/user/123" based on the value of userId.</p>

<p>Instead of a single string, you can provide an array of route segments for more complex routes:</p>

```html
<a [routerLink]="['/products', product.category, product.id]">Product Details</a>
```
<p>Here, the link generates a route based on the product's category and ID.</p>

<p>You can preserve query parameters and fragments when navigating by using the queryParams and fragment properties:</p>

```html
<a [routerLink]="['/user/bob']" [queryParams]="{debug: true}" fragment="education">
  link to user component
</a>
```
<p>By default, the directive constructs the new URL using the given query parameters. The example generates the link: /user/bob?debug=true#education.</p>

<p>Angular provides the routerLinkActive directive to apply a CSS class when a link is active (i.e., when its route is the current route). For example:</p>

```html
<a routerLink="/home" routerLinkActive="active">Home</a>
```
<p>In this case, the "active" class will be applied when the "/home" route is active.</p>

<p>You can instruct the directive to handle query parameters differently by specifying the queryParamsHandling option in the link. Allowed values are:</p>
<ul>
	<li>'merge': Merge the given queryParams into the current query params.</li>
	<li>'preserve': Preserve the current query params.</li>
</ul>
<p>The "preserve" option discards any new query params:</p>
<p>The "merge" option appends new query params to the params from the current URL:</p>
<p>In case of a key collision between current parameters and those in the queryParams object, the new value is used.</p>

```html
// from /view1?page=1 to/view2?page=1
router.navigate(['/view2'], { queryParams: { page: 2 },  queryParamsHandling: "preserve"
});

// from /view1?page=1 to/view2?page=1&otherKey=2
router.navigate(['/view2'], { queryParams: { otherKey: 2 },  queryParamsHandling: "merge"
});
```

<p>Similary For, preserveFragment?: boolean	, When true, preserves the URL fragment for the next navigation</p>

```html
// Preserve fragment from /results#top to /view#top
router.navigate(['/view'], { preserveFragment: true });
```

<p>You can provide a state value to be persisted to the browser's History.state property. For example:</p>

```html
<a [routerLink]="['/user/bob']" [state]="{tracingId: 123}">
  link to user component
</a>
```

<p>Use Router#getCurrentNavigation to retrieve a saved navigation-state value. For example, to capture the tracingId during the NavigationStart event:</p>

```typescript
// Get NavigationStart events
router.events.pipe(filter(e => e instanceof NavigationStart)).subscribe(e => {
  const navigation = router.getCurrentNavigation();
  tracingService.trace({id: navigation.extras.state.tracingId});
});
```

<h3>Route Order</h3>
<p>In Angular, the order of route configurations in the route definition array matters because the Angular router processes routes in a top-down manner. The first route that matches the requested URL is the one that will be activated.</p>

<p>Consider the following route configuration:</p>

```typescript
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'products/:id', component: ProductDetailComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', component: NotFoundComponent } // Wildcard route for unmatched paths
];
```
<ul>
	<li>When a user navigates to a URL, Angular's router starts from the top of the route configuration and goes down, looking for the first route whose path matches the requested URL.</li>
	<li>If there's an exact match between the requested URL and a route's path, that route is chosen. For example, if the user navigates to "/home," the HomeComponent will be displayed.</li>
	<li>If the URL includes parameters (e.g., "/products/123"), the router looks for a match in the order of routes. In the example above, the parameterized route { path: 'products/:id', component: ProductDetailComponent } should come after the non-parameterized "products" route to prevent accidental matching.</li>
	<li>The wildcard route ({ path: '**', component: NotFoundComponent }) is often placed at the end. It acts as a catch-all for paths that don't match any defined routes. If no route matches the requested URL, the wildcard route will be activated.This route should generally be placed at the end of the route configuration to avoid unintentional matches.</li>
</ul>

<p>This route should generally be placed at the end of the route configuration to avoid unintentional matches.</p>

<h3>withComponentInputBinding or  bindingToComponentInputs</h3>
<p>It is a feature introduced in Angular version 16 that simplifies the process of binding route information directly to component inputs. It eliminates the need to manually subscribe to the ActivatedRoute service and retrieve route parameters or data, making routing code cleaner and easier to manage.</p>
<p>Standalone bootstrapping: Include withComponentInputBinding() in the provideRouter call within your bootstrapApplication function.</p>
<p>Classic NgModule bootstrapping: Set the bindingToComponentInputs option to true in the RouterModule.forRoot call.</p>

<p>Consider a route that displays details for a specific product (/products/:id). You want the ProductDetailComponent to receive the product ID from the route.</p>

```Typescript
// Standalone bootstrapping (in app.module.ts)
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(
      [
        { path: '', component: HomeComponent },
        { path: 'products/:id', component: ProductDetailComponent },
      ],
      withComponentInputBinding()
    )
  ]
});

// Or, classic NgModule bootstrapping
@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        { path: '', component: HomeComponent },
        { path: 'products/:id', component: ProductDetailComponent },
      ],
      { bindingToComponentInputs: true }
    )
  ],
  // ...
})
export class AppModule {}

const routes: Routes = [
  // ...,
  { path: 'products/:id', component: ProductDetailComponent }
];

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {
  @Input() id!: string; // Use `!` to allow non-null assertion
  // ...
}

```

<p>Now, when you navigate to /products/123, the ProductDetailComponent will receive the ID (123) through its id input, eliminating the need for manual subscription and retrieval logic.</p>

<h3>Redirecting</h3>
<p>In Angular routing, redirects are used to navigate users from one route to another automatically. This can be useful for various scenarios, such as redirecting users from an old URL to a new one, handling default routes, or creating aliases for certain routes. Angular provides several ways to implement redirects in the routing configuration.</p>

<p>Here are two common methods for implementing redirect</p>

<ol>
	<li>Route Redirects:</li>
	<p>You can define a route with a redirectTo property to specify where the navigation should be redirected. This is often used for simple redirects.</p>

```html
	const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  // Other routes...
];

```
<p>In this example, when the user navigates to the root URL (''), they are automatically redirected to the '/home' route.</p>
<p>redirectTo: Specifies the target route.</p>
<p>pathMatch: 'full': Ensures that the entire URL must match the specified path for the redirect to occur.</p>
	<ol> Route with Component and ngOnInit Redirect:</ol>

```typescript
const routes: Routes = [
  { path: 'old-route', component: RedirectComponent },
  // Other routes...
];

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  template: '',
})
export class RedirectComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    // Perform any conditional logic if needed
    // Redirect to the desired route
    this.router.navigate(['/new-route']);
  }
}

```

<p>You can also use a route with a component that performs a redirect in its ngOnInit lifecycle hook. This allows for more dynamic redirection based on conditions or business logic.</p>
<p>You can also use a route with a component that performs a redirect in its ngOnInit lifecycle hook. This allows for more dynamic redirection based on conditions or business logic.</p>
</ol>

<h3>Nesting Routes</h3>
<p>Nesting routes in Angular refers to the practice of defining child routes within a parent route. This allows you to organize and structure your application's routing hierarchy. Child routes are associated with specific components that are nested inside the parent component, forming a hierarchical relationship.</p>

```typescript
const routes: Routes = [
  {
    path: 'parent',
    component: ParentComponent,
    children: [
      { path: 'child', component: ChildComponent },
      // Add other child routes as needed
    ],
  },
  // Add other top-level routes as needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

```

<p>In this example, the parent route has a child route child.</p>
<p>In the parent.component.html, include a router-outlet where the child components will be rendered:</p>

```html
<h2>Parent Component</h2>
<router-outlet></router-outlet>
```
<p>In the child.component.html, you can include content specific to the child component:</p>

```html
<p>Child Component Content</p>
```
<p>When navigating to /parent/child, the content of ParentComponent will be displayed, and the content of ChildComponent will be rendered inside the router-outlet.</p>

<p>You can use the routerLink directive to create links that navigate to the nested routes:</p>

```html
<!-- Link to the parent route -->
<a routerLink="/parent">Go to Parent</a>

<!-- Link to the child route -->
<a routerLink="/parent/child">Go to Child</a>
```

<h3>Title</h3>
<p>Each page in your application should have a unique title so that they can be identified in the browser history. The Router sets the document's title using the title property from the Route config.</p>

```typescript
const routes: Routes = [
  {
    path: 'first-component',
    title: 'First component',
    component: FirstComponent,  // this is the component with the <router-outlet> in the template
    children: [
      {
        path: 'child-a',  // child route path
        title: resolvedChildATitle,
        component: ChildAComponent,  // child route component that the router renders
      },
      {
        path: 'child-b',
        title: 'child b',
        component: ChildBComponent,  // another child route component that the router renders
      },
    ],
  },
];

const resolvedChildATitle: ResolveFn<string> = () => Promise.resolve('child a');
```

<p>You can also provide a custom title strategy by extending the TitleStrategy.</p>

<p>The TitleStrategy interface in Angular's router provides a mechanism for controlling how the page title is set based on the current route. It allows for customization beyond simply using static titles for each route, offering flexibility in how the title is constructed.</p>
<p>ou can create a class that implements the TitleStrategy interface.</p>
<p>This class would provide its own implementation for the updateTitle method, specifying how it wants to construct the page title.</p>
<p>You can then register this custom strategy with the router using the provideRouter function in your application's bootstrap process.</p>

```typescript
import { Injectable } from '@angular/core';
import { TitleStrategy, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class CustomTitleStrategy implements TitleStrategy {
  updateTitle(routerState: RouterStateSnapshot) {
    const title = this.extractTitle(routerState);
    if (title) {
      document.title = `My App - ${title}`; // Set prefix and concatenate
    } else {
      document.title = 'My App'; // Default title
    }
  }

  private extractTitle(routerState: RouterStateSnapshot): string | null {
    const data = routerState.firstChild?.data;
    return data ? data['title'] : null; // Extract title from route data
  }
}
```

<p>In this example, the CustomTitleStrategy class extracts the title from the route data (data['title']) or uses a default title ("My App") if no title is found. It then sets the page title by prepending "My App - " to the extracted or default title.</p>

<h3>Relative Paths</h3>
<p>Angular provides two types of navigation strategies: absolute paths and relative paths.</p>
<ol>
	<li>Absolute Paths:</li>
	<p>An absolute path in routing starts from the root level of the route configuration. It always begins with a leading slash (/). For example:</p>

```typescript
// Absolute path
{ path: 'dashboard', component: DashboardComponent }

// Absolute path with parameter
{ path: 'user/:id', component: UserComponent }
```
	<li>Relative Paths : </li>
	<p>Relative paths, on the other hand, are based on the current route's location. They don't start with a leading slash (/). Instead, they are relative to the current route's URL. Relative paths are used within the same route configuration to navigate to child, sibling, or parent routes.</p>

```html
<!-- Relative to the current route -->
<a [routerLink]="['details']">Go to Details</a>

<!-- Relative to the root route -->
<a [routerLink]="['/statistics']">Go to Statistics</a>

<!-- Relative to the parent route -->
<a [routerLink]="['../']">Go to Dashboard</a>
```

```typescript
goToItems() {
  this.router.navigate(['items'], { relativeTo: this.route });
}
```
</ol>

<h3>Accessing query parameters and fragments</h3>
<p>Sometimes, a feature of your application requires accessing a part of a route, such as a query parameter or a fragment.s</p>
<p>The ActivatedRoute service, injected into your components, provides access to information about the current route, including query parameters and fragments.</p>

```typescript
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-my-component',
  templateUrl: './my-component.component.html',
  styleUrls: ['./my-component.component.css']
})
export class MyComponent implements OnInit {
  category: string | null = null;
  sort: string | null = null;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.category = params['category'];
      this.sort = params['sort'];
    });
  }
}

```

<p>You can also access specific parameters directly using the snapshot property:</p>

```typescript
const categoryId = this.activatedRoute.snapshot.queryParams['category'];
const fragment = this.activatedRoute.snapshot.fragment;

```

<h2>Auth Guards</h2>
<p>In Angular applications, route guards offer a robust mechanism to enforce authorization and protect sensitive routes from unauthenticated or unauthorized users. By implementing route guards, you can control access to specific routes based on various criteria, such as user roles, authentication status, or authorization logic.</p>
<p>Use route guards to prevent users from navigating to parts of an application without authorization. The following route guards are available in Angular:</p>
<ul>
	<li>canActivate</li>
	<li>canActivateChild</li>
	<li>canDeactivate</li>
	<li>canMatch</li>
	<li>resolve</li>
	<li>canLoad</li>
</ul>
<h3>canActivate</h3>
<p>nvoked Before Activation: canActivate is called before activating a route, providing you with an opportunity to intervene in the navigation process based on various criteria.</p>
<p>Return Values: </p>
<ul>
	<li>true: Allows navigation to proceed as usual.</li>
	<li>false: Blocks navigation and typically redirects the user to an appropriate route (e.g., login page).</li>
	<li>UrlTree: Specifies a new navigation path (used for programmatic redirection).</li>
	<li>Observable or Promise: Enables asynchronous authorization checks</li>
</ul>
<p>Observable<boolean | UrlTree> or Promise<boolean | UrlTree>: Enables asynchronous authorization checks</p>

```typescript
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | boolean
    | UrlTree {

    const expectedRole = route.data['expectedRole']; // Get expected role from route data

    if (this.isLoggedIn() && this.hasRole(expectedRole)) {
      return true;
    } else {
      return this.router.parseUrl('/login'); // Redirect to login on failure
    }
  }

  private isLoggedIn(): boolean {
    // Implement your logic to check if the user is logged in
    // (e.g., check authentication token or session variable)
    return true; // Replace with your actual logic
  }

  private hasRole(role: string): boolean {
    // Implement your logic to check if the user has the required role
    // (e.g., call a backend API or retrieve role from user object)
    return true; // Replace with your actual logic
  }
}

const routes=[
      {
        path: 'team/:id',
        component: TeamComponent,
        canActivate: [AuthGuard],
      },
]
```

<h3>CanActiateChildRoutes</h3>
<p>Unlike canActivate, which is called before activating a parent route, canActivateChild is invoked before activating any child route within an already activated parent route. It intercepts navigation attempts to child routes, allowing you to enforce stricter access control for nested portions of your application's structure.</p>
<p>It is similar to canactiavte</p>

```typescript
import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PermissionsGuard implements CanActivateChild {

  constructor() {}

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | boolean
    | UrlTree {

    const requiredPermission = route.data['requiredPermission']; // Get permission from route data

    if (this.hasPermission(requiredPermission)) {
      return true;
    } else {
      return of(false); // Block navigation or redirect (implement your logic)
    }
  }

  private hasPermission(permission: string): boolean {
    // Implement your logic to check if the user has the required permission
    // (e.g., use a permission service or user object)
    return true; // Replace with your actual logic
  }
}

const routes=[
      {
        path: 'team/:id',
        component: TeamComponent,
        canActivateChild: [canActivateChildExample],
        children: [],
      },
    ]
```

<h3>canDeativate</h3>
<p>This guard is called just before navigation away from a route is initiated. This gives you an opportunity to intervene and prevent navigation if required.</p>
<p>canDeactivate can return various values to control navigation:</p>
<ul>
	<li>true: Allows navigation to proceed as usual.</li>
	<li>false: Blocks navigation</li>
	<li>Observable boolean or Promise boolean : Enables asynchronous checks (e.g., confirmation dialogs) before returning a final true or false value.</li>
</ul>

<p> Implementing canDeactivate to Handle Unsaved Changes:</p>

```Typescript
import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog'; // Import for dialog

@Injectable({
  providedIn: 'root'
})
export class UnsavedChangesGuard implements CanDeactivate<EditComponent> {

  constructor(private dialog: MatDialog) {}

  canDeactivate(
    component: EditComponent,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {

    if (component.hasUnsavedChanges()) { // Check for unsaved changes (implement logic)
      const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
        data: { message: 'You have unsaved changes. Are you sure you want to leave?' }
      });

      return confirmDialog.afterClosed().pipe(
        map(confirmed => confirmed ? true : false)
      );
    }

    return true;
  }
}

// EditComponent (example)
export class EditComponent {
  hasUnsavedChanges(): boolean {
    return true; // Implement logic to check for unsaved data
  }
}

// ConfirmDialogComponent (example)
@Component({ ... })
export class ConfirmDialogComponent {
  constructor() {}
}
```
<p>Prevent users from leaving a route if they have unsaved edits or data that could be lost.</p>
<p>Ask users for confirmation before allowing them to leave a route, especially for actions with potential consequences.</p>
<p>Execute any necessary cleanup tasks (e.g., saving data, canceling subscriptions) before allowing navigation.</p>

<h3>canMatch</h3>
<p>Unlike canActivate, which is called after a route is matched, canMatch is invoked before any matching attempts occur. This means it can prevent routes from even being considered for activation based on your defined criteria.</p>
<p>It can return various values to influence the outcome</p>
<ul>
	<li>true: Allows the route to participate in the matching process.</li>
	<li>false: Excludes the route from matching, essentially disabling it.</li>
	<li>UrlTree: Specifies an alternative navigation path (useful for redirection based on matching logic).</li>
</ul>
<p> Provides more granular control over route availability compared to canActivate.</p>
<p>Enables you to dynamically determine which routes are even eligible for matching based on various conditions.</p>
<p>Can be used in conjunction with feature flags to enable or disable specific features within your application based on configuration or runtime decisions.</p>
<p>Can be used in conjunction with feature flags to enable or disable specific features within your application based on configuration or runtime decisions.</p>

```typescript
import { Injectable } from '@angular/core';
import { CanMatch, UrlSegment, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FeatureFlagGuard implements CanMatch {

  constructor(private featureFlagService: FeatureFlagService) {} // Inject feature flag service

  canMatch(segments: UrlSegment[]): Observable<boolean | UrlTree> {
    const featureName = segments[0].path; // Extract feature name from url segment

    return this.featureFlagService.isEnabled(featureName).pipe(
      map(enabled => enabled ? true : this.router.parseUrl('/home')) // Redirect to home if disabled
    );
  }
}

```

<h3>Resolve</h3>
<p>In Angular, the resolve property in the route configuration is used to pre-fetch data before a route is activated. The purpose of the resolve guard is to ensure that the necessary data is available before navigating to a particular route. It allows you to retrieve data asynchronously and resolve it before the component associated with the route is instantiated and displayed.</p>
<p> Implementing resolve to Fetch User Data Before Route Activation:</p>

```Typescript
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../user.service'; // Inject user service

@Injectable({
  providedIn: 'root'
})
export class UserDataResolver implements Resolve<any> {

  constructor(private userService: UserService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    const userId = route.paramMap.get('id'); // Extract user ID from route parameters
    return this.userService.getUser(userId); // Fetch user data using user service
  }
}

const routes: Routes = [
  {
    path: 'users/:id',
    component: UserDetailComponent,
    resolve: { userData: UserDataResolver }, // Specify resolver in route configuration
  },
];

```

<h3>canLoad</h3>
<p>Unlike canActivate, which is called before a route is activated, canLoad is invoked before the lazy-loaded module is even loaded.</p>
<p>It can return various values to control loading behavior</p>
<ul>
	<li>true: Allows the lazy-loaded module to be loaded.</li>
	<li>false: Prevents the module from being loaded, effectively disabling its routes.</li>
	<li>Observable boolean or Promise boolean : Enables asynchronous checks (e.g., authorization checks) before deciding on loading.</li>
</ul>
<p> Prevents unnecessary loading of lazy-loaded modules if the user doesn't have permission to access them, potentially enhancing application performance.</p>
<p>Enforces access control at the module level, preventing users from even seeing routes within a module they're not authorized for.</p>
<p>By blocking unauthorized module loading, you safeguard your application's code from being exposed to unauthorized users who might attempt to access routes within the module through developer tools or other means.</p>

<p> Implementing canLoad for Role-Based Module Access Control:</p>

```typescript
import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor() {}

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> {
    const expectedRole = route.data['expectedRole']; // Get expected role from route data

    if (this.isLoggedIn() && this.hasRole(expectedRole)) {
      return of(true);
    } else {
      return of(false); // Block loading
    }
  }

  private isLoggedIn(): boolean {
    // Implement your logic to check if the user is logged in
    // (e.g., check authentication token or session variable)
    return true; // Replace with your actual logic
  }

  private hasRole(role: string): boolean {
    // Implement your logic to check if the user has the required role
    // (e.g., call a backend API or retrieve role from user object)
    return true; // Replace with your actual logic
  }
}

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canLoad: [AuthGuard] // Apply AuthGuard to prevent unauthorized loading
  },
  // ... other routes
];
```

<h2>Lazy Loading</h2>
<p>Lazy loading is a technique in Angular that allows you to load application modules on demand, as they are needed by the user, rather than loading all modules at once during the initial application bootstrap</p>
<p>By loading modules only when necessary, the initial bundle size of your application is reduced. This leads to a faster initial load time and a smoother user experience, especially on slower connections or devices.</p>
<p>How Lazy Loading Works</p>
<p>Module Splitting: You organize your application code into smaller, feature-specific modules using the @NgModule decorator.</p>
<p>Lazy Loading Configuration: Within your routing configuration, you define lazy-loaded routes using the loadChildren property. This property typically takes a function that returns a Promise that resolves to the module to be loaded.</p>

```Typescript
const routes: Routes = [
  // ... other routes

  {
    path: 'products',
    loadChildren: () => import('./products/products.module').then(m => m.ProductsModule)
  },
];

```

<p>In this example, the products route is configured for lazy loading. When a user navigates to the /products route, the loadChildren function is invoked, which imports the ProductsModule asynchronously using import() and returns a Promise that resolves to the module. The module is then loaded, and its components become available for routing.</p>

<h3>forRoot() and forChild()</h3>
<p>In Angular, forRoot() and forChild() are methods provided by the RouterModule to configure the routes in your application</p>
<p>The forRoot() method is used in the root module to configure the primary set of routes for the entire application. It should only be called in the AppModule or the root module of your application. The forRoot() method returns an NgModule that provides the configured router services and the initial set of routes.</p>

```Typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  // ... other routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

```

<p>The forChild() method is used in feature modules to configure additional routes specific to that feature module. It should be called in the imports array of the feature module. The forChild() method returns an NgModule that provides the configured router services and additional routes for the feature module.</p>

```Typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeatureComponent } from './feature/feature.component';

const featureRoutes: Routes = [
  { path: 'feature', component: FeatureComponent },
  // ... other feature-specific routes
];

@NgModule({
  imports: [RouterModule.forChild(featureRoutes)],
  exports: [RouterModule],
})
export class FeatureRoutingModule {}
```

<h2>Preloading</h2>
<p>In Angular, preloading is a technique that allows certain modules to be loaded asynchronously in the background after the main application has been initialized. This helps improve the overall user experience by reducing the time it takes to load subsequent views. Preloading is particularly useful for lazy-loaded modules, where the module and its associated resources are fetched in the background, making them readily available when the user navigates to a corresponding route.</p>
<p>Angular provides a built-in preloading strategy known as PreloadAllModules, and you can also implement custom preloading strategies based on your specific requirements.</p>
<p>By default, Angular preloads all the lazy-loaded modules defined in the route configuration. To use this strategy, you need to update the RouterModule configuration in your AppModule</p>

```Typescript
import { NgModule } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  // Lazy-loaded module
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  // ... other routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
```

<p>In this example, PreloadAllModules is set as the preloading strategy. This means that all lazy-loaded modules will be preloaded in the background after the initial application load.</p>

<p>If you want more control over which modules are preloaded and when, you can implement a custom preloading strategy. Here's an example:</p>

```Typescript
import { Injectable } from '@angular/core';
import { Route, PreloadingStrategy } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomPreloadingStrategy implements PreloadingStrategy {
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    // Add your custom logic here to determine which modules to preload
    return of(true).pipe(
      // Example: Preload only modules with a specific data property
      map(() => route.data && route.data.preload === true ? load() : null)
    );
  }
}

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CustomPreloadingStrategy } from './custom-preloading-strategy.service';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  // Lazy-loaded module
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), data: { preload: true } },
  // ... other routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: CustomPreloadingStrategy })],
  exports: [RouterModule],
  providers: [CustomPreloadingStrategy],
})
export class AppRoutingModule {}

```
<p>In this example, the CustomPreloadingStrategy is used as the preloading strategy, and the decision to preload a module is based on a custom logic defined in the strategy. In this case, modules with a preload data property set to true will be preloaded.</p>