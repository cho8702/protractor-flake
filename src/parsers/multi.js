export default {
  name: 'multi',

  parse (output) {
    let match = null
    let failedSpecs = new Set()
    let testsOutput = output.split('------------------------------------')
    let RESULT_REG = /\sSUCCESS\s/g
    let SPECFILE_REG = /.+Specs:\s(.*\.(js|coffee))/g
    testsOutput.forEach(function (test) {
      let specfile
      let result = 'failed'
      // retrieve specfile from run
      console.log(`Test: ${test}`);
      while (match = SPECFILE_REG.exec(test)) { // eslint-disable-line no-cond-assign
        specfile = match[1]
        console.log(`Spec file: ${specfile}`);
      }
      // check for string ' SUCCESS ' and then marks the test as passed
      while (match = RESULT_REG.exec(test)) { // eslint-disable-line no-cond-assign
        result = 'passed'
        console.log(`Match: ${match}`);
      }
      if (specfile && result === 'failed') {
        if (!/node_modules/.test(specfile)) {
          failedSpecs.add(specfile)
        }
      }
    })

    return [...failedSpecs]
  }
}
