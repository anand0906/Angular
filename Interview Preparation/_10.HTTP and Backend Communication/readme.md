# Angular HTTP and Backend Communication

## Index

1. [Introduction to HTTP in Angular](#1-introduction-to-http-in-angular)
   - 1.1 [What is HttpClient?](#11-what-is-httpclient)
   - 1.2 [Why Use HttpClient?](#12-why-use-httpclient)
   - 1.3 [Setting Up HttpClient](#13-setting-up-httpclient)

2. [HttpClient Module](#2-httpclient-module)
   - 2.1 [Importing HttpClientModule](#21-importing-httpclientmodule)
   - 2.2 [Injecting HttpClient](#22-injecting-httpclient)
   - 2.3 [Basic Request Example](#23-basic-request-example)
   - 2.4 [Type Safety with Generics](#24-type-safety-with-generics)

3. [HTTP Methods](#3-http-methods)
   - 3.1 [GET Requests](#31-get-requests)
   - 3.2 [POST Requests](#32-post-requests)
   - 3.3 [PUT Requests](#33-put-requests)
   - 3.4 [DELETE Requests](#34-delete-requests)
   - 3.5 [PATCH Requests](#35-patch-requests)
   - 3.6 [HEAD and OPTIONS](#36-head-and-options)

4. [HTTP Interceptors](#4-http-interceptors)
   - 4.1 [What are Interceptors?](#41-what-are-interceptors)
   - 4.2 [Creating Interceptors](#42-creating-interceptors)
   - 4.3 [Auth Token Interceptor](#43-auth-token-interceptor)
   - 4.4 [Logging Interceptor](#44-logging-interceptor)
   - 4.5 [Multiple Interceptors](#45-multiple-interceptors)
   - 4.6 [Functional Interceptors (Angular 15+)](#46-functional-interceptors-angular-15)

5. [Error Handling](#5-error-handling)
   - 5.1 [Error Types](#51-error-types)
   - 5.2 [Catching Errors](#52-catching-errors)
   - 5.3 [Global Error Handler](#53-global-error-handler)
   - 5.4 [Error Interceptor](#54-error-interceptor)
   - 5.5 [User-Friendly Error Messages](#55-user-friendly-error-messages)

6. [Request and Response Transformation](#6-request-and-response-transformation)
   - 6.1 [Transforming Requests](#61-transforming-requests)
   - 6.2 [Transforming Responses](#62-transforming-responses)
   - 6.3 [Using RxJS Operators](#63-using-rxjs-operators)
   - 6.4 [Custom Response Types](#64-custom-response-types)

7. [HTTP Headers and Parameters](#7-http-headers-and-parameters)
   - 7.1 [Setting Headers](#71-setting-headers)
   - 7.2 [Query Parameters](#72-query-parameters)
   - 7.3 [HttpParams](#73-httpparams)
   - 7.4 [Custom Headers](#74-custom-headers)
   - 7.5 [Request Options](#75-request-options)

8. [Observables vs Promises](#8-observables-vs-promises)
   - 8.1 [Understanding the Difference](#81-understanding-the-difference)
   - 8.2 [Converting to Promise](#82-converting-to-promise)
   - 8.3 [When to Use Each](#83-when-to-use-each)
   - 8.4 [Cancellation with Observables](#84-cancellation-with-observables)

9. [Retry Logic](#9-retry-logic)
   - 9.1 [Simple Retry](#91-simple-retry)
   - 9.2 [Retry with Delay](#92-retry-with-delay)
   - 9.3 [Conditional Retry](#93-conditional-retry)
   - 9.4 [Exponential Backoff](#94-exponential-backoff)

10. [Caching Strategies](#10-caching-strategies)
    - 10.1 [Simple Cache](#101-simple-cache)
    - 10.2 [Cache with Expiration](#102-cache-with-expiration)
    - 10.3 [Cache Interceptor](#103-cache-interceptor)
    - 10.4 [Invalidating Cache](#104-invalidating-cache)

11. [CORS Handling](#11-cors-handling)
    - 11.1 [What is CORS?](#111-what-is-cors)
    - 11.2 [CORS Errors](#112-cors-errors)
    - 11.3 [Proxy Configuration](#113-proxy-configuration)
    - 11.4 [CORS Headers](#114-cors-headers)
    - 11.5 [Backend Solutions](#115-backend-solutions)

---

## 1. Introduction to HTTP in Angular

### 1.1 What is HttpClient?

**HttpClient** is Angular's HTTP client for communicating with backend services.

**Think of it like:**
A postal service that sends requests to servers and brings back responses.

**Key Features:**
- Observable-based API
- Type safety
- Interceptors
- Request/response transformation
- Error handling
- Testing support

**Simple Example:**
```typescript
// Send request
this.http.get('/api/users').subscribe(users => {
  console.log(users);
});
```

### 1.2 Why Use HttpClient?

**Benefits:**

**1. Observable-Based:**
```typescript
// Can cancel requests
const request = this.http.get('/api/data');
const subscription = request.subscribe(data => console.log(data));
subscription.unsubscribe();  // Cancel request
```

**2. Type Safety:**
```typescript
interface User {
  id: number;
  name: string;
}

this.http.get<User[]>('/api/users').subscribe(users => {
  // users is typed as User[]
  users.forEach(user => console.log(user.name));
});
```

**3. Interceptors:**
```typescript
// Add auth token to all requests automatically
```

**4. Testing:**
```typescript
// Mock HTTP responses easily
```

### 1.3 Setting Up HttpClient

**Install (included by default):**
```bash
npm install @angular/common
```

**Import:**
```typescript
import { HttpClientModule } from '@angular/common/http';
```

---

## 2. HttpClient Module

### 2.1 Importing HttpClientModule

**Module-Based App:**
```typescript
// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule  // Import here
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

**Standalone App:**
```typescript
// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient()  // Provide HttpClient
  ]
});
```

### 2.2 Injecting HttpClient

**In a service:**
```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) { }
  
  getData() {
    return this.http.get('/api/data');
  }
}
```

**In a component:**
```typescript
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-users',
  template: '<ul><li *ngFor="let user of users">{{ user.name }}</li></ul>'
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  
  constructor(private http: HttpClient) { }
  
  ngOnInit() {
    this.http.get<any[]>('/api/users').subscribe(users => {
      this.users = users;
    });
  }
}
```

### 2.3 Basic Request Example

**Simple GET request:**
```typescript
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-example',
  template: `
    <div *ngFor="let post of posts">
      <h3>{{ post.title }}</h3>
      <p>{{ post.body }}</p>
    </div>
  `
})
export class ExampleComponent implements OnInit {
  posts: any[] = [];
  
  constructor(private http: HttpClient) { }
  
  ngOnInit() {
    this.http.get<any[]>('https://jsonplaceholder.typicode.com/posts')
      .subscribe(posts => {
        this.posts = posts;
      });
  }
}
```

### 2.4 Type Safety with Generics

**Define interface:**
```typescript
interface User {
  id: number;
  name: string;
  email: string;
  username: string;
}

interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}
```

**Type-safe requests:**
```typescript
@Injectable({ providedIn: 'root' })
export class ApiService {
  private apiUrl = 'https://jsonplaceholder.typicode.com';
  
  constructor(private http: HttpClient) { }
  
  // Type-safe GET
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }
  
  // Type-safe GET by ID
  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${id}`);
  }
  
  // Type-safe POST
  createPost(post: Post): Observable<Post> {
    return this.http.post<Post>(`${this.apiUrl}/posts`, post);
  }
}
```

**Usage:**
```typescript
export class UserComponent implements OnInit {
  users: User[] = [];
  
  constructor(private api: ApiService) { }
  
  ngOnInit() {
    this.api.getUsers().subscribe(users => {
      this.users = users;  // Typed as User[]
      users.forEach(user => {
        console.log(user.name);  // TypeScript knows 'name' exists
      });
    });
  }
}
```

---

## 3. HTTP Methods

### 3.1 GET Requests

**Retrieve data from server:**

**Simple GET:**
```typescript
// Get all users
getUsers(): Observable<User[]> {
  return this.http.get<User[]>('/api/users');
}

// Get user by ID
getUser(id: number): Observable<User> {
  return this.http.get<User>(`/api/users/${id}`);
}
```

**With query parameters:**
```typescript
// GET /api/users?page=1&limit=10
getUsers(page: number, limit: number): Observable<User[]> {
  return this.http.get<User[]>('/api/users', {
    params: { page: page.toString(), limit: limit.toString() }
  });
}
```

**Complete example:**
```typescript
@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = '/api/users';
  
  constructor(private http: HttpClient) { }
  
  // Get all
  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }
  
  // Get by ID
  getById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }
  
  // Search
  search(term: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/search`, {
      params: { q: term }
    });
  }
}
```

### 3.2 POST Requests

**Create new resources:**

**Simple POST:**
```typescript
createUser(user: User): Observable<User> {
  return this.http.post<User>('/api/users', user);
}
```

**With headers:**
```typescript
createUser(user: User): Observable<User> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  
  return this.http.post<User>('/api/users', user, { headers });
}
```

**Complete example:**
```typescript
@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) { }
  
  // Create user
  create(user: Partial<User>): Observable<User> {
    return this.http.post<User>('/api/users', user);
  }
  
  // Login
  login(credentials: { email: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>('/api/auth/login', credentials);
  }
  
  // Upload file
  uploadAvatar(userId: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('avatar', file);
    
    return this.http.post(`/api/users/${userId}/avatar`, formData);
  }
}
```

### 3.3 PUT Requests

**Update entire resource:**

**Simple PUT:**
```typescript
updateUser(id: number, user: User): Observable<User> {
  return this.http.put<User>(`/api/users/${id}`, user);
}
```

**Complete example:**
```typescript
@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) { }
  
  // Update entire user
  update(id: number, user: User): Observable<User> {
    return this.http.put<User>(`/api/users/${id}`, user);
  }
  
  // Replace settings
  updateSettings(userId: number, settings: UserSettings): Observable<UserSettings> {
    return this.http.put<UserSettings>(`/api/users/${userId}/settings`, settings);
  }
}
```

### 3.4 DELETE Requests

**Remove resources:**

**Simple DELETE:**
```typescript
deleteUser(id: number): Observable<void> {
  return this.http.delete<void>(`/api/users/${id}`);
}
```

**With options:**
```typescript
deleteUser(id: number): Observable<any> {
  return this.http.delete(`/api/users/${id}`, {
    observe: 'response'  // Get full response
  });
}
```

**Complete example:**
```typescript
@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) { }
  
  // Delete user
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`/api/users/${id}`);
  }
  
  // Delete with confirmation
  deleteWithConfirmation(id: number, token: string): Observable<any> {
    return this.http.delete(`/api/users/${id}`, {
      headers: { 'X-Confirmation-Token': token }
    });
  }
  
  // Soft delete
  softDelete(id: number): Observable<User> {
    return this.http.delete<User>(`/api/users/${id}/soft`);
  }
}
```

### 3.5 PATCH Requests

**Partial update:**

**Simple PATCH:**
```typescript
patchUser(id: number, changes: Partial<User>): Observable<User> {
  return this.http.patch<User>(`/api/users/${id}`, changes);
}
```

**Example:**
```typescript
@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) { }
  
  // Update email only
  updateEmail(userId: number, email: string): Observable<User> {
    return this.http.patch<User>(`/api/users/${userId}`, { email });
  }
  
  // Toggle active status
  toggleActive(userId: number, active: boolean): Observable<User> {
    return this.http.patch<User>(`/api/users/${userId}`, { active });
  }
  
  // Update multiple fields
  partialUpdate(userId: number, updates: Partial<User>): Observable<User> {
    return this.http.patch<User>(`/api/users/${userId}`, updates);
  }
}
```

**PUT vs PATCH:**
```typescript
// PUT: Replace entire resource
updateUser(user: User): Observable<User> {
  return this.http.put<User>(`/api/users/${user.id}`, user);
}

// PATCH: Update specific fields
updateUserEmail(id: number, email: string): Observable<User> {
  return this.http.patch<User>(`/api/users/${id}`, { email });
}
```

### 3.6 HEAD and OPTIONS

**HEAD - Get headers only:**
```typescript
checkResourceExists(url: string): Observable<HttpResponse<any>> {
  return this.http.head(url, { observe: 'response' });
}
```

**OPTIONS - Get allowed methods:**
```typescript
getOptions(url: string): Observable<HttpResponse<any>> {
  return this.http.options(url, { observe: 'response' });
}
```

---

## 4. HTTP Interceptors

### 4.1 What are Interceptors?

**Interceptors** intercept HTTP requests/responses to modify them.

**Think of it like:**
A security checkpoint that inspects and modifies packages before they're sent or received.

**Use Cases:**
- Add authentication tokens
- Log requests/responses
- Handle errors globally
- Show loading indicators
- Modify headers
- Cache responses

### 4.2 Creating Interceptors

**Generate interceptor:**
```bash
ng generate interceptor auth
```

**Basic structure:**
```typescript
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Modify request
    const modifiedReq = req.clone({
      setHeaders: {
        'Authorization': 'Bearer token123'
      }
    });
    
    // Pass to next interceptor or backend
    return next.handle(modifiedReq);
  }
}
```

**Register interceptor:**

**Module-based:**
```typescript
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class AppModule { }
```

**Standalone:**
```typescript
import { provideHttpClient, withInterceptors } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(
      withInterceptors([authInterceptor])
    )
  ]
});
```

### 4.3 Auth Token Interceptor

**Add JWT token to requests:**

```typescript
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) { }
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get token
    const token = this.authService.getToken();
    
    // Clone request and add token
    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
      return next.handle(cloned);
    }
    
    return next.handle(req);
  }
}
```

**Exclude certain URLs:**
```typescript
intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  // Don't add token to login/register
  const excludeUrls = ['/api/auth/login', '/api/auth/register'];
  const shouldExclude = excludeUrls.some(url => req.url.includes(url));
  
  if (shouldExclude) {
    return next.handle(req);
  }
  
  const token = this.authService.getToken();
  if (token) {
    const cloned = req.clone({
      setHeaders: { 'Authorization': `Bearer ${token}` }
    });
    return next.handle(cloned);
  }
  
  return next.handle(req);
}
```

### 4.4 Logging Interceptor

**Log all requests and responses:**

```typescript
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const started = Date.now();
    
    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          const elapsed = Date.now() - started;
          console.log(`${req.method} ${req.urlWithParams} - ${event.status} in ${elapsed}ms`);
        }
      })
    );
  }
}
```

### 4.5 Multiple Interceptors

**Order matters:**

```typescript
@NgModule({
  providers: [
    // Executed in order
    { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ]
})
export class AppModule { }
```

**Execution flow:**
```
Request:  Logging → Auth → Error → Backend
Response: Backend → Error → Auth → Logging
```

### 4.6 Functional Interceptors (Angular 15+)

**Modern functional approach:**

```typescript
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();
  
  if (token) {
    const cloned = req.clone({
      setHeaders: { 'Authorization': `Bearer ${token}` }
    });
    return next(cloned);
  }
  
  return next(req);
};
```

**Register:**
```typescript
import { provideHttpClient, withInterceptors } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(
      withInterceptors([authInterceptor, loggingInterceptor])
    )
  ]
});
```

**Logging interceptor (functional):**
```typescript
export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('Request:', req.method, req.url);
  
  return next(req).pipe(
    tap(event => {
      if (event.type === HttpEventType.Response) {
        console.log('Response:', event.status, event.url);
      }
    })
  );
};
```

---

## 5. Error Handling

### 5.1 Error Types

**Two types of errors:**

**1. Client-side errors:**
```typescript
// Network error, no response from server
{
  error: ErrorEvent,
  status: 0,
  statusText: "Unknown Error"
}
```

**2. Server-side errors:**
```typescript
// Server returned error response
{
  error: { message: "User not found" },
  status: 404,
  statusText: "Not Found"
}
```

### 5.2 Catching Errors

**Using catchError:**

```typescript
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

getUser(id: number): Observable<User> {
  return this.http.get<User>(`/api/users/${id}`).pipe(
    catchError(error => {
      console.error('Error fetching user:', error);
      return throwError(() => new Error('Failed to fetch user'));
    })
  );
}
```

**Handle different status codes:**
```typescript
getUser(id: number): Observable<User> {
  return this.http.get<User>(`/api/users/${id}`).pipe(
    catchError(error => {
      if (error.status === 404) {
        console.error('User not found');
      } else if (error.status === 500) {
        console.error('Server error');
      } else {
        console.error('Unknown error');
      }
      return throwError(() => error);
    })
  );
}
```

### 5.3 Global Error Handler

**Handle all errors in one place:**

```typescript
import { Injectable, ErrorHandler } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  handleError(error: Error | HttpErrorResponse) {
    if (error instanceof HttpErrorResponse) {
      // Server error
      console.error('Server error:', error.status, error.message);
    } else {
      // Client error
      console.error('Client error:', error.message);
    }
    
    // Log to external service
    this.logErrorToService(error);
  }
  
  private logErrorToService(error: Error | HttpErrorResponse) {
    // Send to error tracking service (e.g., Sentry)
  }
}
```

**Register:**
```typescript
@NgModule({
  providers: [
    { provide: ErrorHandler, useClass: GlobalErrorHandler }
  ]
})
export class AppModule { }
```

### 5.4 Error Interceptor

**Intercept all HTTP errors:**

```typescript
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router) { }
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        
        if (error.error instanceof ErrorEvent) {
          // Client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // Server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
          
          // Handle specific status codes
          switch (error.status) {
            case 401:
              // Unauthorized - redirect to login
              this.router.navigate(['/login']);
              break;
            case 403:
              // Forbidden
              console.error('Access denied');
              break;
            case 404:
              // Not found
              console.error('Resource not found');
              break;
            case 500:
              // Server error
              console.error('Server error');
              break;
          }
        }
        
        console.error(errorMessage);
        return throwError(() => error);
      })
    );
  }
}
```

### 5.5 User-Friendly Error Messages

**Service with error handling:**

```typescript
@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar  // Material snackbar for notifications
  ) { }
  
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('/api/users').pipe(
      catchError(error => {
        this.handleError(error);
        return throwError(() => error);
      })
    );
  }
  
  private handleError(error: HttpErrorResponse) {
    let message = 'An error occurred';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      message = `Network error: ${error.error.message}`;
    } else {
      // Server-side error
      switch (error.status) {
        case 0:
          message = 'No connection to server';
          break;
        case 400:
          message = 'Invalid request';
          break;
        case 401:
          message = 'Please log in';
          break;
        case 404:
          message = 'Resource not found';
          break;
        case 500:
          message = 'Server error. Please try again later';
          break;
        default:
          message = error.error?.message || 'Something went wrong';
      }
    }
    
    this.snackBar.open(message, 'Close', { duration: 3000 });
  }
}
```

---

## 6. Request and Response Transformation

### 6.1 Transforming Requests

**Modify request before sending:**

```typescript
import { map } from 'rxjs/operators';

createUser(user: User): Observable<User> {
  // Transform before sending
  const userDto = {
    ...user,
    createdAt: new Date().toISOString()
  };
  
  return this.http.post<User>('/api/users', userDto);
}
```

### 6.2 Transforming Responses

**Modify response after receiving:**

```typescript
import { map } from 'rxjs/operators';

getUsers(): Observable<User[]> {
  return this.http.get<any[]>('/api/users').pipe(
    map(response => response.map(user => ({
      ...user,
      fullName: `${user.firstName} ${user.lastName}`,
      createdAt: new Date(user.createdAt)
    })))
  );
}
```

**Transform API response structure:**
```typescript
interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

getUsers(): Observable<User[]> {
  return this.http.get<ApiResponse<User[]>>('/api/users').pipe(
    map(response => response.data)  // Extract data only
  );
}
```

### 6.3 Using RxJS Operators

**Chain transformations:**

```typescript
import { map, filter, tap } from 'rxjs/operators';

getActiveUsers(): Observable<User[]> {
  return this.http.get<User[]>('/api/users').pipe(
    tap(users => console.log('Received users:', users.length)),
    map(users => users.filter(user => user.active)),
    tap(users => console.log('Active users:', users.length))
  );
}
```

**Combine multiple requests:**
```typescript
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

getUserWithPosts(userId: number): Observable<UserWithPosts> {
  return forkJoin({
    user: this.http.get<User>(`/api/users/${userId}`),
    posts: this.http.get<Post[]>(`/api/users/${userId}/posts`)
  }).pipe(
    map(({ user, posts }) => ({ ...user, posts }))
  );
}
```

### 6.4 Custom Response Types

**Get full HTTP response:**

```typescript
import { HttpResponse } from '@angular/common/http';

getUsers(): Observable<HttpResponse<User[]>> {
  return this.http.get<User[]>('/api/users', {
    observe: 'response'  // Get full response
  });
}

// Usage
this.getUsers().subscribe(response => {
  console.log('Status:', response.status);
  console.log('Headers:', response.headers);
  console.log('Body:', response.body);
});
```

**Get events (for progress tracking):**
```typescript
import { HttpEvent, HttpEventType } from '@angular/common/http';

uploadFile(file: File): Observable<HttpEvent<any>> {
  const formData = new FormData();
  formData.append('file', file);
  
  return this.http.post('/api/upload', formData, {
    reportProgress: true,
    observe: 'events'
  });
}

// Usage
this.uploadFile(file).subscribe(event => {
  if (event.type === HttpEventType.UploadProgress) {
    const progress = Math.round(100 * event.loaded / event.total!);
    console.log(`Upload progress: ${progress}%`);
  } else if (event.type === HttpEventType.Response) {
    console.log('Upload complete!');
  }
});
```

---

## 7. HTTP Headers and Parameters

### 7.1 Setting Headers

**Basic headers:**

```typescript
import { HttpHeaders } from '@angular/common/http';

getUsers(): Observable<User[]> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer token123'
  });
  
  return this.http.get<User[]>('/api/users', { headers });
}
```

**Add header to existing:**
```typescript
let headers = new HttpHeaders();
headers = headers.set('Content-Type', 'application/json');
headers = headers.set('Authorization', 'Bearer token123');

return this.http.get<User[]>('/api/users', { headers });
```

### 7.2 Query Parameters

**Simple parameters:**

```typescript
// GET /api/users?page=1&limit=10
getUsers(page: number, limit: number): Observable<User[]> {
  return this.http.get<User[]>('/api/users', {
    params: {
      page: page.toString(),
      limit: limit.toString()
    }
  });
}
```

### 7.3 HttpParams

**Using HttpParams:**

```typescript
import { HttpParams } from '@angular/common/http';

searchUsers(filters: any): Observable<User[]> {
  let params = new HttpParams();
  
  if (filters.name) {
    params = params.set('name', filters.name);
  }
  if (filters.age) {
    params = params.set('age', filters.age.toString());
  }
  if (filters.active !== undefined) {
    params = params.set('active', filters.active.toString());
  }
  
  return this.http.get<User[]>('/api/users/search', { params });
}
```

**From object:**
```typescript
searchUsers(filters: SearchFilters): Observable<User[]> {
  const params = new HttpParams({ fromObject: filters });
  return this.http.get<User[]>('/api/users/search', { params });
}
```

**Multiple values for same param:**
```typescript
// GET /api/users?role=admin&role=moderator
getUsersByRoles(roles: string[]): Observable<User[]> {
  let params = new HttpParams();
  roles.forEach(role => {
    params = params.append('role', role);
  });
  
  return this.http.get<User[]>('/api/users', { params });
}
```

### 7.4 Custom Headers

**Custom header for every request:**

```typescript
@Injectable({ providedIn: 'root' })
export class ApiService {
  private headers = new HttpHeaders({
    'X-App-Version': '1.0.0',
    'X-Client-Id': 'web-app'
  });
  
  constructor(private http: HttpClient) { }
  
  get<T>(url: string): Observable<T> {
    return this.http.get<T>(url, { headers: this.headers });
  }
}
```

### 7.5 Request Options

**All options:**

```typescript
interface RequestOptions {
  headers?: HttpHeaders;
  params?: HttpParams;
  reportProgress?: boolean;
  responseType?: 'json' | 'text' | 'blob' | 'arraybuffer';
  withCredentials?: boolean;
  observe?: 'body' | 'events' | 'response';
}

// Example
this.http.get('/api/users', {
  headers: new HttpHeaders({ 'Authorization': 'Bearer token' }),
  params: new HttpParams().set('page', '1'),
  reportProgress: true,
  observe: 'response',
  withCredentials: true
});
```

---

## 8. Observables vs Promises

### 8.1 Understanding the Difference

**Observable (default):**
```typescript
// Lazy - doesn't execute until subscribed
const users$ = this.http.get<User[]>('/api/users');

// Must subscribe to execute
users$.subscribe(users => console.log(users));
```

**Promise:**
```typescript
// Eager - executes immediately
const usersPromise = this.http.get<User[]>('/api/users').toPromise();

// Can use then/catch or async/await
usersPromise.then(users => console.log(users));
```

**Key Differences:**

| Feature | Observable | Promise |
|---------|-----------|---------|
| **Execution** | Lazy (on subscribe) | Eager (immediate) |
| **Cancellation** | Can cancel | Cannot cancel |
| **Multiple Values** | Can emit multiple | Single value |
| **Operators** | Many RxJS operators | Limited |

### 8.2 Converting to Promise

**Using toPromise (deprecated):**
```typescript
// Old way (deprecated)
async getUsers(): Promise<User[]> {
  return await this.http.get<User[]>('/api/users').toPromise();
}
```

**Using lastValueFrom (recommended):**
```typescript
import { lastValueFrom } from 'rxjs';

async getUsers(): Promise<User[]> {
  return await lastValueFrom(this.http.get<User[]>('/api/users'));
}

// Usage
async ngOnInit() {
  try {
    const users = await this.getUsers();
    console.log(users);
  } catch (error) {
    console.error(error);
  }
}
```

**Using firstValueFrom:**
```typescript
import { firstValueFrom } from 'rxjs';

async getFirstUser(): Promise<User> {
  const users$ = this.http.get<User[]>('/api/users');
  const users = await firstValueFrom(users$);
  return users[0];
}
```

### 8.3 When to Use Each

**Use Observables:**
- Default HTTP requests
- Need cancellation
- Need operators (map, filter, etc.)
- Reactive programming
- Real-time updates

**Use Promises:**
- async/await syntax preferred
- Simple one-time requests
- Integration with Promise-based code
- Simpler error handling

**Examples:**

**Observable approach:**
```typescript
export class UserComponent implements OnInit, OnDestroy {
  users: User[] = [];
  private subscription: Subscription;
  
  ngOnInit() {
    this.subscription = this.userService.getUsers()
      .subscribe(users => this.users = users);
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();  // Clean up
  }
}
```

**Promise approach:**
```typescript
export class UserComponent implements OnInit {
  users: User[] = [];
  
  async ngOnInit() {
    this.users = await this.userService.getUsers();
  }
  // No cleanup needed
}
```

### 8.4 Cancellation with Observables

**Cancel request:**

```typescript
export class SearchComponent {
  private searchSubscription?: Subscription;
  
  search(term: string) {
    // Cancel previous request
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
    
    // New request
    this.searchSubscription = this.http.get(`/api/search?q=${term}`)
      .subscribe(results => console.log(results));
  }
}
```

**Using takeUntil:**
```typescript
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export class UserComponent implements OnDestroy {
  private destroy$ = new Subject<void>();
  
  ngOnInit() {
    this.http.get<User[]>('/api/users')
      .pipe(takeUntil(this.destroy$))
      .subscribe(users => console.log(users));
  }
  
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```

---

## 9. Retry Logic

### 9.1 Simple Retry

**Retry failed requests:**

```typescript
import { retry } from 'rxjs/operators';

getUsers(): Observable<User[]> {
  return this.http.get<User[]>('/api/users').pipe(
    retry(3)  // Retry 3 times before failing
  );
}
```

### 9.2 Retry with Delay

**Wait before retrying:**

```typescript
import { retry, delay } from 'rxjs/operators';

getUsers(): Observable<User[]> {
  return this.http.get<User[]>('/api/users').pipe(
    retry({
      count: 3,
      delay: 1000  // Wait 1 second between retries
    })
  );
}
```

### 9.3 Conditional Retry

**Retry only specific errors:**

```typescript
import { retry, tap } from 'rxjs/operators';

getUsers(): Observable<User[]> {
  return this.http.get<User[]>('/api/users').pipe(
    retry({
      count: 3,
      delay: (error, retryCount) => {
        // Only retry on server errors (5xx)
        if (error.status >= 500) {
          console.log(`Retry ${retryCount} after error ${error.status}`);
          return timer(1000);  // Retry after 1 second
        }
        throw error;  // Don't retry client errors (4xx)
      }
    })
  );
}
```

### 9.4 Exponential Backoff

**Increase delay between retries:**

```typescript
import { retry, timer } from 'rxjs';

getUsers(): Observable<User[]> {
  return this.http.get<User[]>('/api/users').pipe(
    retry({
      count: 5,
      delay: (error, retryCount) => {
        const delayMs = Math.pow(2, retryCount) * 1000;  // 1s, 2s, 4s, 8s, 16s
        console.log(`Retry ${retryCount} in ${delayMs}ms`);
        return timer(delayMs);
      }
    })
  );
}
```

**Custom retry logic:**
```typescript
import { retryWhen, delay, take, concat } from 'rxjs/operators';

getUsers(): Observable<User[]> {
  return this.http.get<User[]>('/api/users').pipe(
    retryWhen(errors => 
      errors.pipe(
        delay(1000),  // Wait 1 second
        take(3),      // Try 3 times
        concat(throwError(() => new Error('Failed after 3 retries')))
      )
    )
  );
}
```

---

## 10. Caching Strategies

### 10.1 Simple Cache

**Cache in service:**

```typescript
@Injectable({ providedIn: 'root' })
export class UserService {
  private cache: User[] | null = null;
  
  constructor(private http: HttpClient) { }
  
  getUsers(forceRefresh = false): Observable<User[]> {
    // Return cached data
    if (this.cache && !forceRefresh) {
      return of(this.cache);
    }
    
    // Fetch and cache
    return this.http.get<User[]>('/api/users').pipe(
      tap(users => this.cache = users)
    );
  }
  
  clearCache() {
    this.cache = null;
  }
}
```

### 10.2 Cache with Expiration

**Time-based cache:**

```typescript
interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

@Injectable({ providedIn: 'root' })
export class CacheService {
  private cache = new Map<string, CacheEntry<any>>();
  private cacheTime = 5 * 60 * 1000;  // 5 minutes
  
  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    
    if (!entry) {
      return null;
    }
    
    // Check if expired
    const now = Date.now();
    if (now - entry.timestamp > this.cacheTime) {
      this.cache.delete(key);
      return null;
    }
    
    return entry.data;
  }
  
  set<T>(key: string, data: T) {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }
  
  clear(key?: string) {
    if (key) {
      this.cache.delete(key);
    } else {
      this.cache.clear();
    }
  }
}

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(
    private http: HttpClient,
    private cacheService: CacheService
  ) { }
  
  getUsers(): Observable<User[]> {
    const cacheKey = 'users';
    const cached = this.cacheService.get<User[]>(cacheKey);
    
    if (cached) {
      return of(cached);
    }
    
    return this.http.get<User[]>('/api/users').pipe(
      tap(users => this.cacheService.set(cacheKey, users))
    );
  }
}
```

### 10.3 Cache Interceptor

**Cache all GET requests:**

```typescript
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
  private cache = new Map<string, HttpResponse<any>>();
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Only cache GET requests
    if (req.method !== 'GET') {
      return next.handle(req);
    }
    
    // Check cache
    const cachedResponse = this.cache.get(req.url);
    if (cachedResponse) {
      console.log('Returning cached response for:', req.url);
      return of(cachedResponse);
    }
    
    // Fetch and cache
    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          this.cache.set(req.url, event);
        }
      })
    );
  }
}
```

### 10.4 Invalidating Cache

**Clear cache on mutations:**

```typescript
@Injectable({ providedIn: 'root' })
export class UserService {
  private usersCache$ = new BehaviorSubject<User[] | null>(null);
  
