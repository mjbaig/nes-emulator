import NES from "./emulator/NES";

class NESWindow extends HTMLElement {

    value: string;

    nes: NES;

    constructor() {
        super();
        this.value = "";
        this.nes = null;
    }

    static get observedAttributes() {
        return ['test'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log("change detected");
        if (name === 'test') {
            this.innerHTML = `<span id="nes-window">${newValue}</span>`;
        }
    }


    connectedCallback() {
        console.log("connected")
        this.nes = new NES(this);
        this.nes.run();
        this.innerHTML = `<canvas id="nes-window" width="256" height="240" style="border:1px solid #000000;"></canvas>`
    }

}

customElements.define('nes-window', NESWindow);

export default NESWindow;