# StockVault

## Full System User Stories & Requirements

StockVault is a full‑stack banking‑style application inspired by South African **stokvel** systems. The platform enables individuals and groups to save money collectively under strict, automated rules, ensuring fairness, transparency, and accountability.

This document defines **system‑wide user stories** that serve as **functional requirements** for both the **frontend (React)** and **backend (.NET Web API)**.

---

## 1. Actors

- **Guest** – Unauthenticated user  
- **User** – Registered individual  
- **Joint Account Member** – User participating in a stokvel account  
- **Account Admin / Creator** – User managing a joint account  
- **System** – Automated rule enforcement  
- **Admin (Optional/Future)** – Platform administrator  

---

## 2. Authentication & User Management

### User Stories

- As a **guest**, I want to register an account so that I can use StockVault.
- As a **user**, I want to log in securely so that I can access my accounts.
- As a **user**, I want to log out so that my account remains secure.
- As a **user**, I want to update my profile details so that my information is accurate.
- As a **user**, I want my password to be securely stored so that my account is protected.

### System Requirements

- Backend must hash and salt passwords.
- Authentication must use JWT or similar token‑based security.
- Frontend must protect private routes.

---

## 3. Personal Savings Accounts

### User Stories

- As a **user**, I want to create a personal savings account so that I can save money individually.
- As a **user**, I want to deposit money into my personal account.
- As a **user**, I want to see my current balance at all times.
- As a **user**, I want to lock my savings until a specific date.
- As a **user**, I want to be prevented from withdrawing locked funds.
- As a **user**, I want to view my transaction history.

### System Requirements

- Backend enforces lock periods.
- All deposits and withdrawals are recorded as transactions.
- Withdrawals fail if funds are locked.

---

## 4. Joint (Stokvel) Accounts

### User Stories

- As a **user**, I want to create a joint stokvel account.
- As a **user**, I want to invite other users to join my stokvel.
- As a **member**, I want to accept or reject a stokvel invitation.
- As a **member**, I want to see all other members in the stokvel.
- As a **member**, I want to know my role in the account.

### System Requirements

- Joint accounts must support multiple users.
- Memberships are stored via a join table with roles.
- Only authorized users can manage members.

---

## 5. Contribution Schedules

### User Stories

- As a **stokvel admin**, I want to define a contribution amount.
- As a **stokvel admin**, I want to set contribution frequency (weekly/monthly).
- As a **member**, I want to know when my next contribution is due.
- As a **member**, I want to see whether I am up to date on payments.

### System Requirements

- Backend validates contributions against schedules.
- Missed or late payments are tracked.
- Contribution schedules are immutable once active.

---

## 6. Rotational Payouts

### User Stories

- As a **stokvel member**, I want payouts to rotate fairly.
- As a **member**, I want to see when my payout turn is coming.
- As a **member**, I want to receive a payout only if I am compliant.
- As a **system**, I want to ensure only one payout per cycle.

### System Requirements

- Backend enforces payout order.
- Payout eligibility depends on contribution compliance.
- All payouts are atomic transactions.

---

## 7. Transactions & Audit Trail

### User Stories

- As a **user**, I want every action involving money to be recorded.
- As a **user**, I want to view a full transaction history.
- As a **system**, I want transactions to be immutable.

### System Requirements

- All monetary actions create transaction records.
- No transaction can be deleted or modified.
- Each transaction stores timestamps and references.

---

## 8. Dashboards & Visibility

### User Stories

- As a **user**, I want a dashboard showing my total savings.
- As a **user**, I want to see recent activity.
- As a **stokvel member**, I want to see group balances and payout status.

### System Requirements

- Backend provides aggregated data endpoints.
- Frontend displays real‑time feedback and loading states.

---

## 9. Error Handling & Validation

### User Stories

- As a **user**, I want clear error messages when something fails.
- As a **user**, I want invalid actions to be blocked.

### System Requirements

- Backend performs final validation.
- Frontend performs client‑side validation.
- Consistent error response format.

---

## 10. Security & Integrity

### User Stories

- As a **user**, I want my money and data to be secure.
- As a **system**, I want to prevent race conditions and double spending.

### System Requirements

- Role‑based access control.
- Atomic database transactions.
- Secure API endpoints.

---

## 11. Non‑Functional Requirements

- Scalable architecture
- Maintainable codebase
- RESTful API design
- Clear separation of frontend and backend responsibilities

---

## 12. Collaboration Guidelines

- Backend team owns business logic and data integrity.
- Frontend team owns UX, state management, and API integration.
- APIs must be versioned and documented.

---

## 13. Summary

These user stories define **what the system must do**. Any feature not covered here is out of scope unless explicitly added. This document acts as the **single source of truth** for development, testing, and evaluation.
