import React, { useRef, useLayoutEffect } from 'react';

import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5themes_Responsive from "@amcharts/amcharts5/themes/Responsive";
import axios from 'axios';
import { useState, useEffect } from 'react';
const Chart = (props) => {
  const [data, setData] = useState([]);
  
  useLayoutEffect(() => {
   /**
 * ---------------------------------------
 * This demo was created using amCharts 5.
 * 
 * For more information visit:
 * https://www.amcharts.com/
 * 
 * Documentation is available at:
 * https://www.amcharts.com/docs/v5/
 * ---------------------------------------
 */

// ===========================================================
// Data
// ===========================================================
var root = am5.Root.new("chartdiv");
const current_token = localStorage.getItem('access_token')
    let header = {"Authorization": 'Bearer ' + current_token}
    axios.get('http://127.0.0.1:8000/api/home', {headers: header})
        .then(res => {
            console.log(res.data);
            var usData = res.data.towerchart;
            
            
            
            
            function aggregateData(list) {
              var maleTotal = 0;
              var femaleTotal = 0;
              
              for(var i = 0; i < list.length; i++) {
                var row = list[i];
                maleTotal += row.male;
                femaleTotal += row.female;
              }
              
              for(var i = 0; i < list.length; i++) {
                var row = list[i];
                row.malePercent = -1 * Math.round((row.male / maleTotal) * 10000) / 100;
                row.femalePercent = Math.round((row.female / femaleTotal) * 10000) / 100;
              }
              
              return list;
            }
            
            usData = aggregateData(usData);
            
            
            // ===========================================================
            // Root and wrapper container
            // ===========================================================
            
            // Create root and chart
            
            
            // Set themes
            root.setThemes([
              am5themes_Animated.new(root)
            ]);
            root.setThemes([
              am5themes_Responsive.new(root)
            ]);
            
            // Create wrapper container
            var container = root.container.children.push(am5.Container.new(root, {
              layout: root.horizontalLayout,
              width: am5.p100,
              height: am5.p100
            }))
            
            // Set up formats
            root.numberFormatter.setAll({
              numberFormat: "#.##as"
            });
            
            
            // ===========================================================
            // XY chart
            // ===========================================================
            
            // Create chart
            var chart = container.children.push(am5xy.XYChart.new(root, {
              panX: false,
              panY: false,
              wheelX: "none",
              wheelY: "none",
              layout: root.verticalLayout,
              width: am5.percent(60)
            }));
            
            // Create axes
            var yAxis1 = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
              categoryField: "age",
              renderer: am5xy.AxisRendererY.new(root, {})
            }));
            yAxis1.get("renderer").labels.template.set("fontSize", 12);
            yAxis1.data.setAll(usData);
            
            var yAxis2 = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
              categoryField: "age",
              renderer: am5xy.AxisRendererY.new(root, {
                opposite: true
              })
            }));
            yAxis2.get("renderer").labels.template.set("fontSize", 12);
            yAxis2.data.setAll(usData);
            
            var xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
              min: -10,
              max: 10,
              numberFormat: "#.s'%'",
              renderer: am5xy.AxisRendererX.new(root, {
                minGridDistance: 40
              })
            }));
            
            // Create series
            var maleSeries = chart.series.push(am5xy.ColumnSeries.new(root, {
              name: "Males",
              xAxis: xAxis,
              yAxis: yAxis1,
              valueXField: "malePercent",
              categoryYField: "age",
              clustered: false
            }));
            
            
            maleSeries.columns.template.setAll({
              tooltipText: "Males, age {categoryY}: {male} ({malePercent.formatNumber('#.0s')}%)",
              tooltipX: am5.p100
            });
            
            maleSeries.data.setAll(usData);
            
            var femaleSeries = chart.series.push(am5xy.ColumnSeries.new(root, {
              name: "Males",
              xAxis: xAxis,
              yAxis: yAxis1,
              valueXField: "femalePercent",
              categoryYField: "age",
              clustered: false
            }));
            
            femaleSeries.columns.template.setAll({
              tooltipText: "Males, age {categoryY}: {female} ({femalePercent.formatNumber('#.0s')}%)",
              tooltipX: am5.p100
            });
            
            femaleSeries.data.setAll(usData);
            
            // Add labels
            var maleLabel = chart.plotContainer.children.push(am5.Label.new(root, {
              text: "Males",
              fontSize: 20,
              y: 5,
              x: 5,
              //centerX: am5.p50,
              fill: maleSeries.get("fill"),
              background: am5.RoundedRectangle.new(root, {
                fill: am5.color(0xffffff),
                fillOpacity: 0.5
              })
            }));
            
            var femaleLabel = chart.plotContainer.children.push(am5.Label.new(root, {
              text: "Females",
              fontSize: 20,
              y: 5,
              x: am5.p100,
              centerX: am5.p100,
              dx: -5,
              fill: femaleSeries.get("fill"),
              background: am5.RoundedRectangle.new(root, {
                fill: am5.color(0xffffff),
                fillOpacity: 0.5
              })
            }));
        })

  
  
  
  // ===========================================================
  // Map chart
  // ===========================================================
  
  // Create chart
  

return () => {
    root.dispose();
  };
  }, []);

  return (
    <div id="chartdiv" style={{ width: "100%", height: "400px" }}></div>
  );
}
export default Chart;