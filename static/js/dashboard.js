let allData = [];
let charts = {};
const metrics = ['sleep', 'mood', 'screenTime', 'water', 'steps', 'work'];

document.addEventListener("DOMContentLoaded", async function () {
    try {
        const response = await fetch("/get-data", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        allData = await response.json();
        allData.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

        initializeCharts();
    } catch (error) {
        console.error("Error fetching data:", error);
    }
});

function initializeCharts() {
    metrics.forEach(metric => {
        const selectElement = document.getElementById(`${metric}Range`);
        if (selectElement) {
            selectElement.addEventListener("change", () => updateChart(metric));
        }
        updateChart(metric);
    });

    const overviewSelect = document.getElementById('overviewRange');
    if (overviewSelect) {
        overviewSelect.addEventListener("change", () => {
            const range = overviewSelect.value;
            updateOverviewChart(range);
        });
    }
    updateOverviewChart(allData);
}

function updateChart(metric) {
    const range = document.getElementById(`${metric}Range`).value;
    const filteredData = filterDataByRange(allData, range);

    const labels = filteredData.map(entry => new Date(entry.created_at).toLocaleDateString('en-GB'));
    const data = filteredData.map(entry => entry[metric]);

    const lastRecordedElement = document.getElementById(`${metric}Last`);
    if (lastRecordedElement) {
        lastRecordedElement.textContent = data.length > 0 ? data[data.length - 1] : 'N/A';
    }

    try {
        charts[metric].destroy();
    } catch (e) {
        console.error(e);
    }


    const ctx = document.getElementById(`${metric}Chart`).getContext("2d");
    charts[metric] = new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                label: capitalizeFirstLetter(metric),
                data: data,
                borderColor: getMetricColor(metric),
                backgroundColor: getMetricColor(metric, 0.2),
                fill: true,
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: "Date",
                        color: 'white'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.2)',
                        borderColor: 'white'
                    },
                    ticks: {
                        color: 'white'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: capitalizeFirstLetter(metric),
                        color: 'white'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.2)',
                        borderColor: 'white'
                    },
                    ticks: {
                        color: 'white'
                    },
                    beginAtZero: true
                }
            }
        }
    });
}

// Update overview chart based on selected metrics
function updateOverviewChart() {
    const range = document.getElementById(`overviewRange`).value;
    const filteredData = filterDataByRange(allData, range);
    const metric1 = document.getElementById('overviewMetric1').value;
    const metric2 = document.getElementById('overviewMetric2').value;

    if (metric1 === metric2) {
        alert("Please select two different metrics.");
        return;
    }

    // Generate date range
    const dates = [...new Set(filteredData.map(entry => entry.created_at))].sort();
    const dateLabels = dates.map(date => new Date(date).toLocaleDateString('en-GB'));

    // Prepare datasets
    const dataset1 = prepareDataset(filteredData, dates, metric1, 'y');
    const dataset2 = prepareDataset(filteredData, dates, metric2, 'y1');

    try {
        overviewChart.destroy();
    } catch (error) {
        console.error(error);
    }

    // Create new chart
    const ctx = document.getElementById('overviewChart').getContext('2d');
    overviewChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dateLabels,
            datasets: [dataset1, dataset2]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Date'
                    },
                },
                y: {
                    type: 'linear',
                    position: 'left',
                    title: {
                        display: true,
                        text: capitalizeFirstLetter(metric1)
                    },
                },
                y1: {
                    type: 'linear',
                    position: 'right',
                    title: {
                        display: true,
                        text: capitalizeFirstLetter(metric2)
                    },
                    grid: {
                        drawOnChartArea: false,
                    }
                }
            }
        }
    });
}

// Prepare dataset for a specific metric
function prepareDataset(data, dates, metric, yAxisID) {
    // Map dates to values
    const dateValueMap = {};
    data.forEach(entry => {
        const date = entry.created_at;
        if (!dateValueMap[date]) {
            dateValueMap[date] = {};
        }
        dateValueMap[date][metric] = entry[metric];
    });

    // Extract values and normalize
    const values = dates.map(date => dateValueMap[date]?.[metric] || 0);

    return {
        label: capitalizeFirstLetter(metric),
        data: values,
        borderColor: getMetricColor(metric),
        backgroundColor: getMetricColor(metric, 0.2),
        yAxisID: yAxisID,
        fill: false,
        tension: 0.1
    };
}

function filterDataByRange(data, range) {
  const now = new Date();
  let startDate;

  switch (range) {
    case '7':
      startDate = new Date(now.setDate(now.getDate() - 7));
      break;
    case '30':
      startDate = new Date(now.setDate(now.getDate() - 30));
      break;
    case '90':
      startDate = new Date(now.setDate(now.getDate() - 90));
      break;
    case 'all':
    default:
      return data;
  }

  return data.filter(entry => new Date(entry.created_at) >= startDate);
}


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getMetricColor(metric, alpha = 1) {
    const colors = {
        sleep: `rgba(255, 99, 132, ${alpha})`,
        mood: `rgba(54, 162, 235, ${alpha})`,
        screenTime: `rgba(255, 206, 86, ${alpha})`,
        water: `rgba(75, 192, 192, ${alpha})`,
        steps: `rgba(153, 102, 255, ${alpha})`,
        work: `rgba(255, 159, 64, ${alpha})`
    };
    return colors[metric] || `rgba(0, 0, 0, ${alpha})`;
}