  constructor(private http: HttpClient) { }
  
  getUsers(): Observable<User[]> {
    if (this.usersCache$.value) {
      return this.usersCache$.asObservable();
    }
    
    return this.http.get<User[]>('/api/users').pipe(
      tap(users => this.usersCache$.next(users))
    );
  }
  
  createUser(user: User): Observable<User> {
    return this.http.post<User>('/api/users', user).pipe(
      tap(() => this.invalidateCache())
    );
  }
  
  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`/api/users/${id}`, user).pipe(
      tap(() => this.invalidateCache())
    );
  }
  
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`/api/users/${id}`).pipe(
      tap(() => this.invalidateCache())
    );
  }
  
  private invalidateCache() {
    this.usersCache$.next(null);
  }
}
```

---

## 11. CORS Handling

### 11.1 What is CORS?

**CORS (Cross-Origin Resource Sharing)** is a security feature that restricts web pages from making requests to a different domain.

**Example:**
```
Frontend: http://localhost:4200
Backend:  http://localhost:3000

Without CORS: Browser blocks request ❌
With CORS:    Request allowed ✓
```

### 11.2 CORS Errors

**Common error:**
```
Access to XMLHttpRequest at 'http://localhost:3000/api/users' 
from origin 'http://localhost:4200' has been blocked by CORS policy: 
No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

