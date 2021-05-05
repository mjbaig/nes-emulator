'use strict'

import NESWindow from "../nes-window";

export default class NES {

    /**
     * @param {NESWindow} nesWindow
     */
    constructor(nesWindow) {
        this.nesWindow = nesWindow;
    }

    run() {
        setInterval(() => {
            console.log("setting attribute")
            this.nesWindow.setAttribute("test", new Date().getUTCMilliseconds());
        }, 1000);
    }
}
