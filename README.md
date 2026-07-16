# Scraper Products | Frontend

## About Project

Frontend application for the Scraper Products project. It provides an interface for browsing and filtering supermarket product data collected through an automated scraping service.

Users can filter products by ingredients, a feature that is not currently available on the supermarket website.

## Architecture

- **Frontend** — Handles dynamic ingredient filtering and exclusion logic using regular expressions.
- **Backend** — Provides authenticated access to product data through a REST API.
- **Database** — Stores product information collected by the scraper service.
- **Scraper Service** — Collects and updates product data using Puppeteer.

## Features

- Ingredient inclusion and exclusion filtering
- Ingredient filtering using regular expressions
- Responsive user interface

## Usage

1. Clone the repo
2. Install NPM packages: `pnpm install`
3. Set up `.env` file: `VITE_API_URL = your_string`
4. Start the development server: `pnpm run dev`
