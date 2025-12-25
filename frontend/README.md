# Miller Land Management README

## Next steps for authentication, authorization, and data security

## Recommended security approach for your stack

React SPA + Spring Boot API is simplest and most secure (for a small business app) when you:

1. Deploy frontend + backend on the same site origin
  - Example: https://miller-land-management.com/ serves the SPA
  - API under https://miller-land-management.com/api/...
  - This avoids most CORS complexity and makes cookie security much easier.

2. Use `cookie-based authentication` (server sessions) with Spring Security
  - The browser automatically sends the session cookie.
  - You avoid storing tokens in localStorage (common beginner pitfall).
  - You get a well-understood model for “admin logged in” and “customer logged in”.

3. Use role-based access control (`RBAC`)
  - Roles like ROLE_ADMIN, ROLE_OWNER, ROLE_CUSTOMER
  - Combine RBAC with object-level authorization (“this quote belongs to this customer”).

4. This sets you up for:

  - Admin/owner analytics dashboards
  - A customer portal (quotes/jobs/contracts)
  - Future expansion (multi-user, permissions, audit logs)

## Authentication fundamentals (conceptual model)
The pieces

- **Authentication** “Who are you?” (login)
- **Authorization**: “What are you allowed to do?” (roles + ownership checks)
- **Session** “You’re still logged in” (server creates session; cookie identifies it)
- **CSRF protection** "Cross-Site Request Forgery" prevents malicious sites from triggering authenticated actions
- **Transport security (TLS/HTTPS)** prevents interception of credentials/cookies
- **CORS** controls which origins can access your API
- **Caching** controls how responses are stored/reused
- **RBAC** "Role-Based Access Control" which defines user roles and permissions

#### Why cookie-based sessions are a good fit here
- Works naturally with browsers.
- Avoids DIY token storage.
- Plays well with Spring Security defaults.
- Easy to revoke (invalidate session).

### Recommended auth strategy by user type
#### Admin + Site owner (high trust)
- Username/password login (later add MFA for admins)
- Strong protections:
  - Rate limiting on login
  - Account lockout / backoff
  - Audit logs for admin actions

#### Customers (lower friction)
You have two viable approaches:

1. Full customer accounts
- Email + password + reset flow
- Best for long-term portal with documents/contracts

2. Passwordless “magic link” or “access code”
- Customer enters email → gets time-limited link
- Very good UX for quote/job tracking without managing passwords early
- Still secure if links are short-lived and one-time-use
A common path: start with magic links for customers, then optionally add passwords later.

## Authorization model you will need (important)
For your “customers can see their own quotes/jobs/contracts” requirement, `RBAC` alone is not enough.
You need both:
1. Role checks
- Admins can access admin endpoints

2. Ownership checks
- A customer can access only quotes/jobs where quote.customerId == currentUser.id

This prevents “horizontal privilege escalation” (customer A guessing customer B’s ID).

Additional best practice:
- Use `UUID`s (or opaque public IDs) for customer-facing identifiers.
- Do not expose sequential database IDs in URLs for sensitive resources.

### CSRF and cookies (how to think about it)
If you use session cookies, any “state changing” request (POST/PUT/DELETE) must be protected from `CSRF`.
Typical approach:
1. Backend issues a `CSRF` token to the `SPA` (**often via a cookie readable by JS or a meta tag**)
2. `SPA` sends it back in a header with write requests
3. Spring validates it
If you keep everything on the same origin and use proper `CSRF` configuration, this becomes straightforward and highly reliable.

### `CORS` strategy (keep it simple)
Best: avoid `CORS` entirely by serving `SPA` + `API` on same origin.
During local dev:
- Use Vite proxy to /api → Spring Boot port
- Keep your code assuming /api/... relative URLs
If you later separate domains (e.g., app. subdomain), then you must:
- Configure Spring `CORS` precisely (no wildcards with credentials)
- Ensure cookies use proper `SameSite` rules

### `Caching` strategy (public site + authenticated portal)
Caching is different for:
- **Public content** (marketing pages, services, photos) (high cache benefit)
- **Private content** (quotes, job status, contracts)
- **Cross-user content** (admin lists)

#### Public content (high cache benefit)
Use `layered caching`
1. CDN/browser caching for static assets (images, JS, CSS)
2. Long cache headers for hashed assets
3. For public API reads (if any), use:
  - `Cache-Control`
  - `ETag` or `Last-Modified`

