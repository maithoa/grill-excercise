# Architecture Review and Planning Session

**Date:** May 4-5, 2026

## 1. Initial Review of `grill-excercise` Codebase

The initial codebase was reviewed and found to utilize several strong architectural patterns:
- **Clean / Layered Architecture:** Separation of concerns between Presentation (`server.ts`), Application (`AuthService.ts`), Domain (`IAuthProvider.ts`, `IUserRepository.ts`), and Infrastructure (`InMemoryCustomerRepository.ts`).
- **Dependency Injection (DI) & Inversion of Control (IoC):** Repositories and Providers are injected into the Auth Service.
- **Strategy Pattern:** `IAuthProvider` acts as the interface, with `CustomerAuthProvider` and `InternalAuthProvider` as concrete implementations.
- **Repository Pattern:** `IUserRepository` abstractions hide hardcoded logic, making it ready for a real database.

It acts as a strong **Modular Monolith** and is standard for single-domain enterprise repositories.

## 2. Security & Best Practice Implementations

During the code review, three critical areas were identified (and subsequently implemented via Copilot):
1. **Secret Storage:** Implemented `bcrypt` for hashing instead of comparing plaintext.
2. **Rate Limiting:** Added `express-rate-limit` to prevent brute-force attacks on the login endpoints.
3. **Data Repositories:** Replaced hardcoded object dependencies with `InMemory` repositories implementing `IUserRepository`.

## 3. Designing a New Frontend Architecture (Next.js Application)

A new application for Customers was proposed. The goal is to provide a frontend for customers to view upcoming events and sign up.

### Recommended Stack:
- **Frontend / SSR / BFF:** React & Next.js for SEO and component building.
- **Backend Auth:** The current Node.js/Express service (`grill-excercise`).
- **Database:** Supabase (PostgreSQL with a REST API wrapper) was strongly recommended over JSON files.

### Architectural Blueprint (Microservices combined with DBaaS):
- `grill-customer-nextjs` handles routing, SSR events, and fetching from Supabase.
- `grill-excercise-auth` handles identity verification.

## 4. Going Serverless with AWS

To make the architecture heavily "Enterprise/Interview Ready", an AWS path was designed:
1. **Next.js Hosting:** AWS Amplify Hosting (CloudFront + Lambda@Edge).
2. **Express Backend:** AWS Lambda wrapped via `serverless-http` coupled with Amazon API Gateway.
3. **Database Alternative (Discussed):** Amazon DynamoDB, as a pure NoSQL Serverless alternative to Supabase.

## 5. Development Strategy: Monorepo vs Polyrepo

For a tight 4-hour timeline:
- **Selected Method:** **Polyrepo (Separate Repositories).** Isolates complexity, removes build-tool overhead (like Turborepo), and ensures fast AWS Amplify deployments.
- **Interview Talking Point:** Propose Turborepo/Monorepo as the *future* optimization to share TypeScript types/schemas between frontend and backend.

## 6. Serverless Local Development & Database

Clarifications around local development in a serverless environment:
- **Express Backend:** Can easily be tested locally using the `serverless-offline` plugin, which simulates API Gateway & Lambda at `localhost:3000`.
- **Database (Supabase Strategy):** Decided to completely skip local database setups (like Docker or local Postgres). Instead, connecting the local environment directly to the live Supabase Cloud Database (Cloud-first Development) was chosen as the most efficient, production-parity approach for a 4-hour objective.