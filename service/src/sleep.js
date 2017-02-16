/**
 * Created by liujinhe on 17/2/9.
 */

var args=process.argv.slice(2);
var delay=args[0];

var preamble=`[sleep#${process.pid}]`

if(typeof delay ==='undefined'){
    console.error(`${preamble} delay (in ms) not specified`);
}

if(delay !=parseInt(delay)){
    console.error(`${preamble} invalid delay:   ${delay}`)
}

setTimeout(function () {
    process.exit(0)
},delay)




