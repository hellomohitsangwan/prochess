# Express Routes Overview

This repository contains the route files for different modules of your backend application. Below, you'll find a breakdown of the routes, their functionalities, and associated middleware.

## Cart endpoints

- Route: `/add/:id` (POST)
  - Description: Add products to the user's cart.
  - Middleware: `protect` - Authentication required.

- Route: `/remove/:id` (DELETE)
  - Description: Remove a product from the user's cart.
  - Middleware: `protect` - Authentication required.

- Route: `/clear` (DELETE)
  - Description: Clear the user's cart.
  - Middleware: `protect` - Authentication required.

- Route: `/view` (GET)
  - Description: View the total bill, including taxes, of items in the user's cart.
  - Middleware: `protect` - Authentication required.

## Order endpoints

- Route: `/create` (POST)
  - Description: Place an order.
  - Middleware: `protect` - Authentication required.

- Route: `/` (GET)
  - Description: Get all orders (admin only).
  - Middleware: `protect`, `adminMiddleware` - Authentication and admin privilege required.

## Product endpoints

- Route: `/` (GET, POST)
  - Description: Get all products or create a new product (admin only).
  - Middleware: `protect`, `adminMiddleware` - Authentication and admin privilege required.

- Route: `/myreviews` (GET)
  - Description: Get product reviews for products owned by the admin.
  - Middleware: `protect`, `adminMiddleware` - Authentication and admin privilege required.

- Route: `/myproducts` (GET)
  - Description: Get products owned by the user.
  - Middleware: `protect` - Authentication required.

- Route: `/:id/reviews` (POST)
  - Description: Create a review for a product.
  - Middleware: `protect` - Authentication required.

- Route: `/reviews/:id` (GET)
  - Description: Get all reviews for a product (admin only).
  - Middleware: `protect`, `adminMiddleware` - Authentication and admin privilege required.

- Route: `/top` (GET)
  - Description: Get top-rated products.

- Route: `/:id` (GET, DELETE, PUT)
  - Description: Get, update, or delete a specific product (admin only).
  - Middleware: `protect`, `adminMiddleware` - Authentication and admin privilege required.

## User endpoints

- Route: `/` (POST, GET)
  - Description: Register a new user or get all users (admin only).
  - Middleware: `protect`, `adminMiddleware` - Authentication and admin privilege required.

- Route: `/login` (POST)
  - Description: Authenticate a user.

- Route: `/:id` (DELETE)
  - Description: Delete a user (admin only).
  - Middleware: `protect`, `adminMiddleware` - Authentication and admin privilege required.

Please refer to the respective route controller files for detailed implementations of each endpoint.
