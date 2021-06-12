'use strict'

import NESWindow from "../nes-window";

export default class NES {

    nesWindow: NESWindow

    /**
     * @param {NESWindow} nesWindow
     */
    constructor(nesWindow: NESWindow) {
        this.nesWindow = nesWindow;
    }

    run() {
        setInterval(() => {
            console.log("setting attribute")
            this.nesWindow.setAttribute("test", new Date().getUTCMilliseconds().toString());
        }, 1000);
    }
}