**What causes it:**
- Frontend and backend on different ports/domains
- Missing CORS headers on backend
- Preflight request failing

### 11.3 Proxy Configuration

**Development proxy (Angular):**

**Create proxy.conf.json:**
```json
{
  "/api": {
    "target": "http://localhost:3000",
    "secure": false,
    "changeOrigin": true
  }
}
```

**Update angular.json:**
```json
{
  "architect": {
    "serve": {
      "options": {
        "proxyConfig": "proxy.conf.json"
      }
    }
  }
}
```

**Now use relative URLs:**
```typescript
// Before (CORS error)
this.http.get('http://localhost:3000/api/users')

// After (works via proxy)
this.http.get('/api/users')
```

**Advanced proxy config:**
```json
{
  "/api": {
    "target": "http://localhost:3000",
    "secure": false,
    "logLevel": "debug",
    "changeOrigin": true,
    "pathRewrite": {
      "^/api": ""
    }
  }
}
```

### 11.4 CORS Headers

**Backend must send these headers:**

```typescript
// Express.js example
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');  // Allow all origins
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);  // Handle preflight
  }
  
  next();
});
```

**Using cors package:**
```typescript
import cors from 'cors';

app.use(cors({
  origin: 'http://localhost:4200',  // Allow specific origin
  credentials: true  // Allow cookies
}));
```

