"use strict";

// variables for displaying periods
let isReverse = true;
let isDirect = true;

// chart initialization function
function chart(isReverse, isDirect) {

    // chart data processing function
    function dataArray(jsonObj) {
        let arrayPoint;
        let dataJson = JSON.parse(jsonObj);
    
        return arrayPoint = dataJson.map(item => {
            let dateNew = new Date(item.date);
            let formatedDate = Date.UTC(dateNew.getFullYear(), dateNew.getMonth(), dateNew.getDate());

            return [formatedDate, Number(item.value)];
        });
    }

    // selection function
    function arrowsDate(jsonObj, isReverse, isDirect) {
        let arrayArrow;
        let dataJson = JSON.parse(jsonObj);

        return arrayArrow = dataJson.filter(item => {
            if(item.type_of_rho == 'reverse') return isReverse;
            if(item.type_of_rho == 'direct') return isDirect;
        }).map(item => {
            let fromDateNew = new Date(item.min_period_id);
            let fromDate = Date.UTC(fromDateNew.getFullYear(), fromDateNew.getMonth(), fromDateNew.getDate());

            let toDateNew = new Date(item.max_period_id);
            let toDate = Date.UTC(toDateNew.getFullYear(), toDateNew.getMonth(), toDateNew.getDate());

            if(item.type_of_rho == 'reverse') {
                return {
                    color: '#B4E5B4',
                    from: fromDate,
                    to: toDate
                }
            }
            
            if(item.type_of_rho == 'direct') {
                return {
                    color: '#FEB4B4',
                    from: fromDate,
                    to: toDate
                }
            }
        });
    }

    // initialization and chart options
    Highcharts.chart('container', {

        chart: {
            type: 'line',
            borderColor: 'transparent',
            plotBorderColor: '#C3C3C3',
            height: 375,
            spacing: [5, 0, 0, 0],
            zoomType: 'x',
            style: {
                fontFamily: 'Arial, Helvetica, sans-serif'
            }
        },

        title: {
            text: ''
        },
    
        subtitle: {
            text: ''
        },

        credits: {
            enabled: false
        },

        date: {
            dateFormat: 'mm/dd/YY'
        },
    
        yAxis: [{
            title: {
                text: 'Synaptics',
                style: {
                    color: '#0000FF',
                    fontWeight: '600'
                }
            },
            labels: {
                padding: 0,
                distance: 0,
                maxStaggerLines: 9,
                style: {
                    color: '#AEAEAE',
                    fontSize: 9
                },
                x: -11,
                y: 4
            },
            gridLineColor: '#C3C3C3',
            lineColor: '#0000FF',
            lineWidth: 3,
            tickColor: '#0000FF',
            tickWidth: 1,
            tickLength: 8,
            tickPixelInterval: 42,
            maxPadding: 0,
            minPadding: 0,
            startOnTick: false
        }, {
            title: {
                text: 'Japan Equities',
                style: {
                    color: '#777676',
                    fontWeight: 600
                }
            },
            labels: {
                padding: 0,
                distance: 0,
                maxStaggerLines: 9,
                style: {
                    color: '#C3C3C3',
                    fontSize: 9
                },
                x: 11,
                y: 4
            },
            gridLineColor: '#C3C3C3',
            gridLineWidth: 0,
            lineColor: '#848383',
            lineWidth: 3,
            tickColor: '#848383',
            tickWidth: 1,
            tickLength: 8,
            tickPixelInterval: 42,
            maxPadding: 0,
            minPadding: 0,
            startOnTick: false,
            opposite: true
        }],
    
        xAxis: [{
            type: 'datetime',
            labels: {
                padding: 0,
                distance: 0,
                style: {
                    color: '#000000',
                    fontSize: 12
                }
            },
            gridLineColor: '#C3C3C3',
            gridLineWidth: 1,
            lineColor: '#C3C3C3',
            lineWidth: 1,
            tickLength: 0,
            tickPixelInterval: 115,
            plotBands: arrowsDate(dataArrows, isReverse, isDirect),
            maxPadding: 0,
            minPadding: 0,
            zoomEnabled: true
        }],
    
        legend: {
            enabled: false
        },
        
        plotOptions: {
            series: {
                marker: {
                    lineWidth: 1,
                    enabledThreshold: 1,
                    states: {
                        hover: {
                            lineWidthPlus: 0,
                            radiusPlus: 0
                        }
                    }
                },
                lineWidth: 2,
                pointPlacement: 'on',
                states: {
                    hover: {
                        lineWidthPlus: 0
                    }
                }
            }
        },
    
        series: [{
            name: 'Synaptics',
            data: dataArray(firstData),
            yAxis: 1,
            color: '#848383'
        }, {
            name: 'Japan Equities',
            data: dataArray(secondData),
            color: '#0000FF'
        }]
    
    });
}

chart(isReverse, isDirect);

// period display functions
function isLeadsReverse() {
    isReverse = document.getElementById('reverse').checked;
    chart(isReverse, isDirect);
}

function isLeadsDirect() {
    isDirect = document.getElementById('direct').checked;
    chart(isReverse, isDirect);
}