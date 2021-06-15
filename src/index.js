import NESWindow from './nes-window';
import NES from './emulator/NES';

const nes = new NES();

nes.run();

export const NESEmulator = {
    NESWindow
}