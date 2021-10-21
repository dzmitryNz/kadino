export default async function chart(id, labels, datasets) {
    Chart.defaults.elements.point.radius = 1;
    
    const data = {
      labels: labels,
      datasets: datasets
    };

    const config = {
      type: 'line',
      data,
      options: {}
    };
    Chart.defaults.elements.bar.borderWidth = 2;

    const myChart = new Chart(
      document.getElementById(id),
      config
    );

};
