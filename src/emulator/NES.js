'use strict'

import NESWindow from "../nes-window";

export default class NES {

    /**
     * @param {NESWindow} nesWindow
     */
    constructor(nesWindow) {
        this.nesWindow = nesWindow;
        this.tickEvent = new CustomEvent("cpu-tick", {detail: {
            image_details: [{}]
        }});

    }

    run() {
        setInterval(() => {
            this.tickEvent.detail.image_details = [{}];
            window.dispatchEvent(this.tickEvent);

        }, 5);
    }
}