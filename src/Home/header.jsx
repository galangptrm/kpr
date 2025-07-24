
// Header.js
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Header() {
    return (
        <nav className="navbar navbar-dark bg-dark sticky-top">
            <div className="container">
                <a className="navbar-brand" href="#">
                KPR Counter
                </a>
            </div>
        </nav>
    );
}
