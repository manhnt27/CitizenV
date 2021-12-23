import React, { useRef, useLayoutEffect } from 'react';

import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5themes_Responsive from "@amcharts/amcharts5/themes/Responsive";

const Chart = () => {
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

var usData = [{
    "age": "0 to 5",
    "male": 10175713,
    "female": 9736305
  }, {
    "age": "5 to 9",
    "male": 10470147,
    "female": 10031835
  }, {
    "age": "10 to 14",
    "male": 10561873,
    "female": 10117913
  }, {
    "age": "15 to 17",
    "male": 6447043,
    "female": 6142996
  }, {
    "age": "18 to 21",
    "male": 9349745,
    "female": 8874664
  }, {
    "age": "22 to 24",
    "male": 6722248,
    "female": 6422017
  }, {
    "age": "25 to 29",
    "male": 10989596,
    "female": 10708414
  }, {
    "age": "30 to 34",
    "male": 10625791,
    "female": 10557848
  }, {
    "age": "35 to 39",
    "male": 9899569,
    "female": 9956213
  }, {
    "age": "40 to 44",
    "male": 10330986,
    "female": 10465142
  }, {
    "age": "45 to 49",
    "male": 10571984,
    "female": 10798384
  }, {
    "age": "50 to 54",
    "male": 11051409,
    "female": 11474081
  }, {
    "age": "55 to 59",
    "male": 10173646,
    "female": 10828301
  }, {
    "age": "60 to 64",
    "male": 8824852,
    "female": 9590829
  }, {
    "age": "65 to 69",
    "male": 6876271,
    "female": 7671175
  }, {
    "age": "70 to 74",
    "male": 4867513,
    "female": 5720208
  }, {
    "age": "75 to 79",
    "male": 3416432,
    "female": 4313697
  }, {
    "age": "80 to 84",
    "male": 2378691,
    "female": 3432738
  }, {
    "age": "85 and Older",
    "male": 2000771,
    "female": 3937981
  }];
  
  
  
  
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
  var root = am5.Root.new("chartdiv");
  
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