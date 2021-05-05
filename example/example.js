class NESWindow extends HTMLElement {

    constructor() {
        super();
    }


    connectedCallback() {
        this.innerHTML = `<canvas id="nes-window" width="256" height="240" style="border:1px solid #000000;"></canvas>`;
    }
    

}

customElements.define('nes-window', NESWindow);

const NESEmulator = {
    NESWindow
};

export { NESEmulator };
