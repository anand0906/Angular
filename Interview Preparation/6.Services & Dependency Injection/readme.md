# Angular Services and Dependency Injection

## Index

1. [Introduction to Services](#1-introduction-to-services)
   - 1.1 [What are Services?](#11-what-are-services)
   - 1.2 [Why Use Services?](#12-why-use-services)
   - 1.3 [Service Examples](#13-service-examples)

2. [Creating and Using Services](#2-creating-and-using-services)
   - 2.1 [Creating a Service](#21-creating-a-service)
   - 2.2 [Service Structure](#22-service-structure)
   - 2.3 [Using Services in Components](#23-using-services-in-components)
   - 2.4 [Service Methods](#24-service-methods)
   - 2.5 [Service Properties](#25-service-properties)

3. [Dependency Injection Pattern](#3-dependency-injection-pattern)
   - 3.1 [What is Dependency Injection?](#31-what-is-dependency-injection)
   - 3.2 [How DI Works in Angular](#32-how-di-works-in-angular)
   - 3.3 [Constructor Injection](#33-constructor-injection)
   - 3.4 [Benefits of DI](#34-benefits-of-di)
   - 3.5 [DI Without Angular](#35-di-without-angular)

4. [Injectable Decorator and ProvidedIn](#4-injectable-decorator-and-providedin)
   - 4.1 [@Injectable Decorator](#41-injectable-decorator)
   - 4.2 [providedIn: 'root'](#42-providedin-root)
   - 4.3 [providedIn: 'any'](#43-providedin-any)
   - 4.4 [providedIn: Module](#44-providedin-module)
   - 4.5 [No providedIn (Manual Registration)](#45-no-providedin-manual-registration)

5. [Hierarchical Injector System](#5-hierarchical-injector-system)
   - 5.1 [Understanding the Hierarchy](#51-understanding-the-hierarchy)
   - 5.2 [Module Injector](#52-module-injector)
   - 5.3 [Element Injector](#53-element-injector)
   - 5.4 [Resolution Rules](#54-resolution-rules)
   - 5.5 [Practical Examples](#55-practical-examples)

6. [Provider Types](#6-provider-types)
   - 6.1 [useClass](#61-useclass)
   - 6.2 [useValue](#62-usevalue)
   - 6.3 [useFactory](#63-usefactory)
   - 6.4 [useExisting](#64-useexisting)
   - 6.5 [Multi Providers](#65-multi-providers)

7. [InjectionToken](#7-injectiontoken)
   - 7.1 [What is InjectionToken?](#71-what-is-injectiontoken)
   - 7.2 [Creating InjectionTokens](#72-creating-injectiontokens)
   - 7.3 [Using InjectionTokens](#73-using-injectiontokens)
   - 7.4 [Typed InjectionTokens](#74-typed-injectiontokens)
   - 7.5 [Common Use Cases](#75-common-use-cases)

8. [Optional and Self Decorators](#8-optional-and-self-decorators)
   - 8.1 [@Optional Decorator](#81-optional-decorator)
   - 8.2 [@Self Decorator](#82-self-decorator)
   - 8.3 [@SkipSelf Decorator](#83-skipself-decorator)
   - 8.4 [@Host Decorator](#84-host-decorator)
   - 8.5 [Combining Decorators](#85-combining-decorators)

9. [Service Scope](#9-service-scope)
   - 9.1 [Root Level Services](#91-root-level-services)
   - 9.2 [Module Level Services](#92-module-level-services)
   - 9.3 [Component Level Services](#93-component-level-services)
   - 9.4 [Choosing the Right Scope](#94-choosing-the-right-scope)
   - 9.5 [Scope Best Practices](#95-scope-best-practices)

---

## 1. Introduction to Services

### 1.1 What are Services?

Services are **classes that handle business logic, data, or functionality** that needs to be shared across components.

**Think of it like:**
A utility company that provides water to multiple houses. One service provides functionality to many components.

**Key Characteristics:**
- Reusable code
- Single responsibility
- Shared across components
- Stateful or stateless
- Injectable via DI

**Simple Example:**
```typescript
// Service: Provides data
@Injectable({
  providedIn: 'root'
})
export class DataService {
  getData() {
    return ['Item 1', 'Item 2', 'Item 3'];
  }
}

// Component 1: Uses service
export class Component1 {
  constructor(private dataService: DataService) {
    this.items = this.dataService.getData();
  }
}

// Component 2: Uses same service
export class Component2 {
  constructor(private dataService: DataService) {
    this.items = this.dataService.getData();
  }
}
```

### 1.2 Why Use Services?

**1. Code Reusability:**
```typescript
// ✗ Without service: Duplicate code
export class Component1 {
  getData() {
    return ['Item 1', 'Item 2'];
  }
}

export class Component2 {
  getData() {
    return ['Item 1', 'Item 2'];  // Duplicate!
  }
}

// ✓ With service: Reuse code
@Injectable({ providedIn: 'root' })
export class DataService {
  getData() {
    return ['Item 1', 'Item 2'];
  }
}
```

**2. Separation of Concerns:**
```typescript
// Components handle UI
// Services handle business logic
```

**3. Testability:**
```typescript
// Easy to test service independently
// Easy to mock service in component tests
```

**4. State Management:**
```typescript
// Share state across components
@Injectable({ providedIn: 'root' })
export class StateService {
  private count = 0;
  
  increment() {
    this.count++;
  }
  
  getCount() {
    return this.count;
  }
}
```

### 1.3 Service Examples

**Common Service Types:**

**1. Data Service:**
```typescript
@Injectable({ providedIn: 'root' })
export class UserService {
  getUsers() {
    return ['John', 'Jane', 'Bob'];
  }
  
  getUser(id: number) {
    return { id, name: 'John' };
  }
}
```

**2. HTTP Service:**
```typescript
@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) { }
  
  getPosts() {
    return this.http.get('/api/posts');
  }
}
```

**3. Utility Service:**
```typescript
@Injectable({ providedIn: 'root' })
export class UtilityService {
  generateId() {
    return Math.random().toString(36).substr(2, 9);
  }
  
  formatDate(date: Date) {
    return date.toLocaleDateString();
  }
}
```

**4. State Service:**
```typescript
@Injectable({ providedIn: 'root' })
export class CartService {
  private items: any[] = [];
  
  addItem(item: any) {
    this.items.push(item);
  }
  
  getItems() {
    return this.items;
  }
  
  clearCart() {
    this.items = [];
  }
}
```

---

## 2. Creating and Using Services

### 2.1 Creating a Service

**Using Angular CLI:**
```bash
ng generate service data
# or shorthand
ng g s data
```

**Creates:**
```typescript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor() { }
}
```

**Manual Creation:**
```typescript
// data.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  getData() {
    return ['Item 1', 'Item 2', 'Item 3'];
  }
}
```

### 2.2 Service Structure

**Basic Service Structure:**

```typescript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'  // Registration
})
export class MyService {
  // Properties
  private data: any[] = [];
  
  // Constructor (for DI)
  constructor() { }
  
  // Methods
  getData() {
    return this.data;
  }
  
  addData(item: any) {
    this.data.push(item);
  }
}
```

**Service with Dependencies:**
```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }
  
  fetchData() {
    return this.http.get('/api/data');
  }
}
```

### 2.3 Using Services in Components

**Simple Example:**

**Service:**
```typescript
@Injectable({
  providedIn: 'root'
})
export class GreetingService {
  getGreeting() {
    return 'Hello from service!';
  }
}
```

**Component:**
```typescript
import { Component } from '@angular/core';
import { GreetingService } from './greeting.service';

@Component({
  selector: 'app-hello',
  template: '<p>{{ message }}</p>'
})
export class HelloComponent {
  message: string;
  
  // Inject service via constructor
  constructor(private greetingService: GreetingService) {
    this.message = this.greetingService.getGreeting();
  }
}
```

**Output:**
```
Hello from service!
```

**Multiple Components Using Same Service:**

```typescript
// Component A
export class ComponentA {
  constructor(private dataService: DataService) {
    console.log(this.dataService.getData());
  }
}

// Component B
export class ComponentB {
  constructor(private dataService: DataService) {
    console.log(this.dataService.getData());
  }
}

// Both get the same service instance (singleton)
```

### 2.4 Service Methods

**Simple Methods:**

```typescript
@Injectable({ providedIn: 'root' })
export class MathService {
  add(a: number, b: number): number {
    return a + b;
  }
  
  subtract(a: number, b: number): number {
    return a - b;
  }
  
  multiply(a: number, b: number): number {
    return a * b;
  }
}
```

**Usage:**
```typescript
export class CalculatorComponent {
  result: number;
  
  constructor(private mathService: MathService) {
    this.result = this.mathService.add(5, 3);  // 8
  }
}
```

**Methods with Side Effects:**

```typescript
@Injectable({ providedIn: 'root' })
export class LoggerService {
  private logs: string[] = [];
  
  log(message: string) {
    this.logs.push(message);
    console.log(message);
  }
  
  error(message: string) {
    this.logs.push(`ERROR: ${message}`);
    console.error(message);
  }
  
  getLogs() {
    return this.logs;
  }
}
```

**Async Methods:**

```typescript
@Injectable({ providedIn: 'root' })
export class DataService {
  constructor(private http: HttpClient) { }
  
  // Returns Observable
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('/api/users');
  }
  
  // Returns Promise
  async getUserAsync(id: number): Promise<User> {
    const response = await this.http.get<User>(`/api/users/${id}`).toPromise();
    return response;
  }
}
```

### 2.5 Service Properties

**Simple Properties:**

```typescript
@Injectable({ providedIn: 'root' })
export class ConfigService {
  apiUrl = 'https://api.example.com';
  timeout = 5000;
  retryAttempts = 3;
}
```

**Usage:**
```typescript
export class Component {
  constructor(private config: ConfigService) {
    console.log(this.config.apiUrl);  // https://api.example.com
  }
}
```

**Private Properties (Encapsulation):**

```typescript
@Injectable({ providedIn: 'root' })
export class CounterService {
  private count = 0;  // Private
  
  // Public methods to access private property
  increment() {
    this.count++;
  }
  
  getCount() {
    return this.count;
  }
}
```

**Observable Properties:**

```typescript
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StateService {
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();
  
  setUser(user: User) {
    this.userSubject.next(user);
  }
}
```

**Usage:**
```typescript
export class Component implements OnInit {
  user: User | null = null;
  
  constructor(private stateService: StateService) { }
  
  ngOnInit() {
    this.stateService.user$.subscribe(user => {
      this.user = user;
    });
  }
}
```

---

## 3. Dependency Injection Pattern

### 3.1 What is Dependency Injection?

**Dependency Injection (DI)** is a design pattern where a class receives its dependencies from external sources rather than creating them itself.

**Think of it like:**
A restaurant where waiters bring you food (dependencies) instead of you going to the kitchen to make it yourself.

**Visual:**
```
Without DI:
Component → Creates Service → Uses Service

With DI:
Injector → Creates Service → Injects into Component → Component Uses Service
```

### 3.2 How DI Works in Angular

**Angular's DI System:**

1. **Register** the service (provider)
2. **Request** the service (in constructor)
3. **Receive** the service instance (Angular creates/provides it)

**Simple Example:**

```typescript
// 1. Register service
@Injectable({
  providedIn: 'root'  // Registration
})
export class DataService {
  getData() {
    return ['Item 1', 'Item 2'];
  }
}

// 2. Request service
export class MyComponent {
  constructor(private dataService: DataService) {
    // 3. Receive and use service
    console.log(this.dataService.getData());
  }
}
```

**What Angular Does:**
```typescript
// Behind the scenes (simplified):
const injector = new Injector();
injector.register(DataService);

const service = injector.get(DataService);
const component = new MyComponent(service);
```

### 3.3 Constructor Injection

**Constructor injection is the standard way to inject services:**

**Basic Syntax:**
```typescript
constructor(private serviceName: ServiceType) { }
```

**Simple Example:**
```typescript
export class MyComponent {
  // Private property automatically created
  constructor(private dataService: DataService) { }
  
  getData() {
    return this.dataService.getData();
  }
}
```

**Multiple Services:**
```typescript
export class MyComponent {
  constructor(
    private dataService: DataService,
    private loggerService: LoggerService,
    private authService: AuthService
  ) { }
}
```

**Access Modifiers:**
```typescript
// Private (most common)
constructor(private dataService: DataService) { }
// Can only access inside class

// Public
constructor(public dataService: DataService) { }
// Can access in template: {{ dataService.getData() }}

// Protected
constructor(protected dataService: DataService) { }
// Can access in class and child classes

// No modifier (not common)
constructor(dataService: DataService) {
  // Must assign manually
  this.dataService = dataService;
}
```

### 3.4 Benefits of DI

**1. Loose Coupling:**
```typescript
// Components don't create services
// Easy to change implementation
export class Component {
  constructor(private service: DataService) { }
}
```

**2. Testability:**
```typescript
// Easy to mock services in tests
TestBed.configureTestingModule({
  providers: [
    { provide: DataService, useValue: mockDataService }
  ]
});
```

**3. Reusability:**
```typescript
// Same service used by multiple components
// Single instance shared (singleton)
```

**4. Maintainability:**
```typescript
// Change service implementation in one place
// All components get updated automatically
```

### 3.5 DI Without Angular

**Without DI (Manual Creation):**
```typescript
export class Component {
  private dataService: DataService;
  
  constructor() {
    // Component creates its own dependency
    this.dataService = new DataService();
  }
}

// Problems:
// - Hard to test (can't mock DataService)
// - Tight coupling
// - Component must know how to create DataService
```

**With DI (Angular):**
```typescript
export class Component {
  constructor(private dataService: DataService) {
    // Angular provides the dependency
  }
}

// Benefits:
// - Easy to test (can inject mock)
// - Loose coupling
// - Component doesn't know how DataService is created
```

---

## 4. Injectable Decorator and ProvidedIn

### 4.1 @Injectable Decorator

**@Injectable marks a class as available for injection.**

**Basic Syntax:**
```typescript
import { Injectable } from '@angular/core';

@Injectable()
export class MyService {
  // Service code
}
```

**Why needed?**
- Tells Angular this class can be injected
- Required if service has dependencies
- Best practice to always use it

**Service with Dependencies:**
```typescript
@Injectable({
  providedIn: 'root'
})
export class UserService {
  // This service depends on HttpClient
  constructor(private http: HttpClient) { }
}
```

**Without @Injectable (error):**
```typescript
// ✗ Error if service has dependencies
export class MyService {
  constructor(private http: HttpClient) { }  // Error!
}
```

### 4.2 providedIn: 'root'

**Provides service at root level (singleton across entire app).**

**Syntax:**
```typescript
@Injectable({
  providedIn: 'root'
})
export class DataService {
  // Available throughout entire app
}
```

**Characteristics:**
- Single instance for entire app
- Lazy loaded (only created when first injected)
- Tree-shakeable (removed if not used)
- **Most common approach**

**Simple Example:**
```typescript
@Injectable({
  providedIn: 'root'
})
export class CounterService {
  private count = 0;
  
  increment() {
    this.count++;
  }
  
  getCount() {
    return this.count;
  }
}
```

**Usage in Multiple Components:**
```typescript
// Component A
export class ComponentA {
  constructor(private counter: CounterService) {
    this.counter.increment();
    console.log(this.counter.getCount());  // 1
  }
}

// Component B
export class ComponentB {
  constructor(private counter: CounterService) {
    this.counter.increment();
    console.log(this.counter.getCount());  // 2 (same instance!)
  }
}
```

### 4.3 providedIn: 'any'

**Creates a new instance for each lazy-loaded module.**

**Syntax:**
```typescript
@Injectable({
  providedIn: 'any'
})
export class LoggerService {
  // New instance per lazy-loaded module
}
```

**Use Case:**
- When you want separate instances for lazy-loaded modules
- Rare use case

**Behavior:**
```
App Module → Instance 1
Lazy Module A → Instance 2
Lazy Module B → Instance 3
```

### 4.4 providedIn: Module

**Provides service in a specific module.**

**Syntax:**
```typescript
@Injectable({
  providedIn: MyModule
})
export class ModuleService {
  // Available in MyModule
}
```

**Example:**
```typescript
// feature.module.ts
@NgModule({
  // ...
})
export class FeatureModule { }

// service.ts
@Injectable({
  providedIn: FeatureModule
})
export class FeatureService {
  // Available in FeatureModule and its components
}
```

### 4.5 No providedIn (Manual Registration)

**Register service manually in module or component.**

**Service:**
```typescript
@Injectable()  // No providedIn
export class ManualService {
  // Must be registered manually
}
```

**Module Registration:**
```typescript
@NgModule({
  providers: [ManualService]  // Register here
})
export class AppModule { }
```

**Component Registration:**
```typescript
@Component({
  selector: 'app-example',
  providers: [ManualService]  // Register here
})
export class ExampleComponent { }
```

---

## 5. Hierarchical Injector System

### 5.1 Understanding the Hierarchy

**Angular has a tree of injectors:**

```
Root Injector (platform level)
    ↓
Module Injector (app level)
    ↓
Component Injector (component level)
    ↓
Element Injector (directive level)
```

**Visual Example:**
```
AppModule
├── Service A (provided in root)
├── Component 1
│   ├── Service B (provided in component)
│   └── Child Component 1.1
│       └── Service C (provided in component)
└── Component 2
    └── Uses Service A (from root)
```

**Resolution:**
Component looks for service in this order:
1. Own injector
2. Parent component injector
3. Module injector
4. Root injector

### 5.2 Module Injector

**Services provided at module level.**

**Example:**
```typescript
@Injectable()
export class ModuleService {
  constructor() {
    console.log('Module service created');
  }
}

@NgModule({
  providers: [ModuleService]  // Module level
})
export class FeatureModule { }
```

**Behavior:**
- Single instance per module
- Shared by all components in module
- Not shared with other modules (unless imported)

### 5.3 Element Injector

**Services provided at component level.**

**Example:**
```typescript
@Injectable()
export class ComponentService {
  constructor() {
    console.log('Component service created');
  }
}

@Component({
  selector: 'app-example',
  providers: [ComponentService]  // Component level
})
export class ExampleComponent { }
```

**Behavior:**
- New instance per component
- Shared with child components
- Not shared with sibling components

### 5.4 Resolution Rules

**How Angular finds services:**

**Example Hierarchy:**
```typescript
// Root service
@Injectable({ providedIn: 'root' })
export class RootService {
  name = 'Root Service';
}

// Parent component
@Component({
  providers: [
    { provide: RootService, useValue: { name: 'Parent Service' } }
  ]
})
export class ParentComponent {
  constructor(private service: RootService) {
    console.log(this.service.name);  // Parent Service
  }
}

// Child component
@Component({ })
export class ChildComponent {
  constructor(private service: RootService) {
    console.log(this.service.name);  // Parent Service (inherited)
  }
}
```

**Resolution Order:**
```
1. Check own providers
2. Check parent component providers
3. Check ancestor component providers
4. Check module providers
5. Check root providers
6. Throw error if not found
```

### 5.5 Practical Examples

**Example 1: Different Instances per Component**

```typescript
@Injectable()
export class CounterService {
  count = 0;
  
  increment() {
    this.count++;
  }
}

// Component A
@Component({
  providers: [CounterService]  // Own instance
})
export class ComponentA {
  constructor(private counter: CounterService) {
    this.counter.increment();
    console.log(this.counter.count);  // 1
  }
}

// Component B
@Component({
  providers: [CounterService]  // Own instance
})
export class ComponentB {
  constructor(private counter: CounterService) {
    this.counter.increment();
    console.log(this.counter.count);  // 1 (different instance)
  }
}
```

**Example 2: Shared Instance**

```typescript
@Injectable({
  providedIn: 'root'  // Single instance
})
export class CounterService {
  count = 0;
  
  increment() {
    this.count++;
  }
}

// Component A
export class ComponentA {
  constructor(private counter: CounterService) {
    this.counter.increment();
    console.log(this.counter.count);  // 1
  }
}

// Component B
export class ComponentB {
  constructor(private counter: CounterService) {
    this.counter.increment();
    console.log(this.counter.count);  // 2 (same instance)
  }
}
```

**Example 3: Parent-Child Sharing**

```typescript
// Parent provides service
@Component({
  selector: 'app-parent',
  providers: [SharedService]
})
export class ParentComponent {
  constructor(private shared: SharedService) { }
}

// Child uses parent's service
@Component({
  selector: 'app-child'
})
export class ChildComponent {
  constructor(private shared: SharedService) {
    // Gets service from parent
  }
}

// Sibling doesn't get parent's service
@Component({
  selector: 'app-sibling'
})
export class SiblingComponent {
  constructor(private shared: SharedService) {
    // Error! Service not found
  }
}
```

---

## 6. Provider Types

### 6.1 useClass

**Provides a class (most common).**

**Syntax:**
```typescript
{ provide: Token, useClass: ImplementationClass }
```

**Simple Example:**
```typescript
@Injectable()
export class DataService {
  getData() {
    return ['Real Data'];
  }
}

@NgModule({
  providers: [
    { provide: DataService, useClass: DataService }
    // Same as: [DataService]
  ]
})
```

**Substitution Example:**
```typescript
// Interface or abstract class
export abstract class LoggerService {
  abstract log(message: string): void;
}

// Implementation
@Injectable()
export class ConsoleLogger implements LoggerService {
  log(message: string) {
    console.log(message);
  }
}

// Another implementation
@Injectable()
export class FileLogger implements LoggerService {
  log(message: string) {
    // Write to file
  }
}

// Provide
@NgModule({
  providers: [
    { provide: LoggerService, useClass: ConsoleLogger }
  ]
})
```

**Usage:**
```typescript
export class Component {
  constructor(private logger: LoggerService) {
    this.logger.log('Hello');  // Uses ConsoleLogger
  }
}
```

**Switch implementations easily:**
```typescript
// Development
{ provide: LoggerService, useClass: ConsoleLogger }

// Production
{ provide: LoggerService, useClass: FileLogger }
```

### 6.2 useValue

**Provides a static value or object.**

**Syntax:**
```typescript
{ provide: Token, useValue: value }
```

**Simple Example:**
```typescript
// Provide configuration
const config = {
  apiUrl: 'https://api.example.com',
  timeout: 5000
};

@NgModule({
  providers: [
    { provide: 'APP_CONFIG', useValue: config }
  ]
})
```

**Usage:**
```typescript
export class Component {
  constructor(@Inject('APP_CONFIG') private config: any) {
    console.log(this.config.apiUrl);
  }
}
```

**Mock for Testing:**
```typescript
const mockDataService = {
  getData: () => ['Mock Data']
};

TestBed.configureTestingModule({
  providers: [
    { provide: DataService, useValue: mockDataService }
  ]
});
```

**Constants:**
```typescript
@NgModule({
  providers: [
    { provide: 'API_URL', useValue: 'https://api.example.com' },
    { provide: 'VERSION', useValue: '1.0.0' },
    { provide: 'DEBUG', useValue: true }
  ]
})
```

### 6.3 useFactory

**Provides a value returned by a factory function.**

**Syntax:**
```typescript
{ provide: Token, useFactory: factoryFunction, deps: [Dependencies] }
```

**Simple Example:**
```typescript
function loggerFactory() {
  return new ConsoleLogger();
}

@NgModule({
  providers: [
    { provide: LoggerService, useFactory: loggerFactory }
  ]
})
```

**With Dependencies:**
```typescript
function loggerFactory(http: HttpClient, config: Config) {
  if (config.logToServer) {
    return new ServerLogger(http);
  }
  return new ConsoleLogger();
}

@NgModule({
  providers: [
    {
      provide: LoggerService,
      useFactory: loggerFactory,
      deps: [HttpClient, Config]  // Dependencies
    }
  ]
})
```

**Conditional Provider:**
```typescript
function storageFactory() {
  if (typeof localStorage !== 'undefined') {
    return localStorage;
  }
  return new InMemoryStorage();  // Fallback for server-side
}

@NgModule({
  providers: [
    { provide: 'STORAGE', useFactory: storageFactory }
  ]
})
```

**Real Example - Environment-based:**
```typescript
function apiServiceFactory(http: HttpClient, env: Environment) {
  if (env.production) {
    return new ProductionApiService(http, env.apiUrl);
  }
  return new MockApiService();
}

@NgModule({
  providers: [
    {
      provide: ApiService,
      useFactory: apiServiceFactory,
      deps: [HttpClient, Environment]
    }
  ]
})
```

### 6.4 useExisting

**Creates an alias for an existing provider.**

**Syntax:**
```typescript
{ provide: Token, useExisting: ExistingToken }
```

**Simple Example:**
```typescript
@Injectable({ providedIn: 'root' })
export class LoggerService {
  log(message: string) {
    console.log(message);
  }
}

@NgModule({
  providers: [
    // Create alias
    { provide: 'Logger', useExisting: LoggerService }
  ]
})
```

**Usage:**
```typescript
export class Component {
  constructor(
    @Inject('Logger') private logger: LoggerService
  ) {
    this.logger.log('Hello');
  }
}
```

**Real Use Case - Backward Compatibility:**
```typescript
// Old service name
export class OldDataService { }

// New service name
@Injectable({ providedIn: 'root' })
export class DataService { }

@NgModule({
  providers: [
    // Alias old name to new service
    { provide: OldDataService, useExisting: DataService }
  ]
})
```

**Now both work:**
```typescript
// Old code still works
constructor(private oldService: OldDataService) { }

// New code
constructor(private newService: DataService) { }

// Both get the same instance
```

### 6.5 Multi Providers

**Provide multiple values for a single token.**

**Syntax:**
```typescript
{ provide: Token, useValue: value, multi: true }
```

**Simple Example:**
```typescript
// Multiple interceptors
@NgModule({
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true }
  ]
})
```

**Custom Multi Provider:**
```typescript
export const VALIDATORS = new InjectionToken<Validator[]>('VALIDATORS');

@NgModule({
  providers: [
    { provide: VALIDATORS, useClass: EmailValidator, multi: true },
    { provide: VALIDATORS, useClass: PhoneValidator, multi: true },
    { provide: VALIDATORS, useClass: ZipValidator, multi: true }
  ]
})
```

**Usage:**
```typescript
export class FormComponent {
  constructor(@Inject(VALIDATORS) private validators: Validator[]) {
    // validators is an array of all provided validators
    console.log(validators.length);  // 3
  }
}
```

---

## 7. InjectionToken

### 7.1 What is InjectionToken?

**InjectionToken creates a unique token for non-class dependencies.**

**Why needed?**
- Can't use strings as tokens (collision risk)
- Can't inject primitives or objects directly
- Provides type safety

**Think of it like:**
A unique ID card for non-class values.

### 7.2 Creating InjectionTokens

**Basic Syntax:**
```typescript
import { InjectionToken } from '@angular/core';

export const TOKEN_NAME = new InjectionToken<Type>('Description');
```

**Simple Example:**
```typescript
// Create token
export const API_URL = new InjectionToken<string>('API URL');

// Provide value
@NgModule({
  providers: [
    { provide: API_URL, useValue: 'https://api.example.com' }
  ]
})
```

**Usage:**
```typescript
export class Component {
  constructor(@Inject(API_URL) private apiUrl: string) {
    console.log(this.apiUrl);  // https://api.example.com
  }
}
```

### 7.3 Using InjectionTokens

**Configuration Object:**
```typescript
// Define config interface
export interface AppConfig {
  apiUrl: string;
  timeout: number;
  retries: number;
}

// Create token
export const APP_CONFIG = new InjectionToken<AppConfig>('Application Config');

// Provide config
const config: AppConfig = {
  apiUrl: 'https://api.example.com',
  timeout: 5000,
  retries: 3
};

@NgModule({
  providers: [
    { provide: APP_CONFIG, useValue: config }
  ]
})
```

**Usage:**
```typescript
export class ApiService {
  constructor(@Inject(APP_CONFIG) private config: AppConfig) {
    console.log(this.config.apiUrl);
    console.log(this.config.timeout);
  }
}
```

### 7.4 Typed InjectionTokens

**Generic type provides IntelliSense:**

```typescript
// Typed token
export const MAX_RETRIES = new InjectionToken<number>('Max Retries');

// Provide
@NgModule({
  providers: [
    { provide: MAX_RETRIES, useValue: 3 }
  ]
})

// Use (with type safety)
export class Component {
  constructor(@Inject(MAX_RETRIES) private maxRetries: number) {
    // maxRetries is typed as number
    console.log(this.maxRetries + 1);  // Type-safe
  }
}
```

**Complex Type:**
```typescript
export interface Logger {
  log(message: string): void;
  error(message: string): void;
}

export const LOGGER = new InjectionToken<Logger>('Logger');

@NgModule({
  providers: [
    {
      provide: LOGGER,
      useValue: {
        log: (msg) => console.log(msg),
        error: (msg) => console.error(msg)
      }
    }
  ]
})
```

### 7.5 Common Use Cases

**1. Feature Flags:**
```typescript
export const FEATURE_FLAGS = new InjectionToken<{[key: string]: boolean}>('Feature Flags');

@NgModule({
  providers: [
    {
      provide: FEATURE_FLAGS,
      useValue: {
        newUI: true,
        betaFeatures: false,
        analytics: true
      }
    }
  ]
})
```

**2. API Endpoints:**
```typescript
export const API_ENDPOINTS = new InjectionToken<{[key: string]: string}>('API Endpoints');

@NgModule({
  providers: [
    {
      provide: API_ENDPOINTS,
      useValue: {
        users: '/api/users',
        posts: '/api/posts',
        comments: '/api/comments'
      }
    }
  ]
})
```

**3. Default Values:**
```typescript
export const DEFAULT_TIMEOUT = new InjectionToken<number>('Default Timeout', {
  providedIn: 'root',
  factory: () => 5000  // Default factory
});
```

**4. Environment-Specific Config:**
```typescript
export const ENVIRONMENT = new InjectionToken<any>('Environment');

@NgModule({
  providers: [
    {
      provide: ENVIRONMENT,
      useValue: environment  // from environment.ts
    }
  ]
})
```

---

## 8. Optional and Self Decorators

### 8.1 @Optional Decorator

**@Optional makes a dependency optional (won't throw error if not found).**

**Syntax:**
```typescript
constructor(@Optional() private service: ServiceType | null) { }
```

**Simple Example:**
```typescript
@Injectable()
export class OptionalService {
  getMessage() {
    return 'Service exists!';
  }
}

export class Component {
  constructor(@Optional() private service: OptionalService | null) {
    if (this.service) {
      console.log(this.service.getMessage());
    } else {
      console.log('Service not provided');
    }
  }
}
```

**Real Use Case:**
```typescript
export class Component {
  constructor(
    @Optional() private logger: LoggerService | null
  ) {
    // Logging is optional
    this.logger?.log('Component initialized');
  }
}
```

### 8.2 @Self Decorator

**@Self limits dependency lookup to the component's own injector.**

**Syntax:**
```typescript
constructor(@Self() private service: ServiceType) { }
```

**Simple Example:**
```typescript
@Injectable()
export class MyService {
  name = 'Default';
}

// Parent provides service
@Component({
  selector: 'app-parent',
  providers: [{ provide: MyService, useValue: { name: 'Parent' } }]
})
export class ParentComponent { }

// Child with @Self
@Component({
  selector: 'app-child',
  providers: [{ provide: MyService, useValue: { name: 'Child' } }]
})
export class ChildComponent {
  constructor(@Self() private service: MyService) {
    console.log(this.service.name);  // Child (own injector)
  }
}

// Child without @Self
@Component({
  selector: 'app-child2'
})
export class ChildComponent2 {
  constructor(private service: MyService) {
    console.log(this.service.name);  // Parent (inherited)
  }
}
```

**Use Case:**
```typescript
@Component({
  providers: [MyService]  // Must provide here
})
export class Component {
  constructor(@Self() private service: MyService) {
    // Ensures using this component's service
    // Not inherited from parent
  }
}
```

### 8.3 @SkipSelf Decorator

**@SkipSelf skips the component's own injector and starts from parent.**

**Syntax:**
```typescript
constructor(@SkipSelf() private service: ServiceType) { }
```

**Simple Example:**
```typescript
@Injectable()
export class MyService {
  name: string;
  constructor() {
    this.name = 'Service';
  }
}

// Parent
@Component({
  providers: [{ provide: MyService, useValue: { name: 'Parent Service' } }]
})
export class ParentComponent { }

// Child with own provider
@Component({
  providers: [{ provide: MyService, useValue: { name: 'Child Service' } }]
})
export class ChildComponent {
  constructor(@SkipSelf() private service: MyService) {
    console.log(this.service.name);  // Parent Service (skipped own)
  }
}
```

**Use Case - Singleton Pattern:**
```typescript
@Injectable()
export class SingletonService {
  constructor(@Optional() @SkipSelf() private parent: SingletonService | null) {
    if (parent) {
      throw new Error('SingletonService already exists!');
    }
  }
}
```

### 8.4 @Host Decorator

**@Host limits lookup to the host component.**

**Syntax:**
```typescript
constructor(@Host() private service: ServiceType) { }
```

**Simple Example:**
```typescript
// Host component
@Component({
  selector: 'app-host',
  providers: [MyService],
  template: '<ng-content></ng-content>'
})
export class HostComponent { }

// Projected content
@Component({
  selector: 'app-content'
})
export class ContentComponent {
  constructor(@Host() private service: MyService) {
    // Gets service from host component
  }
}
```

**Usage:**
```html
<app-host>
  <app-content></app-content>
</app-host>
```

### 8.5 Combining Decorators

**Can combine decorators for specific behavior:**

**@Optional + @Self:**
```typescript
constructor(
  @Optional() @Self() private service: ServiceType | null
) {
  // Optional service from own injector only
}
```

**@Optional + @Host:**
```typescript
constructor(
  @Optional() @Host() private service: ServiceType | null
) {
  // Optional service from host component
}
```

**@SkipSelf + @Optional:**
```typescript
constructor(
  @SkipSelf() @Optional() private parent: ServiceType | null
) {
  // Optional service from parent (skip own)
}
```

**Real Example:**
```typescript
@Injectable()
export class ConfigService {
  constructor(
    @Optional() @SkipSelf() private parentConfig: ConfigService | null
  ) {
    // Inherit parent config if exists
    if (this.parentConfig) {
      this.mergeConfig(this.parentConfig);
    }
  }
}
```

---

## 9. Service Scope

### 9.1 Root Level Services

**Provided at root level (singleton for entire app).**

**Creation:**
```typescript
@Injectable({
  providedIn: 'root'
})
export class RootService {
  // Single instance app-wide
}
```

**Characteristics:**
- ✓ Single instance
- ✓ Available everywhere
- ✓ Lazy loaded
- ✓ Tree-shakeable
- ✓ Survives navigation

**Use Cases:**
- Authentication service
- Configuration service
- Global state management
- HTTP services
- Logging service

**Example:**
```typescript
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: User | null = null;
  
  login(user: User) {
    this.currentUser = user;
  }
  
  isLoggedIn() {
    return this.currentUser !== null;
  }
}
```

**Shared Across App:**
```typescript
// Component A
export class ComponentA {
  constructor(private auth: AuthService) {
    this.auth.login(user);
  }
}

// Component B (anywhere in app)
export class ComponentB {
  constructor(private auth: AuthService) {
    console.log(this.auth.isLoggedIn());  // true (same instance)
  }
}
```

### 9.2 Module Level Services

**Provided at module level (singleton per module).**

**Creation:**
```typescript
@Injectable()
export class ModuleService {
  // Provided in module
}

@NgModule({
  providers: [ModuleService]
})
export class FeatureModule { }
```

**Characteristics:**
- ✓ Single instance per module
- ✓ Available to module components
- ✗ Not tree-shakeable
- ✗ Can create multiple instances (if module imported multiple times)

**Use Cases:**
- Feature-specific services
- Module-scoped data
- Services used only in one module

**Example:**
```typescript
@Injectable()
export class ShoppingCartService {
  private items: any[] = [];
  
  addItem(item: any) {
    this.items.push(item);
  }
}

@NgModule({
  declarations: [ProductListComponent, CartComponent],
  providers: [ShoppingCartService]  // Module level
})
export class ShopModule { }
```

### 9.3 Component Level Services

**Provided at component level (new instance per component).**

**Creation:**
```typescript
@Injectable()
export class ComponentService {
  // Provided in component
}

@Component({
  selector: 'app-example',
  providers: [ComponentService]  // Component level
})
export class ExampleComponent { }
```

**Characteristics:**
- ✓ New instance per component
- ✓ Isolated state
- ✓ Destroyed with component
- ✗ Not shared with other components

**Use Cases:**
- Component-specific state
- Isolated functionality
- Form services
- Widget services

**Example:**
```typescript
@Injectable()
export class FormService {
  private formData: any = {};
  
  setValue(key: string, value: any) {
    this.formData[key] = value;
  }
  
  getData() {
    return this.formData;
  }
}

@Component({
  selector: 'app-user-form',
  providers: [FormService]  // Each instance gets own service
})
export class UserFormComponent {
  constructor(private formService: FormService) { }
}
```

**Multiple Instances:**
```html
<app-user-form></app-user-form>  <!-- Instance 1 -->
<app-user-form></app-user-form>  <!-- Instance 2 -->
<app-user-form></app-user-form>  <!-- Instance 3 -->
```

Each component gets its own FormService instance.

### 9.4 Choosing the Right Scope

**Decision Tree:**

```
Need to share across entire app?
├─ Yes → Root level (providedIn: 'root')
└─ No → Continue

Need to share within a module?
├─ Yes → Module level (providers in @NgModule)
└─ No → Continue

Need isolated per component?
└─ Yes → Component level (providers in @Component)
```

**Examples:**

**Root Level:**
```typescript
// Authentication, logging, config
@Injectable({ providedIn: 'root' })
export class AuthService { }
```

**Module Level:**
```typescript
// Feature-specific services
@NgModule({
  providers: [FeatureService]
})
```

**Component Level:**
```typescript
// Widget or form state
@Component({
  providers: [WidgetService]
})
```

### 9.5 Scope Best Practices

**1. Default to Root:**
```typescript
// Most services should be root-level
@Injectable({
  providedIn: 'root'
})
export class MyService { }
```

**2. Component-Level for Isolation:**
```typescript
// When each component needs its own state
@Component({
  providers: [IsolatedService]
})
```

**3. Avoid Module-Level:**
```typescript
// Unless you need module-specific behavior
// Prefer root-level for simplicity
```

**4. Document Scope:**
```typescript
/**
 * Root-level service.
 * Singleton across entire application.
 */
@Injectable({
  providedIn: 'root'
})
export class GlobalService { }
```

**5. Be Consistent:**
```typescript
// In same feature, use same scope
@Injectable({ providedIn: 'root' })
export class UserService { }

@Injectable({ providedIn: 'root' })
export class UserApiService { }
```

**Common Patterns:**

**Singleton Services:**
```typescript
@Injectable({ providedIn: 'root' })
export class SingletonService {
  private static instance: SingletonService;
  
  constructor() {
    if (SingletonService.instance) {
      throw new Error('Use providedIn: root for singleton');
    }
    SingletonService.instance = this;
  }
}
```

**Factory Services:**
```typescript
export class WidgetFactory {
  create(type: string) {
    // Create widget based on type
  }
}

@Component({
  providers: [WidgetFactory]  // New factory per component
})
```

---

## Summary

You've mastered **Angular Services and Dependency Injection**!

**Key Concepts:**

**1. Services:**
- Reusable classes for business logic
- Share code across components
- Separation of concerns
- Stateful or stateless

**2. Dependency Injection:**
- Design pattern for loose coupling
- Angular provides dependencies
- Constructor injection
- Testable and maintainable

**3. @Injectable Decorator:**
- Marks class as injectable
- `providedIn: 'root'` - App-wide singleton (recommended)
- `providedIn: 'any'` - Instance per lazy module
- `providedIn: Module` - Module-specific

**4. Hierarchical Injectors:**
- Root → Module → Component
- Resolution: Own → Parent → Module → Root
- Component providers create new instances

**5. Provider Types:**
- **useClass**: Provide a class (default)
- **useValue**: Provide static value
- **useFactory**: Provide via factory function
- **useExisting**: Create alias
- **multi**: Provide multiple values

**6. InjectionToken:**
- For non-class dependencies
- Type-safe
- No string collision
- `new InjectionToken<Type>('Description')`

**7. Injection Decorators:**
- **@Optional**: Dependency is optional
- **@Self**: Own injector only
- **@SkipSelf**: Skip own injector
- **@Host**: Host component only
- Can combine decorators

**8. Service Scopes:**
- **Root**: Singleton across app (most common)
- **Module**: One per module
- **Component**: One per component instance

**Service Creation Checklist:**
```typescript
1. Generate: ng g s myService
2. Add @Injectable decorator
3. Set providedIn: 'root'
4. Implement methods
5. Inject via constructor
6. Use in components
```

**Common Patterns:**
```typescript
// Root-level (most common)
@Injectable({ providedIn: 'root' })
export class DataService { }

// Component injection
constructor(private service: DataService) { }

// Optional dependency
constructor(@Optional() private logger: LoggerService | null) { }

// Factory provider
{
  provide: ApiService,
  useFactory: apiFactory,
  deps: [HttpClient, Config]
}

// InjectionToken
export const API_URL = new InjectionToken<string>('API URL');
```

**Best Practices:**
- Use `providedIn: 'root'` by default
- Keep services focused (single responsibility)
- Use interfaces for flexibility
- Inject services, don't create them
- Use InjectionToken for configuration
- Document service scope
- Test services independently
- Avoid circular dependencies

**Performance Tips:**
- Root services are lazy-loaded
- Component providers create new instances
- Use tree-shakeable providers
- Avoid unnecessary module providers

Master these DI concepts to build maintainable, testable, and scalable Angular applications!
