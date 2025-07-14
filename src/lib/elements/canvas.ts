

export function getCanvasElement(height :(number|string),width :(number|string),options :object, formatClasses:string,formatStyles:string) : string {
                return  `<canvas 
                          ${options['id'] && typeof(options['id'])==='string' ? "id="+options["id"]: ""}
                          ${options['class'] ? "class="+'"'+formatClasses + '"' : ""}
                          ${options['style'] ? "style="+'"'+formatStyles + '"' : ""} 
                          height=${height} width=${width}  
                          ></canvas>`;

}                 