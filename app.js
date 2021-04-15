function buildMetaData(sample){
    d3.json("samples.json").then((data) => {
        var metadata = data.metadata;
        var solutionArray = metadata.filter(sampleObject => sampleObject.id == sample);
        var solution = solutionArray[0];

        var d3panel = d3.select("#sample-metadata");

        d3panel.html("");

        Object.entries(result).forEach(([key, value]) => {
            d3panel.append("h6").text(`${key.toUpperCase()}: ${value}`);
        });

    });
}
function buildChart(sample){
    d3.json("samples.json").then((data) => {
        var sample = data.samples;
        var samplesArray = samples.fitler(sampleObject => sampleObject.id == sample);
        var sample_solution = samplesArray[0];

        var otu_id = result.otu_ids;
        var otu_label = result.otu_labels;
        var samplevals = result.sample_values;


        //chart
        var layout = {
            title: "Bacteria per samples",
            margin: {t:0},
            hovermode: "closest",
            xaxis: { title: "OTU ID" },
            margin: { t: 30}
        };

        var dataLayout = {
            x: otu_id,
            y: samplevals,
            text: otu_label,
            mode: "markers",
            marker: {
                size: samplevals,
                color: otu_id,
                colorscale: "Earth"
            }
        }
    });

    Plotly.newPlot("bubble", layout, dataLayout);

    var yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
    var barData = [
      {
        y: yticks,
        x: sample_values.slice(0, 10).reverse(),
        text: otu_labels.slice(0, 10).reverse(),
        type: "bar",
        orientation: "h",
      }
    ];

    var barLayout = {
      title: "Top 10 Bacteria Cultures Found",
      margin: { t: 30, l: 150 }
    };

    Plotly.newPlot("bar", barData, barLayout);
};

function init() {
    
    var selector = d3.select("#selDataset");
  
    
    d3.json("samples.json").then((data) => {
      var sampleNames = data.names;
  
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
  
      
      var firstSample = sampleNames[0];
      buildCharts(firstSample);
      buildMetadata(firstSample);
    });
  }
  
  function optionChanged(newSample) {
    
    buildCharts(newSample);
    buildMetadata(newSample);
  }
  
  //show dashboard
  init();



