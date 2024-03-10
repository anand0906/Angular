<h1>HttpClient</h1>
<p>The HttpClient is a module in Angular that provides functionalities for making HTTP requests to backend servers and handling the responses within your Angular application.</p>
<p>The HttpClientModule is a module in Angular that provides functionalities for making HTTP requests to backend servers and handling the responses within your Angular application.</p>
<p>It is part of the @angular/common/http module and provides a convenient API for handling HTTP operations.</p>

<h2>Setup</h2>
<p>You need to import HttpClientModule into your application's root module (usually AppModule) to make the HttpClient service available throughout your application.</p>

```Typescript
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [HttpClientModule],
  // ...
})
export class AppModule { }
```
<p>HttpClient Service: This is the core service within HttpClientModule. It offers methods to perform various HTTP operations like GET, POST, PUT, DELETE, etc.</p>
<p>To use HttpClient in your service or component, you need to inject it. You can do this by adding it to the constructor as follows</p>

```Typescript
import { HttpClient } from '@angular/common/http';

constructor(private http: HttpClient) { }
```

<p>You can use various methods provided by HttpClient to make HTTP requests, such as get, post, put, delete, etc. Here's an example of making a simple GET request</p>

```Typescript
getData() {
  return this.http.get('https://api.example.com/data');
}
```

<h2>Observable</h2>
<p>Observables are a fundamental concept in libraries like RxJS (Reactive Extensions for JavaScript) used in frameworks like Angular. They provide a way to handle asynchronous data streams in a reactive manner.</p>
<p>Think of an Observable as a stream of data flowing over time. It's like a river of information where things (data or events) come along at different moments.</p>
<p>You can create your own Observable to represent this stream. For example, you might have an Observable that emits messages.</p>

```Typescript
const messageStream = new Observable((observer) => {
  observer.next('Hello');
  observer.next('World');
  observer.complete();
});
```
<p>To actually get the data from the stream, you "subscribe" to it. It's like saying, "Hey, I'm interested in hearing what comes down this river!"</p>

```Typescript
messageStream.subscribe(
  (message) => console.log(message),  // Print each message
  (error) => console.error(error),    // Handle errors (if any)
  () => console.log('Stream ended')    // Do something when the stream is done
);
```
<p>The stream has a lifecycle. It can send data (next), encounter an error (error), or signal that it's done sending data (complete).</p>
<p>If you decide you're not interested in the stream anymore, you can "unsubscribe." It's like saying, "Okay, I've seen enough. I don't want to hear from this stream anymore."</p>

```Typescript
const subscription = messageStream.subscribe(/* handlers */);

// Later, if you want to stop listening
subscription.unsubscribe();
```

<p>You can also do cool things with the stream, like changing the messages or filtering them. This is done using "operators."</p>

```Typescript
import { map, filter } from 'rxjs/operators';

messageStream.pipe(
  map((message) => message.toUpperCase()),
  filter((message) => message.startsWith('H'))
).subscribe((transformedMessage) => console.log(transformedMessage));
```

<p>The HttpClient in Angular provides several methods for making HTTP requests. Each method corresponds to a different HTTP verb (GET, POST, PUT, DELETE, etc.).</p>

<h2>GET</h2>
<p>The GET method in the HttpClient module of Angular is used to retrieve data from a specified URL</p>
<p>This is typically used when you want to fetch information from a server, such as retrieving a list of items, details of a specific resource, or any other data available via an HTTP GET request.</p>
<p>Use the get() method of HttpClient to initiate the GET request. It takes two arguments:</p>
<ul>
	<li>URL: The URL of the resource you want to retrieve data from.</li>
	<li>Options (Optional): An object containing additional configuration options for the request, such as headers, params (query parameters), or the expected response type.</li>
</ul>

```Typescript
const url = 'https://api.example.com/data'; // Replace with your actual API URL

// Basic GET request
this.http.get(url);

// GET request with options
const options = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  params: { filter: 'active' }
};
this.http.get(url, options);
```

<p>The get() method returns an Observable. Observables are streams of data emitted over time. You subscribe to the Observable to receive and process the data as it arrives from the server, or handle any errors that might occur.</p>

```Typescript
this.http.get<any>(url) // Specifying the expected response type (any in this case)
  .subscribe(data => {
    console.log('GET request successful:', data);
    // Process the received data here
  },
  error => {
    console.error('Error fetching data:', error);
    // Handle errors here
  });
```

