'use strict'

import NESWindow from "../nes-window";

export default class NES {

    /**
     * @param {NESWindow} nesWindow
     */
    constructor(nesWindow) {
        this.nesWindow = nesWindow;
        this.tickEvent = new CustomEvent("cpu-tick", {detail: {
            hi: 1
        }});

    }

    run() {
        setInterval(() => {
            this.tickEvent.detail.hi = this.tickEvent.detail.hi + 1;
            window.dispatchEvent(this.tickEvent);

        }, 10);
    }
}