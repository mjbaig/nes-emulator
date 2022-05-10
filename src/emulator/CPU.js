'use strict'

import Uragirimono from "uragirimono";

import reduce from 'lodash-es/reduce';

export default class CPU {

    /**
     * 
     * @param {Uragirimono} uragirmono 
     */
     constructor(uragirmono) {
         /**
         * Lookup table from https://github.com/OneLoneCoder/olcNES/blob/master/Part%232%20-%20CPU/olc6502.h (Thanks OLC!)
         * 
         * 
         * 
         */
        this.lookup =
        [
            { name: "BRK", func: this.BRK, addressMode: "IMM", cycles: 7 },{ name: "ORA", func: this.ORA, addressMode: "IZX", cycles: 6 },{ name: "???", func: this.XXX, addressMode: "IMP", cycles: 2 },{ name: "???", func: this.XXX, addressMode: "IMP", cycles: 8 },{ name: "???", func: this.NOP, addressMode: "IMP", cycles: 3 },{ name: "ORA", func: this.ORA, addressMode: "ZP0", cycles: 3 },{ name: "ASL", func: this.ASL, addressMode: "ZP0", cycles: 5 },{ name: "???", func: this.XXX, addressMode: "IMP", cycles: 5 },{ name: "PHP", func: this.PHP, addressMode: "IMP", cycles: 3 },{ name: "ORA", func: this.ORA, addressMode: "IMM", cycles: 2 },{ name: "ASL", func: this.ASL, addressMode: "IMP", cycles: 2 },{ name: "???", func: this.XXX, addressMode: "IMP", cycles: 2 },{ name: "???", func: this.NOP, addressMode: "IMP", cycles: 4 },{ name: "ORA", func: this.ORA, addressMode: "ABS", cycles: 4 },{ name: "ASL", func: this.ASL, addressMode: "ABS", cycles: 6 },{ name: "???", func: this.XXX, addressMode: "IMP", cycles: 6 },
            { name: "BPL", func: this.BPL, addressMode: "REL", cycles: 2 },{ name: "ORA", func: this.ORA, addressMode: "IZY", cycles: 5 },{ name: "???", func: this.XXX, addressMode: "IMP", cycles: 2 },{ name: "???", func: this.XXX, addressMode: "IMP", cycles: 8 },{ name: "???", func: this.NOP, addressMode: "IMP", cycles: 4 },{ name: "ORA", func: this.ORA, addressMode: "ZPX", cycles: 4 },{ name: "ASL", func: this.ASL, addressMode: "ZPX", cycles: 6 },{ name: "???", func: this.XXX, addressMode: "IMP", cycles: 6 },{ name: "CLC", func: this.CLC, addressMode: "IMP", cycles: 2 },{ name: "ORA", func: this.ORA, addressMode: "ABY", cycles: 4 },{ name: "???", func: this.NOP, addressMode: "IMP", cycles: 2 },{ name: "???", func: this.XXX, addressMode: "IMP", cycles: 7 },{ name: "???", func: this.NOP, addressMode: "IMP", cycles: 4 },{ name: "ORA", func: this.ORA, addressMode: "ABX", cycles: 4 },{ name: "ASL", func: this.ASL, addressMode: "ABX", cycles: 7 },{ name: "???", func: this.XXX, addressMode: "IMP", cycles: 7 },
            { name: "JSR", func: this.JSR, addressMode: "ABS", cycles: 6 },{ name: "AND", func: this.AND, addressMode: "IZX", cycles: 6 },{ name: "???", func: this.XXX, addressMode: "IMP", cycles: 2 },{ name: "???", func: this.XXX, addressMode: "IMP", cycles: 8 },{ name: "BIT", func: this.BIT, addressMode: "ZP0", cycles: 3 },{ name: "AND", func: this.AND, addressMode: "ZP0", cycles: 3 },{ name: "ROL", func: this.ROL, addressMode: "ZP0", cycles: 5 },{ name: "???", func: this.XXX, addressMode: "IMP", cycles: 5 },{ name: "PLP", func: this.PLP, addressMode: "IMP", cycles: 4 },{ name: "AND", func: this.AND, addressMode: "IMM", cycles: 2 },{ name: "ROL", func: this.ROL, addressMode: "IMP", cycles: 2 },{ name: "???", func: this.XXX, addressMode: "IMP", cycles: 2 },{ name: "BIT", func: this.BIT, addressMode: "ABS", cycles: 4 },{ name: "AND", func: this.AND, addressMode: "ABS", cycles: 4 },{ name: "ROL", func: this.ROL, addressMode: "ABS", cycles: 6 },{ name: "???", func: this.XXX, addressMode: "IMP", cycles: 6 },
            { name: "BMI", func: this.BMI, addressMode: "REL", cycles: 2 },{ name: "AND", func: this.AND, addressMode: "IZY", cycles: 5 },{ name: "???", func: this.XXX, addressMode: "IMP", cycles: 2 },{ name: "???", func: this.XXX, addressMode: "IMP", cycles: 8 },{ name: "???", func: this.NOP, addressMode: "IMP", cycles: 4 },{ name: "AND", func: this.AND, addressMode: "ZPX", cycles: 4 },{ name: "ROL", func: this.ROL, addressMode: "ZPX", cycles: 6 },{ name: "???", func: this.XXX, addressMode: "IMP", cycles: 6 },{ name: "SEC", func: this.SEC, addressMode: "IMP", cycles: 2 },{ name: "AND", func: this.AND, addressMode: "ABY", cycles: 4 },{ name: "???", func: this.NOP, addressMode: "IMP", cycles: 2 },{ name: "???", func: this.XXX, addressMode: "IMP", cycles: 7 },{ name: "???", func: this.NOP, addressMode: "IMP", cycles: 4 },{ name: "AND", func: this.AND, addressMode: "ABX", cycles: 4 },{ name: "ROL", func: this.ROL, addressMode: "ABX", cycles: 7 },{ name: "???", func: this.XXX, addressMode: "IMP", cycles: 7 },
            { name: "RTI", func: this.RTI, addressMode: "IMP", cycles: 6 },{ name: "EOR", func: this.EOR, addressMode: "IZX", cycles: 6 },{ name: "???", func: this.XXX, addressMode: "IMP", cycles: 2 },{ name: "???", func: this.XXX, addressMode: "IMP", cycles: 8 },{ name: "???", func: this.NOP, addressMode: "IMP", cycles: 3 },{ name: "EOR", func: this.EOR, addressMode: "ZP0", cycles: 3 },{ name: "LSR", func: this.LSR, addressMode: "ZP0", cycles: 5 },{ name: "???", func: this.XXX, addressMode: "IMP", cycles: 5 },{ name: "PHA", func: this.PHA, addressMode: "IMP", cycles: 3 },{ name: "EOR", func: this.EOR, addressMode: "IMM", cycles: 2 },{ name: "LSR", func: this.LSR, addressMode: "IMP", cycles: 2 },{ name: "???", func: this.XXX, addressMode: "IMP", cycles: 2 },{ name: "JMP", func: this.JMP, addressMode: "ABS", cycles: 3 },{ name: "EOR", func: this.EOR, addressMode: "ABS", cycles: 4 },{ name: "LSR", func: this.LSR, addressMode: "ABS", cycles: 6 },{ name: "???", func: this.XXX, addressMode: "IMP", cycles: 6 },
            { name: "BVC", func: this.BVC, addressMode: "REL", cycles: 2 },{ name: "EOR", func: this.EOR, addressMode: "IZY", cycles: 5 },{ name: "???", func: this.XXX, addressMode: "IMP", cycles: 2 },{ name: "???", func: this.XXX, addressMode: "IMP", cycles: 8 },{ name: "???", func: this.NOP, addressMode: "IMP", cycles: 4 },{ name: "EOR", func: this.EOR, addressMode: "ZPX", cycles: 4 },{ name: "LSR", func: this.LSR, addressMode: "ZPX", cycles: 6 },{ name: "???", func: this.XXX, addressMode: "IMP", cycles: 6 },{ name: "CLI", func: this.CLI, addressMode: "IMP", cycles: 2 },{ name: "EOR", func: this.EOR, addressMode: "ABY", cycles: 4 },{ name: "???", func: this.NOP, addressMode: "IMP", cycles: 2 },{ name: "???", func: this.XXX, addressMode: "IMP", cycles: 7 },{ name: "???", func: this.NOP, addressMode: "IMP", cycles: 4 },{ name: "EOR", func: this.EOR, addressMode: "ABX", cycles: 4 },{ name: "LSR", func: this.LSR, addressMode: "ABX", cycles: 7 },{ name: "???", func: this.XXX, addressMode: "IMP", cycles: 7 },
            { name: "RTS", func: this.RTS, addressMode: "IMP", cycles: 6 },{ name: "ADC", func: this.ADC, addressMode: "IZX", cycles: 6 },{ name: "???", func: this.XXX, addressMode: "IMP", cycles: 2 },{ name: "???", func: this.XXX, addressMode: "IMP", cycles: 8 },{ name: "???", func: this.NOP, addressMode: "IMP", cycles: 3 },{ name: "ADC", func: this.ADC, addressMode: "ZP0", cycles: 3 },{ name: "ROR", func: this.ROR, addressMode: "ZP0", cycles: 5 },{ name: "???", func: this.XXX, addressMode: "IMP", cycles: 5 },{ name: "PLA", func: this.PLA, addressMode: "IMP", cycles: 4 },{ name: "ADC", func: this.ADC, addressMode: "IMM", cycles: 2 },{ name: "ROR", func: this.ROR, addressMode: "IMP", cycles: 2 },{ name: "???", func: this.XXX, addressMode: "IMP", cycles: 2 },{ name: "JMP", func: this.JMP, addressMode: "IND", cycles: 5 },{ name: "ADC", func: this.ADC, addressMode: "ABS", cycles: 4 },{ name: "ROR", func: this.ROR, addressMode: "ABS", cycles: 6 },{ name: "???", func: this.XXX, addressMode: "IMP", cycles: 6 },
            { name: "BVS", func: this.BVS, addressMode: "REL", cycles: 2 },{ name: "ADC", func: this.ADC, addressMode: "IZY", cycles: 5 },{ name: "???", func: this.XXX, addressMode: "IMP", cycles: 2 },{ name: "???", func: this.XXX, addressMode: "IMP", cycles: 8 },{ name: "???", func: this.NOP, addressMode: "IMP", cycles: 4 },{ name: "ADC", func: this.ADC, addressMode: "ZPX", cycles: 4 },{ name: "ROR", func: this.ROR, addressMode: "ZPX", cycles: 6 },{ name: "???", func: this.XXX, addressMode: "IMP", cycles: 6 },{ name: "SEI", func: this.SEI, addressMode: "IMP", cycles: 2 },{ name: "ADC", func: this.ADC, addressMode: "ABY", cycles: 4 },{ name: "???", func: this.NOP, addressMode: "IMP", cycles: 2 },{ name: "???", func: this.XXX, addressMode: "IMP", cycles: 7 },{ name: "???", func: this.NOP, addressMode: "IMP", cycles: 4 },{ name: "ADC", func: this.ADC, addressMode: "ABX", cycles: 4 },{ name: "ROR", func: this.ROR, addressMode: "ABX", cycles: 7 },{ name: "???", func: this.XXX, addressMode: "IMP", cycles: 7 },
            { name: "???", func: this.NOP, addressMode: "IMP", cycles: 2 },{ name: "STA", func: this.STA, addressMode: "IZX", cycles: 6 },{ name: "???", func: this.NOP, addressMode: "IMP", cycles: 2 },{ name: "???", func: this.XXX, addressMode: "IMP", cycles: 6 },{ name: "STY", func: this.STY, addressMode: "ZP0", cycles: 3 },{ name: "STA", func: this.STA, addressMode: "ZP0", cycles: 3 },{ name: "STX", func: this.STX, addressMode: "ZP0", cycles: 3 },{ name: "???", func: this.XXX, addressMode: "IMP", cycles: 3 },{ name: "DEY", func: this.DEY, addressMode: "IMP", cycles: 2 },{ name: "???", func: this.NOP, addressMode: "IMP", cycles: 2 },{ name: "TXA", func: this.TXA, addressMode: "IMP", cycles: 2 },{ name: "???", func: this.XXX, addressMode: "IMP", cycles: 2 },{ name: "STY", func: this.STY, addressMode: "ABS", cycles: 4 },{ name: "STA", func: this.STA, addressMode: "ABS", cycles: 4 },{ name: "STX", func: this.STX, addressMode: "ABS", cycles: 4 },{ name: "???", func: this.XXX, addressMode: "IMP", cycles: 4 },
            { name: "BCC", func: this.BCC, addressMode: "REL", cycles: 2 },{ name: "STA", func: this.STA, addressMode: "IZY", cycles: 6 },{ name: "???", func: this.XXX, addressMode: "IMP", cycles: 2 },{ name: "???", func: this.XXX, addressMode: "IMP", cycles: 6 },{ name: "STY", func: this.STY, addressMode: "ZPX", cycles: 4 },{ name: "STA", func: this.STA, addressMode: "ZPX", cycles: 4 },{ name: "STX", func: this.STX, addressMode: "ZPY", cycles: 4 },{ name: "???", func: this.XXX, addressMode: "IMP", cycles: 4 },{ name: "TYA", func: this.TYA, addressMode: "IMP", cycles: 2 },{ name: "STA", func: this.STA, addressMode: "ABY", cycles: 5 },{ name: "TXS", func: this.TXS, addressMode: "IMP", cycles: 2 },{ name: "???", func: this.XXX, addressMode: "IMP", cycles: 5 },{ name: "???", func: this.NOP, addressMode: "IMP", cycles: 5 },{ name: "STA", func: this.STA, addressMode: "ABX", cycles: 5 },{ name: "???", func: this.XXX, addressMode: "IMP", cycles: 5 },{ name: "???", func: this.XXX, addressMode: "IMP", cycles: 5 },
            { name: "LDY", func: this.LDY, addressMode: "IMM", cycles: 2 },{ name: "LDA", func: this.LDA, addressMode: "IZX", cycles: 6 },{ name: "LDX", func: this.LDX, addressMode: "IMM", cycles: 2 },{ name: "???", func: this.XXX, addressMode: "IMP", cycles: 6 },{ name: "LDY", func: this.LDY, addressMode: "ZP0", cycles: 3 },{ name: "LDA", func: this.LDA, addressMode: "ZP0", cycles: 3 },{ name: "LDX", func: this.LDX, addressMode: "ZP0", cycles: 3 },{ name: "???", func: this.XXX, addressMode: "IMP", cycles: 3 },{ name: "TAY", func: this.TAY, addressMode: "IMP", cycles: 2 },{ name: "LDA", func: this.LDA, addressMode: "IMM", cycles: 2 },{ name: "TAX", func: this.TAX, addressMode: "IMP", cycles: 2 },{ name: "???", func: this.XXX, addressMode: "IMP", cycles: 2 },{ name: "LDY", func: this.LDY, addressMode: "ABS", cycles: 4 },{ name: "LDA", func: this.LDA, addressMode: "ABS", cycles: 4 },{ name: "LDX", func: this.LDX, addressMode: "ABS", cycles: 4 },{ name: "???", func: this.XXX, addressMode: "IMP", cycles: 4 },
            { name: "BCS", func: this.BCS, addressMode: "REL", cycles: 2 },{ name: "LDA", func: this.LDA, addressMode: "IZY", cycles: 5 },{ name: "???", func: this.XXX, addressMode: "IMP", cycles: 2 },{ name: "???", func: this.XXX, addressMode: "IMP", cycles: 5 },{ name: "LDY", func: this.LDY, addressMode: "ZPX", cycles: 4 },{ name: "LDA", func: this.LDA, addressMode: "ZPX", cycles: 4 },{ name: "LDX", func: this.LDX, addressMode: "ZPY", cycles: 4 },{ name: "???", func: this.XXX, addressMode: "IMP", cycles: 4 },{ name: "CLV", func: this.CLV, addressMode: "IMP", cycles: 2 },{ name: "LDA", func: this.LDA, addressMode: "ABY", cycles: 4 },{ name: "TSX", func: this.TSX, addressMode: "IMP", cycles: 2 },{ name: "???", func: this.XXX, addressMode: "IMP", cycles: 4 },{ name: "LDY", func: this.LDY, addressMode: "ABX", cycles: 4 },{ name: "LDA", func: this.LDA, addressMode: "ABX", cycles: 4 },{ name: "LDX", func: this.LDX, addressMode: "ABY", cycles: 4 },{ name: "???", func: this.XXX, addressMode: "IMP", cycles: 4 },
            { name: "CPY", func: this.CPY, addressMode: "IMM", cycles: 2 },{ name: "CMP", func: this.CMP, addressMode: "IZX", cycles: 6 },{ name: "???", func: this.NOP, addressMode: "IMP", cycles: 2 },{ name: "???", func: this.XXX, addressMode: "IMP", cycles: 8 },{ name: "CPY", func: this.CPY, addressMode: "ZP0", cycles: 3 },{ name: "CMP", func: this.CMP, addressMode: "ZP0", cycles: 3 },{ name: "DEC", func: this.DEC, addressMode: "ZP0", cycles: 5 },{ name: "???", func: this.XXX, addressMode: "IMP", cycles: 5 },{ name: "INY", func: this.INY, addressMode: "IMP", cycles: 2 },{ name: "CMP", func: this.CMP, addressMode: "IMM", cycles: 2 },{ name: "DEX", func: this.DEX, addressMode: "IMP", cycles: 2 },{ name: "???", func: this.XXX, addressMode: "IMP", cycles: 2 },{ name: "CPY", func: this.CPY, addressMode: "ABS", cycles: 4 },{ name: "CMP", func: this.CMP, addressMode: "ABS", cycles: 4 },{ name: "DEC", func: this.DEC, addressMode: "ABS", cycles: 6 },{ name: "???", func: this.XXX, addressMode: "IMP", cycles: 6 },
            { name: "BNE", func: this.BNE, addressMode: "REL", cycles: 2 },{ name: "CMP", func: this.CMP, addressMode: "IZY", cycles: 5 },{ name: "???", func: this.XXX, addressMode: "IMP", cycles: 2 },{ name: "???", func: this.XXX, addressMode: "IMP", cycles: 8 },{ name: "???", func: this.NOP, addressMode: "IMP", cycles: 4 },{ name: "CMP", func: this.CMP, addressMode: "ZPX", cycles: 4 },{ name: "DEC", func: this.DEC, addressMode: "ZPX", cycles: 6 },{ name: "???", func: this.XXX, addressMode: "IMP", cycles: 6 },{ name: "CLD", func: this.CLD, addressMode: "IMP", cycles: 2 },{ name: "CMP", func: this.CMP, addressMode: "ABY", cycles: 4 },{ name: "NOP", func: this.NOP, addressMode: "IMP", cycles: 2 },{ name: "???", func: this.XXX, addressMode: "IMP", cycles: 7 },{ name: "???", func: this.NOP, addressMode: "IMP", cycles: 4 },{ name: "CMP", func: this.CMP, addressMode: "ABX", cycles: 4 },{ name: "DEC", func: this.DEC, addressMode: "ABX", cycles: 7 },{ name: "???", func: this.XXX, addressMode: "IMP", cycles: 7 },
            { name: "CPX", func: this.CPX, addressMode: "IMM", cycles: 2 },{ name: "SBC", func: this.SBC, addressMode: "IZX", cycles: 6 },{ name: "???", func: this.NOP, addressMode: "IMP", cycles: 2 },{ name: "???", func: this.XXX, addressMode: "IMP", cycles: 8 },{ name: "CPX", func: this.CPX, addressMode: "ZP0", cycles: 3 },{ name: "SBC", func: this.SBC, addressMode: "ZP0", cycles: 3 },{ name: "INC", func: this.INC, addressMode: "ZP0", cycles: 5 },{ name: "???", func: this.XXX, addressMode: "IMP", cycles: 5 },{ name: "INX", func: this.INX, addressMode: "IMP", cycles: 2 },{ name: "SBC", func: this.SBC, addressMode: "IMM", cycles: 2 },{ name: "NOP", func: this.NOP, addressMode: "IMP", cycles: 2 },{ name: "???", func: this.SBC, addressMode: "IMP", cycles: 2 },{ name: "CPX", func: this.CPX, addressMode: "ABS", cycles: 4 },{ name: "SBC", func: this.SBC, addressMode: "ABS", cycles: 4 },{ name: "INC", func: this.INC, addressMode: "ABS", cycles: 6 },{ name: "???", func: this.XXX, addressMode: "IMP", cycles: 6 },
            { name: "BEQ", func: this.BEQ, addressMode: "REL", cycles: 2 },{ name: "SBC", func: this.SBC, addressMode: "IZY", cycles: 5 },{ name: "???", func: this.XXX, addressMode: "IMP", cycles: 2 },{ name: "???", func: this.XXX, addressMode: "IMP", cycles: 8 },{ name: "???", func: this.NOP, addressMode: "IMP", cycles: 4 },{ name: "SBC", func: this.SBC, addressMode: "ZPX", cycles: 4 },{ name: "INC", func: this.INC, addressMode: "ZPX", cycles: 6 },{ name: "???", func: this.XXX, addressMode: "IMP", cycles: 6 },{ name: "SED", func: this.SED, addressMode: "IMP", cycles: 2 },{ name: "SBC", func: this.SBC, addressMode: "ABY", cycles: 4 },{ name: "NOP", func: this.NOP, addressMode: "IMP", cycles: 2 },{ name: "???", func: this.XXX, addressMode: "IMP", cycles: 7 },{ name: "???", func: this.NOP, addressMode: "IMP", cycles: 4 },{ name: "SBC", func: this.SBC, addressMode: "ABX", cycles: 4 },{ name: "INC", func: this.INC, addressMode: "ABX", cycles: 7 },{ name: "???", func: this.XXX, addressMode: "IMP", cycles: 7 },
        ];

        this.operatorMap = reduce(this.lookup, (accumulated, e) => {

            if(!accumulated[e.name]) {
                accumulated[e.name] = {};
            }

            const name = accumulated[e.name];

            name[e.addressMode] = {};

            const addressMode = name[e.addressMode];

            addressMode["operation"] = e.func;

            addressMode["cycles"] = e.cycles;

            return accumulated;

        }, {});
    }

