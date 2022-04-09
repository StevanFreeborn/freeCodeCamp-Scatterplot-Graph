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
        const minYear = d3.min(years) - 1;
        const maxYear = d3.max(years) + 1;

        // Create x-axis scale
        const xScale = d3.scaleLinear()
        .domain([minYear, maxYear])
        .range([0, width]);

        // Create x-axis
        const xAxis = d3.axisBottom()
        .scale(xScale)
        .tickFormat(d => d.toString())
        .ticks(12)
        .tickSizeOuter(0);

        svg.append("g")
        .call(xAxis)
        .attr("id", "x-axis")
        .attr("transform", "translate(50,450)");

        // parse times into mins and seconds
        // create new date object for each time
        // using parsed minutes and seconds.
        const times = data.map(d => {
            let time = d.Time.split(":");
            return new Date(0, 0, 0, 0, time[0], time[1]);
        });
        
        const minTime = new Date(0, 0, 0, 0, 36, 30);
        const maxTime = new Date(0, 0, 0, 0, 40, 0);

        // Create y-axis scale
        const yScale = d3.scaleTime()
        .domain([minTime, maxTime])
        .range([height, 0]);

        // Create y-axis
        const yAxis = d3.axisLeft()
        .scale(yScale)
        .tickFormat(d3.timeFormat("%M:%S"))
        .tickSizeOuter(0);

        svg.append("g")
        .call(yAxis)
        .attr("id", "y-axis")
        .attr("transform", "translate(50, 50)");

        // plot points
        svg.selectAll(".dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("r", 6)
        .attr("cx", (d,i) => xScale(years[i]) + 50)
        .attr("cy", (d,i) => yScale(times[i]) + 50)
        .attr("class", "dot")
        .attr("data-xvalue", (d,i) => years[i])
        .attr("data-yvalue", (d,i) => times[i]);
        
        // TODO: Add tool tip
        
        // TODO: Add Legend

    }
})