import { useEffect, useRef, useState } from "react";
import type p5 from "p5";

let randoms: number[] = [];
let links: p5.Element[] = [];

const Heat = () => {
    const sketchRef = useRef<HTMLDivElement>(null);
    const [isDark, setIsDark] = useState(
      window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    );
    useEffect(() => {
      const media = window.matchMedia('(prefers-color-scheme: dark)');
      const listener = (e: MediaQueryListEvent) => setIsDark(e.matches);
      media.addEventListener('change', listener);
      return () => media.removeEventListener('change', listener);
    }, []);
    useEffect(() => {
        let p5Instance: p5;
        import("p5").then((p5mod) => {
            p5Instance = new p5mod.default((p: p5) => {
                p.setup = () => {
                    p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
                    links[0] = p.createA('https://williamthazard.github.io/gbg/#/archaic', '<h1>this</h1>');
                    links[1] = p.createA('https://williamthazard.github.io/gbg/#/', '<h1>constant</h1>');
                    links[2] = p.createA('https://williamthazard.github.io/gbg/#/frogs', '<h1>heat</h1>');
                    for(let i = 0; i < links.length; i++){
                        if(p.windowWidth > p.windowHeight){
                        randoms.push(p.random(5,p.windowWidth-p.windowWidth/2))
                        } else {
                        randoms.push(p.random(5,p.windowHeight-p.windowHeight/2))
                        }
                    }
                }
                p.draw = () => {
                    // Set background and box color based on mode
                    if (isDark) {
                      p.background(34); // dark bg
                      let c = p.color(220);
                      c.setAlpha(100);
                      p.fill(c);      // light box
                    } else {
                      p.background(255); // light bg
                      let c = p.color('#646cff');
                      c.setAlpha(100);
                      p.fill(c);        // dark box
                    }
                    p.rotateX(p.frameCount * 0.01);
                    p.rotateY(p.frameCount * 0.01);
                    p.noStroke();
                    p.box(p.windowWidth/4);
                    for(let i = 0; i < links.length; i++){
                        links[i].position(randoms[i], (i*i*p.windowHeight/7)+p.windowHeight/2-p.windowHeight/3); 
                        // Set the position of the links on the page
                    }
                }
                p.windowResized = () => {
                    p.resizeCanvas(p.windowWidth, p.windowHeight);
                }
            }, sketchRef.current!)
        });
        return () => {
            if (p5Instance) p5Instance.remove();
        };
    }, [isDark])
    return(<div ref={sketchRef} style={{ width: "100vw", height: "100vh" }} />)
}

export default Heat;