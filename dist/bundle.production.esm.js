class t{constructor(t){this.nesWindow=t}run(){setInterval((()=>{console.log("setting attribute"),this.nesWindow.setAttribute("test",(new Date).getUTCMilliseconds())}),10)}}class e extends HTMLElement{width=256;height=240;offset=0;constructor(){super(),this.value="",this.nes=null,this.canvas=document.createElement("canvas"),this.canvas.id="nes-window",this.canvas.width=this.width,this.canvas.height=this.height,this.canvas.style="border:1px solid #000000;",this.context=this.canvas.getContext("2d"),this.imageData=this.context.createImageData(this.width,this.height)}static get observedAttributes(){return["test"]}drawFrame(t){for(var e=0;e<this.width;e++)for(var s=0;s<this.height;s++){var a=4*(s*this.width+e),i=(e+t)%256^(s+t)%256,h=(2*e+t)%256^(2*s+t)%256,n=50+Math.floor(100*Math.random());n=(n+t)%256,this.imageData.data[a]=i,this.imageData.data[a+1]=h,this.imageData.data[a+2]=n,this.imageData.data[a+3]=255}this.context.putImageData(this.imageData,0,0)}attributeChangedCallback(t,e,s){console.log("change detected"),"test"===t&&(this.drawFrame(this.offset),this.offset+=2)}connectedCallback(){console.log("connected"),this.nes=new t(this),this.nes.run(),this.appendChild(this.canvas)}}customElements.define("nes-window",e);const s={NESWindow:e};export{s as NESEmulator};
