import NES from "./emulator/NES";

class NESWindow extends HTMLElement {

    constructor() {
        super();
        this.value = "";
        this.nes = null;
        this.canvas = document.createElement("canvas");
        this.canvas.id = "nes-window";
        this.canvas.width = "256";
        this.canvas.height = "240";
        this.canvas.style = "border:1px solid #000000;";
    }

    static get observedAttributes() {
        return ['test'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log("change detected");
        if (name === 'test') {
            // this.innerHTML = `<span id="nes-window">${newValue}</span>`;
            this.canvas.width +=5;
        }
    }


    connectedCallback() {
        console.log("connected")
        this.nes = new NES(this);
        this.nes.run();
        this.appendChild(this.canvas);
    }

}

customElements.define('nes-window', NESWindow);

export default NESWindow;