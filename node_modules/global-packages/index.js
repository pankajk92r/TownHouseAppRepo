// Native
const path = require('path')

// Packages
const fs = require('fs-promise')
const which = require('which-promise')

const modulePath = () => new Promise((resolve, reject) => {
  const npmLocation = which('npm')

  npmLocation.then(dir => {
    const globalPath = path.join(dir, '../../lib/node_modules')
    resolve(globalPath)
  })

  npmLocation.catch(reject)
})

module.exports = () => new Promise((resolve, reject) => {
  const moduleDir = modulePath()
  moduleDir.catch(reject)

  moduleDir.then(directory => {
    // Read contents of global module directory
    const walker = fs.readdir(directory)

    // If everything went fine, directly return the list of modules
    walker.then(resolve)

    // If not, hand back the error
    walker.catch(reject)
  })
})
