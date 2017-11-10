var tekst1 = `<p><b>Vermogensdelicten</b> zijn de delicten die meer dan de helft van alle geregistreerde delicten bedekt. Je ziet bij deze grafiek dat de eerste staaf (diefstal en inbraak) bestaat uit bijna 600.000 geregistreede misdaden in 2014 en 2015. Gelukkig is het in 2016 met bijna 100.000 gedaald. Waarom zijn vermogensmisdrijven eigenlijk zo 'populair'? Vermogensmisdrijven zijn populair omdat het meestal gaat om snel geld. Een inbraak, straatroof etc. kost over het algemeen weinig tijd. Dit maakt het voor de armste klasse van onze samenleving een makkelijke manier om aan een beetje geld te komen. Andere bekenden vormen van vermogensdelicten zijn: bedrog, heling en valsheidsmisdrijven.</p>`
var tekst2 = `<p><b>Vernielingen</b> nemen ook af. In 2014 waren er nog bijna 110.000 vernielingen. In 2016 was dit nog maar 95.000. "openbare orde misdrijven" en "brandstichting" zijn in de voorgaande drie jaar ook gedaald. Alleen "openbaar gezag misdrijven" zijn gestegen. Hoe dat komt is nog onbekend.</p>"`
var tekst3 = `<p><b>Gewelds- en seksuele misdrijven</b> zijn delicten waar onder anderen "mishandeling", "bedrijging", "stalking", "seksuele misdrijven" etc. onder vallen. Mishandeling en bedrijging lijken (gelukkig) bijna lineair af te nemen. Beide onderwerpen zijn vanaf 2014 met rond de 2000 delicten is afgenomen. Seksuele misdrijven hadden in 2016 een stijging ten opzichten van 2015. Het gaat hier om zo'n 400 gevallen. Dat is fors, veel forser dan bij andere onderwerpen. Mensenhandel was de grootste stijger in deze categorie. Dat is erg schrikbarend. Hoe dit zo fors heeft kunnen stijgen is niet bekend.</p>`
var tekst4 = `<p><b>Verkeersmisdrijven</b>. Niet te verwarren met verkeersovertredingen. Het meest voorkomende onderwerp is "verlaten plaats ongeval". Een zeer serieuze zaak. Helaas is er sinds 2015 weinig gebeurt met die cijfers, het schommelt namelijk tussen de 80.000 en 78.000. Rijden onder invloed neemt gelukkig wel af. De rest schommelt, maar niet benoemingswaardig. De enige categorie die nog opvalt, is 'rijden tijdens ontzegging'. Hij daalde in 2015 met zo'n 350 zaken ten opzichten van 2014. Dat is fors, vooral als je beseft dat we het over zo'n 4.000 zaken hebben. In 2016 steeg rijden tijdens ontzegging naar 4200. </p>`
var tekst5 = `<p><b>Drugsmisdrijven</b> nemen ook af. Wat we schrikbarend is, is dat sinds 2015 er meer misdrijven worden gepleegd met harddrugs dan met softdrugs. Gelukkig neemt alles af.</p>`
var tekst6 = `<p><b>(vuur)wapenmisdrijven</b> is een van de ergste soorten misdrijven. Het is fijn om te zien dat dit soort delicten daalt. Wat minder fijn is, is dat het alsnog gaat om een schrikbarend hoog getal. In 2016 waren er 5425 wapenmisdrijven. Dat zijn bijna 15 misdrijven per dag! Ondanks het afneemt, vind ik dat er hardere straffen moeten komen, zodat dit getal sneller daalt.</p>`
var titel1 = `Hoor wie klopt daar? geen inbreker`
var titel2 = `Vernielingen dalen met meer dan 15.000 gevallen`
var titel3 = `Mensenhandel in Nederland stijgt fors`
var titel4 = `Zo'n 220 keer per dag rijden mensen door na ongeval`
var titel5 = `Steeds meer harddrugs`
var titel6 = `Afelopen jaar bijna 5.500 gevallen van wapenmisdrijven`

var buttons = document.querySelectorAll('button');

