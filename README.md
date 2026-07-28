# Scraper Products | Frontend

## About Project

Frontend application for the Scraper Products project. It provides an interface for browsing and filtering supermarket product data. The application uses a dataset previously collected through automated scraping service.

Users can filter products by ingredients, a feature that is not currently available on the supermarket website.

## Tech Stack

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![Bootstrap](https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white)

## Architecture

- **Frontend** — Displays product data and performs client-side ingredient filtering
- **Backend** — Provides authenticated access to product data through a REST API.
- **Database** — Stores the product dataset used by the application

## Features

- Dynamic client-side ingredient filtering
- Regular expression-based ingredient matching
- Ingredient inclusion/exclusion toggle
- Responsive user interface

## Usage

1. Clone the repo
2. Install NPM packages: `pnpm install`
3. Set up `.env` file: `VITE_API_URL = your_string`
4. Start the development server: `pnpm run dev`

## Future Improvements

- Reintroduce automated product scraping using a more robust data collection strategy.