<p>In general, you should unsubscribe from an observable when a component is destroyed.
You don't have to unsubscribe from HttpClient observables because they unsubscribe automatically after the server request responds or times out. Most developers choose not to unsubscribe. None of this guide's examples unsubscribe.</p>
<p>In fact, each subscribe() initiates a separate, independent execution of the observable. Subscribing twice results in two HTTP requests</p>

```Typescript
const req = http.get<Heroes>('/api/heroes');
// 0 requests made - .subscribe() not called.
req.subscribe();
// 1 request made.
req.subscribe();
// 2 requests made.
```

<p>The options parameter in the get method of HttpClient in Angular is an optional object that allows you to configure various aspects of your GET request. It provides flexibility and control over how your request is made and how the response is handled.</p>

```Typescript
options: {
  headers?: HttpHeaders | {[header: string]: string | string[]},
  observe?: 'body' | 'events' | 'response',
  params?: HttpParams|{[param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>},
  reportProgress?: boolean,
  responseType?: 'arraybuffer'|'blob'|'json'|'text',
  withCredentials?: boolean,
}
```

<h5>headers</h5>
<p>Used to send additional information about the request to the server.</p>
<p>Created using the HttpHeaders class.</p>
<p>Common headers include:</p>
<ul>
	<li>Content-Type: Specifies the format of the request body (e.g., application/json, text/plain). This is usually not required for GET requests as they typically don't have a body.</li>
	<li>Authorization: Used for authentication purposes (e.g., bearer tokens).</li>
	<li>Accept: Specifies the types of responses the client can accept (e.g., application/json).</li>
</ul>

```Typescript
const headers = new HttpHeaders({
  'Authorization': `Bearer my-access-token`
});

this.http.get(url, { headers });
```

<h5>Params</h5>
<p>Used to send data along with the GET request in the URL as query string parameters. These are key-value pairs appended to the URL after a question mark (?).</p>
<p>Defined as a key-value object within the options object.</p>

```TypeScript
import { HttpParams } from '@angular/common/http';

const queryParams = new HttpParams()
  .set('param1', 'value1')
  .set('param2', 'value2');

this.http.get('https://api.example.com/data', { params: queryParams }).subscribe(
  (data) => {
    // Handle successful response
    console.log(data);
  },
  (error) => {
    // Handle error
    console.error(error);
  }
);

```

<h5> Response Type:</h5>
<p>By default, HttpClient returns the response body as a JavaScript object. This might not always be the desired format.</p>
<p> you can use the responseType property in the options object to control the response format:</p>
<ul>
	<li>'json': Parse JSON response (default).</li>
	<li>'text': Get the response as plain text.</li>
	<li>'blob': Get the response as a Blob object (useful for binary data).</li>
	<li>'arraybuffer': Get the response as an ArrayBuffer.</li>
</ul>

```Typescript
this.http.get<Product[]>(url); // Specifying expected response type as an array of Product objects

// Using responseType in options
this.http.get(url, { responseType: 'text' });
```
<h5>Observe</h5>
<p>The observe property within the options object of HttpClient's get (and other) methods in Angular deals with how much of the HTTP response you want to observe. </p>
<p>It essentially determines what data you receive from the server and how you handle it.</p>
<p>Two common values used with observe</p>

<h6>'body': (Default Behavior)</h6>
<p>By default, the observe value is 'body', meaning you receive the response body.</p>
<h6>'events': For Progress Events</h6>
<p>This option is useful when you want to monitor the progress of the HTTP request as it's being downloaded.</p>
<p>Setting observe to 'events' results in HttpClient emitting multiple HttpEvent objects throughout the request lifecycle.</p>
<p>This approach is beneficial for scenarios like displaying a progress bar while downloading large files or handling long-running requests.</p>

<p>You can also set it to 'response' if you want the full HTTP response, including headers and status.</p>

