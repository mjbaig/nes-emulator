class NESWindow extends HTMLElement {

    width = 256;

    height = 240;

    offset = 0;

    constructor() {
        super();

        this.value = "";

        /**
         * @type {HTMLCanvasElement}
         */
        this.canvas = document.createElement("canvas");
        this.canvas.id = "nes-window";
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.canvas.style = "border:1px solid #000000;";

        /**
         * @type {CanvasRenderingContext2D}
         */
        this.context = this.canvas.getContext("2d");

        /**
         * @type {ImageData}
         */
        this.imageData = this.context.createImageData(this.width, this.height);


        window.addEventListener("cpu-tick", (e) => {
            this.drawFrame(this.offset);
            this.offset += 1;
        });
    }

    static get observedAttributes() {
        return ['test'];
    }

    drawFrame(offset) {
        for(var x = 0; x < this.width; x++) {
            for(var y = 0; y < this.height; y++) {
                var pixelindex = (y * this.width + x) * 4;
 
                // Generate a xor pattern with some random noise
                var red = ((x+offset) % 256) ^ ((y+offset) % 256);
                var green = ((2*x+offset) % 256) ^ ((2*y+offset) % 256);
                var blue = 50 + Math.floor(Math.random()*100);
 
                // Rotate the colors
                blue = (blue + offset) % 256;
 
                // Set the pixel data
                this.imageData.data[pixelindex] = red;     // Red
                this.imageData.data[pixelindex+1] = green; // Green
                this.imageData.data[pixelindex+2] = blue;  // Blue
                this.imageData.data[pixelindex+3] = 255;   // Alpha
            }
        }

        this.context.putImageData(this.imageData, 0, 0);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log("change detected");
        if (name === 'test') {
            // this.canvas.width +=5;
            this.drawFrame(this.offset);
            this.offset += 2;
        }
    }


    connectedCallback() {
        console.log("connected");
        this.appendChild(this.canvas);
    }

}

customElements.define('nes-window', NESWindow);

class NES {

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

class RAM {

    construtor () {

    }

    run() {

    }

}

class APU {
    constructor() {

    }

    run() {}
}

class PPU {
    constructor() {

    }

    run() {
        
    }
}

class CPU {

    constructor() {

    }

    run() {}

}

new NES().run();
new RAM().run();
new APU().run();
new PPU().run();
new CPU().run();

const NESEmulator = {
    NESWindow
};

export { NESEmulator };