#### Authenticated/private data (cache carefully)
Rules of thumb:
- Anything containing customer data: `Cache-Control: no-store` (or strict private caching)
- Prefer client-side caching that’s scoped to the logged-in user and easy to invalidate.
#### What Axios can do
Axios is fine as a transport layer, but it doesn’t provide robust caching by default.

Recommended approach:
- Keep Axios for HTTP
- Use a caching layer above it:
  - RTK Query (fits your Redux stack well)

These libraries handle:
- Request dedupe
- Caching + invalidation
- Background refresh
- Retry logic
- “Stale while revalidate” patterns
- For admin analytics dashboards, query-caching is especially useful.

### Session state strategy (what lives where)
#### `Server`
- Session cookie identifies the logged-in user
- Backend stores session data (in-memory initially; later Redis if needed)

#### `Client`
- Client stores minimal auth state:
  - “Am I logged in?”
  - “Who am I?” (from /auth/me)
  - “What roles do I have?”
- Do not store secrets in Redux
- Do not store tokens in localStorage (avoid)

### Data security fundamentals for your future features
Since you mentioned contracts and job details, plan for:
#### Sensitive data handling
- `Encrypt in transit`: HTTPS always
- Consider `encrypting at rest` for sensitive fields (later, if needed)
- 
- Store files (contracts) in S3 with:
  - Private bucket
  - Signed URLs for access
  - Server-side authorization checks

#### Audit trail (for admin actions)
- Record: who did what, when, to which quote/job
- Especially for status updates, contract uploads, price changes

#### Input validation and output safety
**Backend validates all inputs (never trust the SPA)**

Protect against common web issues:
- `XSS` (sanitize/escape user-entered notes where displayed)
- `SQL injection` (ORM + parameterization; never concatenate queries)
- `ID enumeration` (use UUID/opaque IDs and ownership checks)

### A phased roadmap that matches your project
1. “Secure enough” admin MVP
- Spring Security with sessions
- Admin login page
- Roles: ADMIN/OWNER
- Admin endpoints locked down
- Basic audit logging
- Basic rate limiting on login
- Serve SPA + API same origin

2. Customer quote tracking (low friction)
- Customer magic-link login
- Customer portal routes
- Ownership checks on every resource
- Private-data caching rules (no-store server headers, query caching client-side)

3. Contracts + documents
- Private file storage (S3)
- Signed URL downloads
- Stronger auditing
- Optional MFA for admin accounts

4. Hardening
- Centralized monitoring/alerts
- Security headers (CSP, HSTS, etc.)
- Automated backups
- Pen-test checklist (basic)


## Security Roadmap
## Target architecture for your choices
**Single origin**: `https://miller-land-management.com` serves the React SPA and the Spring Boot API under `/api`.

**Auth**:
- Admin/Owner: username + password
- Customers: **magic link** (passwordless)
- Session management: **server-side session + HttpOnly cookie**

**Authorization**:
- One admin role for now: `ROLE_ADMIN`
- Customers: `ROLE_CUSTOMER`
- Always combine role checks with **ownership checks** for customer data.

This combination is a strong “secure-by-default” baseline for a small business portal.

---

## Identity and data model you’ll want early
### Core tables (conceptual)
- **users**
  - `id (UUID)`, `email`, `password_hash` (admins only), `role` (`ADMIN`/`CUSTOMER`), `status`, `created_at`
- **customer_profiles**
  - `user_id (FK users.id)`, name, phone, notification prefs
- **quotes**
  - `id (UUID)`, `customer_user_id`, `service_type`, `address`, `status`, timestamps
- **jobs** (later)
  - `id (UUID)`, `quote_id`, `status`, schedule fields, notes
- **contracts** (later)
  - `id (UUID)`, `job_id`, `s3_object_key`, `version`, metadata
- **audit_log**
  - `id`, `actor_user_id`, action type, target id, timestamp, metadata (json)

### Public identifiers
Use **UUIDs** (or “publicId” separate from DB id) in URLs to avoid ID-guessing. Still enforce ownership checks.

---

## Authentication design (how it works end-to-end)
### 1) Admin login (session cookie)
- Admin submits email/password to `/api/auth/login`
- Spring validates password hash
- On success: server creates a session and sets a cookie:
  - `HttpOnly` (JS can’t read it → reduces token theft)
  - `Secure` (HTTPS only)
  - `SameSite=Lax` (works well for same-origin SPAs)
- Client never stores secrets in Redux/localStorage

### 2) Customer magic link (no passwords)
Two-step flow:

