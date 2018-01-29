import React from 'react';
import ReactDOM from 'react-dom';
import {Link,broswerHistory} from "react-router";
// import $ from "jquery";

//全局画笔
let ctx = {};
let jcrop_api = {};
let boundx = 0;
let boundy = 0;
let base64 = [];

class ScreenShoot extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        console.log("render")
        return (
            <div id="warp">
                <div id="container-s">
                  <img  src="./images/yourname.png" alt="" id="target-s" width="600px" height="300px"/>
                  <input id="btn-s" type="button" value="确认截图"/>
                </div>
                <div id="box-s"></div>
                <canvas id="myCanvas-s"></canvas>
                <Link to="/drag" id="turn">切换</Link>
            </div>
        );
    }

    componentDidMount(){
        $('#target-s').Jcrop({
          onSelect: updatePreview,
          onChange: updatePreview
        },function(){
          // Use the API to get the real image size
          // var bounds = this.getBounds();
          // boundx = bounds[0];
          // boundy = bounds[1];
          jcrop_api = this;
        });
        function updatePreview(c){
          $("#myCanvas-s").css({
            display:"block"
          })
          // console.log($(".jcrop-holder").children('div').width())
          // console.log($(".jcrop-holder").children('div').height())
          var canvasH = $(".jcrop-holder").children('div').height()
          var canvasW = $(".jcrop-holder").children('div').width()
          $("#myCanvas-s")[0].width = canvasW;
          $("#myCanvas-s")[0].height = canvasH;

          // console.log($(".jcrop-holder").children('div')[0].offsetTop)
          // console.log($(".jcrop-holder").children('div')[0].offsetLeft)
          var canvasStartX = - $(".jcrop-holder").children('div')[0].offsetLeft;
          var canvasStartY = - $(".jcrop-holder").children('div')[0].offsetTop;

          var canvasSrc = $(".jcrop-holder").children('img')[0].src;

          var ctx = $("#myCanvas-s")[0].getContext("2d");
          var img = new Image();
          img.src = canvasSrc;
          ctx.drawImage(img,canvasStartX,canvasStartY);
          base64[0] = $("#myCanvas-s")[0].toDataURL("image/png");
        }

        $("#btn-s").on("click",function(){
          console.log(base64[0])
          if(base64[0] === "data:," || base64[0] === "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACWCAYAAABkW7XSAAAAxUlEQVR4nO3BMQEAAADCoPVPbQhfoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOA1v9QAATX68/0AAAAASUVORK5CYII="){
            alert("请选择截图区域！")
            return ;
          }
          var Img = '<img src="'+base64[0]+'"/>';
          $("#box-s").append(Img);

          base64[0] = "data:,"

          $("#myCanvas-s").css({
            display:"none"
          })
        })
    }
}

export default ScreenShoot;
