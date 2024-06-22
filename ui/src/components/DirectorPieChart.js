import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { fetchMovies } from './api';

export default function DirectorPieChart() {
    const [movies, setMovies] = useState([]);
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        const fetchMoviesData = async () => {
            try {
                const data = await fetchMovies();
                setMovies(data);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };
        fetchMoviesData();
    }, []);

    useEffect(() => {
        if (movies.length === 0) return;

        const directorsMap = new Map();
        
        movies.forEach(movie => {
            const director = movie.director;
            if (directorsMap.has(director)) {
                directorsMap.set(director, directorsMap.get(director) + 1);
            } else {
                directorsMap.set(director, 1);
            }
        });

        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        const myChartRef = chartRef.current.getContext('2d');

        chartInstance.current = new Chart(myChartRef, {
            type: "bar",
            data: {
                labels: Array.from(directorsMap.keys()),
                datasets: [{
                    label: 'Movies Directed',
                    data: Array.from(directorsMap.values()),
                    backgroundColor: [
                        'rgb(255, 99, 132)',
                        'rgb(54, 162, 235)',
                        'rgb(255, 205, 86)',
                        'rgb(75, 192, 192)',
                    ],
                    hoverOffset: 4
                }]
            },
            options: {
                maintainAspectRatio: false,
                responsive: true,
            }
        });

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [movies]);

    return (
        <div className="d-flex justify-content-center" style={{ height: '100vh' }}>
            <div style={{ width: '300px', height: '300px' }}>
                <canvas ref={chartRef} />
            </div>
        </div>
    );
}