<h5>withCredentials?: boolean</h5>
<p>By default, web browsers enforce security restrictions to prevent a web page from making HTTP requests to a different domain than the one that served the page. This is known as the Same-Origin Policy (SOP).</p>
<p>Cross-Origin Requests (CORS) are a mechanism that allows web browsers to relax this restriction under certain conditions.When making a request to a different domain (cross-origin), cookies associated with the original domain (where the page is hosted) are not automatically sent by the browser due to SOP.</p>
<p>Setting withCredentials to true in the options object instructs the browser to include any cookies associated with the target domain in the request. This is crucial for scenarios where authentication or session management relies on cookies.</p>
<p>Imagine your Angular application is hosted on your-app.com and you need to make a GET request to an API endpoint on api.example.com.</p>
<p>If the API endpoint on api.example.com uses cookies for authentication and expects them to be present in the request, you'll need to set withCredentials to true:</p>

```Typescript
const options = { withCredentials: true };

this.http.get('https://api.example.com/data', options).subscribe(...)
```
<p>For withCredentials to work effectively, the server that receives the request (api.example.com in this case) must also be configured to allow requests with credentials. This server-side configuration varies depending on the server technology being used.</p>
<p>Using withCredentials can introduce security implications, as cookies can contain sensitive information. Make sure you only enable it for trusted domains and APIs that require it for authentication or session management.</p>
<p>withCredentials is typically used only for cross-origin requests. For same-origin requests (where the domain of the API endpoint matches the domain of your application), cookies are sent automatically by the browser.</p>
<p>withCredentials is typically used only for cross-origin requests. For same-origin requests (where the domain of the API endpoint matches the domain of your application), cookies are sent automatically by the browser.</p>

<h5>Reportprogress</h5>
<p>The reportProgress option in Angular's HttpClient is used when you want to listen for progress events during the transfer of large amounts of data, such as when uploading or downloading files. This option allows you to monitor the progress of the HTTP request and receive updates on how much data has been transferred.</p>
<p>When making a request, set the reportProgress option to true. This informs HttpClient that you want to receive progress events.</p>

```typescript
import { HttpClient, HttpEventType } from '@angular/common/http';

// ...

this.http.get('https://api.example.com/large-data', { reportProgress: true, responseType: 'text' })
  .subscribe(event => {
    if (event.type === HttpEventType.DownloadProgress) {
      // Handle download progress event
      const percentDone = Math.round((100 * event.loaded) / event.total);
      console.log(`Download progress: ${percentDone}%`);
    } else if (event.type === HttpEventType.Response) {
      // Handle the complete response
      console.log('Download complete:', event.body);
    }
  });
```

<p>Inside the subscription, you can check the type of the event using event.type to determine whether it's a progress event (HttpEventType.DownloadProgress or HttpEventType.UploadProgress). If it is, you can extract information such as the loaded and total bytes to calculate the progress percentage.</p>

```typescript
if (event.type === HttpEventType.DownloadProgress) {
  const percentDone = Math.round((100 * event.loaded) / event.total);
  console.log(`Download progress: ${percentDone}%`);
}
```
<p>After the progress events, you will eventually receive a response event (HttpEventType.Response). This event contains the complete response from the server.</p>

```typescript
else if (event.type === HttpEventType.Response) {
  // Handle the complete response
  console.log('Download complete:', event.body);
}
```

<h3>Typed Response</h3>
<p>When using Angular's HttpClient to make HTTP requests, you can request a typed response by specifying the desired type as a generic parameter when making the request.</p>
<p>his is useful when you know the shape of the expected response and want TypeScript to provide type checking and autocompletion for the received data.</p>
<p>Suppose you made the get call without specifying the return type like this:</p>

```typescript
return this.http.get(this.configUrl);
```

<p>The return type would be Object, To access its properties you would have to explicitly convert them with as any like this:</p>

```typescript
showConfig() {
  this.configService.getConfig()
    .subscribe(data => this.config = {
        heroesUrl: (data as any).heroesUrl,
        textfile:  (data as any).textfile,
        date: (data as any).date,
    });
  }
```

<p>Before making the request, define the TypeScript interface or type that represents the expected structure of the response data.</p>

```typescript
export interface Config {
  heroesUrl: string;
  textfile: string;
  date: any;
}
```

<p>When making the request using HttpClient, provide the type as a generic parameter using the get<T> method (replace T with your defined type). The response observable will now emit values of the specified type.</p>

```Typescript
getConfig() {
  // now returns an Observable of Config
  return this.http.get<Config>(this.configUrl);
}

config: Config | undefined;

showConfig() {
  this.configService.getConfig()
    .subscribe(data => this.config = {
        heroesUrl: data.heroesUrl,
        textfile:  data.textfile,
        date: data.date,
    });
}
```

