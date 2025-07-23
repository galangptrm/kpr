import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Grafik({results={}}){

    // const chartData = [
    //     { month: "Month 1", principal: 1200000, interest: 300000 },
    //     { month: "Month 2", principal: 1210000, interest: 290000 },
    //     // ...
    // ];

    // let monthly_result = {
    //     bulan : (j+1)+(i*12),
    //     bunga_tahunan : parseFloat(rates[i].rate),
    //     bunga_bulanan : monthlyRate,
    //     bulan_total : monthTotal-(i*12),
    //     margin : porsiMargin,
    //     pokok : porsiPokok,
    //     angsuran : angsuran,
    //     sisa : sisaPinjaman
    // }

    return (
        <>
            {results.data && 
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={results.data}>
                        <XAxis dataKey="bulan"/>
                        <YAxis hide />
                        <Tooltip content={<CustomTooltip/>}/>
                        <Legend />
                        <Bar dataKey="pokok" stackId="a" fill="#82ca9d" name="Pokok" />
                        <Bar dataKey="margin" stackId="a" fill="#8884d8" name="Margin" />
                    </BarChart>
                </ResponsiveContainer>
            }
        </>
    )
}

const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload || !payload.length) return null;

    const formatRupiah = (number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(number);
    };
  
    return (
      <div style={{ backgroundColor: "#fff", padding: "10px", border: "1px solid #ccc" }}>
        <strong>Bulan ke - {label}</strong>
        <br />
        <span style={{color:"#82ca9d"}}>Pokok: <b>{formatRupiah(payload[0].value)}</b></span><br />
        <span style={{color:"#8884d8"}}>Margin: <b>{formatRupiah(payload[1].value)}</b></span>
      </div>
    );
}