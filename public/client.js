(function () {
    var socket = io('http://localhost:9000');
    socket.on('connect', function () {
        console.log('connected')
    });

    socket.on('measurement', function (data) {
        var data = {
            y: data
        }
        draw(data, [0, 1])
        console.log('data')
    });

    socket.on('disconnect', function () {
        console.log('disconnect')
    });

    var cnt = 0;
    var range = 500;

    function draw(data, traces) {
        Plotly.extendTraces('graph', data, traces)

        cnt = cnt + 1;
        if (cnt > range) {
            var update = {
                title: 'measurement interval ' + cnt, // updates the title
                'xaxis.range': [cnt - range, cnt], // updates the xaxis range
                //'yaxis.range[1]': 15     // updates the end of the yaxis range
            };
            Plotly.relayout('graph', update)
        };
    }



    Plotly.plot('graph', [{
        type: 'scatter',
        y: [1, 2, 3].map(Math.random),
        mode: 'lines',
        marker: {
            color: 'pink',
            size: 8
        },
        line: {
            width: 4
        }
    }, {
        type: 'scatter',
        y: [1, 2].map(Math.random),
        mode: 'lines',
        marker: {
            color: 'gray',
            size: 8
        },
        line: {
            width: 2
        }
    }]);

    var update = {
        title: 'measurement interval ' + cnt, // updates the title
        'xaxis.range': [0, range], // updates the xaxis range
        //'yaxis.range[1]': 15     // updates the end of the yaxis range
    };
    Plotly.relayout('graph', update)

    var start = function () {

        var interval = setInterval(function () {
            var data = {
                y: [
                    [Math.random()],
                    [Math.random()]
                ]
            }
            draw(data, [0, 1])
        }, 20);
    }
    //start();


})()