<p>When subscribing to the observable, TypeScript will recognize the data type, allowing you to work with the received data with the correct structure.</p>
<p>By using typed responses, you get the benefits of TypeScript's static typing, making your code more robust and reducing the likelihood of runtime errors. It also provides better code completion and documentation within your integrated development environment (IDE).</p>

<h2>Handling Errors</h2>
<p>In Angular, HttpClient provides mechanisms to handle errors that can occur during HTTP requests to backend servers.</p>
<p>If the request fails on the server, HttpClient returns an error object instead of a successful response.</p>
<p>When an error occurs, you can obtain details of what failed to inform your user. In some cases, you might also automatically retry the request.</p>
<p>Two types of errors can occur. server-side errors and client-side errors.</p>
<h5>Client Side Errors</h5>
<p>Client-side errors may occur due to network issues or exceptions thrown within RxJS operators. </p>
<p>These errors happen on the client (user's browser) and prevent the request from completing successfully. They typically have a status code of 0 and the error property in the error object provides more details. Here's a breakdown of client-side errors:</p>
<h6>Network Errors:</h6>
<p>These occur due to issues with the internet connection or server availability. The error property might contain a ProgressEvent object, and the type property within ProgressEvent could indicate the specific network issue, such as 'timeout', 'load', or 'abort'.</p>
<p>These errors have status set to 0</p>
<h5>Server Side Errors</h5>
<p>These errors originate from the backend server and are indicated by an HTTP response with a status code in the 4xx or 5xx range. Common examples include:</p>

```typescript
private handleError(error: HttpErrorResponse) {
  if (error.status === 0) {
    // A client-side or network error occurred. Handle it accordingly.
    console.error('An error occurred:', error.error);
  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong.
    console.error(
      `Backend returned code ${error.status}, body was: `, error.error);
  }
  // Return an observable with a user-facing error message.
  return throwError(() => new Error('Something bad happened; please try again later.'));
}

```
<h3>Retrying Failure Requets</h3>
<p>Retrying failed requests is a common strategy to improve the robustness of your application, especially when dealing with network-related issues or intermittent errors. In Angular, you can implement request retries using the retry operator provided by RxJS.</p>
<p>Use the retry operator to specify the number of times you want to retry the request. Combine it with the catchError operator to handle errors and decide whether to retry or propagate the error.</p>

```typescript
getDataWithRetry(): Observable<any> {
  const maxRetries = 3; // You can adjust this value based on your requirements

  return this.http.get('https://api.example.com/data').pipe(
    retry(maxRetries),
    catchError((error) => {
      // Log the error or perform custom error handling
      console.error('Error occurred:', error);

      // Propagate the error if the maximum number of retries is reached
      if (error.status === 0 || error.status >= 500) {
        return throwError('Maximum retries reached or server error.');
      }

      // Retry for other types of errors
      return throwError(error);
    })
  );
}

this.getDataWithRetry().subscribe(
  (data) => {
    // Handle successful response
    console.log(data);
  },
  (error) => {
    // Handle error (this block is reached only if maximum retries are exhausted)
    console.error('Final error:', error);
  }
);

```
<p>In this example, the retry operator will attempt to resend the request up to maxRetries times. The catchError operator is used to handle errors and decide whether to continue with retries or propagate the error if the maximum retry limit is reached.</p>

<h2>POST</h2>
<p>The POST method in Angular's HttpClient is used to send data to the server, typically to create a new resource. </p>
<p>The HttpClient.post() method is similar to get() in that it has a type parameter, which you can use to specify that you expect the server to return data of a given type. The method takes a resource URL and two additional parameters:</p>
<p>body: The data to POST in the body of the request.</p>
<p>body:	The data to POST in the body of the request.</p>

```Typescript
/** POST: add a new hero to the database */
addHero(hero: Hero): Observable<Hero> {
  return this.http.post<Hero>(this.heroesUrl, hero, httpOptions)
    .pipe(
      catchError(this.handleError('addHero', hero))
    );
}
```

<h2>PUT</h2>
<p>The PUT method in Angular's HttpClient is used to update an existing resource on the server with the provided data.</p>
<p>An app can send PUT requests using the HTTP client service. The following HeroesService example, like the POST example, replaces a resource with updated data.</p>

```Typescript
/** PUT: update the hero on the server. Returns the updated hero upon success. */
updateHero(hero: Hero): Observable<Hero> {
  return this.http.put<Hero>(this.heroesUrl, hero, httpOptions)
    .pipe(
      catchError(this.handleError('updateHero', hero))
    );
}
```

<h2>Add And Updating Headers</h2>
<p>Add Headers</p>

```Typescript
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};
```

<p>Update Headers</p>
<p>You can't directly modify the existing headers within the previous options object because instances of the HttpHeaders class are immutable. Use the set() method instead, to return a clone of the current instance with the new changes applied.</p>
```Typescript
httpOptions.headers =
  httpOptions.headers.set('Authorization', 'my-new-auth-token');
```

<h2>Configure URL Parameters</h2>
<p>Use the HttpParams class with the params request option to add URL query strings in your HttpRequest.</p>
<p>The HttpParams object is immutable. If you need to update the options, save the returned value of the .set() method.</p>

```Typescript
/* GET heroes whose name contains search term */
searchHeroes(term: string): Observable<Hero[]> {
  term = term.trim();

  // Add safe, URL encoded search parameter if there is a search term
  const options = term ?
   { params: new HttpParams().set('name', term) } : {};

  return this.http.get<Hero[]>(this.heroesUrl, options)
    .pipe(
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
}
```
<p>You can also create HTTP parameters directly from a query string by using the fromString variable:</p>

```Typescript
const params = new HttpParams({fromString: 'name=foo'});
```

<h2>Interceptor</h2>
<p>Interceptors in Angular's HttpClient are classes that act as middleware for HTTP requests and responses. They provide a way to intercept these communications and perform actions on them before they reach your application or the server</p>
<p><strong>Modify Requests:</strong>Interceptors can transform outgoing requests by adding headers, changing URLs, or manipulating the request body before it's sent. This is useful for tasks like adding authentication tokens or handling specific content types.</p>
<p><strong>Modify Responses:</strong> Similarly, they can intercept incoming responses and modify them before they reach your components. This could involve parsing JSON responses, handling errors centrally, or transforming the response data.</p>
<p><strong>Perform Common Tasks:</strong>By implementing logic in interceptors, you can avoid repetitive code in your application. Common use cases include adding logging for all requests, showing loading indicators during requests, or handling authorization errors globally.</p>
<p>Here are some advantages of using interceptors:</p>
<ul>
  <li>Centralized Logic: By implementing common HTTP operations in interceptors, you keep your application code clean and maintainable.</li>
  <li>Improved Reusability: The functionality defined in an interceptor can be reused throughout your application for any HTTP request.</li>
  <li>Modular Design: Interceptors promote modularity by separating concerns related to HTTP communication from your application logic.
  </li>
</ul>
<h3>Implementation</h3>
<p>Here's how to implement an interceptor in Angular:</p>
<ol>
  <li><strong>Creating the Interceptor Class:</strong></li>
  <p>Begin by creating a new service using the Angular CLI:</p>
  <code>
    ng generate service my-interceptor
  </code>
  <p>This generates a new service file named my-interceptor.service.ts in your src/app directory.</p>
  <p>Open the generated service file and update it to implement the HttpInterceptor interface. This interface defines a single method called intercept.</p>
  <code>
    import { Injectable } from '@angular/core';
    import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
    import { Observable } from 'rxjs';

    @Injectable()
    export class MyInterceptor implements HttpInterceptor {

      intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Your interceptor logic here
        return next.handle(req);
      }
    }
  </code>
  <li><strong>Implementing the intercept Method:</strong></li>
  <p>The intercept method takes two arguments:</p>
  <ul>
    <li>req: The outgoing HttpRequest object.</li>
    <li>next: The HttpHandler object, which is used to continue the request chain.</li>
  </ul>
  <p>Inside the intercept method, you can modify the request or response in various ways. Here are some examples:</p>
  <p>Adding common header</p>

