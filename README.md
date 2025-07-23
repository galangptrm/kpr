# KPR Calculator

This is a simple mortgage calculator built with React, designed for users in Indonesia. It allows users to estimate their monthly mortgage payments based on house price, down payment, loan duration, and customizable yearly interest rates.

---

## Features

* ⭐ Input house price, down payment, and loan term (1–40 years)
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
* Recharts 3.1.0 (Graph)
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

## Example Usage

* Enter house price: `869000000`
* Enter down payment: `100000000`
* Set loan term: `25`
* Enter first year interest: (ex `4.99`)
* Enter another year(s) interest: (ex `13.5`)
* Click "Samakan bunga di tahun-tahun sisanya"
* Click **Hitung** to generate output
* The App will output Mortgage Table and Simple Graph

---

## License

This project is open-source and available under the MIT License.

---

## Author

Galang Putratama — [galangptrm](https://github.com/galangptrm)
