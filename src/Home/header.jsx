
// Header.js
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Header() {
    return (
        <header
        className="navbar navbar-dark bg-primary sticky-top shadow-sm"
        style={{ height: "56px", paddingLeft: "1rem" }}
        >
        <div className="container-fluid d-flex align-items-center">
            <span className="navbar-brand mb-0 h6 d-flex align-items-center">
            <span role="img" aria-label="Home" className="me-2">🏠</span>
            KPR Counter
            </span>
        </div>
        </header>
    );
}