```Typescript
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const authToken = 'your_auth_token';
      const authReq = req.clone({ setHeaders: { Authorization: `Bearer ${authToken}` } });
      return next.handle(authReq);
    }
```
  <p>Handling errors globally:</p>

```Typescript
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(req)
        .catch(error => {
          // Handle errors here (e.g., display a toast message)
          return throwError(error);
        });
    }
```
  <li><strong>Registering the Interceptor:</strong></li>
  <p>To use your interceptor in your application, you need to register it with the HttpClient. This is done by providing the interceptor class in the HTTP_INTERCEPTORS token during the HttpClientModule configuration in your AppModule.</p>

```Typescript
  import { NgModule } from '@angular/core';
  import { BrowserModule } from '@angular/platform-browser';
  import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

  import { AppComponent } from './app.component';
  import { MyInterceptor } from './my-interceptor.service';

  @NgModule({
    declarations: [
      AppComponent
    ],
    imports: [
      BrowserModule,
      HttpClientModule,
    ],
    providers: [
      { provide: HTTP_INTERCEPTORS, useClass: MyInterceptor, multi: true }
    ],
    bootstrap: [AppComponent]
  })
  export class AppModule { }
```
  <p>The multi: true option ensures that multiple interceptors can be registered if needed.</p>
</ol>

