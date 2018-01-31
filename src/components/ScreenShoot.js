import React from 'react';
import ReactDOM from 'react-dom';
import {Link,broswerHistory} from "react-router";
// import $ from "jquery";

//全局画笔
let ctx = {};
let jcrop_api = {};
// let boundx = 0;
// let boundy = 0;
let base64 = "";

class ScreenShoot extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            base64:"",
            width:0,
            height:0
        }
    }

    render() {
        console.log("render")
        return (
            <div id="warp-s">
                <Link to="/drag" id="turn-sd">切换</Link>
                <div id="top-cl-s">
                    <div id="container-s">
                        <img src='../resource/images/yourname.png' alt="" id="target-s" width="600px" height="300px"/>

                    </div>
                    <div id="box-s"></div>
                </div>
                <canvas id="myCanvas-s"></canvas>
                <div id="data-box-s">
                    <label>宽：<span>{this.state.width}</span></label>
                    <label>高：<span>{this.state.height}</span></label>
                    <input id="btn-s" type="button" value="确认截图"/>
                    <a href={this.state.base64} id="save-disk-s">保存为DISK</a>
                </div>
            </div>
        );
    }

    componentDidMount(){
        let _this = this;
        $('#target-s').Jcrop({
          onSelect: updatePreview,
          onChange: updatePreview,
          onRelease:release
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
            base64 = $("#myCanvas-s")[0].toDataURL("image/png");

            _this.setState({
                width:canvasW,
                height:canvasH
            })

        }
        function release(c){
            $("#myCanvas-s").css({
                display:"none"
            })
        }

        //确认截图
        $("#btn-s").on("click",function(){
            // console.log(base64)
            if(base64 === "" || base64 === "data:," || base64 === "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACWCAYAAABkW7XSAAAAxUlEQVR4nO3BMQEAAADCoPVPbQhfoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOA1v9QAATX68/0AAAAASUVORK5CYII="){
                alert("请选择截图区域！")
                return ;
            }

            _this.setState({
                base64:base64
            })

            var Img = '<img src="'+base64+'"/>';
            $("#box-s").append(Img);

            base64 = ""

            $("#myCanvas-s").css({
                display:"none"
            })
        })

        //保存
        $("#save-disk-s").on("click",function(e){
            // alert("保存")
            var base64 = e.target.href;
            console.log(convertBase64UrlToBlob(base64, "png"))
            $.ajax({
                url:"../../resource/datas/test.json",
                type:"GET",
                dataType: "json",
                data:[convertBase64UrlToBlob(base64, "png"),"fileName"]
            }).then(function(res){
                console.log(res)
            },function(){
                alert("失败")
            })

            return false;
        })
        // ------- 将以base64的图片url数据转换为Blob ------
        function convertBase64UrlToBlob(urlData, filetype){
            //去掉url的头，并转换为byte
            var bytes = window.atob(urlData.split(',')[1]);
            //处理异常,将ascii码小于0的转换为大于0
            var ab = new ArrayBuffer(bytes.length);
            var ia = new Uint8Array(ab);
            var i;
            for (i = 0; i < bytes.length; i++) {
                ia[i] = bytes.charCodeAt(i);
            }
            return new Blob([ab], {type : filetype});
        }
    }
}

export default ScreenShoot;
