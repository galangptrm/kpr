import React, {useState, useEffect} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import * as XLSX from "xlsx";

export default function TabelCicilan({results={}}){

    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsSmallScreen(window.innerWidth < 576); // Bootstrap's sm breakpoint
        };

        checkScreenSize(); // initial check
        window.addEventListener('resize', checkScreenSize); // resize listener

        return () => window.removeEventListener('resize', checkScreenSize); // cleanup
    }, []);

    const formatRupiah = (number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(Math.abs(number));
    };

    const exportToExcel = (e) => {
        e.preventDefault()

        // Prepare rows: meta info + headers + data + totals
        const rows = [];

        // Add metadata
        rows.push(["Harga Rumah", results.harga]);
        rows.push(["Down Payment", results.dp]);
        rows.push(["Lama Angsuran (Tahun)", results.total_tahun]);
        rows.push([]);
        
        // Header row
        rows.push([
            "Bulan Ke",
            "Bunga/Margin Rate",
            "Angsuran",
            "Pokok",
            "Bunga/Margin",
            "Sisa Hutang Pokok",
        ]);

        // Body
        results.data.forEach((item) => {
            rows.push([
            item.bulan,
            item.bunga_tahunan + "%",
            item.angsuran,
            item.pokok,
            item.margin,
            item.sisa,
            ]);
        });

        // Totals
        const totalAngsuran = results.data.reduce((acc, cur) => acc + cur.angsuran, 0);
        const totalPokok = results.data.reduce((acc, cur) => acc + cur.pokok, 0);
        const totalMargin = results.data.reduce((acc, cur) => acc + cur.margin, 0);

        rows.push([]);
        rows.push(["Total", "", totalAngsuran, totalPokok, totalMargin, ""]);

        // Create worksheet & workbook
        const worksheet = XLSX.utils.aoa_to_sheet(rows);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Cicilan");

        // Export
        XLSX.writeFile(workbook, `tabel_cicilan_${results.total_tahun}tahun.xlsx`);
    };

    return (
        <>
        <div className="row">
            <label className="form-label text-start">Tabel Cicilan</label>
            <div className="col-12 text-end">
                <button type="button" className="btn btn-success btn-xs mb-3 text-start" onClick={exportToExcel}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-file-earmark-excel me-2" viewBox="0 0 16 16">
                        <path d="M5.884 6.68a.5.5 0 1 0-.768.64L7.349 10l-2.233 2.68a.5.5 0 0 0 .768.64L8 10.781l2.116 2.54a.5.5 0 0 0 .768-.641L8.651 10l2.233-2.68a.5.5 0 0 0-.768-.64L8 9.219l-2.116-2.54z"/>
                        <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2M9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z"/>
                    </svg>
                    Download Excel
                </button>
            </div>
            <div className="col-12">
                <table className={`table table-striped table-bordered table-hover table-responsive small-table ${isSmallScreen ? 'table-sm' : ''}`}>
                    <thead className="sticky-top">
                        <tr className="table-dark">
                            <th scope="col">Bulan Ke</th>
                            <th scope="col">Bunga</th>
                            <th scope="col">Angsuran</th>
                            <th scope="col">Pokok</th>
                            <th scope="col">Bunga/Margin</th>
                            <th scope="col">Sisa Hutang Pokok</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.data && results.data.map((item, index) => (
                            <tr key={`bulan-${index}`} className="text-end font-monospace">
                                <th scope="row">{item.bulan}</th>
                                <td>{item.bunga_tahunan} %</td>
                                <td>{formatRupiah(item.angsuran)}</td>
                                <td>{formatRupiah(item.pokok)}</td>
                                <td>{formatRupiah(item.margin)}</td>
                                <td>{formatRupiah(item.sisa)}</td>
                            </tr>
                        ))}
                    </tbody>
                    {results.total_angsuran && 
                    <tfoot className="sticky-bottom">
                        <tr className="text-end table-dark font-monospace">
                            <th colSpan={2} scope="row">TOTAL</th>
                            <td scope="row">{formatRupiah(results.total_angsuran)}</td>
                            <td scope="row">{formatRupiah(results.total_pokok)}</td>
                            <td scope="row">{formatRupiah(results.total_margin)}</td>
                            <td></td>
                        </tr>
                    </tfoot>
                    }
                </table>
            </div>
        </div>
        </>
    )
}