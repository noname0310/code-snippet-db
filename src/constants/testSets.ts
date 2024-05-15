export interface SnippetData {
    id: string;
    name: string;
    author: string;
    description: string;
    content: string;
    contentLanguage: string;
}

export const staticSnippets: SnippetData[] = [
    {
        id: '-1',
        name: 'CSS Constants',
        author: 'John Doe',
        description: 'CSS constants for light themes',
        content: `export const LIGHT_THEME = {
    colors: {
        background: '#fff',
        secondaryBackground: '#FFFFFF',
        primary: '#fdfdfd',
        secondary: '#eee',
        tertiary: '#f5f5f5',
        quaternary: '#CEDEFF',
        
        backgroundInverse: '#000',
        primaryInverse: '#111',

        textRegular: '#000',
        textLight: '#666',
        textLighter: '#888',
        textLightest: '#fff',

        error: '#ff3535',
        success: '#00b300',
        warning: '#ffc107',
        info: '#7A86B6',

        button: '#888888',
        buttonHover: '#999999',
        buttonActive: '#777777',

        link: '#00bcd4',
        linkHover: '#00b0d0',
        linkActive: '#0097a7'
    }
};
`,
        contentLanguage: 'javascript'
    },
    {
        id: '-2',
        name: 'useEffect Example',
        author: 'Sara Smith',
        description: 'Example of react useEffect hook',
        content: `import React, { useEffect } from 'react';

const Component = () => {
    useEffect(() => {
        console.log('Component mounted');
        return () => {
            console.log('Component unmounted');
        };
    }, []);

    return <div>Component</div>;
};
`,
        contentLanguage: 'javascript'
    },
    {
        id: '-3',
        name: 'bezier interpolation',
        author: '29a.ch',
        description: 'bezier interpolation for animation easing',
        content: `/**
 * Cubic Bezier Interpolator for MMD animation interpolation
 */
export class BezierInterpolator {
    /**
     * Cubic Bezier interpolation
     * @param x1 X1
     * @param x2 X2
     * @param y1 Y1
     * @param y2 Y2
     * @param x Weight
     * @returns Interpolated value
     */
    static Interpolate(x1, x2, y1, y2, x) {
        let c = 0.5;
        let t = c;
        let s = 1.0 - t;
        const loop = 15;
        const eps = 1e-5;
        const math = Math;

        let sst3, stt3, ttt;

        for (let i = 0; i < loop; ++i) {
            sst3 = 3.0 * s * s * t;
            stt3 = 3.0 * s * t * t;
            ttt = t * t * t;

            const ft = (sst3 * x1) + (stt3 * x2) + (ttt) - x;

            if (math.abs(ft) < eps) break;

            c *= 0.5;

            t += (ft < 0) ? c : -c;
            s = 1.0 - t;
        }
        return (sst3 * y1) + (stt3 * y2) + ttt;
    }
}
`,
        contentLanguage: 'javascript'
    },
    {
        id: '-4',
        name: 'Quadratic Equation Solver',
        author: 'javascripttutorial.net',
        description: 'JavaScript Program to Solve Quadratic Equation',
        content: `// program to solve quadratic equation
let root1, root2;

// take input from the user
let a = prompt("Enter the first number: ");
let b = prompt("Enter the second number: ");
let c = prompt("Enter the third number: ");

// calculate discriminant
let discriminant = b * b - 4 * a * c;

// condition for real and different roots
if (discriminant > 0) {
    root1 = (-b + Math.sqrt(discriminant)) / (2 * a);
    root2 = (-b - Math.sqrt(discriminant)) / (2 * a);

    // result
    console.log(\`The roots of quadratic equation are \${root1} and \${root2}\`);
}

// condition for real and equal roots
else if (discriminant == 0) {
    root1 = root2 = -b / (2 * a);

    // result
    console.log(\`The roots of quadratic equation are \${root1} and \${root2}\`);
}

// if roots are not real
else {
    let realPart = (-b / (2 * a)).toFixed(2);
    let imagPart = (Math.sqrt(-discriminant) / (2 * a)).toFixed(2);

    // result
    console.log(
    \`The roots of quadratic equation are \${realPart} + \${imagPart}i and \${realPart} - \${imagPart}i\`
    );
}
`,
        contentLanguage: 'javascript'
    },
    {
        id: '-5',
        name: 'Vector2 Class',
        author: 'three.js',
        description: 'Vector2 class for 2D vector operations',
        content: `import * as MathUtils from './MathUtils.js';
        
class Vector2 {

    constructor( x = 0, y = 0 ) {

        Vector2.prototype.isVector2 = true;

        this.x = x;
        this.y = y;

    }

    get width() {

        return this.x;

    }

    set width( value ) {

        this.x = value;

    }

    get height() {

        return this.y;

    }

    set height( value ) {

        this.y = value;

    }

    set( x, y ) {

        this.x = x;
        this.y = y;

        return this;

    }

    setScalar( scalar ) {

        this.x = scalar;
        this.y = scalar;

        return this;

    }

    setX( x ) {

        this.x = x;

        return this;

    }

    setY( y ) {

        this.y = y;

        return this;

    }

    setComponent( index, value ) {

        switch ( index ) {

            case 0: this.x = value; break;
            case 1: this.y = value; break;
            default: throw new Error( 'index is out of range: ' + index );

        }

        return this;

    }

    getComponent( index ) {

        switch ( index ) {

            case 0: return this.x;
            case 1: return this.y;
            default: throw new Error( 'index is out of range: ' + index );

        }

    }

    clone() {

        return new this.constructor( this.x, this.y );

    }

    copy( v ) {

        this.x = v.x;
        this.y = v.y;

        return this;

    }

    add( v ) {

        this.x += v.x;
        this.y += v.y;

        return this;

    }

    addScalar( s ) {

        this.x += s;
        this.y += s;

        return this;

    }

    addVectors( a, b ) {

        this.x = a.x + b.x;
        this.y = a.y + b.y;

        return this;

    }

    addScaledVector( v, s ) {

        this.x += v.x * s;
        this.y += v.y * s;

        return this;

    }

    sub( v ) {

        this.x -= v.x;
        this.y -= v.y;

        return this;

    }

    subScalar( s ) {

        this.x -= s;
        this.y -= s;

        return this;

    }

    subVectors( a, b ) {

        this.x = a.x - b.x;
        this.y = a.y - b.y;

        return this;

    }

    multiply( v ) {

        this.x *= v.x;
        this.y *= v.y;

        return this;

    }

    multiplyScalar( scalar ) {

        this.x *= scalar;
        this.y *= scalar;

        return this;

    }

    divide( v ) {

        this.x /= v.x;
        this.y /= v.y;

        return this;

    }

    divideScalar( scalar ) {

        return this.multiplyScalar( 1 / scalar );

    }

    applyMatrix3( m ) {

        const x = this.x, y = this.y;
        const e = m.elements;

        this.x = e[ 0 ] * x + e[ 3 ] * y + e[ 6 ];
        this.y = e[ 1 ] * x + e[ 4 ] * y + e[ 7 ];

        return this;

    }

    min( v ) {

        this.x = Math.min( this.x, v.x );
        this.y = Math.min( this.y, v.y );

        return this;

    }

    max( v ) {

        this.x = Math.max( this.x, v.x );
        this.y = Math.max( this.y, v.y );

        return this;

    }

    clamp( min, max ) {

        // assumes min < max, componentwise

        this.x = Math.max( min.x, Math.min( max.x, this.x ) );
        this.y = Math.max( min.y, Math.min( max.y, this.y ) );

        return this;

    }

    clampScalar( minVal, maxVal ) {

        this.x = Math.max( minVal, Math.min( maxVal, this.x ) );
        this.y = Math.max( minVal, Math.min( maxVal, this.y ) );

        return this;

    }

    clampLength( min, max ) {

        const length = this.length();

        return this.divideScalar( length || 1 ).multiplyScalar( Math.max( min, Math.min( max, length ) ) );

    }

    floor() {

        this.x = Math.floor( this.x );
        this.y = Math.floor( this.y );

        return this;

    }

    ceil() {

        this.x = Math.ceil( this.x );
        this.y = Math.ceil( this.y );

        return this;

    }

    round() {

        this.x = Math.round( this.x );
        this.y = Math.round( this.y );

        return this;

    }

    roundToZero() {

        this.x = Math.trunc( this.x );
        this.y = Math.trunc( this.y );

        return this;

    }

    negate() {

        this.x = - this.x;
        this.y = - this.y;

        return this;

    }

    dot( v ) {

        return this.x * v.x + this.y * v.y;

    }

    cross( v ) {

        return this.x * v.y - this.y * v.x;

    }

    lengthSq() {

        return this.x * this.x + this.y * this.y;

    }

    length() {

        return Math.sqrt( this.x * this.x + this.y * this.y );

    }

    manhattanLength() {

        return Math.abs( this.x ) + Math.abs( this.y );

    }

    normalize() {

        return this.divideScalar( this.length() || 1 );

    }

    angle() {

        // computes the angle in radians with respect to the positive x-axis

        const angle = Math.atan2( - this.y, - this.x ) + Math.PI;

        return angle;

    }

    angleTo( v ) {

        const denominator = Math.sqrt( this.lengthSq() * v.lengthSq() );

        if ( denominator === 0 ) return Math.PI / 2;

        const theta = this.dot( v ) / denominator;

        // clamp, to handle numerical problems

        return Math.acos( MathUtils.clamp( theta, - 1, 1 ) );

    }

    distanceTo( v ) {

        return Math.sqrt( this.distanceToSquared( v ) );

    }

    distanceToSquared( v ) {

        const dx = this.x - v.x, dy = this.y - v.y;
        return dx * dx + dy * dy;

    }

    manhattanDistanceTo( v ) {

        return Math.abs( this.x - v.x ) + Math.abs( this.y - v.y );

    }

    setLength( length ) {

        return this.normalize().multiplyScalar( length );

    }

    lerp( v, alpha ) {

        this.x += ( v.x - this.x ) * alpha;
        this.y += ( v.y - this.y ) * alpha;

        return this;

    }

    lerpVectors( v1, v2, alpha ) {

        this.x = v1.x + ( v2.x - v1.x ) * alpha;
        this.y = v1.y + ( v2.y - v1.y ) * alpha;

        return this;

    }

    equals( v ) {

        return ( ( v.x === this.x ) && ( v.y === this.y ) );

    }

    fromArray( array, offset = 0 ) {

        this.x = array[ offset ];
        this.y = array[ offset + 1 ];

        return this;

    }

    toArray( array = [], offset = 0 ) {

        array[ offset ] = this.x;
        array[ offset + 1 ] = this.y;

        return array;

    }

    fromBufferAttribute( attribute, index ) {

        this.x = attribute.getX( index );
        this.y = attribute.getY( index );

        return this;

    }

    rotateAround( center, angle ) {

        const c = Math.cos( angle ), s = Math.sin( angle );

        const x = this.x - center.x;
        const y = this.y - center.y;

        this.x = x * c - y * s + center.x;
        this.y = x * s + y * c + center.y;

        return this;

    }

    random() {

        this.x = Math.random();
        this.y = Math.random();

        return this;

    }

    *[ Symbol.iterator ]() {

        yield this.x;
        yield this.y;

    }

}

export { Vector2 };
`,
        contentLanguage: 'javascript'
    },
    {
        id: '-6',
        name: 'React BrowserRouter Example',
        author: 'Dan Abramov',
        description: 'React Router BrowserRouter example',
        content: `import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import "./index.css";

const router = createBrowserRouter([
    {
    path: "/",
    element: <div>Hello world!</div>,
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
    <RouterProvider router={router} />
    </React.StrictMode>
);
`,
        contentLanguage: 'javascript'
    },
    {
        id: '-7',
        name: 'Javascript WebGL Basic Example',
        author: 'sjdonado',
        description: `In the code snippet, we've done the following:

1. Obtained the WebGL rendering context from the canvas.
2. Checked if WebGL is supported on the current browser.
3. Set the clear color and cleared the canvas to black.
4. Created vertex and fragment shader source code as simple point rendering.
5. Compiled and linked the shaders using helper functions createShader and createProgram.
6. Used the shader program to draw a single point on the canvas.
`,
        content: `// Get the WebGL canvas element
const canvas = document.getElementById("webglCanvas");


// Get the WebGL rendering context
const gl = canvas.getContext("webgl");


// Check if WebGL is available on the current browser
if (!gl) {
    alert("WebGL is not supported on this browser.");
}


// Set clear color to black, and clear the canvas
gl.clearColor(0.0, 0.0, 0.0, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);


// Shaders: Vertex and Fragment
const vertexShaderSource = \`
    void main() {
    gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
    gl_PointSize = 100.0;
    }
\`;


const fragmentShaderSource = \`
    void main() {
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    }
\`;


// Compile and link shaders
function createShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("Shader compilation error:", gl.getShaderInfoLog(shader));
    return null;
    }
    return shader;
}


function createProgram(gl, vertexShader, fragmentShader) {
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("Program linking error:", gl.getProgramInfoLog(program));
    return null;
    }
    return program;
}


const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
const program = createProgram(gl, vertexShader, fragmentShader);


// Use the shader program
gl.useProgram(program);


// Draw a point using the shaders
gl.drawArrays(gl.POINTS, 0, 1);
`,
        contentLanguage: 'javascript'
    }
];

export function findSnippets(query: string, snippets: SnippetData[]): SnippetData[] {
    if (query === '') {
        return [];
    }

    return snippets.filter(
        snippet => snippet.name.toLowerCase().includes(query.toLowerCase()) ||
        snippet.description.toLowerCase().includes(query.toLowerCase())
    );
}

export function getSnippet(name: string, snippets: SnippetData[]): SnippetData | undefined {
    return snippets.find(snippet => snippet.name === name);
}
