export default {
  "spec_dir": "spec",
  "spec_files": [
    "**/*[sS]pec.?(m)js",
    "!**/*nospec.js"
  ],
  "helpers": [
    "helpers/**/*.js", // Include your JSDOM helper here
    "dom-helper.js" 
  ],
  env: {
    stopSpecOnExpectationFailure: false,
    random: true,
    forbidDuplicateNames: true
  }
}