    XXX() {}
    BRK() {}
    BPL() {}
    JSR() {}
    BMI() {}
    RTI() {}
    BVC() {}
    RTS() {}
    BVS() {}
    NOP() {}
    BCC() {}
    LDY() {}
    BCS() {}
    CPY() {}
    BNE() {}
    CPX() {}
    BEQ() {}
    ORA() {}
    AND() {}
    EOR() {}
    ADC() {}
    STA() {}
    LDA() {}
    CMP() {}
    SBC() {}
    LDX() {}
    BIT() {}
    STY() {}
    ASL() {}
    ROL() {}
    LSR() {}
    ROR() {}
    STX() {}
    DEC() {}
    INC() {}
    PHP() {}
    CLC() {}
    PLP() {}
    SEC() {}
    PHA() {}
    CLI() {}
    PLA() {}
    SEI() {}
    DEY() {}
    TYA() {}
    TAY() {}
    CLV() {}
    INY() {}
    CLD() {}
    INX() {}
    SED() {}
    TXA() {}
    TXS() {}
    TAX() {}
    TSX() {}
    DEX() {}
    JMP() {}


    run() {

        console.log("hi");

    }

}





// const better_lookup = {
//     BRK: {
//         IZY: {
//             func: BRK_IMM,
//             cycles: 7
//         }
//     }
// }

