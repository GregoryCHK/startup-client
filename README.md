# ✈️ Startup Client – Backoffice Tool for Tourism Agencies

A full-stack web application built to streamline operations for Destination Management Companies (DMCs) and tourism operators. This backoffice client is part of a larger SaaS platform designed to manage customers, itineraries, confirmations, and financial tracking — all within a clean, modern interface.

---

## 🎯 Purpose

This project showcases my ability to architect and implement a modular, scalable, and user-friendly platform using modern frontend technologies. It is part of a real-world system aimed at improving workflow efficiency for travel designers and operators.

---

## 🛠 Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, PostCSS
- **UI Components**: ShadCN/UI, Lucide Icons
- **Authentication**: NextAuth.js (planned/partial)
- **Forms & Validation**: React Hook Form, Zod
- **Data Fetching**: React Query (TanStack)
- **Internationalization**: i18next (multi-language support)
- **State Management**: React Context API
- **Calendar**: FullCalendar (for itinerary visualization)
- **Routing**: App Directory structure

---

## 💡 Key Features (Implemented or Planned)

- **Customer CRM**: Add, view, and manage client records.
- **Action Plans** *(planned)*: Create and edit travel action plans with drag-and-drop support.
- **Confirmation Page**: Display all booked services with dynamic filtering.
- **Reusable Components**: Custom modals, filters, table views, and forms.
- **Docs Folder**: Upload and manage client-related documents (passports, allergies, preferences).
- **Permissions & Auth** *(planned)*: Setup for role-based access with NextAuth.
- **Mobile Responsive** *(planned)*: Clean UX across devices using Tailwind utility classes.
- **Modular Architecture**: Split into `components/`, `providers/`, `lib/`, and feature-based directories.

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



