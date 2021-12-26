import React, { useRef, useLayoutEffect } from 'react';

import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5themes_Responsive from "@amcharts/amcharts5/themes/Responsive";
import * as am5percent from "@amcharts/amcharts5/percent";
import axios from 'axios';
import { useState, useEffect } from 'react';
const PieChart = (props) => {
  const [data, setData] = useState([]);
  
  useLayoutEffect(() => {
 
    var root = am5.Root.new("chartdiv1");
    var chart = root.container.children.push( 
        am5percent.PieChart.new(root, {
        layout: root.verticalLayout
        }) 
    );
    const current_token = localStorage.getItem('access_token')
    let header = {"Authorization": 'Bearer ' + current_token}
    axios.get('http://127.0.0.1:8000/api/home', {headers: header})
        .then(res => {
                // Define data
                var data = [{
                    age: "Từ 0 đến 16",
                    percentage: res.data.piechart[0].percentage
                  }, {
                    age: "Từ 16 đến 60",
                    percentage: res.data.piechart[1].percentage
                  }, {
                    age: "Trên 60",
                    percentage: res.data.piechart[2].percentage
                  }]
                
                // Create series
                var series = chart.series.push(
                    am5percent.PieSeries.new(root, {
                    name: "Series",
                    valueField: "percentage",
                    categoryField: "age"
                    })
                );
                series.data.setAll(data);
                
                // Add legend
                var legend = chart.children.push(am5.Legend.new(root, {
                    centerX: am5.percent(50),
                    x: am5.percent(50),
                    layout: root.horizontalLayout
                }));
                
                legend.data.setAll(series.dataItems);
                    })
    root.setThemes([
        am5themes_Responsive.new(root)
    ]);
 
    return () => {
        root.dispose();
    };
    }, []);

  return (
    <div id="chartdiv1" style={{ width: "90%", height: "450px", marginTop: 3 }}></div>
  );
}
export default PieChart;