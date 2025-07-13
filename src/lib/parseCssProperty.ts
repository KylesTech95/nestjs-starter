export function parseCssProperty(property:string) : string {
    let camelRegex = /([a-z])([A-Z])/g;
    
        // scan property for lowerCase/upperCase
        if(camelRegex.test(property)){
            // split props into pre and suff
            let [prefix,suffix] = property.replace(camelRegex, '$1 $2').split(" ");

            suffix = suffix.toLowerCase(); // set suffix to lowercase
            let reword = `${prefix}-${suffix}` || property

            // return string
            return reword
    
        } else {
            return property
        }
}