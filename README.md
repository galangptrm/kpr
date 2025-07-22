# KPR Calculator

This is a simple mortgage calculator built with React, designed for users in Indonesia. It allows users to estimate their monthly mortgage payments based on house price, down payment, loan duration, and customizable yearly interest rates.

---

## Features

* ⭐ Input house price, down payment, and loan term (5–40 years)
* ⭐ Add yearly interest rates with "Apply to remaining years" toggle
* ⭐ Live form validation and error handling
* ⭐ Sticky header for easy navigation
* ⭐ Responsive layout using Bootstrap
* ⭐ Output displayed in embedded iframe (can be extended)
* ⭐ Built-in currency formatting to Indonesian Rupiah (e.g., `Rp 1.000.000`)

---

## Tech Stack

* React 18+
* Bootstrap 5
* React-Bootstrap (Modal UI)
* Vite (for fast development/build)

---

## Getting Started

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

---

## Project Structure

* `MortgageCounterApp.jsx`: Main app component with form logic
* `index.html`: Entry page with iframe display
* `formatRupiah.js`: Helper to format integers to Indonesian currency

---

## Example Usage

* Enter house price: `869000000`
* Enter down payment: `100000000`
* Set loan term: `25`
* Enter first year interest: `4.99`
* Click "Apply to remaining years"
* Click **Count** to generate output

---

## License

This project is open-source and available under the MIT License.

---

## Author

Galang Putratama — [galangptrm](https://github.com/galangptrm)
