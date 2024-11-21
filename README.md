# **FXQL Processing Service**
This service provides an API for parsing, validating, and processing FXQL (Foreign Exchange Quotation Language) data. Built with NestJS, it integrates robust validation, Swagger-based API documentation, Prisma ORM for database interactions, and best practices for secure and scalable development.


## Table of Contents
*   Features
*   Getting Started
    *   Setup Instructions
        *   Environment Variables
        *   Running the Application
*   Local Development Requirements
*   Project Structure
*   API Documentation
*   Key Modules and Services
*   Validation Rules
*   Error Handling

## Features
*   **FXQL Parsing and Validation:** Process complex FXQL data strings and validate their format, currency pairs, and numerical values.
*   **Prisma Integration:** Handles database operations with ease and reliability.
*   **Swagger Documentation:** Generate interactive API documentation automatically.
*   **Custom Exception Filters:** Handle Prisma-specific and generic HTTP exceptions.
*   **Security Enhancements:** Includes helmet for HTTP header protection and CORS configuration.
*   **Centralized Logging:** Middleware for structured logging of incoming requests and system logs.

## Getting Started

This service was designed to enable the seamless parsing of data used in currency conversion and other operations.

{
  "FXQL": "USD-GBP {\\n BUY 100\\n SELL 200\\n CAP 93800\\n}"
}

It takes a holistic approach to ensuring indempotency, low margin of error and scalability.

Regex was used for the manipulation of strings because it offers a high level of reliability while being low in resource use

### Setup Instructions
    1.  Clone the repository:
        ```
        git clone https://github.com/leodarkseid/fxqlparser.git
        cd fxqlparser
        ```
    2.  Install Dependencies:
        ```
        npm install

        ```
    3.  Generate Prisma Client:
        ```
        npx prisma generate
        ```
#### Environment Variables
    Create .env file in the root directory and configure the following variables:
    ```
    PORT=3001
    DATABASE_URL=postgresql://<username>:<password>@<host>:<port>/<database>
    ```
#### Running the Application
    *   Development Mode:
        ```
        npm run start:dev
        ```
    *   Production Mode:
        ```
        npm run start:prode
        ```
        Linting:
        ```
        npm run lint
        ```
##  Local Development Requirements
*   Node.js: v16.x or later
*   npm: v8.x or later
*   PostgreSQL: v12 or later (for database integration)
*   Prisma CLI: Installed globally (npm install -g prisma recommended for database management)
*   Docker (optional): For running the database locally if desired.

## Project Structure

src/
├── app.module.ts             # Main application module
├── prisma/                   # Prisma database configuration
│   ├── prisma.service.ts
│   ├── prisma-client-exception.filter.ts
├── logger/                   # Logging middleware and service
│   ├── logger.service.ts
│   ├── middleware/
├── config/                   # Application configuration (CORS, Swagger, etc.)
├── fxql/                     # FXQL processing and validation logic
│   ├── dto/                  # Data transfer objects (validation schemas)
│   ├── fxql.service.ts       # Core processing logic
│   ├── fxql.controller.ts    # API endpoints
│   ├── fxql-response.dto.ts  # Response format for FXQL data
├── tools/                    # Utility functions (e.g., parsing and ID conversions)


## API Documentation
This service provides an interactive API documentation at /api. It is powered by Swagger and can be accessed once the server is running.

*   Base URL in Devlopment: http://localhost:3001/
*   Swagger Documentation in Development: http://localhost:3001/api

##### Endpoints Overview
*   GET /fxql: Retrieve processed FXQL entries.
*   POST /fxql: Submit FXQL data for validation and processing.



## Validation
A compartmentalized approach was taken to design the service, in the sense that Validatin was left to Class Validator used in the dto
Custom validation for FXQL strings is implemented using class-validator.

RegexDataValidator which implements ValidatorConstraintInterface is implemented to provide an all encompasing validation for all data sent through the Body of the request;

*   The validator allows `//n` to be used to move to a new line just like `/n`
*   It ensures the data string matches the required pattern: [CURRENCY-CURRENCY] { BUY X SELL Y CAP Z }.
*   Validates:
    *   Format of currency pairs.
    *   Numerical values of BUY, SELL, and CAP fields.
    *   CAP must be a positive integer.


##   Error Handling
*   PrismaClientExceptionFilter:
    *   Converts Prisma-specific database errors into readable HTTP responses.
*   Custom Validation Errors:
    *   Throws BadRequestException for invalid FXQL strings with detailed error messages.
    *   I_AM_TEAPOT error is also implemented to prevent unforseen errors from going unhandled and possibly causing server crash  


## Contributing
Contributions are welcome! Follow these steps:

Fork the repository.
Create a feature branch.
Commit your changes.
Open a pull request.
bash
Copy code

## License
This project is licensed under the MIT License.