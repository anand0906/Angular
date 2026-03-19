# RxJS and Observables

## Index

1. [Introduction to RxJS](#1-introduction-to-rxjs)
   - 1.1 [What is RxJS?](#11-what-is-rxjs)
   - 1.2 [Why Use RxJS?](#12-why-use-rxjs)
   - 1.3 [Core Concepts](#13-core-concepts)

2. [Observable Basics](#2-observable-basics)
   - 2.1 [What is an Observable?](#21-what-is-an-observable)
   - 2.2 [Creating Observables](#22-creating-observables)
   - 2.3 [Observable Lifecycle](#23-observable-lifecycle)
   - 2.4 [Observable vs Promise](#24-observable-vs-promise)

3. [Observers and Subscriptions](#3-observers-and-subscriptions)
   - 3.1 [Observer Object](#31-observer-object)
   - 3.2 [Subscribing to Observables](#32-subscribing-to-observables)
   - 3.3 [Subscription Object](#33-subscription-object)
   - 3.4 [Unsubscribing](#34-unsubscribing)

4. [Subjects](#4-subjects)
   - 4.1 [Subject](#41-subject)
   - 4.2 [BehaviorSubject](#42-behaviorsubject)
   - 4.3 [ReplaySubject](#43-replaysubject)
   - 4.4 [AsyncSubject](#44-asyncsubject)
   - 4.5 [When to Use Each](#45-when-to-use-each)

5. [Operators](#5-operators)
   - 5.1 [What are Operators?](#51-what-are-operators)
   - 5.2 [Transformation Operators](#52-transformation-operators)
   - 5.3 [Filtering Operators](#53-filtering-operators)
   - 5.4 [Combination Operators](#54-combination-operators)
   - 5.5 [Error Handling Operators](#55-error-handling-operators)
   - 5.6 [Utility Operators](#56-utility-operators)

6. [Hot vs Cold Observables](#6-hot-vs-cold-observables)
   - 6.1 [Cold Observables](#61-cold-observables)
   - 6.2 [Hot Observables](#62-hot-observables)
   - 6.3 [Making Observables Hot](#63-making-observables-hot)
   - 6.4 [When to Use Each](#64-when-to-use-each)

7. [Unsubscribe Strategies](#7-unsubscribe-strategies)
   - 7.1 [Why Unsubscribe?](#71-why-unsubscribe)
   - 7.2 [Manual Unsubscribe](#72-manual-unsubscribe)
   - 7.3 [Async Pipe](#73-async-pipe)
   - 7.4 [takeUntil Pattern](#74-takeuntil-pattern)
   - 7.5 [take and first](#75-take-and-first)
   - 7.6 [Memory Leak Detection](#76-memory-leak-detection)

8. [Combining Observables](#8-combining-observables)
   - 8.1 [forkJoin](#81-forkjoin)
   - 8.2 [combineLatest](#82-combinelatest)
   - 8.3 [merge](#83-merge)
   - 8.4 [zip](#84-zip)
   - 8.5 [concat](#85-concat)
   - 8.6 [race](#86-race)

9. [Creation Operators](#9-creation-operators)
   - 9.1 [of](#91-of)
   - 9.2 [from](#92-from)
   - 9.3 [interval](#93-interval)
   - 9.4 [timer](#94-timer)
   - 9.5 [fromEvent](#95-fromevent)
   - 9.6 [ajax](#96-ajax)

---

## 1. Introduction to RxJS

### 1.1 What is RxJS?

**RxJS (Reactive Extensions for JavaScript)** is a library for composing asynchronous and event-based programs using observables.

**Think of it like:**
A conveyor belt in a factory that processes items (data) as they arrive, with different stations (operators) transforming them.

**Key Features:**
- Handle async operations
- Event streams
- Data transformation
- Error handling
- Cancellation support

### 1.2 Why Use RxJS?

**Benefits:**

**1. Handle Multiple Async Events:**
```typescript
// Without RxJS - callbacks hell
getUserData(userId, (user) => {
  getPosts(userId, (posts) => {
    getComments(posts[0].id, (comments) => {
      // Nested callbacks
    });
  });
});

// With RxJS - clean chain
getUserData(userId).pipe(
  switchMap(user => getPosts(user.id)),
  switchMap(posts => getComments(posts[0].id))
).subscribe(comments => console.log(comments));
```

**2. Powerful Operators:**
```typescript
// Debounce search input
searchInput$.pipe(
  debounceTime(300),
  distinctUntilChanged(),
  switchMap(term => this.search(term))
).subscribe(results => this.results = results);
```

**3. Cancellation:**
```typescript
const subscription = getData().subscribe(data => console.log(data));
subscription.unsubscribe();  // Cancel request
```

### 1.3 Core Concepts

**Main Building Blocks:**

```
Observable → Stream of data
Observer → Consumer of data
Subscription → Execution of observable
Operators → Transform data
Subject → Special observable (can emit values)
```

**Visual:**
```
[Observable] --data--> [Operators] --transformed--> [Observer]
```

---

## 2. Observable Basics

### 2.1 What is an Observable?

**An Observable is a stream of data over time.**

**Think of it like:**
A newspaper subscription - you subscribe and get issues (data) over time.

**Simple Example:**
```typescript
import { Observable } from 'rxjs';

const observable = new Observable(observer => {
  observer.next(1);
  observer.next(2);
  observer.next(3);
  observer.complete();
});

observable.subscribe(value => console.log(value));
// Output: 1, 2, 3
```

### 2.2 Creating Observables

**Manual creation:**
```typescript
import { Observable } from 'rxjs';

const numbers$ = new Observable<number>(observer => {
  observer.next(1);
  observer.next(2);
  observer.next(3);
  
  setTimeout(() => {
    observer.next(4);
    observer.complete();
  }, 1000);
});

numbers$.subscribe({
  next: value => console.log(value),
  complete: () => console.log('Complete')
});
// Output: 1, 2, 3, (1 second pause), 4, Complete
```

**With error:**
```typescript
const withError$ = new Observable(observer => {
  observer.next(1);
  observer.next(2);
  observer.error('Something went wrong!');
  observer.next(3);  // Won't execute
});

withError$.subscribe({
  next: value => console.log(value),
  error: err => console.error('Error:', err),
  complete: () => console.log('Complete')
});
// Output: 1, 2, Error: Something went wrong!
```

### 2.3 Observable Lifecycle

**Three notifications:**

```typescript
observable.subscribe({
  next: (value) => {
    // Called for each emitted value
    console.log('Next:', value);
  },
  error: (err) => {
    // Called when error occurs (terminates)
    console.error('Error:', err);
  },
  complete: () => {
    // Called when observable completes (terminates)
    console.log('Complete');
  }
});
```

**Lifecycle:**
```
Start → next → next → next → complete/error → End
```

### 2.4 Observable vs Promise

**Comparison:**

| Feature | Observable | Promise |
|---------|-----------|---------|
| **Values** | Multiple values | Single value |
| **Lazy** | Yes (doesn't start until subscribed) | No (starts immediately) |
| **Cancellable** | Yes | No |
| **Operators** | Many | Limited (then, catch) |

**Examples:**

**Promise:**
```typescript
const promise = new Promise((resolve) => {
  setTimeout(() => resolve('Hello'), 1000);
});

promise.then(value => console.log(value));  // Hello
```

**Observable:**
```typescript
const observable = new Observable(observer => {
  setTimeout(() => observer.next('Hello'), 1000);
  setTimeout(() => observer.next('World'), 2000);
  setTimeout(() => observer.complete(), 3000);
});

observable.subscribe(value => console.log(value));
// Output: Hello, World
```

---

## 3. Observers and Subscriptions

### 3.1 Observer Object

**Observer is an object with callbacks:**

```typescript
const observer = {
  next: (value) => console.log('Value:', value),
  error: (err) => console.error('Error:', err),
  complete: () => console.log('Complete')
};

observable.subscribe(observer);
```

**Partial observer:**
```typescript
// Only next
observable.subscribe(value => console.log(value));

// Next and error
observable.subscribe({
  next: value => console.log(value),
  error: err => console.error(err)
});
```

### 3.2 Subscribing to Observables

**Simple subscription:**
```typescript
import { of } from 'rxjs';

const numbers$ = of(1, 2, 3);

numbers$.subscribe(value => console.log(value));
// Output: 1, 2, 3
```

**Full subscription:**
```typescript
const subscription = numbers$.subscribe({
  next: value => console.log('Next:', value),
  error: err => console.error('Error:', err),
  complete: () => console.log('Done!')
});
```

**Multiple subscriptions:**
```typescript
const observable$ = of(1, 2, 3);

observable$.subscribe(value => console.log('A:', value));
observable$.subscribe(value => console.log('B:', value));

// Output:
// A: 1
// A: 2
// A: 3
// B: 1
// B: 2
// B: 3
```

### 3.3 Subscription Object

**Subscription methods:**
```typescript
const subscription = observable$.subscribe(value => console.log(value));

// Check if closed
console.log(subscription.closed);  // false

// Unsubscribe
subscription.unsubscribe();

console.log(subscription.closed);  // true
```

**Add subscriptions:**
```typescript
const sub1 = observable1$.subscribe();
const sub2 = observable2$.subscribe();

sub1.add(sub2);  // Add sub2 to sub1

sub1.unsubscribe();  // Unsubscribes both
```

### 3.4 Unsubscribing

**Why unsubscribe?**
- Prevent memory leaks
- Stop unnecessary work
- Clean up resources

**Example:**
```typescript
import { interval } from 'rxjs';

const numbers$ = interval(1000);  // Emits every second

const subscription = numbers$.subscribe(n => console.log(n));

// Stop after 5 seconds
setTimeout(() => {
  subscription.unsubscribe();
  console.log('Unsubscribed');
}, 5000);
```

---

## 4. Subjects

### 4.1 Subject

**A Subject is both an Observable and an Observer.**

**Think of it like:**
A radio station - it broadcasts (emits) to all listeners (subscribers).

**Simple Example:**
```typescript
import { Subject } from 'rxjs';

const subject = new Subject<number>();

// Subscribe
subject.subscribe(value => console.log('A:', value));
subject.subscribe(value => console.log('B:', value));

// Emit values
subject.next(1);
subject.next(2);

// Output:
// A: 1
// B: 1
// A: 2
// B: 2
```

**Multicast:**
```typescript
import { interval } from 'rxjs';

const source$ = interval(1000);
const subject = new Subject();

// Connect source to subject
source$.subscribe(subject);

// Multiple subscribers share same execution
subject.subscribe(value => console.log('A:', value));
subject.subscribe(value => console.log('B:', value));
```

### 4.2 BehaviorSubject

**BehaviorSubject stores the latest value and emits it to new subscribers.**

**Simple Example:**
```typescript
import { BehaviorSubject } from 'rxjs';

const subject = new BehaviorSubject<number>(0);  // Initial value

subject.subscribe(value => console.log('A:', value));  // Gets 0

subject.next(1);
subject.next(2);

subject.subscribe(value => console.log('B:', value));  // Gets 2 (latest)

subject.next(3);

// Output:
// A: 0
// A: 1
// A: 2
// B: 2
// A: 3
// B: 3
```

**Get current value:**
```typescript
const subject = new BehaviorSubject<string>('initial');

console.log(subject.value);  // 'initial'

subject.next('updated');
console.log(subject.value);  // 'updated'
```

**Real-world example:**
```typescript
@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();
  
  login(user: User) {
    this.currentUserSubject.next(user);
  }
  
  logout() {
    this.currentUserSubject.next(null);
  }
  
  get currentUser() {
    return this.currentUserSubject.value;
  }
}
```

### 4.3 ReplaySubject

**ReplaySubject stores and replays multiple values to new subscribers.**

**Simple Example:**
```typescript
import { ReplaySubject } from 'rxjs';

const subject = new ReplaySubject<number>(2);  // Buffer size 2

subject.next(1);
subject.next(2);
subject.next(3);

subject.subscribe(value => console.log('A:', value));  // Gets 2, 3

subject.next(4);

subject.subscribe(value => console.log('B:', value));  // Gets 3, 4

// Output:
// A: 2
// A: 3
// A: 4
// B: 3
// B: 4
```

**With time window:**
```typescript
const subject = new ReplaySubject<number>(100, 500);  // 100 items or 500ms

subject.next(1);
setTimeout(() => subject.next(2), 200);
setTimeout(() => subject.next(3), 400);
setTimeout(() => subject.next(4), 600);

setTimeout(() => {
  subject.subscribe(value => console.log(value));
  // Gets: 2, 3, 4 (within 500ms window)
}, 700);
```

### 4.4 AsyncSubject

**AsyncSubject emits only the last value when it completes.**

**Simple Example:**
```typescript
import { AsyncSubject } from 'rxjs';

const subject = new AsyncSubject<number>();

subject.subscribe(value => console.log('A:', value));

subject.next(1);
subject.next(2);
subject.next(3);

subject.subscribe(value => console.log('B:', value));

subject.next(4);
subject.complete();

// Output:
// A: 4
// B: 4
```

### 4.5 When to Use Each

**Decision Tree:**

```
Need latest value on subscribe? → BehaviorSubject
Need multiple past values? → ReplaySubject
Need only final value? → AsyncSubject
Need basic multicasting? → Subject
```

**Use Cases:**

**Subject:**
- Events
- Simple notifications
- No initial value needed

**BehaviorSubject:**
- Current state
- User info
- Configuration
- Theme settings

**ReplaySubject:**
- Chat history
- Action history
- Cache recent values

**AsyncSubject:**
- Final computation result
- Single async operation

---

## 5. Operators

### 5.1 What are Operators?

**Operators are functions that transform observables.**

**Think of it like:**
Assembly line stations that process items.

**Using pipe:**
```typescript
import { of } from 'rxjs';
import { map, filter } from 'rxjs/operators';

of(1, 2, 3, 4, 5).pipe(
  filter(n => n % 2 === 0),  // Filter even numbers
  map(n => n * 10)           // Multiply by 10
).subscribe(value => console.log(value));

// Output: 20, 40
```

### 5.2 Transformation Operators

**map - Transform each value:**
```typescript
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

of(1, 2, 3).pipe(
  map(n => n * 2)
).subscribe(value => console.log(value));
// Output: 2, 4, 6
```

**switchMap - Switch to new observable:**
```typescript
import { of, interval } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

of('A', 'B').pipe(
  switchMap(letter => 
    interval(1000).pipe(
      take(3),
      map(n => `${letter}${n}`)
    )
  )
).subscribe(value => console.log(value));
// Output: A0, A1, A2, B0, B1, B2
```

**Real-world switchMap:**
```typescript
// Search as user types
searchTerm$.pipe(
  debounceTime(300),
  switchMap(term => this.http.get(`/api/search?q=${term}`))
).subscribe(results => this.results = results);
```

**mergeMap - Merge all observables:**
```typescript
import { of } from 'rxjs';
import { mergeMap, delay } from 'rxjs/operators';

of(1, 2, 3).pipe(
  mergeMap(n => of(n).pipe(delay(1000)))
).subscribe(value => console.log(value));
// Output: 1, 2, 3 (all after 1 second)
```

**concatMap - Concatenate sequentially:**
```typescript
import { of } from 'rxjs';
import { concatMap, delay } from 'rxjs/operators';

of(1, 2, 3).pipe(
  concatMap(n => of(n).pipe(delay(1000)))
).subscribe(value => console.log(value));
// Output: 1 (1s), 2 (2s), 3 (3s)
```

**Comparison:**

| Operator | Behavior | Use Case |
|----------|----------|----------|
| **switchMap** | Cancel previous, switch to new | Search, latest request only |
| **mergeMap** | Run all concurrently | Independent requests |
| **concatMap** | Queue and run sequentially | Order matters |
| **exhaustMap** | Ignore new while current running | Prevent duplicate submissions |

### 5.3 Filtering Operators

**filter - Filter values:**
```typescript
import { of } from 'rxjs';
import { filter } from 'rxjs/operators';

of(1, 2, 3, 4, 5).pipe(
  filter(n => n % 2 === 0)
).subscribe(value => console.log(value));
// Output: 2, 4
```

**distinctUntilChanged - Skip duplicates:**
```typescript
import { of } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

of(1, 1, 2, 2, 2, 3, 3, 1).pipe(
  distinctUntilChanged()
).subscribe(value => console.log(value));
// Output: 1, 2, 3, 1
```

**debounceTime - Wait before emitting:**
```typescript
import { fromEvent } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

fromEvent(inputElement, 'input').pipe(
  map((event: any) => event.target.value),
  debounceTime(500)
).subscribe(value => console.log(value));
```

**throttleTime - Emit at intervals:**
```typescript
import { fromEvent } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

fromEvent(button, 'click').pipe(
  throttleTime(1000)
).subscribe(() => console.log('Clicked'));
// Only once per second
```

**take - Take first n values:**
```typescript
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';

interval(1000).pipe(
  take(3)
).subscribe(value => console.log(value));
// Output: 0, 1, 2 (then completes)
```

**first - Take first value:**
```typescript
import { of } from 'rxjs';
import { first } from 'rxjs/operators';

of(1, 2, 3, 4, 5).pipe(
  first(n => n > 2)
).subscribe(value => console.log(value));
// Output: 3
```

**skip - Skip first n values:**
```typescript
import { of } from 'rxjs';
import { skip } from 'rxjs/operators';

of(1, 2, 3, 4, 5).pipe(
  skip(2)
).subscribe(value => console.log(value));
// Output: 3, 4, 5
```

### 5.4 Combination Operators

**See section 8 for detailed coverage**

### 5.5 Error Handling Operators

**catchError - Handle errors:**
```typescript
import { of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

throwError(() => new Error('Oops!')).pipe(
  catchError(err => {
    console.error('Error:', err.message);
    return of('Default value');
  })
).subscribe(value => console.log(value));
// Output: Error: Oops!, Default value
```

**retry - Retry on error:**
```typescript
import { of, throwError } from 'rxjs';
import { retry, mergeMap } from 'rxjs/operators';

let attempts = 0;

of(1).pipe(
  mergeMap(() => {
    attempts++;
    if (attempts < 3) {
      return throwError(() => new Error('Failed'));
    }
    return of('Success!');
  }),
  retry(2)
).subscribe({
  next: value => console.log(value),
  error: err => console.error('Final error:', err)
});
// Output: Success!
```

**retryWhen - Conditional retry:**
```typescript
import { throwError, timer } from 'rxjs';
import { retryWhen, delayWhen } from 'rxjs/operators';

throwError(() => new Error('Error')).pipe(
  retryWhen(errors => errors.pipe(
    delayWhen(() => timer(1000))  // Retry after 1 second
  ))
).subscribe();
```

### 5.6 Utility Operators

**tap - Side effects:**
```typescript
import { of } from 'rxjs';
import { tap, map } from 'rxjs/operators';

of(1, 2, 3).pipe(
  tap(value => console.log('Before:', value)),
  map(n => n * 2),
  tap(value => console.log('After:', value))
).subscribe();
// Output:
// Before: 1
// After: 2
// Before: 2
// After: 4
// Before: 3
// After: 6
```

**delay - Delay emissions:**
```typescript
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

of(1, 2, 3).pipe(
  delay(1000)
).subscribe(value => console.log(value));
// Output: 1, 2, 3 (after 1 second)
```

**timeout - Error if too slow:**
```typescript
import { of } from 'rxjs';
import { delay, timeout } from 'rxjs/operators';

of(1).pipe(
  delay(2000),
  timeout(1000)
).subscribe({
  next: value => console.log(value),
  error: err => console.error('Timeout!')
});
```

---

## 6. Hot vs Cold Observables

### 6.1 Cold Observables

**Cold observables start producing values when subscribed.**

**Think of it like:**
A movie - each viewer (subscriber) starts from the beginning.

**Example:**
```typescript
import { Observable } from 'rxjs';

const cold$ = new Observable(observer => {
  console.log('Producer started');
  observer.next(Math.random());
});

cold$.subscribe(value => console.log('A:', value));
cold$.subscribe(value => console.log('B:', value));

// Output:
// Producer started
// A: 0.123
// Producer started
// B: 0.456
```

**Characteristics:**
- Each subscriber gets own execution
- Unicast (one-to-one)
- Examples: HTTP requests, timers

### 6.2 Hot Observables

**Hot observables share single execution among subscribers.**

**Think of it like:**
Live TV - all viewers see the same broadcast.

**Example:**
```typescript
import { Subject } from 'rxjs';

const hot$ = new Subject();

hot$.subscribe(value => console.log('A:', value));
hot$.subscribe(value => console.log('B:', value));

hot$.next(1);
hot$.next(2);

// Output:
// A: 1
// B: 1
// A: 2
// B: 2
```

**Characteristics:**
- Subscribers share execution
- Multicast (one-to-many)
- Examples: Subjects, DOM events

### 6.3 Making Observables Hot

**Using share operator:**
```typescript
import { interval } from 'rxjs';
import { share, take } from 'rxjs/operators';

const cold$ = interval(1000).pipe(take(3));
const hot$ = cold$.pipe(share());

hot$.subscribe(value => console.log('A:', value));

setTimeout(() => {
  hot$.subscribe(value => console.log('B:', value));
}, 1500);

// Both share same execution
```

**Using publish + refCount:**
```typescript
import { interval } from 'rxjs';
import { publish, refCount } from 'rxjs/operators';

const shared$ = interval(1000).pipe(
  publish(),
  refCount()
);
```

### 6.4 When to Use Each

**Use Cold:**
- HTTP requests
- Each subscriber needs own execution
- Independent data streams

**Use Hot:**
- Shared state
- DOM events
- WebSocket connections
- Multiple subscribers need same data

---

## 7. Unsubscribe Strategies

### 7.1 Why Unsubscribe?

**Memory leaks example:**
```typescript
// ✗ Bad: Memory leak
export class Component {
  ngOnInit() {
    interval(1000).subscribe(n => console.log(n));
    // Never unsubscribes - continues after component destroyed
  }
}
```

**Problems:**
- Memory leaks
- Unnecessary work
- Multiple subscriptions
- Performance issues

### 7.2 Manual Unsubscribe

**Store and unsubscribe:**
```typescript
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

export class Component implements OnInit, OnDestroy {
  private subscription: Subscription;
  
  ngOnInit() {
    this.subscription = interval(1000).subscribe(n => console.log(n));
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
```

**Multiple subscriptions:**
```typescript
export class Component implements OnInit, OnDestroy {
  private subscriptions = new Subscription();
  
  ngOnInit() {
    this.subscriptions.add(
      observable1$.subscribe()
    );
    
    this.subscriptions.add(
      observable2$.subscribe()
    );
    
    this.subscriptions.add(
      observable3$.subscribe()
    );
  }
  
  ngOnDestroy() {
    this.subscriptions.unsubscribe();  // Unsubscribes all
  }
}
```

### 7.3 Async Pipe

**Template automatically unsubscribes:**
```typescript
export class Component {
  users$ = this.http.get<User[]>('/api/users');
}
```

```html
<div *ngFor="let user of users$ | async">
  {{ user.name }}
</div>
```

**Benefits:**
- Automatic subscription
- Automatic unsubscription
- No memory leaks
- Less boilerplate

### 7.4 takeUntil Pattern

**Unsubscribe all on destroy:**
```typescript
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export class Component implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  ngOnInit() {
    observable1$.pipe(
      takeUntil(this.destroy$)
    ).subscribe();
    
    observable2$.pipe(
      takeUntil(this.destroy$)
    ).subscribe();
    
    observable3$.pipe(
      takeUntil(this.destroy$)
    ).subscribe();
  }
  
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```

### 7.5 take and first

**Automatically complete after n values:**
```typescript
import { take, first } from 'rxjs/operators';

// Take first 5 values
observable$.pipe(
  take(5)
).subscribe();  // No need to unsubscribe

// Take first value
observable$.pipe(
  first()
).subscribe();  // No need to unsubscribe
```

### 7.6 Memory Leak Detection

**Check for leaks:**
```typescript
export class Component {
  ngOnInit() {
    console.log('Component created');
    
    interval(1000).subscribe(n => {
      console.log('Still running:', n);
      // If this logs after navigation, you have a leak!
    });
  }
  
  ngOnDestroy() {
    console.log('Component destroyed');
  }
}
```

**Best Practices:**
```typescript
// ✓ Good: Async pipe
users$ = this.http.get<User[]>('/api/users');

// ✓ Good: takeUntil
observable$.pipe(takeUntil(this.destroy$)).subscribe();

// ✓ Good: Manual unsubscribe
sub = observable$.subscribe();
ngOnDestroy() { this.sub.unsubscribe(); }

// ✗ Bad: No cleanup
observable$.subscribe();  // Memory leak!
```

---

## 8. Combining Observables

### 8.1 forkJoin

**Wait for all observables to complete, then emit last values.**

**Think of it like:**
Promise.all() for observables.

**Simple Example:**
```typescript
import { forkJoin, of } from 'rxjs';
import { delay } from 'rxjs/operators';

forkJoin({
  user: of({ name: 'John' }).pipe(delay(1000)),
  posts: of([{ title: 'Post 1' }]).pipe(delay(2000)),
  comments: of([{ text: 'Comment 1' }]).pipe(delay(500))
}).subscribe(result => {
  console.log(result);
  // Output (after 2 seconds):
  // {
  //   user: { name: 'John' },
  //   posts: [{ title: 'Post 1' }],
  //   comments: [{ text: 'Comment 1' }]
  // }
});
```

**Real-world example:**
```typescript
@Injectable({ providedIn: 'root' })
export class DataService {
  loadDashboard(): Observable<Dashboard> {
    return forkJoin({
      user: this.http.get<User>('/api/user'),
      stats: this.http.get<Stats>('/api/stats'),
      notifications: this.http.get<Notification[]>('/api/notifications')
    }).pipe(
      map(({ user, stats, notifications }) => ({
        user,
        stats,
        notifications
      }))
    );
  }
}
```

### 8.2 combineLatest

**Emit when any observable emits, combining latest values.**

**Simple Example:**
```typescript
import { combineLatest, timer } from 'rxjs';

const timer1$ = timer(0, 1000);  // 0, 1, 2, 3...
const timer2$ = timer(500, 1000);  // 0, 1, 2, 3...

combineLatest([timer1$, timer2$]).subscribe(([t1, t2]) => {
  console.log(`Timer1: ${t1}, Timer2: ${t2}`);
});

// Output:
// Timer1: 0, Timer2: 0
// Timer1: 1, Timer2: 0
// Timer1: 1, Timer2: 1
// Timer1: 2, Timer2: 1
// ...
```

**Real-world example:**
```typescript
export class SearchComponent {
  searchTerm$ = new BehaviorSubject<string>('');
  filter$ = new BehaviorSubject<string>('all');
  
  results$ = combineLatest([
    this.searchTerm$,
    this.filter$
  ]).pipe(
    debounceTime(300),
    switchMap(([term, filter]) => 
      this.http.get(`/api/search?q=${term}&filter=${filter}`)
    )
  );
}
```

### 8.3 merge

**Emit values from all observables as they arrive.**

**Simple Example:**
```typescript
import { merge, interval } from 'rxjs';
import { map } from 'rxjs/operators';

const first$ = interval(1000).pipe(map(n => `First: ${n}`));
const second$ = interval(1500).pipe(map(n => `Second: ${n}`));

merge(first$, second$).subscribe(value => console.log(value));

// Output:
// First: 0
// Second: 0
// First: 1
// Second: 1
// First: 2
// ...
```

**Real-world example:**
```typescript
// Merge different event sources
const click$ = fromEvent(button, 'click');
const keypress$ = fromEvent(document, 'keypress');
const resize$ = fromEvent(window, 'resize');

merge(click$, keypress$, resize$).subscribe(() => {
  console.log('User activity detected');
});
```

### 8.4 zip

**Wait for all observables to emit, then combine values by index.**

**Simple Example:**
```typescript
import { zip, of, interval } from 'rxjs';
import { take } from 'rxjs/operators';

const numbers$ = of(1, 2, 3);
const letters$ = of('A', 'B', 'C');
const colors$ = of('Red', 'Green', 'Blue');

zip(numbers$, letters$, colors$).subscribe(([num, letter, color]) => {
  console.log(`${num} - ${letter} - ${color}`);
});

// Output:
// 1 - A - Red
// 2 - B - Green
// 3 - C - Blue
```

**With intervals:**
```typescript
const fast$ = interval(500).pipe(take(3));
const slow$ = interval(1000).pipe(take(3));

zip(fast$, slow$).subscribe(([fast, slow]) => {
  console.log(`Fast: ${fast}, Slow: ${slow}`);
});

// Output (every 1 second):
// Fast: 0, Slow: 0
// Fast: 1, Slow: 1
// Fast: 2, Slow: 2
```

### 8.5 concat

**Subscribe to observables sequentially.**

**Simple Example:**
```typescript
import { concat, of } from 'rxjs';
import { delay } from 'rxjs/operators';

const first$ = of(1, 2, 3);
const second$ = of(4, 5, 6).pipe(delay(1000));
const third$ = of(7, 8, 9);

concat(first$, second$, third$).subscribe(value => console.log(value));

// Output:
// 1, 2, 3 (immediately)
// 4, 5, 6 (after 1 second)
// 7, 8, 9 (immediately after)
```

### 8.6 race

**Emit from the first observable that emits.**

**Simple Example:**
```typescript
import { race, timer } from 'rxjs';
import { map } from 'rxjs/operators';

const slow$ = timer(2000).pipe(map(() => 'Slow'));
const fast$ = timer(1000).pipe(map(() => 'Fast'));

race(slow$, fast$).subscribe(value => console.log(value));

// Output: Fast
```

---

## 9. Creation Operators

### 9.1 of

**Create observable from values:**

```typescript
import { of } from 'rxjs';

of(1, 2, 3, 4, 5).subscribe(value => console.log(value));
// Output: 1, 2, 3, 4, 5

of('Hello', 'World').subscribe(value => console.log(value));
// Output: Hello, World

of({ name: 'John' }, { name: 'Jane' }).subscribe(value => console.log(value));
// Output: { name: 'John' }, { name: 'Jane' }
```

### 9.2 from

**Create observable from array, promise, or iterable:**

**From array:**
```typescript
import { from } from 'rxjs';

from([1, 2, 3, 4, 5]).subscribe(value => console.log(value));
// Output: 1, 2, 3, 4, 5
```

**From promise:**
```typescript
const promise = Promise.resolve('Hello');

from(promise).subscribe(value => console.log(value));
// Output: Hello
```

**From string:**
```typescript
from('Hello').subscribe(value => console.log(value));
// Output: H, e, l, l, o
```

### 9.3 interval

**Emit sequential numbers at intervals:**

```typescript
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';

interval(1000).pipe(
  take(5)
).subscribe(value => console.log(value));

// Output (every second):
// 0
// 1
// 2
// 3
// 4
```

### 9.4 timer

**Emit after delay, then at intervals:**

**Single emission:**
```typescript
import { timer } from 'rxjs';

timer(3000).subscribe(() => console.log('After 3 seconds'));
```

**Repeated emissions:**
```typescript
timer(2000, 1000).subscribe(value => console.log(value));

// Output:
// (after 2 seconds) 0
// (after 3 seconds) 1
// (after 4 seconds) 2
// ...
```

### 9.5 fromEvent

**Create observable from DOM events:**

```typescript
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

const button = document.querySelector('#myButton');

fromEvent(button, 'click').subscribe(() => {
  console.log('Button clicked!');
});

// With event data
fromEvent(input, 'input').pipe(
  map((event: any) => event.target.value)
).subscribe(value => console.log(value));
```

### 9.6 ajax

**Create observable from AJAX request:**

```typescript
import { ajax } from 'rxjs/ajax';

ajax.getJSON('/api/users').subscribe(users => {
  console.log(users);
});

// POST request
ajax({
  url: '/api/users',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: {
    name: 'John',
    email: 'john@example.com'
  }
}).subscribe(response => {
  console.log(response);
});
```

---

## Summary

You've mastered **RxJS and Observables**!

**Key Concepts:**

**1. Observable Basics:**
- Stream of values over time
- Lazy (start on subscribe)
- Can emit multiple values
- Can be cancelled

**2. Observers and Subscriptions:**
- Observer: next, error, complete
- Subscription: unsubscribe to cancel
- Always clean up subscriptions

**3. Subjects:**
- **Subject**: Basic multicast
- **BehaviorSubject**: Stores latest value
- **ReplaySubject**: Stores multiple values
- **AsyncSubject**: Emits last value on complete

**4. Operators:**
- **map**: Transform values
- **filter**: Filter values
- **switchMap**: Switch to new observable
- **mergeMap**: Merge observables
- **debounceTime**: Delay emissions
- **takeUntil**: Complete on signal

**5. Hot vs Cold:**
- **Cold**: Unicast, each subscriber gets own execution
- **Hot**: Multicast, shared execution

**6. Combining:**
- **forkJoin**: Wait for all (like Promise.all)
- **combineLatest**: Combine latest values
- **merge**: Merge all emissions
- **zip**: Combine by index

**Best Practices:**
```typescript
// ✓ Always unsubscribe
ngOnDestroy() {
  this.subscription.unsubscribe();
}

// ✓ Use async pipe
users$ = this.service.getUsers();

// ✓ Use takeUntil
.pipe(takeUntil(this.destroy$))

// ✓ Handle errors
.pipe(catchError(err => of([])))

// ✗ Don't forget to unsubscribe
observable$.subscribe();  // Memory leak!
```

**Common Patterns:**
```typescript
// Search with debounce
searchTerm$.pipe(
  debounceTime(300),
  distinctUntilChanged(),
  switchMap(term => this.search(term))
)

// Combine multiple sources
combineLatest([source1$, source2$]).pipe(
  map(([data1, data2]) => ({ data1, data2 }))
)

// Auto-unsubscribe
observable$.pipe(
  takeUntil(this.destroy$)
).subscribe()

// Retry on error
http.get('/api/data').pipe(
  retry(3),
  catchError(err => of([]))
)
```

Master these RxJS concepts to build reactive, efficient Angular applications with powerful data stream management!
