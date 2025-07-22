import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";
import TabelCicilan from "./tabel"

const MortgageCounterApp = () => {
    const [housePrice, setHousePrice] = useState(0);
    const [downPayment, setDownPayment] = useState(0);
    const [years, setYears] = useState(1);
    const [interestRates, setInterestRates] = useState([{ year: 1, rate: "", applyToRemaining: false }]);
    const [errors, setErrors] = useState({});
    const [showResetModal, setShowResetModal] = useState(false);
    const [results, setResults] = useState({})

    const handleAddRate = (index) => {
        if (interestRates.length >= years || !interestRates[index].rate) return;
        const nextYear = interestRates.length + 1;
        setInterestRates([...interestRates, { year: nextYear, rate: "", applyToRemaining: false }]);
    };

    const handleRemoveRate = (index) => {
        if (interestRates.length === 1) return;
        const updated = [...interestRates];
        updated.splice(index, 1);
        setInterestRates(updated.map((r, i) => ({ ...r, year: i + 1 })));
    };

    const handleRateChange = (index, field, value) => {
        const updated = [...interestRates];
        updated[index][field] = value;

        if (field === "applyToRemaining" && value) {
        const filledRate = updated[index].rate;
        for (let i = index + 1; i < years; i++) {
            if (!updated[i]) updated[i] = { year: i + 1, rate: "", applyToRemaining: false };
            updated[i].rate = filledRate;
            updated[i].applyToRemaining = false;
        }
        }

        setInterestRates(updated.slice(0, years));
    };

    const validate = () => {
        const newErrors = {};
        if (housePrice <= 0) newErrors.housePrice = "House price must be greater than 0.";
        if (downPayment < 0) newErrors.downPayment = "Down payment cannot be negative.";
        if (downPayment >= housePrice) newErrors.downPayment = "Down payment must be less than house price.";
        if (years < 1 || years > 40) newErrors.years = "Year must be between 1 and 40.";
        interestRates.forEach((rate, idx) => {
        if (rate.rate === "" || isNaN(rate.rate) || rate.rate < 0) {
            newErrors[`rate_${idx}`] = `Interest for year ${idx + 1} must be a non-negative number.`;
        }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const confirmReset = () => {
        setInterestRates([{ year: 1, rate: "", applyToRemaining: false }]);
        setErrors({});
        setResults({})
        setShowResetModal(false);
    };
    
    const handleReset = () => {
        setShowResetModal(true);
    };
    
    const handleCount = () => {
        if (!validate()) return;

        countMortgage(housePrice, downPayment, years, interestRates)
        document.getElementById("result-frame").src = "about:blank";
    };

    const countMortgage = (price, dp, year, rates) => {
        let monthTotal = year*12
        let totalPokok = 0
        let totalMargin = 0
        let totalAngsuran = 0
        let sisaPinjaman = price-dp
        let sisaPinjamanTahunTerakhir = price-dp
        let results = []

        for (let i = 0; i < year; i++) {
            for (let j = 0; j < 12; j++) {
                //= C2*4.99%/12 - Margin
                //=PMT(4.99%/12, $C$4, -$C$2) - Total angsuran bulanan
                let monthlyRate = (parseFloat(rates[i].rate)/100/12)
                let porsiMargin = sisaPinjaman * monthlyRate
                let angsuran = PMT(monthlyRate, monthTotal-(i*12), sisaPinjamanTahunTerakhir).toFixed(0)
                let porsiPokok = angsuran-porsiMargin
                let sisa = sisaPinjaman-porsiPokok
                sisaPinjaman = sisa

                totalPokok += porsiPokok
                totalAngsuran += Number(angsuran)
                totalMargin += porsiMargin
                
                // let porsiPokok = 
                let monthly_result = {
                    bulan : (j+1)+(i*12),
                    bunga_tahunan : parseFloat(rates[i].rate),
                    bunga_bulanan : monthlyRate,
                    bulan_total : monthTotal-(i*12),
                    margin : porsiMargin,
                    pokok : porsiPokok,
                    angsuran : angsuran,
                    sisa : sisaPinjaman
                }

                results.push(monthly_result);
            }
            sisaPinjamanTahunTerakhir = sisaPinjaman
        }

        let result = {
            "total_pokok" : totalPokok,
            "total_angsuran" : totalAngsuran,
            "total_margin" : totalMargin,
            data : results
        }

        setResults(result)

        // console.log('KPR Result', results);
        // console.log('Total', {
        //     "Total pokok" : totalPokok,
        //     "Total angsuran" : totalAngsuran,
        //     "Total margin" : totalMargin
        // });
    }

    function PMT(rate, nper, pv) {
        if (rate === 0) return pv / nper;
        return (pv * rate) / (1 - Math.pow(1 + rate, -nper));
    }
      
    return (
        <div className="container py-4">
        <header className="mb-4 sticky-top bg-white py-3 shadow-sm">
            <h1 className="text-center">Mortgage Counter</h1>
        </header>

        <main>
            <form className="mb-4">
            <div className="row g-3 mb-3">
                <div className="col-md-5">
                    <label className="form-label">House Price</label>
                    <div className="input-group">
                        <span className="input-group-text" id="basic-addon3">Rp.</span>
                        <input type="number" className={`form-control ${errors.housePrice ? "is-invalid" : ""}`} value={housePrice} onChange={e => setHousePrice(Number(e.target.value))} />
                        {errors.housePrice && <div className="invalid-feedback">{errors.housePrice}</div>}
                    </div>
                </div>
                <div className="col-md-5">
                    <label className="form-label">Down Payment</label>
                    <div className="input-group">
                        <span className="input-group-text" id="basic-addon3">Rp.</span>
                        <input type="number" className={`form-control ${errors.downPayment ? "is-invalid" : ""}`} value={downPayment} onChange={e => setDownPayment(Number(e.target.value))} />
                        {errors.downPayment && <div className="invalid-feedback">{errors.downPayment}</div>}
                    </div>
                </div>
                <div className="col-md-2">
                    <label className="form-label">Lama Tenor</label>
                    <div className="input-group">
                        <input type="number" min="1" max="40" className={`form-control ${errors.years ? "is-invalid" : ""}`} value={years} onChange={e => setYears(parseInt(e.target.value) || 1)} />
                        {errors.years && <div className="invalid-feedback">{errors.years}</div>}
                        <span className="input-group-text" id="basic-addon3">Tahun</span>
                    </div>
                    <div className="form-text text-start fw-lighter" id="basic-addon4">Minimal 1 Tahun <br /> Maksimal 40 tahun</div>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-12 col-md-3">
                    <div className="row">
                        <label htmlFor="basic-url" className="form-label text-start">Interest Rate (%)</label>
                    </div>
                    <div className="row">
                        {interestRates.map((input, index) => (
                        <div className="g-3 align-items-end" key={index}>
                            <div className="input-group">
                                <span className="input-group-text" id="basic-addon3">Tahun ke-{index + 1}</span>
                                <input type="number" className={`form-control ${errors[`rate_${index}`] ? "is-invalid" : ""}`} value={input.rate} onChange={e => handleRateChange(index, "rate", e.target.value)}/>
                                {errors[`rate_${index}`] && <div className="invalid-feedback">{errors[`rate_${index}`]}</div>}
                                <span className="input-group-text" id="basic-addon3">%</span>
                                
                                {index === interestRates.length - 1 && interestRates.length < years && (
                                    <button type="button" className="btn btn-md btn-success" onClick={() => handleAddRate(index)}>+</button>
                                )}
                                {interestRates.length > 1 && (
                                    <button type="button" className="btn btn-md btn-danger" onClick={() => handleRemoveRate(index)}>−</button>
                                )}
                            </div>
                            {/* <div className="col-auto">
                                
                            </div> */}
                            {index === interestRates.length - 1 && index < years - 1 && (
                            <div className="col-md text-start">
                                <div className="form-check form-switch">
                                    <input className="form-check-input" type="checkbox" checked={input.applyToRemaining}
                                    onChange={e => handleRateChange(index, "applyToRemaining", e.target.checked)}
                                    id={`applyCheck${index}`}
                                    disabled={!input.rate}/>
                                    <label className="form-check-label" htmlFor={`applyToRemaining${index}`}>
                                    Apply to remaining years
                                    </label>
                                </div>
                            </div>
                            )}
                        </div>
                        ))}
                        <div className="mt-3 d-flex flex-wrap gap-2">
                            <button type="button" className="btn btn-primary" onClick={handleCount}>Count</button>
                            <button type="button" className="btn btn-secondary" onClick={handleReset}>Reset Interest Inputs</button>
                        </div>
                    </div>
                </div>
                <div className="col-sm-12 col-md-9">
                    <div className="row">
                        <label className="form-label text-start">Tabel Cicilan</label>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <TabelCicilan results={results}/>
                        </div>
                    </div>
                </div>
            </div>
            </form>
        </main>

        <footer className="mt-4 text-center">
            <small>&copy; 2025 Mortgage Counter</small>
        </footer>

        <Modal show={showResetModal} onHide={() => setShowResetModal(false)}>
            <Modal.Header closeButton>
            <Modal.Title>Confirm Reset</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to reset the interest inputs to year 1?</Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowResetModal(false)}>
                No
            </Button>
            <Button variant="danger" onClick={confirmReset}>
                Okay
            </Button>
            </Modal.Footer>
        </Modal>
        </div>
    );
};

export default MortgageCounterApp;