**A. Request link**
- Customer enters email on “Check your quote status”
- POST `/api/auth/magic-link/request` with email (and optionally: quote reference)
- Server:
  - generates a **one-time token**
  - stores **hashed token** + expiry + email + IP/user-agent fingerprint (optional)
  - emails a link like: `https://miller-land-management.com/magic?token=...`

**B. Redeem link**
- SPA reads token from URL and POSTs to `/api/auth/magic-link/verify`
- Server:
  - verifies hash match
  - verifies not expired + not used + not revoked
  - creates/loads a `ROLE_CUSTOMER` user for that email
  - creates session cookie
  - marks token as used (single-use)
- SPA then routes to `/portal`

**Security properties**
- No password database for customers
- If link is intercepted, attacker could log in → mitigate by:
  - short TTL (10–20 minutes)
  - single-use token
  - optional “re-auth for sensitive actions” later

### 3) Session lifecycle
- `/api/auth/me` returns the current user + role (or 401)
- `/api/auth/logout` invalidates session
- Session expiry: choose a reasonable idle timeout (e.g., 30–60 minutes) and absolute max age for admin sessions

---

## CSRF strategy (important with cookie sessions)
Because cookies are automatically sent, protect state-changing requests:
- Keep Spring Security **CSRF enabled**
- SPA includes CSRF token header for POST/PUT/DELETE
- Since you’re **same origin**, this is straightforward and reliable.

Rule of thumb:
- GET/HEAD: safe reads
- POST/PUT/DELETE: require CSRF token

---

## Authorization strategy (role + ownership)
### Role gates
- Admin endpoints require `ROLE_ADMIN`
  - analytics
  - all quotes/jobs/contract management
- Customer endpoints require `ROLE_CUSTOMER`
  - view their quotes/jobs/contracts

### Ownership gates (non-negotiable for customer portal)
Even with `ROLE_CUSTOMER`, every resource read/write checks:
- `quote.customer_user_id == currentUser.id`

This prevents customers from accessing each other’s data even if they guess a UUID.

---

## API surface outline (Spring controllers you’ll end up with)
### Auth
- `POST /api/auth/login` (admin)
- `POST /api/auth/logout`
- `GET  /api/auth/me`
- `POST /api/auth/magic-link/request`
- `POST /api/auth/magic-link/verify`

### Customer portal
- `GET /api/customer/quotes`
- `GET /api/customer/quotes/{quoteId}`
- `GET /api/customer/jobs/{jobId}` (later)
- `GET /api/customer/contracts/{contractId}` (later; likely via signed URL)

### Admin
- `GET /api/admin/quotes?status=...`
- `PATCH /api/admin/quotes/{id}/status`
- `GET /api/admin/analytics/...`
- `POST /api/admin/contracts/...` (later)

---

## Frontend principles (React + Axios + session)
### Session state in the SPA
- On app load (or route entry), call `/api/auth/me`
- Store only:
  - `isAuthenticated`
  - `userId`
  - `role`
- Do not store cookies/tokens in JS storage

### Axios responsibilities
- Always call your API with `baseURL: "/api"` (relative) since same origin
- Send cookies automatically (credentials settings depending on your Axios defaults)
- Centralize:
  - 401 handling (redirect to login)
  - error normalization (consistent error shape)

### Caching on the client
Axios isn’t a caching solution. Use one of these patterns:
- **Preferred (fits Redux): RTK Query**
  - handles caching, dedupe, invalidation, background refresh
- Alternative: TanStack Query
- If you stay “plain Axios,” keep caching minimal and targeted (short TTL on non-sensitive lists)

---

## Caching rules that keep you safe
### Public/marketing content
- Cache aggressively (images, built assets)
- Use hashed filenames from Vite (automatic) + long cache headers

### Authenticated API responses
- Default to: `Cache-Control: no-store` for customer-private data
- For admin analytics:
  - either `no-store` (simple)
  - or short-lived `private, max-age=30` (if you understand implications)

### ETag / revalidation (nice-to-have)
For “list quotes” or “analytics summaries” you can support:
- Server returns `ETag`
- Client revalidates with `If-None-Match`
This reduces bandwidth without storing sensitive content long-term.

---

## Hardening checklist for “secure as feasible”
### Transport and cookies
- HTTPS only
- Cookie flags: `HttpOnly`, `Secure`, `SameSite=Lax`
- Set session fixation protection (Spring Security supports this)

