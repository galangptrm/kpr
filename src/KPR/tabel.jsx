import React, { useState } from "react";
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
        <table className="table table-bordered table-striped">
            <thead className="sticky">
                <tr>
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
                    <tr key={`bulan-${index}`}>
                        <th scope="row">{item.bulan}</th>
                        <td>{item.bunga_tahunan} %</td>
                        <td>{formatRupiah(item.angsuran)}</td>
                        <td>{formatRupiah(item.pokok)}</td>
                        <td>{formatRupiah(item.margin)}</td>
                        <td>{formatRupiah(item.sisa)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}