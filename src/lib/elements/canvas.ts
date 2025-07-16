

export function getCanvasElement(options :object, formatClasses:string,formatStyles:string) : string {
                return  `<canvas 
                          ${options['id'] && typeof(options['id'])==='string' ? "id="+options["id"]: ""}
                          ${options['class'] ? "class="+'"'+formatClasses + '"' : ""}
                          ${options['style'] ? "style="+'"'+formatStyles + '"' : ""} 
                          ></canvas>`;

}                 