# Standards for both client and server and listed here

## Backend API

## **API based on best practices shown in [22 Best Practices to Take Your API Design Skills to the Next Level](https://betterprogramming.pub/22-best-practices-to-take-your-api-design-skills-to-the-next-level-65569b200b9)

API paths are to use kebab-case eg.
  ```/system-orders```
  
Use camelCase for Parameters eg.
 ```/system-orders/{orderId}```

Plural Name to Point to a Collection if you want to get all the users of a system. eg.
  ```GET /users```
  
URL Starts With a Collection and Ends With an Identifier if want to keep the concept singular and consistent.``` GET /shops/:shopId/ or GET /category/:categoryId```

Keep Verbs Out of Your Resource URL don’t use verbs to express your intention in the URL. Instead, use proper HTTP methods to describe the operation. ```PUT /user/{userId}``` and **not**
POST /updateuser/{userId} or GET /getusers

Use Verbs for Non-Resource URL you have an endpoint that returns nothing but an operation. In this case, you can use verbs. For example, if you want to resend the alert to a user. ```POST /alerts/245743/resend```

Use camelCase for JSON property if you’re building a system in which the request body or response is JSON, the property names should be in camelCase
  
```
{
   userName: "Mohammad Faisal"
   userId: "1"
}
```

Monitoring RESTful HTTP services MUST implement the /health and /version and /metrics API endpoints. They will provide the following info.
/health

Respond to requests to /health with a 200 OK status code.
/version

Respond to request to /version with the version number.
/metrics

This endpoint will provide various metrics like average response time.

/debug and /status endpoints are also highly recommended.

  Don’t Use table_name for the Resource Name

Don’t just use the table name as your resource name. In the long run, this kind of laziness can be harmful.

Bad: product_order

Good: product-orders

This is because exposing the underlying architecture is not your purpose.

  Use Simple Ordinal Number as Version

Always use versioning for the API and move it all the way to the left so that it has the highest scope. The version number should be v1, v2 etc.
Good:

http://api.domain.com/v1/shops/3/products

Always use versioning in your API because if the API is being used by external entities, changing the endpoint can break their functionality.

Include Total Number of Resources in Your Response

If an API returns a list of objects always include the total number of resources in the response. You can use the total property for this.

Bad:

```
{
  users: [ 
     ...
  ]
}
```

Good:

```
{
  users: [ 
     ...
  ],  total: 34
}
```

## 13. Accept limit and offset Parameters

Always accept limit and offset parameters in GET operations.
Good:

GET /shops?offset=5&limit=5

This is because it’s necessary for pagination on the front end.

## 14. Take fields Query Parameter

The amount of data being returned should also be taken into consideration. Add a fields parameter to expose only the required fields from your API.
Example:

Only return the name, address, and contact of the shops.

GET /shops?fields=id,name,address,contact

It also helps to reduce the response size in some cases.

## 15. Don’t Pass Authentication Tokens in URL

This is a very bad practice because often URLs are logged and the authentication token will also be logged unnecessarily.
Bad

GET /shops/123?token=some_kind_of_authenticaiton_token

Good

Instead, pass them with the header:

Authorization: Bearer xxxxxx, Extra yyyyy

Also, authorization tokens should be short-lived

## 16. Validate the Content-Type

The server should not assume the content type. For example, if you accept application/x-www-form-urlencoded then an attacker can create a form and trigger a simple POST request.

So, always validate the content-type and if you want to go with a default one use content-type: application/json

## 17. Use HTTP Methods for CRUD Functions

HTTP methods serve the purpose of explaining CRUD functionality.

GET: To retrieve a representation of a resource.

POST: To create new resources and sub-resources.

PUT: To update existing resources.

PATCH: To update existing resources. It only updates the fields that were supplied, leaving the others alone

DELETE: To delete existing resources.

## 18. Use the Relation in the URL For Nested Resources

Some practical examples are:

    GET /shops/2/products : Get the list of all products from shop 2.
    GET /shops/2/products/31: Get the details of product 31, which belongs to shop 2.
    DELETE /shops/2/products/31 , should delete product 31, which belongs to shop 2.
    PUT /shops/2/products/31 , should update the info of product 31, Use PUT on resource-URL only, not the collection.
    POST /shops , should create a new shop and return the details of the new shop created. Use POST on collection-URLs.

## 19. CORS

Do support CORS (Cross-Origin Resource Sharing) headers for all public-facing APIs.

Consider supporting a CORS allowed origin of “*”, and enforcing authorization through valid OAuth tokens.

Avoid combining user credentials with origin validation.

## 20. Security

Enforce HTTPS (TLS-encrypted) across all endpoints, resources, and services.

Enforce and require HTTPS for all callback URLs, push notification endpoints, and webhooks.

## 21. Errors

Errors, or more specifically service errors, occur when a client makes an invalid or incorrect request to a service or passes invalid or incorrect data to a service, and the service rejects the request.

Examples include invalid authentication credentials, incorrect parameters, unknown version IDs, etc.

    Do return 4xx HTTP error codes when rejecting a client request due to one or more Service Errors.
    Consider processing all attributes and then returning multiple validation problems in a single response.

## 22. Golden Rules

If you are ever in doubt about an API formatting decision, these golden rules can help guide us to making the right decision.

  > Flat is better than nested.
    Simple is better than complex.
    Strings are better than numbers.
    Consistency is better than customization.


## API Reference for REST

|HTTP Verb|CRUD|Entire Collection|Specific Item|
|-|-|-|-|
|POST|Create|201 (Created), 'Location' header with link to /customers/{id} containing new ID. |404 (Not Found), 409 (Conflict) if resource already exists..|
|GET|Read|200 (OK), list of customers. Use pagination, sorting and filtering to navigate big lists. |200 (OK), single customer. 404 (Not Found), if ID not found or invalid.|
|PUT|Update/Replace|405 (Method Not Allowed), unless you want to update/replace every resource in the entire collection.|200 (OK) or 204 (No Content). 404 (Not Found), if ID not found or invalid.
|PATCH|Update/Modify|405 (Method Not Allowed), unless you want to modify the collection itself.|200 (OK) or 204 (No Content). 404 (Not Found), if ID not found or invalid.
|DELETE|Delete|405 (Method Not Allowed), unless you want to delete the whole collection—not often desirable.|200 (OK). 404 (Not Found), if ID not found or invalid.