for (i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function(){
    document.querySelector("svg").innerHTML = ""
    klik = event.target.value + '.csv'
    console.log(klik);
    if (klik == "vermogen.csv") {
      document.querySelector(".article2").innerHTML = tekst1
      document.querySelector(".subtitle").innerHTML = titel1
      var z = d3.scaleOrdinal()
          .range(["mediumorchid", "fuchsia", "orchid", "violet", "plum", "thistle", "lavender"]);
    }
    if (klik == "vernieling.csv") {
      document.querySelector(".article2").innerHTML = tekst2
      document.querySelector(".subtitle").innerHTML = titel2
      var z = d3.scaleOrdinal()
          .range(["indianred", "lightcoral", "salmon", "darksalmon"]);
    }
    if (klik == "geweld.csv") {
      document.querySelector(".article2").innerHTML = tekst3
      document.querySelector(".subtitle").innerHTML = titel3
      var z = d3.scaleOrdinal()
          .range(["lightsalmon", "coral", "tomato", "orangered", "darkorange", "orange", "orange","orangergb(228, 154, 66)"]);
    }
    if (klik == "verkeer.csv") {
      document.querySelector(".article2").innerHTML = tekst4
      document.querySelector(".subtitle").innerHTML = titel4
      var z = d3.scaleOrdinal()
          .range(["gold", "yellow", "lightyellow", "papayawhip", "moccasin", "peachpuff", "palegoldenrod"]);
    }
    if (klik == "drugs.csv") {
      document.querySelector(".article2").innerHTML = tekst5
      document.querySelector(".subtitle").innerHTML = titel5
      var z = d3.scaleOrdinal()
          .range(["lawngreen", "lime", "limegreen"]);
    }
    if (klik == "wapen.csv") {
      document.querySelector(".article2").innerHTML = tekst6
      document.querySelector(".subtitle").innerHTML = titel6
      var z = d3.scaleOrdinal()
          .range(["lightseagreen"]);
    }


var svg = d3.select("svg"),
    margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var x0 = d3.scaleBand()
    .rangeRound([0, width])
    .paddingInner(0.1);

var x1 = d3.scaleBand()
    .padding(0.05);

var y = d3.scaleLinear()
    .rangeRound([height, 0]);

d3.csv(klik, function(d, i, columns) {
  for (var i = 1, n = columns.length; i < n; ++i) d[columns[i]] = +d[columns[i]];
  return d;
}, function(error, data) {
  if (error) throw error;

  var keys = data.columns.slice(1);

  x0.domain(data.map(function(d) { return d.jaar; }));
  x1.domain(keys).rangeRound([0, x0.bandwidth()]);
  y.domain([0, d3.max(data, function(d) { return d3.max(keys, function(key) { return d[key]; }); })]).nice();

  g.append("g")
    .selectAll("g")
    .data(data)
    .enter().append("g")
      .attr("transform", function(d) { return "translate(" + x0(d.jaar) + ",0)"; })
    .selectAll("rect")
    .data(function(d) { return keys.map(function(key) { return {key: key, value: d[key]}; }); })
    .enter().append("rect")
      .attr("x", function(d) { return x1(d.key); })
      .attr("y", function(d) { return y(d.value); })
      .attr("width", x1.bandwidth())
      .attr("height", function(d) { return height - y(d.value); })
      .attr("fill", function(d) { return z(d.key); })
      .on("mouseover", function(d) {
        var xpos = event.clientX;
        var ypos = event.clientY;
				var tooltip = d3.select("#tooltip")
						.style("left", xpos + "px")
						.style("top", ypos + "px")

            console.log( d );

        tooltip.select("#name")
            .text(d.key)

				tooltip.select("#value")
						.text(d.value)


					d3.select("#tooltip").classed("hidden", false);
			   })
			   .on("mouseout", function() {
				  d3.select("#tooltip").classed("hidden", true);
        })
          d3.select("#tooltip")
            .select("#appel")
            .text(function(d){return d;})


  g.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x0));

  g.append("g")
      .attr("class", "axis")
      .call(d3.axisLeft(y).ticks(null, "s"))
    .append("text")
      .attr("x", 2)
      .attr("y", y(y.ticks().pop()) + 0.5)
      .attr("dy", "0.32em")
      .attr("fill", "#000")

  var legend = g.append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("text-anchor", "end")
    .selectAll("g")
    .data(keys.slice().reverse())
    .enter().append("g")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  legend.append("rect")
      .attr("x", width - 19)
      .attr("width", 19)
      .attr("height", 19)
      .attr("fill", z);

  legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9.5)
      .attr("dy", "0.32em")
      .text(function(d) { return d; });
});
})}
