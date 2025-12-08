"use client"

import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface RatingChartProps {
    voteAverage: number;
};

export default function DoughnutChart ({ voteAverage }: RatingChartProps) {
    const filled = voteAverage;
    const remaining = 10 - voteAverage;

    const data = {
        labels: [],
        datasets: [
            {
                data: [filled, remaining],
                backgroundColor: ["#4CAF50", "#E0E0E0E0"],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="w-20 h-20">
            <Doughnut data={data} />
        </div>
    )
}