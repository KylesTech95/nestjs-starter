export function parseCssProperty(property:string) : string {
    // scan property for lowerCase/upperCase
    // split props into pre and suff
    let [prefix,suffix] = property.replace(/([a-z])([A-Z])/g, '$1 $2').split(" ")
    suffix = suffix.toLowerCase(); // set suffix to lowercase

    
    let reword = `${prefix}-${suffix}`
    console.log(reword)
    return reword
}