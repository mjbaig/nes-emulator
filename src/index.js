import NESWindow from './nes-window';
import NES from './emulator/NES';
import RAM from './emulator/RAM';
import APU from './emulator/APU';
import PPU from './emulator/PPU';
import CPU from './emulator/CPU';

new NES().run();
new RAM().run();
new APU().run();
new PPU().run();
new CPU().run();

export const NESEmulator = {
    NESWindow
}