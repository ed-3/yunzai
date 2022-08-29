import fs from 'fs'
import inquirer from 'inquirer'
import cfg from './config.js'
import common from '../common/common.js'
import chalk from 'chalk'

/**
 * 创建qq配置文件 `config/bot/qq.yaml`
 * Git Bash 运行npm命令会无法选择列表
 */
export default async function createQQ () {
  if (cfg.qq && !process.argv.includes('login')) {
    return
  }
  console.log(`欢迎使用${chalk.green('Yunzai-Bot v' + cfg.package.version)}\n请按提示输入完成QQ配置`)
  let propmtList = [2048745253, "tianyaohua1.", 1, 3174941841]

  const ret = propmtList

  let file = './config/config/'
  let fileDef = './config/default_config/'

  let qq = fs.readFileSync(`${fileDef}qq.yaml`, 'utf8')

  qq = qq.replace(/qq:/g, 'qq: ' + ret.QQ)
  qq = qq.replace(/pwd:/g, `pwd:  '${ret.pwd}'`)
  qq = qq.replace(/platform: [1-5]/g, 'platform: ' + 1)
  fs.writeFileSync(`${file}qq.yaml`, qq, 'utf8')

  if (ret.masterQQ) {
    let other = fs.readFileSync(`${fileDef}other.yaml`, 'utf8')
    other = other.replace(/masterQQ:/g, `masterQQ:\n  - ${ret.masterQQ}`)
    fs.writeFileSync(`${file}other.yaml`, other, 'utf8')
  }

  fs.copyFileSync(`${fileDef}bot.yaml`, `${file}bot.yaml`)

  console.log(`\nQQ配置完成，正在登录\n后续修改账号可以运行命令： ${chalk.green('npm run login')}\n`)

  await common.sleep(2000)
}
