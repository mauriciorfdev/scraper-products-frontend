# Food Product Analyzer | Frontend

## About Project

Frontend application for the AI-powered Food Product Analyzer. It provides an interface for filtering products and triggering ingredient analysis.

Users can filter products by ingredients, a feature that is not currently available on the supermarket website.

Admins can trigger ingredient analysis for products.

_Product data was originally collected through an automated scraping process_.

## Demo

### AI Ingredient Analysis

![AI analysis demo](/src/assets/demo/ai-analysis-demo.gif)

### Ingredient Filtering

![Ingredient filtering demo](/src/assets/demo/filtering-demo.gif)

### 🔗 [See the project deployed on Vercel](https://scraper-products-frontend-zeta.vercel.app/)

## Tech Stack

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![Bootstrap](https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white)

## Architecture

- **Frontend** — Displays product data, handles client-side ingredient filtering, and provides the interface for triggering AI-powered ingredient analysis.
- **Backend** — Provides authenticated access to product data and handles requests for AI-powered ingredient analysis.
- **Database** — Stores product data and analysis results.
- **AI Service** — Analyzes product ingredients and returns structured information such as NOVA classification, allergens, and additives.

## Features

- AI-powered ingredient analysis
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

## Related Repository

[Food Product Analyzer | Backend](https://github.com/mauriciorfdev/scraper-products-backend)
