import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function TabelCicilan({results={}}){

    const formatRupiah = (number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(number);
    };

    // console.log('Data result', results.data);

    return (
        <>
        <table className="table table-bordered table-striped table-hover table-responsive">
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
        </>
    )
}