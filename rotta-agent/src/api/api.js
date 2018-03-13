const front = {
  stage:'dev', // 接口类型

  zues: zues_URL, // zues有关接口

  hulk: hulk_URL, // hulk有关接口

  javis: Javis_URL, // javis有关接口

  diana: diana_URL, // diana有关接口

  thor: thor_URL, // thor有关接口

  hera: hera_URL, // hera有关接口

  hawkeye: hawkeye_URL, // hawkeye有关接口

  stat: stat_URL, // stat有关接口

  playerExt: playerExt_URL, // playerExt接口

  stateMachine: stateMachine_URL, // stateMachine接口
}

const api = {
   // zues
  checkExist: front.zues + '/checkExist', // 检查用户 标识,昵称,账号,sn 是否存在

  managers: front.zues + '/managers', // 线路商数据接口

  merchants: front.zues + '/merchants', // 一般商户数据接口

  getchilds: front.zues + '/childList', // 查询下级接口

  userStatus: front.zues + '/userChangeStatus', // 锁定解锁用户接口

  checkMSN: front.zues + '/check_msn', // 检查线路号是否重复接口

  msnLock: front.zues + '/lockmsn', // 锁定解锁线路号接口

  msnList: front.zues + '/msnList', // 线路号列表接口

  randomMSN: front.zues + '/msnRandom', // 随机生成线路号接口

  parentList: front.zues + '/avalible_managers', // 获取可用上级接口

  randomPassword: front.zues + '/random_password', // 随机生成密码接口

  randomCaptcha: front.zues + '/captcha', // 随机生成验证码

  // changePassword: front.zues + '/updatePassword', // 修改密码

  getSign: front.zues + '/game/sign', // 获取游戏后台跳转链接签名

  // hulk
  checkAgentMix: front.hulk + '/checkAgentMix', // 获取上级代理洗码比

  adminNew: front.hulk + '/agentAdminNew', // 创建新代理管理员

  login: front.hulk + '/agentLogin', // 所有用户登录接口

  createUser: front.hulk + '/agentNew', // 创建代理

  agentdetail: front.hulk + '/agentOne', // 查询代理详情

  agentList: front.hulk + '/agentList', // 代理列表

  agentUpdate: front.hulk + '/agentUpdate', // 更新代理信息

  parentAgent: front.hulk + '/availableAgents', // 可用代理列表

  billTransfer: front.hulk + '/billTransfer', // 存提点接口

  bills: front.hulk + '/bills', // 查询用户余额

  waterFall: front.hulk + '/waterfall', // 查询用户账单明细

  loginList: front.hulk + '/logList', // 登录日志

  adminList: front.hulk + '/agentAdminList', // 管理员列表

  addGameNotice: front.hulk + '/adNew', // 新增游戏公告列表

  getGameNoticeList: front.hulk + '/adList', // 获取游戏公告列表

  updateGameNotice: front.hulk + '/adUpdate', // 修改公告列表

  changeGameNoticeStatus: front.hulk + '/adChangeStatus', // 更改状态

  delGameNotice: front.hulk + '/adDelete', // 更改状态

  changePassword: front.hulk + '/updateAgentPassword', // 修改代理密码

  // Javis

  map: front.javis + '/organize', // 组织架构接口

  getUploadImgToken: front.javis + '/upToken', // 获取七牛云token

  // diana

  allGames: front.diana + '/gameType', // 获取游戏类型列表

  gameBigType: front.diana + '/gameBigType', // 获取游戏大类

  companySelect: front.diana + '/companySelect', // 获取运营商

  gameList: front.diana + '/gameList', // 获取游戏列表

  changeGame: front.diana + '/gameChangeStatus', // 操作游戏状态接口

  bfSetting: front.diana + '/configNew', // 包房代理配置

  getBfSetting: front.diana + '/configOne', // 获取包房代理配置

  companySelect: front.diana + '/companySelect', // 获取运营商

  gameBigType: front.diana + '/gameBigType', // 获取游戏大类
  // thor

  addBooth: front.thor + '/seatNew', // 新增展位

  boothList: front.thor + '/seatList', // 展位列表

  changeBoothStatus: front.thor + '/seatChangeStatus', // 展位状态变更

  updateBooth: front.thor + '/seatUpdate', // 修改展位

  delBooth: front.thor + '/seatDelete', // 删除展位

  propList: front.thor + '/toolList', // 道具列表

  getBoothType: front.thor + '/seatType', // 展位类别

  packageList: front.thor + '/packageList', // 礼包列表

  // hera

  getPlayList: front.hera + '/player/list', // 玩家列表

  getPlayDetail: front.hera + '/player/bill/info', // 玩家详情

  forzenPlay: front.hera + '/player/forzen', // 单个解冻、已锁定

  allForzenPlay: front.hera + '/player/batch/forzen', // 单个解冻、已锁定

  addPlayer: front.hera + '/agent/player/create', // 创建玩家

  getPlayerList: front.hera + '/player/list', // 玩家列表

  playerDeposit: front.hera + '/agent/player/deposit', // 玩家存点

  playerForzen: front.hera + '/player/forzen', // 代理玩家解冻/已锁定

  playerAllForzen: front.hera + '/player/batch/forzen', // 代理玩家批量解冻/已锁定

  playerTake: front.hera + '/agent/player/take', // 玩家提点

  getPlayerDetail: front.hera + '/player/bill/info', // 玩家详细

  getPassWord: front.hera + '/agent/player/password', // 生成密码

  getChildrenList: front.hera + '/agent/children/list', // 创建玩家获取下级代理商

  getAgentPoint: front.hera + '/agent/point', // 获取玩家上级剩余点数

  // hawkeye

  mapPlayer: front.hawkeye + '/player/list', // 组织架构商户玩家

  addMail: front.hawkeye + '/email/add', // 添加邮件

  getMailList: front.hawkeye + '/email/list', // 邮件列表

  addHorseRaceLamp: front.hawkeye + '/notice/add', // 添加跑马灯

  getHorseRaceLampList: front.hawkeye + '/notice/list', // 跑马灯列表

  updateHorseRaceLamp: front.hawkeye + '/notice/update', // 修改跑马灯

  delHorseRaceLamp: front.hawkeye + '/notice/remove', // 删除跑马灯

  // stat
  statisticsAll: front.stat + '/statistics/overview', // 看板顶部数据统计

  statisticsConsume: front.stat + '/statistics/consume', // 游戏消耗点数总览

  consumeAndIncome: front.stat + '/statistics/consumeAndIncome', // 售出，收益

  reportInfo: front.stat + '/queryUserStat', // 平台报表用户统计

  reportPlayer: front.stat + '/queryPlayerStat', // 平台报表用户所属玩家统计

  calcUserStat: front.stat + '/calcUserStat', // 报表用户时间查询

  calcPlayerStat: front.stat + '/calcPlayerStat',  // 报表玩家时间查询

  //playerExt
  playerAccount: front.playerExt + '/player/bill/flow', // 下注返奖流水(查看流水账详单)

  playerBill: front.playerExt + '/player/bill/detail', // 账单流水详情信息(查看账单详细)

  playerRecord: front.playerExt + '/player/bill/record', // 战绩

  playerDetail: front.playerExt + '/player/info', // 玩家详细基本信息

  exportFlow: front.playerExt  + '/player/bill/flow/download', // 导出流水

  exportDetail: front.playerExt  + '/player/bill/detail/download', // 导出交易记录
  //stateMachine

  uploadImg: front.stateMachine + '/upload', // 上传图片获取签证

  // methods

  get: 'get',

  post: 'post'
}

export default {
  ...api,
  ...front
}
