# Scraper Products | Frontend

## About Project

Full-stack web application for visualizing and filtering supermarket product data.

This web app allows user to filter some products by ingredients, a feature that is not currently available on the supermarket website.

The product data is collected through automated scraping using Puppeteer.

## Architecture

- **Frontend (React + Vite + TS)** — Handles dynamic ingredient filtering and exclusion logic using regular expressions.

- Backend (Express) — Exposes API endpoint to obtain data from the database.

- Database (MongoDB) — Used to store products obtained by the scraper service.

- Scraper Service (Puppeteer) — Automated process executed by Puppeteer internally to collect data from a specific website.

## Features

- Dynamic ingredient inclusion/exclusion filtering
- Regex-based ingredient matching
- Responsive UI (React Bootstrap for UI Components)

## Usage

1. Clone the repo
2. Install NPM packages: `pnpm install`
3. Set up `.env` file: `VITE_API_URL = your_string`
4. Start the development server: `pnpm run dev`
