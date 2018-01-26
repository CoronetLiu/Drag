import React from 'react';
import ReactDOM from 'react-dom';
import $ from "jquery";

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
    confirm(){
        $("#moveDiv").remove()

        var img=new Image();
        img.src = this.state.currentObj.src;
        ctx.drawImage(img,this.state.x,this.state.y);
    }
    componentDidMount(){
        var _this = this;
        ctx = document.getElementById("myCanvas").getContext("2d");
        ctx.strokeRect(10,10,800,300);
        var oDisk = document.getElementById("disk")
        var oPower = document.getElementById("power")
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
            }

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

                document.onmouseup = function(){
                    document.onmousemove = null;
                }
            }
        }
    }
}

export default App;
