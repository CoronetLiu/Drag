import React from 'react';
import ReactDOM from 'react-dom';
import {Link,broswerHistory} from "react-router";
import $ from "jquery";

//全局画笔
let ctx = {}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentObj:{},
            x:0,
            y:0
        }
    }

    render() {
        console.log("render")
        return (
            <div id="warp">
                <div id="top-cl">
                    <canvas id="myCanvas" width="820" height="320"></canvas>
                    <div id="container">
                        <img src='../resource/images/img1.png' alt="" id="disk"/>
                        <img src='../resource/images/img2.png' alt="" id="power"/>
                    </div>
                </div>
                <div id="data-box">
                    <label>X:<input type="text" className="data x" value={this.state.x} onChange={this.dataChangeX.bind(this)}/></label>
                    <label>Y:<input type="text" className="data y" value={this.state.y} onChange={this.dataChangeY.bind(this)}/></label>
                    <button type="" id="confirm" onClick={this.confirm.bind(this)}>确定</button>
                    <Link to="/screenshoot" id="turn">切换</Link>
                </div>
            </div>
        );
    }
    dataChangeX(e){
        var _left = Number(e.target.value)
        $("#moveDiv").css({
            left:_left
        })
        this.setState({
            x:_left
        })
    }
    dataChangeY(e){
        var _top = Number(e.target.value)
        $("#moveDiv").css({
            top:_top
        })
        this.setState({
            y:_top
        })
    }
    //点击确认按钮事件
    confirm(){
        if($("#moveDiv")[0]){
            var img=new Image();
            img.src = this.state.currentObj.src;
            ctx.drawImage(img,this.state.x,this.state.y);
        }

        $("#moveDiv").remove()
    }
    componentDidMount(){
        var _this = this;
        ctx = document.getElementById("myCanvas").getContext("2d");
        ctx.strokeRect(10,10,800,300);
        var oDisk = document.getElementById("disk")
        var oPower = document.getElementById("power")
        //拖动事件开始
        oDisk.onmousedown = oPower.onmousedown = function(event){
            var e = event || window.event;
            //保存当前要画的图片对象
            _this.setState({
                currentObj : this
            })

            var offsetY = e.offsetY;
            var offsetX = e.offsetX;

            var x = e.clientX - e.offsetX;
            var y = e.clientY - e.offsetY;

            if(!$("#moveDiv").get(0)){
                var oD = document.createElement("div")
                oD.className = this.id
                oD.id = "moveDiv"

                $(oD).css({
                    background : 'url(' + this.src + ')',
                    height:this.height,
                    width:this.width,
                    position:"absolute",
                    left:x,
                    top:y
                })
                document.body.appendChild(oD)
            }else{
                $("#moveDiv").css({
                    background : 'url(' + this.src + ')',
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
                    x:_left,
                    y:_top
                })
                $("#moveDiv").css({
                    top:_top,
                    left:_left
                })
                //清除拖动效果
                document.onmouseup = function(){
                    document.onmousemove = null;
                }
            }
        }
    }
}

export default App;
