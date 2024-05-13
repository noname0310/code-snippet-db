export interface SnippetData {
    id: string;
    name: string;
    description: string;
    code: string;
    language: string;
}

export const snippets: SnippetData[] = [
    {
        id: '1',
        name: 'CSS Constants',
        description: 'CSS constants for light themes',
        code: `
export const LIGHT_THEME = {
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
        language: 'javascript'
    },
    {
        id: '2',
        name: 'useEffect Example',
        description: 'Example of useEffect hook',
        code: `
import React, { useEffect } from 'react';

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
        language: 'javascript'
    },
    {
        id: '3',
        name: 'bezier interpolation',
        description: 'bezier interpolation for animation easing',
        code: `
        /**
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
            public static Interpolate(x1, x2, y1, y2, x): number {
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
                return (sst3! * y1) + (stt3! * y2) + ttt!;
            }
        }
`,
        language: 'javascript'
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
