import {terser} from 'rollup-plugin-terser';
import serve from 'rollup-plugin-serve'
import nodeResolve from 'rollup-plugin-node-resolve'

export default {
    input: 'src/index.js',
    output: [{
        file: 'dist/bundle.development.esm.js',
        format: 'es'
    },
    {
        file: 'example/example.js',
        format: 'es'
    },
    {
        file: 'dist/bundle.production.esm.js',
        format: 'es',
        plugins: [terser()]
    }],
    plugins: [
        nodeResolve({
            ignoreGlobal: false,
            include: ['node_modules/**']
          }),
        serve('example')
    ]
}