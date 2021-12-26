import React, { useRef, useLayoutEffect } from 'react';

import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5themes_Responsive from "@amcharts/amcharts5/themes/Responsive";
import axios from 'axios';
import { useState, useEffect } from 'react';
const TowerChart = (props) => {
  const [data, setData] = useState([]);
  
  useLayoutEffect(() => {
 
    var root = am5.Root.new("chartdiv");
    const current_token = localStorage.getItem('access_token')
    let header = {"Authorization": 'Bearer ' + current_token}
    axios.get('http://127.0.0.1:8000/api/home', {headers: header})
        .then(res => {
            var popData =  [{
              "age": "Từ 0 đến 10",
              "male": res.data.towerchart[0].male,
              "female": res.data.towerchart[0].female
            }, {
              "age": "Từ 10 đến 20",
              "male": res.data.towerchart[1].male,
              "female": res.data.towerchart[1].female
            },  {
              "age": "Từ 20 đến 30",
              "male": res.data.towerchart[2].male,
              "female": res.data.towerchart[2].female
            },  {
              "age": "Từ 30 đến 40",
              "male": res.data.towerchart[3].male,
              "female": res.data.towerchart[3].female
            },  {
              "age": "Từ 40 đến 50",
              "male": res.data.towerchart[4].male,
              "female": res.data.towerchart[4].female
            }, {
              "age": "Từ 50 đến 60",
              "male": res.data.towerchart[5].male,
              "female": res.data.towerchart[5].female
            }, {
              "age": "Từ 60 đến 70",
              "male": res.data.towerchart[6].male,
              "female": res.data.towerchart[6].female
            }, {
              "age": "Trên 70",
              "male": res.data.towerchart[7].male,
              "female": res.data.towerchart[7].female
            },
          ];
            
            
            
            
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
            
            popData = aggregateData(popData);
            
            
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
            yAxis1.data.setAll(popData);
            
            var yAxis2 = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
              categoryField: "age",
              renderer: am5xy.AxisRendererY.new(root, {
                opposite: true
              })
            }));
            yAxis2.get("renderer").labels.template.set("fontSize", 12);
            yAxis2.data.setAll(popData);
            
            var xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
              min: -20,
              max: 20,
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
              tooltipText: "Nam, tuổi {categoryY}: {male} ({malePercent.formatNumber('#.0s')}%)",
              tooltipX: am5.p100
            });
            
            maleSeries.data.setAll(popData);
            
            var femaleSeries = chart.series.push(am5xy.ColumnSeries.new(root, {
              name: "Males",
              xAxis: xAxis,
              yAxis: yAxis1,
              valueXField: "femalePercent",
              categoryYField: "age",
              clustered: false
            }));
            
            femaleSeries.columns.template.setAll({
              tooltipText: "Nữ, tuổi {categoryY}: {female} ({femalePercent.formatNumber('#.0s')}%)",
              tooltipX: am5.p100
            });
            
            femaleSeries.data.setAll(popData);
            
            // Add labels
            var maleLabel = chart.plotContainer.children.push(am5.Label.new(root, {
              text: "Nam",
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
              text: "Nữ",
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
    <div id="chartdiv" style={{ width: "100%", height: "450px", marginTop: 3  }}></div>
  );
}
export default TowerChart;