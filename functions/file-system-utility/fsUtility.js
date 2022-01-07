// file system

const _ = require('lodash')
const fsc = require('fs')
const fsp = require('fs').promises

// file system promise methods

const fp = {

  async log(path) {
    try {
      const data = await fsp.readFile(path)
      console.log(`${path}\n//////////\n${data.toString()}`)
    } catch (err) {
      console.error(`ERR! ${err.message}`)
    }
  },

  async read(path) {
    try {
      return await fsp.readFile(path)
    } catch (err) {
      console.error(`ERR! ${err.message}`)
    }
  },

  async create({path, ext, data}) {
    const pth = ext ? `${path}.${ext}` : path
    try {
      await fsp.writeFile(pth, data)
      console.log(`${path} written`);
    } catch (err) {
      console.error(`ERR! ${err.message}`)
    }
  },

  async append(name, content) {
    try {
      await fsp.writeFile(name, content, { flag: 'a' })
    } catch (err) {
      console.error(`ERR! ${err.message}`)
    }
  },

  async move(from, to) {
    try {
      await fsp.rename(from, to)
    } catch (err) {
      console.error(`ERR! ${err.message}`)
    }
  },

  async readDir(path) {
    try {
      const files = await fsp.readdir(path)
      console.log(files)
      return files
    } catch (err) {
      console.error(`ERR! ${err.message}`)
    }
  },

  async openDir(path) {
    try {
      return await fsp.opendir(path)
    } catch (err) {
      console.error(`ERR! ${err.message}`)
    }
  },

  async createDir(path) {
    try {
      await fsp.mkdir(path)
      console.log(`${path} created`);
    } catch (err) {
      console.error(`ERR! ${err.message}`)
    }
  },

  adv: {

    async createModifiedCopy({path, dest, func, args}) {
      const destination = dest+'/modified-'+fu.pullName(path)
      const edit = await fp.read(path)
      const data = func(edit.toString(), args)
      await fp.create({ path: destination, data })
    },

    async modifyMultiple({dir, ignore, func, args}) {

      async function createDestDir() {
        const dirName = fu.pullName(dir)
        const parentPath = fu.pullParentDir(dir)
        const destPath = parentPath+'/modified-'+dirName
        await fp.createDir(destPath)
        return destPath
      }

      const files = await fu.getTarFiles(dir, ignore)

      const dest = await createDestDir()

      for await (const file of files) {
        await this.createModifiedCopy({
          path: dir+'/'+file,
          dest: dest,
          func,
          args
        })
      }
    },

    async moveAndRename({fromPth, toDir, renamer, args}) {
      const nym = fu.pullName(fromPth)
      await fp.move(fromPth, toDir+'/'+renamer(nym, args))
      console.log(`moved and renamed: ${nym}`)
    },

  },

}

// private utility methods

const fu = {

  pullName:(p) => p.split('/')[p.split('/').length-1],

  pullParentDir:(p) => p.slice(0, p.lastIndexOf('/')),

  splitPathName:(p) => [
    this.pullParentDir(p),
    this.pullName(p)
  ],

  async getTarFiles(dir, ignore=[]) {
    const allFiles = await fp.readDir(dir)
    return _.difference(allFiles, ignore)
  },

}

// special / experimental methods

const fx = {

  async moveAndRenameMultiple(params) {
    const {fromDir, toDir, ignore, renamer, args} = params

    const files = await fu.getTarFiles(fromDir, ignore)

    for await (const file of files) {
      fp.adv.moveAndRename({
        fromPth: fromDir+'/'+file,
        toDir,
        renamer,
        args,
      })
    }

  },

}

// file system callback methods

const fc = {

  log(path, encoding) {
    fsc.readFile(path, encoding || 'utf-8', (err, data) => {
      if (err) return console.log(err)
      console.log(`${path}\n//////////\n${data.toString()}`)
    })
  },

  create(name, ext, content) {
    fsc.writeFile(`${name}.${ext}`, content, (err) => {
      if (err) return console.log(err)
      console.log(`${name}.${ext} created`)
    })
  },

  move(fromPath, toPath) {
    fsc.rename(fromPath, toPath, (err) => {
      if (err) return console.log(err)
      console.log(`moved ${fromPath} to ${toPath}`)
    })
  },

  read(path, encoding, func) {
    fsc.readFile(path, encoding || 'utf-8', (err, data) => {
      if (err) return console.log(err)
      console.log(`${path} loaded`)
      func(data)
    })
  }

}

exports.fp = fp
exports.fc = fc
exports.fx = fx