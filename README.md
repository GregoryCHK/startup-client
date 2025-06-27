# ✈️ Startup Client –- Backoffice Tool for Tourism Agencies

A full-stack web application built to streamline operations for Destination Management Companies (DMCs) and tourism operators. This backoffice client is part of a larger SaaS platform designed to manage customers, itineraries, confirmations, and financial tracking — all within a clean, modern interface.

---

## 🎯 Purpose

This project showcases my ability to architect and implement a modular, scalable, and user-friendly platform using modern frontend technologies. It is part of a real-world system aimed at improving workflow efficiency for travel designers and operators.

---

## 🛠 Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: ShadCN/UI, Lucide Icons
- **Authentication**: NextAuth.js (planned)
- **Forms & Validation**: React Hook Form
- **Data Fetching**: React Query (TanStack)
- **Calendar**: FullCalendar (for itinerary visualization) (planned)
- **Routing**: App Directory structure

---

## 💡 Key Features (Implemented or Planned)

- ## ✅ Implemented
- **Customer CRM**: Add, view, and manage client records
- **Action Plans**: Display all services with dynamic filtering
- **Reusable Components**: 
  - Custom modals with RadixUI
  - Sortable tables with TanStack Table
  - Form builders with React Hook Form

### 🔜 Planned
- **Twilio Integration**:
  - Booking confirmation emails/SMS
  - Payment reminder notifications
  - Real-time alerts for itinerary changes
- **Document Management**:
  - Secure file uploads (passports/visas)
  - PDF viewer for contracts
- **Permissions & Auth**:
  - Role-based access (Admin/Agent/Client)
  - Social login (Google/Apple)
- **Mobile Optimization**:
  - Responsive itineraries with date-pickers
  - Touch-friendly action buttons
- **Real-time Sync**:
  - WebSocket updates for booking changes
  - Offline mode with local cache

---
```
## 📁 Folder Overview
startup-client/
├── app/ # App directory routing (Next.js 14)
├── components/ # Reusable UI components (buttons, tables, modals)
├── lib/ # Utility functions
├── providers/ # React context providers (e.g., for theme, auth)
├── public/ # Static assets
├── types/ # TypeScript types and interfaces
├── .env.local # Environment variables
├── package.json # Project metadata and scripts