### Login protections
- Rate limit login + magic-link request endpoints
- Generic responses for magic link request (“If an account exists, we sent a link”) to prevent email enumeration
- Audit log for admin actions

### Content security
- Add security headers (Spring can set these):
  - CSP (start basic, tighten over time)
  - HSTS
  - X-Frame-Options / frame-ancestors
  - Referrer-Policy

### Data access safety
- Validate all inputs server-side
- Use ownership checks everywhere
- Prefer UUIDs for resource identifiers
- Sanitize/escape user-generated text when rendering in the portal (XSS prevention)

### Files/contracts later
- Store contracts in S3 private bucket
- Only serve via:
  - server authorization + signed URL
  - short expiry on signed URLs
- Log downloads and uploads (audit)

---

## Learning path in the order you’ll feel progress
1. **Spring Security basics**: sessions, roles, CSRF
2. **Magic link flow**: token lifecycle, hashing, expiry, one-time use
3. **Authorization**: method-level role checks + ownership checks
4. **React session model**: `/auth/me`, protected routes, 401 handling
5. **Caching**: start with “no-store” for private data, then add RTK Query for UX performance
6. **Audit logs + admin analytics**: capture events and build dashboards safely

---

## Practical next step (no code, but concrete)
Decide and document these defaults now (they drive implementation details):
- Magic link TTL (recommend **15 minutes**)
- Session idle timeout (recommend **30–60 minutes**; admin shorter is fine)
- Customer portal data classification:
  - “private” (no-store)
  - “semi-public” (rare; e.g., static service list)

With those set, the next outline can be a precise “endpoint-by-endpoint contract” (request/response shapes, status codes, error policy) aligned to your Quote/Job/Contract roadmap.


























# Email Strategy
### Key constraint up front
- **Cloudflare Email Routing** is *forwarding-only* (it receives mail for your domain and forwards to another inbox). It does **not** deliver inbound email to your Spring Boot app.   
- If you want **inbound email processed by your app**, you typically use **Amazon SES email receiving** (receipt rules → S3/Lambda/SNS), usually on a **subdomain** so it doesn’t conflict with Cloudflare’s MX records.   

Below is a plan that gives you:
1) **Inbound human email** via Cloudflare forwarding (info@, quotes@ → your Gmail/Outlook)  
2) **Outbound app email** via SES (magic links, notifications)  
3) Optional **inbound-to-app** via SES receiving on a subdomain (later)

---

## Part 1 — Cloudflare Email Routing (inbound email → forwarded to Gmail/Outlook)
### Goal
Create addresses like `info@miller-land-management.com` and forward them to your existing inbox(es), with minimal setup.

### Steps
1) **Pick destination inboxes**
   - Example: forward everything to your Gmail address.
   - Cloudflare will email each destination inbox to verify it before it can receive forwards.   

2) **Enable Email Routing in Cloudflare**
   - Cloudflare Dashboard → **Email** → **Email Routing**
   - “Enable Email Routing”
   - Cloudflare will add the required DNS records automatically and may require removing other MX records; Email Routing will not enable if other MX records remain.   

3) **Create routing rules (custom addresses)**
   - Create: `info@`, `quotes@`, `support@`, `admin@` (as needed)
   - Assign each to a destination inbox (Email Routing currently supports one destination per custom address unless you use a Worker).   

4) **Test**
   - Send a test email *from a different account than the destination inbox* (to avoid “duplicate” behavior some providers do).   

5) **Keep SPF to a single record**
   - Cloudflare warns that multiple SPF TXT records can break Email Routing; you must maintain exactly one SPF record for the domain.   
   - This matters when you add SES—your SPF will need to be a single combined record.

---

## Part 2 — Amazon SES (outbound app/transactional email)
### Goal
Your Spring Boot app sends:
- customer magic links
- “quote received”
- job status updates
from a domain address you control.

### Recommended sender identity structure
- Use a dedicated subdomain for app email, e.g.  
  - `no-reply@notify.miller-land-management.com`  
This keeps app sending reputation separate from human inbox workflows.

### Steps (SES console + Cloudflare DNS)
1) **Choose an SES region**
   - Pick one and stick to it (your sending limits/sandbox status are region-specific).   

2) **Create and verify an SES identity (domain or subdomain)**
   - SES → “Verified identities” → create identity for `notify.miller-land-management.com` (or the root domain).
   - SES will provide DNS records you must publish (Cloudflare DNS).   