### 11.5 Backend Solutions

**Node.js/Express:**
```typescript
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/api/users', (req, res) => {
  res.json([{ id: 1, name: 'John' }]);
});

app.listen(3000);
```

**.NET Core:**
```csharp
public void ConfigureServices(IServiceCollection services)
{
    services.AddCors(options =>
    {
        options.AddPolicy("AllowAngular",
            builder => builder
                .WithOrigins("http://localhost:4200")
                .AllowAnyMethod()
                .AllowAnyHeader());
    });
}

public void Configure(IApplicationBuilder app)
{
    app.UseCors("AllowAngular");
}
```

**Production solution:**
- Deploy frontend and backend to same domain
- Or configure CORS properly on backend
- Or use API gateway

---

## Summary

You've mastered **Angular HTTP and Backend Communication**!

**Key Concepts:**

**1. HttpClient:**
- Import HttpClientModule
- Inject HttpClient
- Type-safe with generics
- Observable-based

**2. HTTP Methods:**
- **GET**: Retrieve data
- **POST**: Create data
- **PUT**: Update entire resource
- **PATCH**: Partial update
- **DELETE**: Remove resource

**3. Interceptors:**
- Modify requests/responses globally
- Add auth tokens
- Log requests
- Handle errors
- Functional (modern) or class-based

