/*
* @Author:  CoronetLiu
* @Date:    2018-02-05 10:47:45
* @Last Modified by:    CoronetLiu
* @Last Modified time:  2018-02-06 10:47:35
* @Email:   liu86931@163.com
*/

// 'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import {Link,broswerHistory} from "react-router";
// import $ from "jquery";

//全局画笔
let ctx = {}
//全局jcrop对象
let jcrop_api = {};

let base64 = "";

let typeDisk = [];
let typePower = [];


class Combine extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentObj:{},
            x:0,
            y:0,
            height:0,
            width:0,
            base64:""
        }
    }

    render() {
        console.log("render")
        return (
            <div id="warp">
                <Link to="/drag" id="turn-1">拼接</Link>
                <Link to="/screenshoot" id="turn-2">截图</Link>
                <div id="data-box-c">
                    <label>X:<input type="text" className="data-c x" value={this.state.x} onChange={this.dataChangeX.bind(this)}/></label>
                    <label>Y:<input type="text" className="data-c y" value={this.state.y} onChange={this.dataChangeY.bind(this)}/></label>
                    <button type="" id="confirm-c" onClick={this.confirm.bind(this)}>确定画图</button>
                    <div id="data-inner-box-c">
                        <label>宽：<span>{this.state.width}</span></label>
                        <label>高：<span>{this.state.height}</span></label>
                        <input id="btn-c" type="button" value="确认截图"/>
                        <a href={this.state.base64} id="save-disk-c">保存结果</a>
                    </div>
                </div>
                <div id="top-c">
                    <canvas id="myCanvas-c" width="600" height="300"></canvas>
                    <div id="box-c">
                        <img src='../resource/images/yourname.png' alt="" id="target-c" width="600px" height="300px"/>
                    </div>
                    <div id="container-c"></div>
                    <canvas id="myCanvas-cc"></canvas>
                </div>
            </div>
        );
    }
    //调整位置
    dataChangeX(e){
        var _left = Number(e.target.value)
        $("#moveDiv").css({
            left:_left+20
        })
        this.setState({
            x:_left
        })
    }
    dataChangeY(e){
        var _top = Number(e.target.value)
        $("#moveDiv").css({
            top:_top+48
        })
        this.setState({
            y:_top
        })
    }
    //点击确认画图按钮事件
    confirm(){
        if($("#moveDiv")[0]){
            var img=new Image();
            img.src = this.state.currentObj.src;
            ctx.drawImage(img,this.state.x,this.state.y);

            //储存位置
            let _typeStr = this.state.currentObj.className;
            let typeStr = _typeStr.split(" ")[1];
            let obj = {};
            switch(typeStr){
                case "disk":
                    obj = {
                        "x":this.state.x,
                        "y":this.state.y,
                        "height":this.state.currentObj.height,
                        "width":this.state.currentObj.width
                    }
                    typeDisk.push(obj);
                    break;
                case "power":
                    obj = {
                        "x":this.state.x,
                        "y":this.state.y,
                        "height":this.state.currentObj.height,
                        "width":this.state.currentObj.width
                    }
                    typePower.push(obj);
                    break;
                default: alert("类型无法匹配！");
            }

        }

        $("#moveDiv").remove()
    }
    componentDidMount(){
        var _this = this;
        ctx = $("#myCanvas-c")[0].getContext("2d");
        ctx.strokeRect(0,0,600,300);
        //拖动事件开始
        $("#warp").on("mousedown",".createImg",function(event){
            var e = event || window.event;
            e.preventDefault();
            //保存当前要画的图片对象
            _this.setState({
                currentObj : this
            })

            var offsetY = e.offsetY;
            var offsetX = e.offsetX;

            var x = e.clientX - e.offsetX;
            var y = e.clientY - e.offsetY;

            if(!$("#moveDiv").get(0)){
                // var oD = document.createElement("div")
                var oD = new Image()
                oD.src = this.src
                oD.className = this.id
                oD.id = "moveDiv"

                $(oD).css({
                    // background : 'url(' + this.src + ')',
                    height:this.height,
                    width:this.width,
                    position:"absolute",
                    left:x,
                    top:y
                })
                $("#warp")[0].appendChild(oD)
            }else{
                $("#moveDiv").css({
                    // background : 'url(' + this.src + ')',
                    height:this.height,
                    width:this.width,
                    position:"absolute",
                    left:x,
                    top:y
                })
            }
            //拖动
            document.onmousemove = function(evt){
                var e = evt || window.event;

                var cHeight = e.clientY;
                var cWidth = e.clientX;

                var _left = cWidth - offsetX;
                var _top = cHeight - offsetY;

                _this.setState({
                    x:_left-20,
                    y:_top-48
                })
                $("#moveDiv").css({
                    top:_top,
                    left:_left
                })
            }
            //清除拖动效果
            document.onmouseup = function(){
                document.onmousemove = null;
            }
        })
        //如果moveDiv存在   //事件委托
        $("#warp").on("mousedown","#moveDiv",function(event){
            // alert(1)
            var e = event || window.event;
            e.preventDefault();
            var offsetY = e.offsetY;
            var offsetX = e.offsetX;

            //拖动
            document.onmousemove = function(evt){
                var e = evt || window.event;

                var cHeight = e.clientY;
                var cWidth = e.clientX;

                var _left = cWidth - offsetX;
                var _top = cHeight - offsetY;

                _this.setState({
                    x:_left-20,
                    y:_top-48
                })

                $("#moveDiv").css({
                    top:_top,
                    left:_left
                })
            }
            //清除拖动效果
            document.onmouseup = function(){
                document.onmousemove = null;
            }
        })


        // ********   截图功能   ******** //

        var _this = this;
        $('#target-c').Jcrop({
          onSelect: updatePreview,
          onChange: updatePreview,
          onRelease:release
        },function(){
          jcrop_api = this;
        });
        function updatePreview(c){
            $("#myCanvas-cc").css({
                display:"block"
            })
            var canvasH = $(".jcrop-holder").children('div').height()
            var canvasW = $(".jcrop-holder").children('div').width()
            $("#myCanvas-cc")[0].width = canvasW;
            $("#myCanvas-cc")[0].height = canvasH;

            var canvasStartX = - $(".jcrop-holder").children('div')[0].offsetLeft;
            var canvasStartY = - $(".jcrop-holder").children('div')[0].offsetTop;

            var canvasSrc = $(".jcrop-holder").children('img')[0].src;

            var ctx = $("#myCanvas-cc")[0].getContext("2d");
            var img = new Image();
            img.src = canvasSrc;
            ctx.drawImage(img,canvasStartX,canvasStartY);
            base64 = $("#myCanvas-cc")[0].toDataURL("image/png");

            _this.setState({
                width:canvasW,
                height:canvasH
            })

        }
        function release(c){
            $("#myCanvas-cc").css({
                display:"none"
            })
        }

        //确认截图
        $("#btn-c").on("click",function(type){
            // console.log(base64)
            if(base64 === "" || base64 === "data:," || base64 === "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACWCAYAAABkW7XSAAAAxUlEQVR4nO3BMQEAAADCoPVPbQhfoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOA1v9QAATX68/0AAAAASUVORK5CYII="){
                alert("请选择截图区域！")
                return ;
            }

            _this.setState({
                base64:base64
            })

            var Img = '<img src="'+base64+'" class="createImg disk"/>';
            $("#container-c").append(Img);

            base64 = ""
            $("#myCanvas-cc").css({
                display:"none"
            })
        })

        //保存
        $("#save-disk-c").on("click",function(e){
            alert("保存")
            // var base64 = e.target.href;

            if(typeDisk.length){
                for(var i = 0;i < typeDisk.length; i ++){
                    Ajax(i,typeDisk,"disk")
                }
            }
            if(typePower.length){
                for(var i = 0;i < typePower.length; i ++){
                    Ajax(i,typePower,"power")
                }
            }
            return false;
        })
        function Ajax(i,arr,tp){
            $.ajax({
                url:"../../resource/datas/test.json",
                type:"GET",
                dataType: "json",
                // data:[convertBase64UrlToBlob(base64, "png"),"picName"]
                data:{
                        "id":"id",
                        // "picUrl":base64,
                        "picName":tp + "_" + i + ".png",
                        "x":arr[i].x,
                        "y":arr[i].y,
                        "height":arr[i].height,
                        "width":arr[i].width,
                        "front":1
                    },
                success:function(res){
                    console.log(res)
                },
                error:function(){
                    alert("失败")
                }
            })
        }
        // ****** 截图结束 ******  //
    }//componentDidMount
}

export default Combine;
