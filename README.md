# CanteenWise

CanteenWise is a canteen operations dashboard for reviewing meal demand, coordinating orders, monitoring ingredient stock, and tracking food waste. It is built with Next.js and TypeScript, with interactive charts and responsive management screens.

> **Project status:** This repository currently contains a front-end prototype with sample data. It does not connect to a production API, database, payment service, or authentication provider. Some browser-side values are saved in `localStorage`.

## Features

- **Dashboard** (`/`): daily order and revenue metrics, meal preparation versus demand, menu status, and waste summaries.
- **Orders** (`/orders`): searchable sample orders, status filters, and order progress controls.
- **Menu & Demand** (`/sales`): preparation planning and a form for adding menu items.
- **Inventory** (`/customers`): stock levels, coverage estimates, low-stock indicators, search, and stock updates.
- **Sustainability** (`/reports`): food-waste trends and breakdowns, with a form for logging waste.
- **Profile** (`/profile`): example account, security, and activity settings.

The route `/customers` is currently labeled **Inventory** in the application navigation.

## Tech Stack

- Next.js 16 App Router and React 19
- TypeScript
- Tailwind CSS 4
- Recharts for data visualizations
- Radix UI primitives and reusable interface components
- Lucide icons

## Getting Started

### Requirements

- Node.js 20.9 or later
- pnpm

### Install and run

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

## Available Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start the local development server. |
| `pnpm lint` | Run ESLint across the project. |
| `pnpm build` | Create a production build. |
| `pnpm start` | Serve the production build (run `pnpm build` first). |

## Project Structure

```text
app/                 App Router pages and layouts
components/dashboard Shared dashboard components
components/ui/       Reusable interface primitives
hooks/               Shared React hooks
lib/                 Canteen data, types, and utilities
public/              Static assets
```

## Data and Customization

The screens are populated with illustrative sample data. Client-side changes are intended for demonstrating the interface; persistence is limited to selected values stored by the browser. Replace the sample data and local state with your API or database integration before using this as an operational system. No environment variables are required for the current local prototype.