<h3>next()</h3>
<p>In Angular interceptors, the next object represents the next interceptor in the chain. This chain of interceptors is executed in the order they are provided in the module.</p>
<p>The final next in the chain is the HttpHandler responsible for sending the request to the server and receiving the server's response.</p>
<p>Most interceptors in Angular call next.handle() to pass the request to the next interceptor in the chain or, if it's the last one, to the HttpHandler for actual HTTP request processing.</p>
<p>This allows interceptors to perform actions before and after the actual HTTP request, such as modifying headers, logging, or handling responses.</p>
<p>An interceptor has the option to skip calling next.handle() and short-circuit the chain. In such cases, the interceptor can return its own Observable with an artificial server response.</p>
<p>This provides the ability to intercept the request, handle it independently, and return a custom response without involving the actual server. This behavior is akin to creating a middleware that stops the request/response flow in server-side frameworks like Express.js.</p>

<p>Here's a basic example illustrating the concept of skipping next.handle() in an Angular interceptor:</p>

```Typescript
  import { Injectable } from '@angular/core';
  import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpResponse
  } from '@angular/common/http';
  import { Observable, of } from 'rxjs';

  @Injectable()
  export class MyInterceptor implements HttpInterceptor {
    intercept(
      request: HttpRequest<any>,
      next: HttpHandler
    ): Observable<HttpEvent<any>> {
      // Check if a condition is met to short-circuit the chain
      if (/* some condition */) {
        // Skip calling next.handle() and return a custom response
        const fakeResponse = new HttpResponse({
          status: 200,
          body: { message: 'Custom response from interceptor' }
        });
        return of(fakeResponse);
      }

      // Continue with the regular request flow
      return next.handle(request);
    }
  }
```

<h3>Providing many interceptors</h3>
<p>In your Angular module (e.g., app.module.ts), import the interceptors and add them to the providers array in the desired order.</p>

```Typescript
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthInterceptor } from './auth-interceptor';
import { CachingInterceptor } from './caching-interceptor';
import { EnsureHttpsInterceptor } from './ensure-https-interceptor';
import { LoggingInterceptor } from './logging-interceptor';
import { NoopInterceptor } from './noop-interceptor';
import { TrimNameInterceptor } from './trim-name-interceptor';
import { UploadInterceptor } from './upload-interceptor';

/** Array of Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: NoopInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: EnsureHttpsInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: TrimNameInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: UploadInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: CachingInterceptor, multi: true },
];

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(HttpClientModule),
    httpInterceptorProviders,
  ]
};
```

<p>Angular applies interceptors in the order that you provide them. For example, consider a situation in which you want to handle the authentication of your HTTP requests and log them before sending them to a server. To accomplish this task, you could provide an AuthInterceptor service and then a LoggingInterceptor service. Outgoing requests would flow from the AuthInterceptor to the LoggingInterceptor. Responses from these requests would flow in the other direction, from LoggingInterceptor back to AuthInterceptor. The following is a visual representation of the process:</p>
<img src="https://angular.io/generated/images/guide/http/interceptor-order.svg">

<h3>Pass metadata to interceptors</h3>
<p>HttpClient requests contain a context that can carry metadata about the request. This context is available for interceptors to read or modify, though it is not transmitted to the backend server when the request is sent.</p>
<p>Angular stores and retrieves a value in the context using an HttpContextToken. You can create a context token using the new operator, as in the following example:</p>

