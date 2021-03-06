// button onclick

function search(){
    // get text from the input box, you should pass this to your api call for data
    query = $("#query").val();

    // this is a mock of your API call, you should change this to your own api call
    mydata = fakedata(query);
    
    // now update table with data
    tbody = $("#tabledata > tbody");
    tbody.empty();
    mydata["table"].forEach(function(element){
        var tr = $('<tr>');
        var idx = 0;
        element.forEach(function(entry){
            if (idx == 0)
                tr.append('<td class="left-divisor">' + entry + '</td>');
            else{
                if (idx % 2)
                    tr.append('<td class="right-divisor">' + entry + '</td>');
                else
                    tr.append('<td>' + entry + '</td>');
            }
            idx++;
        });
        tbody.append(tr);
    });
    $("#table-wrapper").show();
    // then update the chart with data

    $('#high-chart').highcharts('StockChart', {
            chart: {
                zoomType: 'xy'
            },
            
            title: {
                text: 'My Fancy Chart'
            },
            subtitle: {
                text: 'This is a subtitle'
            },

            rangeSelector : {
                selected : 1
            },
            
            yAxis: [{ // Primary yAxis
                labels: {
                    format: '{value}%',
                    style: {
                        color: Highcharts.getOptions().colors[1]
                    }
                },
                title: {
                    text: 'Unit one',
                    style: {
                        color: Highcharts.getOptions().colors[1]
                    }
                },
                opposite: false
            }, { // Secondary yAxis
                labels: {
                    format: '{value} mm',
                    style: {
                        color: Highcharts.getOptions().colors[0]
                    }
                },
                title: {
                    text: 'Unit two',
                    style: {
                        color: Highcharts.getOptions().colors[0]
                    }
                }
                
            }],
            plotOptions:{
                // xAxis info, you may need to change this
                spline:{
                    pointStart: Date.UTC(2016, 6, 23, 0, 0, 0),
                    pointInterval: 864000000 // ten days
                },
                column:{
                    pointStart: Date.UTC(2016, 6, 23, 0, 0, 0),
                    pointInterval: 864000000, // ten days
                }
            },
            series : [{
                name : 'Unit two',
                data: mydata["unit2_1"],
                yAxis: 1,
                type: 'column',
                tooltip: {
                    valueDecimals: 2,
                    valueSuffix: ' mm'
                }
            },{
                name : 'Unit two',
                data: mydata["unit2_2"],
                yAxis: 1,
                type: 'column',
                tooltip: {
                    valueDecimals: 2,
                    valueSuffix: ' mm'
                }
            },  // double stack
            {
                name : 'Unit one',
                data: mydata["unit1"],
                type: 'spline',
                tooltip: {
                    valueDecimals: 2,
                    valueSuffix: '%'
                }
            }]
        });   
}


function makestring(len)
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for( var i=0; i < len; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}


function fakedata(query){
    var num = parseInt(query);
    res = {
        "table":[],
        "unit1":[],
        "unit2_1":[],
        "unit2_2":[]
    };
    for (var i = 0; i < num; i++){
        // fake a row of table
        row = [];
        row.push(i.toString());
        for (var j = 0; j < 7; j++)
            row.push(makestring(Math.floor(Math.random() * 10) + 1));
        res["table"].push(row);
        // fake unit1 values
        res["unit1"].push(Math.random() * 50);
        // fake unit2 values
        res["unit2_1"].push(Math.random() * 400);
        // fake unit2 values
        res["unit2_2"].push(Math.random() * 400);
    }
    return res;
}



// this function is executed when document is ready, only for a quick view
$(function () {
    $("#table-wrapper").hide();
});