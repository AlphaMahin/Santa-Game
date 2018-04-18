window.onload = function () {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");

    var W = window.innerwidth;
    var H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    var mf = 100;
    var flakes = [];

    for (var i = 0; i < mf; i++) {
        flakes.push({
            x: Math.random() * W,
            y: Math.random() * H,
            r: Math.random() * 5 + 2,
            d: Math.random() + 1
        })
    }

    function drawFlakes() {
        ctx.clearRect(0, 0, W, H);
        ctx.fillStyle = "white";
        ctx.beginPath();
        for (var i = 0; i < mf; i++) {
            var f = flakes[i];
            ctx.moveTo(f.x, f.y);
            ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2, true);
        }
        ctx.fill();
        moveFlakes();
    }
}


//animate the Flakes

function moveFlakes() {
    angle += 0.01;
    for (var i = 0; i < mf; i++) {
        // Store current Flake
        var f = flakes[i];

        //Update X and Y coordinates of each snowflake
        f.y += Math.pow(f.d, 2) + 1;
        f.x += Math.sin(angle) * 2;

        // if the snowflake reaches the bottom, send a new one to the top
        if (f.y > H) {
            flakes[i] = {
                x: Math.random() * W,
                y: 0,
                r: f,
                d: f.d
            };
        }
    }


}
setInterva(drawFlakes, 25);
}
