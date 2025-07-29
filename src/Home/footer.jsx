import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Footer() {
    return (
        <footer className="bg-light text-center text-muted py-3 mt-auto border-top shadow-sm">
            <div className="container">
                <small>
                &copy; {new Date().getFullYear()} KPR Counter App · Built using React + Bootstrap<br />
                Released under the <a href="https://opensource.org/licenses/MIT" target="_blank" rel="noopener noreferrer">MIT License</a> <br />
                Visit my Github Pages - <a href="https://github.com/galangptrm/kpr" target="_blank" rel="noopener noreferrer">Galang</a>
                </small>
            </div>
        </footer>
    );
}
