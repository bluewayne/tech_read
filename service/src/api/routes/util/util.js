/**
 * Created by liujinhe on 16/12/6.
 */

var Canvas = require('canvas');

exports.getCapacha = function (capNum) {

    var Image = Canvas.Image
    var canvas = new Canvas(200, 200)
    var ctx = canvas.getContext('2d');

    ctx.font = '30px Impact';
    ctx.rotate(.1);
    ctx.fillText(''+capNum, 50, 100);

    var te = ctx.measureText('Awesome!');
    ctx.strokeStyle = 'rgba(0,0,0,0.5)';
    ctx.beginPath();
    ctx.lineTo(50, 102);
    ctx.lineTo(50 + te.width, 102);
    ctx.stroke();
    return canvas.toDataURL();
}

