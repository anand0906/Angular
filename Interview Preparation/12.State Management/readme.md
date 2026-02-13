# Angular State Management

## Index

1. [Introduction to State Management](#1-introduction-to-state-management)
   - 1.1 [What is State?](#11-what-is-state)
   - 1.2 [Why State Management?](#12-why-state-management)
   - 1.3 [When to Use State Management](#13-when-to-use-state-management)

2. [Component State](#2-component-state)
   - 2.1 [Local Component State](#21-local-component-state)
   - 2.2 [State in Properties](#22-state-in-properties)
   - 2.3 [State with Observables](#23-state-with-observables)
   - 2.4 [Parent-Child Communication](#24-parent-child-communication)
   - 2.5 [When Component State is Enough](#25-when-component-state-is-enough)

3. [Service-Based State Management](#3-service-based-state-management)
   - 3.1 [Simple State Service](#31-simple-state-service)
   - 3.2 [Observable State Service](#32-observable-state-service)
   - 3.3 [BehaviorSubject Pattern](#33-behaviorsubject-pattern)
   - 3.4 [Immutable Updates](#34-immutable-updates)
   - 3.5 [Service State Best Practices](#35-service-state-best-practices)

4. [NgRx](#4-ngrx)
   - 4.1 [What is NgRx?](#41-what-is-ngrx)
   - 4.2 [Store](#42-store)
   - 4.3 [Actions](#43-actions)
   - 4.4 [Reducers](#44-reducers)
   - 4.5 [Effects](#45-effects)
   - 4.6 [Selectors](#46-selectors)
   - 4.7 [Complete NgRx Example](#47-complete-ngrx-example)
   - 4.8 [DevTools](#48-devtools)

5. [Akita](#5-akita)
   - 5.1 [What is Akita?](#51-what-is-akita)
   - 5.2 [Store](#52-store)
   - 5.3 [Query](#53-query)
   - 5.4 [Service](#54-service)
   - 5.5 [Entity Management](#55-entity-management)
   - 5.6 [Complete Akita Example](#56-complete-akita-example)

6. [NGXS](#6-ngxs)
   - 6.1 [What is NGXS?](#61-what-is-ngxs)
   - 6.2 [State](#62-state)
   - 6.3 [Actions](#63-actions)
   - 6.4 [State Class](#64-state-class)
   - 6.5 [Select Decorators](#65-select-decorators)
   - 6.6 [Complete NGXS Example](#66-complete-ngxs-example)

7. [State Management Patterns](#7-state-management-patterns)
   - 7.1 [Single Source of Truth](#71-single-source-of-truth)
   - 7.2 [Immutability](#72-immutability)
   - 7.3 [Unidirectional Data Flow](#73-unidirectional-data-flow)
   - 7.4 [Separation of Concerns](#74-separation-of-concerns)
   - 7.5 [Normalized State](#75-normalized-state)

8. [Best Practices](#8-best-practices)
   - 8.1 [Choosing the Right Solution](#81-choosing-the-right-solution)
   - 8.2 [State Structure](#82-state-structure)
   - 8.3 [Performance Optimization](#83-performance-optimization)
   - 8.4 [Testing State](#84-testing-state)
   - 8.5 [Common Pitfalls](#85-common-pitfalls)

---

## 1. Introduction to State Management

### 1.1 What is State?

**State** is data that changes over time in your application.

**Think of it like:**
The current status of your application - like a snapshot of all the information at a given moment.

**Types of State:**

```typescript
// UI State
{
  isLoading: true,
  showSidebar: false,
  selectedTab: 'profile'
}

// Application State
{
  currentUser: { id: 1, name: 'John' },
  isAuthenticated: true,
  theme: 'dark'
}

// Entity State
{
  users: [
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' }
  ],
  products: [...]
}
```

### 1.2 Why State Management?

**Problems without state management:**

```typescript
// Component A
this.shoppingCart = [item1, item2];

// Component B
this.shoppingCart = [item1, item2];  // Duplicate!

// Component C
this.shoppingCart = [item1, item2];  // Duplicate!

// If one changes, others don't know!
```

**With state management:**
```typescript
// Single source of truth
Store → State → { shoppingCart: [item1, item2] }
           ↓
    All components read from same source
```

**Benefits:**
- Single source of truth
- Predictable state changes
- Easier debugging
- Time-travel debugging
- Better testing

### 1.3 When to Use State Management

**Decision Tree:**

```
Is state used by multiple components? 
├─ No → Component state
└─ Yes → Continue

Is state complex?
├─ No → Service-based state
└─ Yes → NgRx/Akita/NGXS

Is team familiar with Redux?
├─ Yes → NgRx
└─ No → Consider Akita or NGXS (simpler)
```

**Use Component State:**
- Simple forms
- UI toggles
- Local counters

**Use Service State:**
- Shared data (current user, cart)
- Medium complexity
- Small to medium apps

**Use NgRx/Akita/NGXS:**
- Large applications
- Complex state
- Multiple developers
- Need time-travel debugging

---

## 2. Component State

### 2.1 Local Component State

**Simple properties:**

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-counter',
  template: `
    <h1>Count: {{ count }}</h1>
    <button (click)="increment()">+</button>
    <button (click)="decrement()">-</button>
  `
})
export class CounterComponent {
  count = 0;  // Component state
  
  increment() {
    this.count++;
  }
  
  decrement() {
    this.count--;
  }
}
```

### 2.2 State in Properties

**Complex state object:**

```typescript
interface TodoState {
  todos: Todo[];
  filter: 'all' | 'active' | 'completed';
}

@Component({
  selector: 'app-todo',
  template: `
    <div *ngFor="let todo of state.todos">
      {{ todo.title }}
    </div>
  `
})
export class TodoComponent {
  state: TodoState = {
    todos: [],
    filter: 'all'
  };
  
  addTodo(title: string) {
    this.state = {
      ...this.state,
      todos: [...this.state.todos, { id: Date.now(), title, completed: false }]
    };
  }
  
  setFilter(filter: TodoState['filter']) {
    this.state = {
      ...this.state,
      filter
    };
  }
}
```

### 2.3 State with Observables

**Using BehaviorSubject:**

```typescript
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-user',
  template: `
    <div *ngIf="user$ | async as user">
      <h1>{{ user.name }}</h1>
      <p>{{ user.email }}</p>
    </div>
  `
})
export class UserComponent {
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();
  
  updateUser(user: User) {
    this.userSubject.next(user);
  }
}
```

### 2.4 Parent-Child Communication

**Input/Output pattern:**

```typescript
// Parent Component
@Component({
  selector: 'app-parent',
  template: `
    <app-child 
      [count]="count" 
      (countChange)="onCountChange($event)">
    </app-child>
  `
})
export class ParentComponent {
  count = 0;
  
  onCountChange(newCount: number) {
    this.count = newCount;
  }
}

// Child Component
@Component({
  selector: 'app-child',
  template: `
    <button (click)="increment()">Count: {{ count }}</button>
  `
})
export class ChildComponent {
  @Input() count: number = 0;
  @Output() countChange = new EventEmitter<number>();
  
  increment() {
    this.countChange.emit(this.count + 1);
  }
}
```

### 2.5 When Component State is Enough

**Use component state when:**

```typescript
✓ State is local to component
✓ State doesn't need to be shared
✓ Simple UI state (toggles, counters)
✓ Form state (local forms)

// Example: Modal state
@Component({
  selector: 'app-modal',
  template: `
    <button (click)="isOpen = true">Open</button>
    <div *ngIf="isOpen">
      Modal content
      <button (click)="isOpen = false">Close</button>
    </div>
  `
})
export class ModalComponent {
  isOpen = false;  // Local state - perfect!
}
```

---

## 3. Service-Based State Management

### 3.1 Simple State Service

**Basic service with state:**

```typescript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: Product[] = [];
  
  addItem(product: Product) {
    this.items.push(product);
  }
  
  removeItem(productId: number) {
    this.items = this.items.filter(item => item.id !== productId);
  }
  
  getItems(): Product[] {
    return this.items;
  }
  
  getTotal(): number {
    return this.items.reduce((sum, item) => sum + item.price, 0);
  }
}
```

**Usage:**
```typescript
@Component({
  selector: 'app-cart',
  template: `
    <div *ngFor="let item of items">
      {{ item.name }} - {{ item.price }}
      <button (click)="remove(item.id)">Remove</button>
    </div>
    <p>Total: {{ total }}</p>
  `
})
export class CartComponent implements OnInit {
  items: Product[] = [];
  total: number = 0;
  
  constructor(private cartService: CartService) {}
  
  ngOnInit() {
    this.items = this.cartService.getItems();
    this.total = this.cartService.getTotal();
  }
  
  remove(id: number) {
    this.cartService.removeItem(id);
    this.items = this.cartService.getItems();
    this.total = this.cartService.getTotal();
  }
}
```

### 3.2 Observable State Service

**Service with observables:**

```typescript
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

interface CartState {
  items: Product[];
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private state: CartState = {
    items: [],
    total: 0
  };
  
  private stateSubject = new BehaviorSubject<CartState>(this.state);
  state$ = this.stateSubject.asObservable();
  
  addItem(product: Product) {
    this.state = {
      items: [...this.state.items, product],
      total: this.state.total + product.price
    };
    this.stateSubject.next(this.state);
  }
  
  removeItem(productId: number) {
    const item = this.state.items.find(i => i.id === productId);
    if (item) {
      this.state = {
        items: this.state.items.filter(i => i.id !== productId),
        total: this.state.total - item.price
      };
      this.stateSubject.next(this.state);
    }
  }
}
```

**Usage:**
```typescript
@Component({
  selector: 'app-cart',
  template: `
    <div *ngIf="cart$ | async as cart">
      <div *ngFor="let item of cart.items">
        {{ item.name }} - {{ item.price }}
        <button (click)="remove(item.id)">Remove</button>
      </div>
      <p>Total: {{ cart.total }}</p>
    </div>
  `
})
export class CartComponent {
  cart$ = this.cartService.state$;
  
  constructor(private cartService: CartService) {}
  
  remove(id: number) {
    this.cartService.removeItem(id);
  }
}
```

### 3.3 BehaviorSubject Pattern

**Complete state management service:**

```typescript
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null
  };
  
  private stateSubject = new BehaviorSubject<AuthState>(this.initialState);
  
  // Public observables
  state$ = this.stateSubject.asObservable();
  user$ = this.state$.pipe(map(state => state.user));
  isAuthenticated$ = this.state$.pipe(map(state => state.isAuthenticated));
  isLoading$ = this.state$.pipe(map(state => state.isLoading));
  error$ = this.state$.pipe(map(state => state.error));
  
  // Actions
  login(email: string, password: string) {
    this.updateState({ isLoading: true, error: null });
    
    // Simulate API call
    setTimeout(() => {
      const user = { id: 1, name: 'John', email };
      this.updateState({
        user,
        isAuthenticated: true,
        isLoading: false
      });
    }, 1000);
  }
  
  logout() {
    this.updateState({
      user: null,
      isAuthenticated: false
    });
  }
  
  // Private helper
  private updateState(partial: Partial<AuthState>) {
    const currentState = this.stateSubject.value;
    this.stateSubject.next({ ...currentState, ...partial });
  }
}
```

### 3.4 Immutable Updates

**Always create new objects:**

```typescript
// ✗ Bad: Mutating state
addItem(product: Product) {
  this.state.items.push(product);  // Mutation!
  this.stateSubject.next(this.state);
}

// ✓ Good: Creating new state
addItem(product: Product) {
  this.state = {
    ...this.state,
    items: [...this.state.items, product]
  };
  this.stateSubject.next(this.state);
}

// ✓ Good: Updating nested objects
updateUser(userId: number, updates: Partial<User>) {
  this.state = {
    ...this.state,
    users: this.state.users.map(user =>
      user.id === userId ? { ...user, ...updates } : user
    )
  };
  this.stateSubject.next(this.state);
}
```

### 3.5 Service State Best Practices

**Complete example with best practices:**

```typescript
interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
  filter: 'all' | 'active' | 'completed';
  isLoading: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private initialState: TodoState = {
    todos: [],
    filter: 'all',
    isLoading: false
  };
  
  private stateSubject = new BehaviorSubject<TodoState>(this.initialState);
  
  // Selectors
  private state$ = this.stateSubject.asObservable();
  
  todos$ = this.state$.pipe(
    map(state => {
      switch (state.filter) {
        case 'active':
          return state.todos.filter(t => !t.completed);
        case 'completed':
          return state.todos.filter(t => t.completed);
        default:
          return state.todos;
      }
    })
  );
  
  filter$ = this.state$.pipe(map(state => state.filter));
  isLoading$ = this.state$.pipe(map(state => state.isLoading));
  
  // Actions
  addTodo(title: string) {
    const newTodo: Todo = {
      id: Date.now(),
      title,
      completed: false
    };
    
    const currentState = this.stateSubject.value;
    this.stateSubject.next({
      ...currentState,
      todos: [...currentState.todos, newTodo]
    });
  }
  
  toggleTodo(id: number) {
    const currentState = this.stateSubject.value;
    this.stateSubject.next({
      ...currentState,
      todos: currentState.todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    });
  }
  
  setFilter(filter: TodoState['filter']) {
    const currentState = this.stateSubject.value;
    this.stateSubject.next({
      ...currentState,
      filter
    });
  }
  
  loadTodos() {
    this.updateState({ isLoading: true });
    
    // Simulate API call
    setTimeout(() => {
      const todos = [
        { id: 1, title: 'Learn Angular', completed: false },
        { id: 2, title: 'Build app', completed: false }
      ];
      this.updateState({ todos, isLoading: false });
    }, 1000);
  }
  
  private updateState(partial: Partial<TodoState>) {
    this.stateSubject.next({
      ...this.stateSubject.value,
      ...partial
    });
  }
}
```

---

## 4. NgRx

### 4.1 What is NgRx?

**NgRx is a reactive state management library based on Redux pattern.**

**Install:**
```bash
npm install @ngrx/store @ngrx/effects @ngrx/entity @ngrx/store-devtools
```

**Core Concepts:**
```
Component → dispatches → Action → Reducer → updates → State → Component subscribes
                              ↓
                           Effect (side effects like HTTP)
```

### 4.2 Store

**State interface:**
```typescript
// state/app.state.ts
export interface AppState {
  counter: CounterState;
  users: UserState;
}

export interface CounterState {
  count: number;
}

export interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}
```

**Register store:**
```typescript
import { StoreModule } from '@ngrx/store';
import { counterReducer } from './state/counter.reducer';

@NgModule({
  imports: [
    StoreModule.forRoot({
      counter: counterReducer
    })
  ]
})
export class AppModule { }
```

### 4.3 Actions

**Define actions:**
```typescript
// state/counter.actions.ts
import { createAction, props } from '@ngrx/store';

export const increment = createAction('[Counter] Increment');

export const decrement = createAction('[Counter] Decrement');

export const reset = createAction('[Counter] Reset');

export const incrementByAmount = createAction(
  '[Counter] Increment By Amount',
  props<{ amount: number }>()
);
```

**More examples:**
```typescript
// state/user.actions.ts
import { createAction, props } from '@ngrx/store';
import { User } from '../models/user.model';

// Load Users
export const loadUsers = createAction('[User] Load Users');

export const loadUsersSuccess = createAction(
  '[User] Load Users Success',
  props<{ users: User[] }>()
);

export const loadUsersFailure = createAction(
  '[User] Load Users Failure',
  props<{ error: string }>()
);

// Add User
export const addUser = createAction(
  '[User] Add User',
  props<{ user: User }>()
);

// Update User
export const updateUser = createAction(
  '[User] Update User',
  props<{ id: number; changes: Partial<User> }>()
);

// Delete User
export const deleteUser = createAction(
  '[User] Delete User',
  props<{ id: number }>()
);
```

### 4.4 Reducers

**Create reducer:**
```typescript
// state/counter.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { increment, decrement, reset, incrementByAmount } from './counter.actions';

export interface CounterState {
  count: number;
}

export const initialState: CounterState = {
  count: 0
};

export const counterReducer = createReducer(
  initialState,
  on(increment, state => ({
    ...state,
    count: state.count + 1
  })),
  on(decrement, state => ({
    ...state,
    count: state.count - 1
  })),
  on(reset, state => ({
    ...state,
    count: 0
  })),
  on(incrementByAmount, (state, { amount }) => ({
    ...state,
    count: state.count + amount
  }))
);
```

**User reducer:**
```typescript
// state/user.reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as UserActions from './user.actions';

export interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}

export const initialState: UserState = {
  users: [],
  loading: false,
  error: null
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.loadUsers, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(UserActions.loadUsersSuccess, (state, { users }) => ({
    ...state,
    users,
    loading: false
  })),
  on(UserActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(UserActions.addUser, (state, { user }) => ({
    ...state,
    users: [...state.users, user]
  })),
  on(UserActions.updateUser, (state, { id, changes }) => ({
    ...state,
    users: state.users.map(user =>
      user.id === id ? { ...user, ...changes } : user
    )
  })),
  on(UserActions.deleteUser, (state, { id }) => ({
    ...state,
    users: state.users.filter(user => user.id !== id)
  }))
);
```

### 4.5 Effects

**Create effects:**
```typescript
// state/user.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import * as UserActions from './user.actions';

@Injectable()
export class UserEffects {
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUsers),
      mergeMap(() =>
        this.userService.getUsers().pipe(
          map(users => UserActions.loadUsersSuccess({ users })),
          catchError(error => of(UserActions.loadUsersFailure({ error: error.message })))
        )
      )
    )
  );
  
  constructor(
    private actions$: Actions,
    private userService: UserService
  ) {}
}
```

**Register effects:**
```typescript
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './state/user.effects';

@NgModule({
  imports: [
    EffectsModule.forRoot([UserEffects])
  ]
})
export class AppModule { }
```

### 4.6 Selectors

**Create selectors:**
```typescript
// state/counter.selectors.ts
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CounterState } from './counter.reducer';

export const selectCounterState = createFeatureSelector<CounterState>('counter');

export const selectCount = createSelector(
  selectCounterState,
  state => state.count
);

export const selectIsPositive = createSelector(
  selectCount,
  count => count > 0
);
```

**User selectors:**
```typescript
// state/user.selectors.ts
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { UserState } from './user.reducer';

export const selectUserState = createFeatureSelector<UserState>('users');

export const selectAllUsers = createSelector(
  selectUserState,
  state => state.users
);

export const selectUsersLoading = createSelector(
  selectUserState,
  state => state.loading
);

export const selectUsersError = createSelector(
  selectUserState,
  state => state.error
);

export const selectUserById = (id: number) => createSelector(
  selectAllUsers,
  users => users.find(user => user.id === id)
);

export const selectActiveUsers = createSelector(
  selectAllUsers,
  users => users.filter(user => user.active)
);
```

### 4.7 Complete NgRx Example

**Component:**
```typescript
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as UserActions from './state/user.actions';
import * as UserSelectors from './state/user.selectors';
import { User } from './models/user.model';

@Component({
  selector: 'app-users',
  template: `
    <div *ngIf="loading$ | async">Loading...</div>
    <div *ngIf="error$ | async as error">Error: {{ error }}</div>
    
    <div *ngFor="let user of users$ | async">
      {{ user.name }} - {{ user.email }}
      <button (click)="deleteUser(user.id)">Delete</button>
    </div>
    
    <button (click)="loadUsers()">Load Users</button>
  `
})
export class UsersComponent implements OnInit {
  users$: Observable<User[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  
  constructor(private store: Store) {
    this.users$ = this.store.select(UserSelectors.selectAllUsers);
    this.loading$ = this.store.select(UserSelectors.selectUsersLoading);
    this.error$ = this.store.select(UserSelectors.selectUsersError);
  }
  
  ngOnInit() {
    this.loadUsers();
  }
  
  loadUsers() {
    this.store.dispatch(UserActions.loadUsers());
  }
  
  deleteUser(id: number) {
    this.store.dispatch(UserActions.deleteUser({ id }));
  }
}
```

### 4.8 DevTools

**Install and setup:**
```bash
npm install @ngrx/store-devtools
```

```typescript
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  imports: [
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    })
  ]
})
export class AppModule { }
```

---

## 5. Akita

### 5.1 What is Akita?

**Akita is a state management pattern built on top of RxJS.**

**Install:**
```bash
npm install @datorama/akita
```

**Simpler than NgRx, less boilerplate.**

### 5.2 Store

**Create store:**
```typescript
// state/user.store.ts
import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}

function createInitialState(): UserState {
  return {
    users: [],
    loading: false,
    error: null
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'user' })
export class UserStore extends Store<UserState> {
  constructor() {
    super(createInitialState());
  }
}
```

### 5.3 Query

**Create query:**
```typescript
// state/user.query.ts
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { UserStore, UserState } from './user.store';

@Injectable({ providedIn: 'root' })
export class UserQuery extends Query<UserState> {
  users$ = this.select(state => state.users);
  loading$ = this.select(state => state.loading);
  error$ = this.select(state => state.error);
  
  activeUsers$ = this.select(state => 
    state.users.filter(user => user.active)
  );
  
  constructor(protected store: UserStore) {
    super(store);
  }
  
  getUserById(id: number) {
    return this.getValue().users.find(user => user.id === id);
  }
}
```

### 5.4 Service

**Create service:**
```typescript
// services/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { UserStore } from '../state/user.store';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(
    private userStore: UserStore,
    private http: HttpClient
  ) {}
  
  loadUsers() {
    this.userStore.update({ loading: true });
    
    return this.http.get<User[]>('/api/users').pipe(
      tap(
        users => this.userStore.update({ users, loading: false }),
        error => this.userStore.update({ error: error.message, loading: false })
      )
    ).subscribe();
  }
  
  addUser(user: User) {
    const users = [...this.userStore.getValue().users, user];
    this.userStore.update({ users });
  }
  
  updateUser(id: number, changes: Partial<User>) {
    const users = this.userStore.getValue().users.map(user =>
      user.id === id ? { ...user, ...changes } : user
    );
    this.userStore.update({ users });
  }
  
  deleteUser(id: number) {
    const users = this.userStore.getValue().users.filter(user => user.id !== id);
    this.userStore.update({ users });
  }
}
```

### 5.5 Entity Management

**Using EntityStore:**
```typescript
// state/todo.store.ts
import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export interface TodoState extends EntityState<Todo> {
  ui: {
    filter: 'all' | 'active' | 'completed';
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'todos' })
export class TodoStore extends EntityStore<TodoState> {
  constructor() {
    super({
      ui: { filter: 'all' }
    });
  }
}
```

**Query:**
```typescript
// state/todo.query.ts
import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { TodoStore, TodoState, Todo } from './todo.store';

@Injectable({ providedIn: 'root' })
export class TodoQuery extends QueryEntity<TodoState> {
  selectFilter$ = this.select(state => state.ui.filter);
  
  selectVisibleTodos$ = this.select([
    this.selectAll(),
    this.selectFilter$
  ], ([todos, filter]) => {
    switch (filter) {
      case 'active':
        return todos.filter(t => !t.completed);
      case 'completed':
        return todos.filter(t => t.completed);
      default:
        return todos;
    }
  });
  
  constructor(protected store: TodoStore) {
    super(store);
  }
}
```

**Service:**
```typescript
// services/todo.service.ts
import { Injectable } from '@angular/core';
import { TodoStore, Todo } from '../state/todo.store';

@Injectable({ providedIn: 'root' })
export class TodoService {
  constructor(private todoStore: TodoStore) {}
  
  addTodo(title: string) {
    const todo: Todo = {
      id: Date.now(),
      title,
      completed: false
    };
    this.todoStore.add(todo);
  }
  
  toggleTodo(id: number) {
    this.todoStore.update(id, entity => ({
      completed: !entity.completed
    }));
  }
  
  removeTodo(id: number) {
    this.todoStore.remove(id);
  }
  
  setFilter(filter: 'all' | 'active' | 'completed') {
    this.todoStore.update({ ui: { filter } });
  }
}
```

### 5.6 Complete Akita Example

**Component:**
```typescript
import { Component, OnInit } from '@angular/core';
import { TodoQuery } from './state/todo.query';
import { TodoService } from './services/todo.service';

@Component({
  selector: 'app-todos',
  template: `
    <input #input (keyup.enter)="addTodo(input.value); input.value = ''">
    
    <div>
      <button (click)="setFilter('all')">All</button>
      <button (click)="setFilter('active')">Active</button>
      <button (click)="setFilter('completed')">Completed</button>
    </div>
    
    <div *ngFor="let todo of todos$ | async">
      <input 
        type="checkbox" 
        [checked]="todo.completed"
        (change)="toggle(todo.id)">
      {{ todo.title }}
      <button (click)="remove(todo.id)">X</button>
    </div>
  `
})
export class TodosComponent {
  todos$ = this.todoQuery.selectVisibleTodos$;
  
  constructor(
    private todoQuery: TodoQuery,
    private todoService: TodoService
  ) {}
  
  addTodo(title: string) {
    if (title.trim()) {
      this.todoService.addTodo(title);
    }
  }
  
  toggle(id: number) {
    this.todoService.toggleTodo(id);
  }
  
  remove(id: number) {
    this.todoService.removeTodo(id);
  }
  
  setFilter(filter: 'all' | 'active' | 'completed') {
    this.todoService.setFilter(filter);
  }
}
```

---

## 6. NGXS

### 6.1 What is NGXS?

**NGXS is a state management pattern based on CQRS.**

**Install:**
```bash
npm install @ngxs/store
```

**Simpler than NgRx, decorator-based.**

### 6.2 State

**Define state model:**
```typescript
// models/user.model.ts
export interface User {
  id: number;
  name: string;
  email: string;
}

export interface UserStateModel {
  users: User[];
  loading: boolean;
  error: string | null;
}
```

### 6.3 Actions

**Define actions:**
```typescript
// actions/user.actions.ts
export class LoadUsers {
  static readonly type = '[User] Load Users';
}

export class LoadUsersSuccess {
  static readonly type = '[User] Load Users Success';
  constructor(public users: User[]) {}
}

export class AddUser {
  static readonly type = '[User] Add User';
  constructor(public user: User) {}
}

export class UpdateUser {
  static readonly type = '[User] Update User';
  constructor(public id: number, public changes: Partial<User>) {}
}

export class DeleteUser {
  static readonly type = '[User] Delete User';
  constructor(public id: number) {}
}
```

### 6.4 State Class

**Create state:**
```typescript
// state/user.state.ts
import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import * as UserActions from '../actions/user.actions';

@State<UserStateModel>({
  name: 'users',
  defaults: {
    users: [],
    loading: false,
    error: null
  }
})
@Injectable()
export class UserState {
  constructor(private userService: UserService) {}
  
  @Selector()
  static users(state: UserStateModel) {
    return state.users;
  }
  
  @Selector()
  static loading(state: UserStateModel) {
    return state.loading;
  }
  
  @Selector()
  static activeUsers(state: UserStateModel) {
    return state.users.filter(user => user.active);
  }
  
  @Action(UserActions.LoadUsers)
  loadUsers(ctx: StateContext<UserStateModel>) {
    ctx.patchState({ loading: true });
    
    return this.userService.getUsers().pipe(
      tap(
        users => ctx.patchState({ users, loading: false }),
        error => ctx.patchState({ error: error.message, loading: false })
      )
    );
  }
  
  @Action(UserActions.AddUser)
  addUser(ctx: StateContext<UserStateModel>, action: UserActions.AddUser) {
    const state = ctx.getState();
    ctx.patchState({
      users: [...state.users, action.user]
    });
  }
  
  @Action(UserActions.UpdateUser)
  updateUser(ctx: StateContext<UserStateModel>, action: UserActions.UpdateUser) {
    const state = ctx.getState();
    ctx.patchState({
      users: state.users.map(user =>
        user.id === action.id ? { ...user, ...action.changes } : user
      )
    });
  }
  
  @Action(UserActions.DeleteUser)
  deleteUser(ctx: StateContext<UserStateModel>, action: UserActions.DeleteUser) {
    const state = ctx.getState();
    ctx.patchState({
      users: state.users.filter(user => user.id !== action.id)
    });
  }
}
```

**Register state:**
```typescript
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { UserState } from './state/user.state';

@NgModule({
  imports: [
    NgxsModule.forRoot([UserState])
  ]
})
export class AppModule { }
```

### 6.5 Select Decorators

**Using Select decorator:**
```typescript
import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { UserState } from './state/user.state';
import * as UserActions from './actions/user.actions';

@Component({
  selector: 'app-users',
  template: `
    <div *ngFor="let user of users$ | async">
      {{ user.name }}
    </div>
  `
})
export class UsersComponent {
  @Select(UserState.users) users$: Observable<User[]>;
  @Select(UserState.loading) loading$: Observable<boolean>;
  
  constructor(private store: Store) {}
  
  ngOnInit() {
    this.store.dispatch(new UserActions.LoadUsers());
  }
  
  addUser(user: User) {
    this.store.dispatch(new UserActions.AddUser(user));
  }
}
```

### 6.6 Complete NGXS Example

**Component:**
```typescript
import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { UserState } from './state/user.state';
import * as UserActions from './actions/user.actions';

@Component({
  selector: 'app-users',
  template: `
    <div *ngIf="loading$ | async">Loading...</div>
    
    <div *ngFor="let user of users$ | async">
      {{ user.name }} - {{ user.email }}
      <button (click)="deleteUser(user.id)">Delete</button>
    </div>
    
    <button (click)="loadUsers()">Load Users</button>
  `
})
export class UsersComponent implements OnInit {
  @Select(UserState.users) users$: Observable<User[]>;
  @Select(UserState.loading) loading$: Observable<boolean>;
  
  constructor(private store: Store) {}
  
  ngOnInit() {
    this.loadUsers();
  }
  
  loadUsers() {
    this.store.dispatch(new UserActions.LoadUsers());
  }
  
  deleteUser(id: number) {
    this.store.dispatch(new UserActions.DeleteUser(id));
  }
}
```

---

## 7. State Management Patterns

### 7.1 Single Source of Truth

**One place for each piece of state:**

```typescript
// ✓ Good: Single source
@Injectable({ providedIn: 'root' })
export class UserService {
  private usersSubject = new BehaviorSubject<User[]>([]);
  users$ = this.usersSubject.asObservable();
}

// ✗ Bad: Multiple sources
export class Component1 {
  users: User[] = [];
}

export class Component2 {
  users: User[] = [];  // Duplicate!
}
```

### 7.2 Immutability

**Never mutate state directly:**

```typescript
// ✗ Bad: Mutation
addUser(user: User) {
  this.state.users.push(user);  // Mutating!
}

// ✓ Good: Immutable
addUser(user: User) {
  this.state = {
    ...this.state,
    users: [...this.state.users, user]
  };
}
```

### 7.3 Unidirectional Data Flow

**Data flows one direction:**

```
Component → Action → Reducer → State → Component
```

```typescript
// Component dispatches action
this.store.dispatch(addUser({ user }));

// Reducer updates state
on(addUser, (state, { user }) => ({
  ...state,
  users: [...state.users, user]
}))

// Component receives new state
users$ = this.store.select(selectUsers);
```

### 7.4 Separation of Concerns

**Separate state logic from UI:**

```typescript
// ✓ Good: Service handles state
@Injectable()
export class TodoService {
  private todosSubject = new BehaviorSubject<Todo[]>([]);
  todos$ = this.todosSubject.asObservable();
  
  addTodo(todo: Todo) {
    const todos = [...this.todosSubject.value, todo];
    this.todosSubject.next(todos);
  }
}

// Component only handles UI
export class TodoComponent {
  todos$ = this.todoService.todos$;
  
  constructor(private todoService: TodoService) {}
  
  onAdd(todo: Todo) {
    this.todoService.addTodo(todo);
  }
}
```

### 7.5 Normalized State

**Store entities in normalized form:**

```typescript
// ✗ Bad: Nested/denormalized
interface State {
  posts: {
    id: 1,
    title: 'Post 1',
    author: { id: 1, name: 'John' },  // Nested
    comments: [
      { id: 1, text: 'Comment', author: { id: 1, name: 'John' } }  // Duplicate
    ]
  }[]
}

// ✓ Good: Normalized
interface State {
  users: {
    1: { id: 1, name: 'John' }
  },
  posts: {
    1: { id: 1, title: 'Post 1', authorId: 1, commentIds: [1] }
  },
  comments: {
    1: { id: 1, text: 'Comment', authorId: 1 }
  }
}
```

---

## 8. Best Practices

### 8.1 Choosing the Right Solution

**Decision Matrix:**

| App Size | Complexity | Team Size | Recommendation |
|----------|-----------|-----------|----------------|
| Small | Low | 1-2 | Component/Service state |
| Medium | Medium | 2-5 | Service-based or Akita |
| Large | High | 5+ | NgRx or NGXS |

### 8.2 State Structure

**Keep state flat and normalized:**

```typescript
// ✓ Good structure
interface AppState {
  users: UserState;
  products: ProductState;
  cart: CartState;
  ui: UIState;
}

// Each feature has its own state
interface UserState {
  entities: { [id: number]: User };
  ids: number[];
  selectedId: number | null;
  loading: boolean;
  error: string | null;
}
```

### 8.3 Performance Optimization

**Use selectors and memoization:**

```typescript
// ✓ Memoized selector
export const selectExpensiveComputation = createSelector(
  selectUsers,
  selectProducts,
  (users, products) => {
    // Expensive computation
    // Only runs when users or products change
    return computeExpensiveResult(users, products);
  }
);

// ✓ Use trackBy in templates
<div *ngFor="let item of items; trackBy: trackById">
```

### 8.4 Testing State

**Unit test reducers:**

```typescript
describe('counterReducer', () => {
  it('should increment', () => {
    const initialState = { count: 0 };
    const action = increment();
    const result = counterReducer(initialState, action);
    expect(result.count).toBe(1);
  });
});
```

### 8.5 Common Pitfalls

**Avoid these mistakes:**

```typescript
// ✗ Storing derived state
interface State {
  users: User[];
  activeUsers: User[];  // Don't store - derive with selector
}

// ✓ Derive state
const selectActiveUsers = createSelector(
  selectUsers,
  users => users.filter(u => u.active)
);

// ✗ Storing UI state in global store
interface GlobalState {
  isModalOpen: boolean;  // Keep in component!
}

// ✗ Not unsubscribing
this.store.select(selectUsers).subscribe();  // Memory leak!

// ✓ Use async pipe or unsubscribe
users$ = this.store.select(selectUsers);
```

---

## Summary

You've mastered **Angular State Management**!

**Key Takeaways:**

**1. Choose the Right Solution:**
- **Component State**: Local, simple UI state
- **Service State**: Shared data, medium apps
- **NgRx**: Large apps, Redux pattern, DevTools
- **Akita**: Simpler than NgRx, entity management
- **NGXS**: Decorator-based, CQRS pattern

**2. Core Patterns:**
- Single source of truth
- Immutability
- Unidirectional data flow
- Separation of concerns

**3. Best Practices:**
- Keep state flat and normalized
- Use selectors for derived state
- Always unsubscribe
- Test state logic
- Don't over-engineer

**Quick Comparison:**

| Solution | Complexity | Boilerplate | DevTools | Best For |
|----------|-----------|-------------|----------|----------|
| **Component** | Low | None | No | Local state |
| **Service** | Low | Low | No | Shared state |
| **NgRx** | High | High | Yes | Large apps |
| **Akita** | Medium | Medium | Yes | Medium apps |
| **NGXS** | Medium | Low | Yes | Medium apps |

Master these state management concepts to build scalable, maintainable Angular applications! 🎉