3) **Enable DKIM (Easy DKIM)**
   - SES “Easy DKIM” signs every email using DKIM keys managed by SES.   
   - Add the provided DKIM records in Cloudflare (DNS-only).

4) **SPF / MAIL FROM decision**
   - **Simplest start**: use SES default MAIL FROM (a subdomain of `amazonses.com`). SPF passes for that MAIL FROM automatically; you still get DKIM from step 3.   
   - **Stronger alignment (optional later)**: configure a **custom MAIL FROM** subdomain (e.g. `mail.notify...`). This requires publishing an SPF TXT *and* an MX record for bounce/complaint handling.   

5) **Move SES out of the sandbox (do this early)**
   - In the sandbox you can only send to verified recipients and you have low quotas; request production access in SES.   

---

## Part 3 — Spring Boot setup for outbound email (via SES SMTP interface)
### Goal
Spring Boot sends emails through SES reliably, without reinventing SMTP.

### Steps
1) **Create SES SMTP credentials**
   - SES supports sending via an SMTP endpoint using SMTP credentials (generated in AWS).   

2) **Configure Spring Boot to use SES SMTP**
   - Use STARTTLS SMTP to the SES SMTP endpoint (ports commonly include 587); STARTTLS flow is documented by AWS.   
   - In Spring Boot terms, you’ll configure:
     - SMTP host (region-specific SES SMTP endpoint)
     - port (STARTTLS)
     - username/password (SES SMTP creds)
     - enable SMTP auth + STARTTLS

3) **Keep secrets out of git**
   - Store SMTP username/password in environment variables or a secrets manager (later: AWS Secrets Manager).
   - Do not commit credentials to the repo.

4) **Email composition conventions (important for your use case)**
   - For magic links: short TTL, single-use tokens (from your auth design).
   - Use:
     - `From: no-reply@notify...`
     - `Reply-To: support@miller-land-management.com` (goes to Cloudflare forwarded inbox)

---

## Part 4 — “Inbound to Spring Boot” options (pick based on what you mean by inbound)
### Option A (recommended now): inbound email goes to humans, not the app
- Customer replies to emails → arrive at `support@...` → Cloudflare forwards to your inbox.   
- Your **app does not ingest inbound email**; quote intake is via web forms (cleaner and safer early).

This is usually enough for:
- magic links (outbound only)
- quote updates (outbound only)
- customer support (human-managed inbox)

### Option B (later): inbound emails processed by your app via SES receiving
If you eventually want things like:
- parse emailed attachments into a quote/job record
- auto-ingest “reply with more details”
- create tickets from inbound email

Then do this on a **subdomain** to avoid conflicting with Cloudflare Email Routing MX records:

1) **Create a receiving subdomain**
   - Example: `inbound.miller-land-management.com`

2) **Add an MX record for SES inbound email receiving**
   - Point the subdomain’s MX to the SES receiving endpoint for your region (AWS documents the `inbound-smtp.<region>.amazonaws.com` pattern).   

3) **Create SES receipt rules**
   - SES receiving uses “rule sets” and ordered “receipt rules” to define what happens to inbound mail.   

4) **Choose an action pipeline**
   - Common: store raw email in **S3** (for durability) and trigger **Lambda** for parsing/processing.   

5) **Hand off to Spring Boot**
   - Lambda calls your Spring Boot endpoint (e.g., `/api/inbound/email-events`) with:
     - message metadata
     - S3 object key (raw MIME)
   - Spring Boot downloads/reads, validates, and stores what you need.

---

## Part 5 — Operational checklist (so it actually works in production)
1) **Confirm DNS record ownership**
   - DKIM records for SES must be “DNS-only” (not proxied).

2) **Keep only one SPF record**
   - Cloudflare Email Routing + SES means you’ll merge includes into one SPF record; multiple SPF records break routing.   

3) **Deliverability**
   - DKIM enabled (SES Easy DKIM)   
   - SES out of sandbox   
   - Start DMARC in monitoring mode (`p=none`) and tighten later (policy planning)

---

### What I would implement first (minimal moving parts)
1) Cloudflare Email Routing for `info@`, `support@`, `quotes@` → your Gmail  
2) SES sending from `notify.` subdomain + DKIM  
3) Spring Boot outbound mail using SES SMTP  
4) Later: SES receiving on `inbound.` subdomain only if you truly need inbound email ingestion

If you tell me which SES region you plan to use (e.g., `us-east-1`), I can make the steps more concrete where AWS uses region-specific endpoints, while keeping it non-code.
