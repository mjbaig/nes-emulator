import NESWindow from './nes-window';
import NES from './emulator/NES';
import RAM from './emulator/RAM';
import APU from './emulator/APU';
import PPU from './emulator/PPU';
import CPU from './emulator/CPU';
import Uragirimono from 'uragirimono';

const uragirimono = new Uragirimono();

new NES().run();
new RAM(uragirimono).run();
new APU(uragirimono).run();
new PPU(uragirimono).run();
new CPU(uragirimono).run();

export const NESEmulator = {
    NESWindow
}