**4. Error Handling:**
- Client vs server errors
- catchError operator
- Global error handler
- Error interceptor
- User-friendly messages

**5. Advanced Features:**
- Request/response transformation
- Headers and parameters
- Observables vs Promises
- Retry logic
- Caching strategies
- CORS handling

**HTTP Checklist:**
```typescript
1. Import HttpClientModule
2. Inject HttpClient
3. Define interfaces for type safety
4. Handle errors
5. Add interceptors (auth, logging)
6. Implement retry logic
7. Consider caching
8. Handle CORS (development proxy)
```

**Best Practices:**
- Use type safety (interfaces + generics)
- Handle errors gracefully
- Use interceptors for cross-cutting concerns
- Implement retry for transient failures
- Cache when appropriate
- Cancel requests when component destroyed
- Use proxy for development CORS
- Transform data close to source
- Prefer Observables over Promises
- Unsubscribe to prevent memory leaks

**Common Patterns:**
```typescript
// Type-safe GET
getUsers(): Observable<User[]> {
  return this.http.get<User[]>('/api/users');
}

// Error handling
.pipe(
  catchError(error => {
    console.error(error);
    return throwError(() => error);
  })
)

// Retry with delay
.pipe(
  retry({ count: 3, delay: 1000 })
)

// Transform response
.pipe(
  map(response => response.data)
)

// Auth interceptor
const token = this.auth.getToken();
if (token) {
  req = req.clone({
    setHeaders: { Authorization: `Bearer ${token}` }
  });
}
```

Master these HTTP concepts to build robust, production-ready Angular applications that communicate efficiently with backend services!
