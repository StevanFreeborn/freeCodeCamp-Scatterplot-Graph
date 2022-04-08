const url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json"

document.addEventListener("DOMContentLoaded", function(){
    const request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.send();
    request.onload = () => {
        const data = JSON.parse(request.responseText);
        console.log(data);

        const height = 400;
        const width = 800;

        const svg = d3.select("#graph")
        .append("svg")
        .attr("id", "scatter-plot")
        .attr("viewBox", `0 0 ${width + 100} ${height + 100}`)

        // Find domain for x-axis
        const years = data.map(d => d.Year);
        const minYear = d3.min(years);
        const maxYear = d3.max(years) + 1;

        // Create x-axis scale
        const xScale = d3.scaleLinear()
        .domain([minYear, maxYear])
        .range([0, width]);

        // Create x-axis
        const xAxis = d3.axisBottom()
        .scale(xScale)
        .tickFormat(d => d.toString());

        svg.append("g")
        .call(xAxis)
        .attr("id", "x-axis")
        .attr("transform", "translate(50,400)");

        // TODO: Find domain for y-axis
        // TODO: Create y-axis scale
        // TODO: Create y-axis

    }
})