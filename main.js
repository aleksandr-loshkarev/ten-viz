"use strict";

// chart initialization function
function chart(isReverse, isDirect) {

    // chart data processing function
    function getDataChart(jsonObj) {
        const DATA_JSON = JSON.parse(jsonObj);
    
        return DATA_JSON.map(item => {
            const DATE_NEW = new Date(item.date);
            const FORMATED_DATE = Date.UTC(DATE_NEW.getFullYear(), DATE_NEW.getMonth(), DATE_NEW.getDate());

            return [FORMATED_DATE, Number(item.value)];
        });
    }

    // selection function
    function getDataSections(jsonObj, isReverse, isDirect) {
        const DATA_JSON = JSON.parse(jsonObj);

        return DATA_JSON.filter(item => {
            if(item.type_of_rho == 'reverse') return isReverse;
            if(item.type_of_rho == 'direct') return isDirect;
        }).map(item => {
            const FROM_DATE_NEW = new Date(item.min_period_id);
            const FROM_DATE = Date.UTC(FROM_DATE_NEW.getFullYear(), FROM_DATE_NEW.getMonth(), FROM_DATE_NEW.getDate());

            const TO_DATE_NEW = new Date(item.max_period_id);
            const TO_DATE = Date.UTC(TO_DATE_NEW.getFullYear(), TO_DATE_NEW.getMonth(), TO_DATE_NEW.getDate());

            if(item.type_of_rho == 'reverse') {
                return {
                    color: '#B4E5B4',
                    from: FROM_DATE,
                    to: TO_DATE
                }
            }
            
            if(item.type_of_rho == 'direct') {
                return {
                    color: '#FEB4B4',
                    from: FROM_DATE,
                    to: TO_DATE
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
            plotBands: getDataSections(dataArrows, isReverse, isDirect),
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
            data: getDataChart(firstData),
            yAxis: 1,
            color: '#848383'
        }, {
            name: 'Japan Equities',
            data: getDataChart(secondData),
            color: '#0000FF'
        }]
    
    });
}

// chart initialization function
function chartInit() {
    const IS_REVERSE = document.getElementById('reverse').checked;
    const IS_DIRECT = document.getElementById('direct').checked;
    chart(IS_REVERSE, IS_DIRECT);
}

// check when loading a page for selected checkboxes
window.onload = chartInit();

// period display functions
function isLeadsReverse() {
    chartInit();
}

function isLeadsDirect() {
    chartInit();
}