```Typescript
export const RETRY_COUNT = new HttpContextToken(() => 3);
```
<p>The lambda function () => 3 passed during the creation of the HttpContextToken serves two purposes:</p>
<ul>
  <li>It lets TypeScript infer the type of this token: <code>HttpContextToken <number></code> The request context is type-safe —reading a token from a request's context returns a value of the appropriate type.</li>
  <li>It sets the default value for the token. This is the value that the request context returns if no other value was set for this token. Using a default value avoids the need to check if a particular value is set.</li>
</ul>
<p>When making a request, you can provide an HttpContext instance, in which you have already set the context values.</p>

```Typescript
this.httpClient
    .get('/data/feed', {
      context: new HttpContext().set(RETRY_COUNT, 5),
    })
    .subscribe(results => {/* ... */});
```

<p>Within an interceptor, you can read the value of a token in a given request's context with HttpContext.get(). If you have not explicitly set a value for the token, Angular returns the default value specified in the token.</p>

```Typescript
import {retry} from 'rxjs';

export class RetryInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const retryCount = req.context.get(RETRY_COUNT);

    return next.handle(req).pipe(
        // Retry the request a configurable number of times.
        retry(retryCount),
    );
  }
}
```

<p>Unlike most other aspects of HttpRequest instances, the request context is mutable and persists across other immutable transformations of the request. This lets interceptors coordinate operations through the context. For instance, the RetryInterceptor example could use a second context token to track how many errors occur during the execution of a given request:</p>


```Typescript
import {retry, tap} from 'rxjs/operators';
export const RETRY_COUNT = new HttpContextToken(() => 3);
export const ERROR_COUNT = new HttpContextToken(() => 0);

export class RetryInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const retryCount = req.context.get(RETRY_COUNT);

    return next.handle(req).pipe(
        tap({
              // An error has occurred, so increment this request's ERROR_COUNT.
             error: () => req.context.set(ERROR_COUNT, req.context.get(ERROR_COUNT) + 1)
            }),
        // Retry the request a configurable number of times.
        retry(retryCount),
    );
  }
}
```

<h3>Debouncing</h3>
<p>If you need to make an HTTP request in response to user input, it's not efficient to send a request for every keystroke. It's better to wait until the user stops typing and then send a request. This technique is known as debouncing.</p>
<p>The key components of debouncing include:</p>
<ul>
  <li><strong>Delay : </strong>The duration for which the system waits after the last invocation of the function before actually executing it. This delay is crucial for ensuring that the function is only called when the user stops typing or interacting with the input field.</li>
  <li><strong>Triggering Event:</strong> The event that initiates the function call. In the case of user input, this is typically an input event like keystrokes.</li>
</ul>
<p>By incorporating debouncing, you strike a balance between responsiveness and efficiency. Users can still interact with the application in real-time, and server requests are made judiciously to avoid unnecessary overhead.</p>
<p>By incorporating debouncing, you strike a balance between responsiveness and efficiency. Users can still interact with the application in real-time, and server requests are made judiciously to avoid unnecessary overhead.</p>

```Typescript
import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-debounced-search',
  template: `
    <input (input)="onInput($event.target.value)" />
    <!-- Other component content -->
  `
})
export class DebouncedSearchComponent {
  private inputSubject = new Subject<string>();

  constructor(private http: HttpClient) {
    this.inputSubject.pipe(
      debounceTime(300),
        // Debounce for 300 milliseconds
        distinctUntilChanged();
      switchMap((input: string) => this.http.get(`https://api.example.com/search?q=${input}`))
    ).subscribe(response => {
      // Handle the server response
      console.log(response);
    });
  }

  onInput(input: string): void {
    // Notify the inputSubject when there's user input
    this.inputSubject.next(input);
  }
}
=
```

<ul>
  <li>The onInput method is called whenever there's user input.</li>
  <li>The inputSubject is a subject that emits values whenever the user inputs something.</li>
  <li>The debounceTime(300) operator ensures that the HTTP request is only made after 300 milliseconds of inactivity (no new input).</li>
  <li>The switchMap operator cancels any ongoing HTTP requests if a new input arrives before the previous request completes.</li>
  <li>distinctUntilChanged()  Wait until the search text changes.</li>
</ul>
