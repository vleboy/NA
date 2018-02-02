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
  checkExist: front.zues + front.stage + '/checkExist', // 检查用户 标识,昵称,账号,sn 是否存在

  managers: front.zues + front.stage + '/managers', // 线路商数据接口

  merchants: front.zues + front.stage + '/merchants', // 一般商户数据接口

  getchilds: front.zues + front.stage + '/childList', // 查询下级接口

  userStatus: front.zues + front.stage + '/userChangeStatus', // 锁定解锁用户接口

  checkMSN: front.zues + front.stage + '/check_msn', // 检查线路号是否重复接口

  msnLock: front.zues + front.stage + '/lockmsn', // 锁定解锁线路号接口

  msnList: front.zues + front.stage + '/msnList', // 线路号列表接口

  randomMSN: front.zues + front.stage + '/msnRandom', // 随机生成线路号接口

  parentList: front.zues + front.stage + '/avalible_managers', // 获取可用上级接口

  randomPassword: front.zues + front.stage + '/random_password', // 随机生成密码接口

  randomCaptcha: front.zues + front.stage + '/captcha', // 随机生成验证码

  // changePassword: front.zues + front.stage + '/updatePassword', // 修改密码

  getSign: front.zues + front.stage + '/game/sign', // 获取游戏后台跳转链接签名

  // hulk
  checkAgentMix: front.hulk + front.stage + '/checkAgentMix', // 获取上级代理洗码比

  adminNew: front.hulk + front.stage + '/agentAdminNew', // 创建新代理管理员

  login: front.hulk + front.stage + '/agentLogin', // 所有用户登录接口

  createUser: front.hulk + front.stage + '/agentNew', // 创建代理

  agentdetail: front.hulk + front.stage + '/agentOne', // 查询代理详情

  agentList: front.hulk + front.stage + '/agentList', // 代理列表

  agentUpdate: front.hulk + front.stage + '/agentUpdate', // 更新代理信息

  parentAgent: front.hulk + front.stage + '/availableAgents', // 可用代理列表

  billTransfer: front.hulk + front.stage + '/billTransfer', // 存提点接口

  bills: front.hulk + front.stage + '/bills', // 查询用户余额

  waterFall: front.hulk + front.stage + '/waterfall', // 查询用户账单明细

  loginList: front.hulk + front.stage + '/logList', // 登录日志

  adminList: front.hulk + front.stage + '/agentAdminList', // 管理员列表

  addGameNotice: front.hulk + front.stage + '/adNew', // 新增游戏公告列表

  getGameNoticeList: front.hulk + front.stage + '/adList', // 获取游戏公告列表

  updateGameNotice: front.hulk + front.stage + '/adUpdate', // 修改公告列表

  changeGameNoticeStatus: front.hulk + front.stage + '/adChangeStatus', // 更改状态

  delGameNotice: front.hulk + front.stage + '/adDelete', // 更改状态

  changePassword: front.hulk + front.stage + '/updateAgentPassword', // 修改代理密码

  // Javis

  map: front.javis + front.stage + '/organize', // 组织架构接口

  getUploadImgToken: front.javis + front.stage + '/upToken', // 获取七牛云token

  // diana

  allGames: front.diana + front.stage + '/gameType', // 获取游戏类型列表

  gameBigType: front.diana + front.stage + '/gameBigType', // 获取游戏大类

  companySelect: front.diana + front.stage + '/companySelect', // 获取运营商

  gameList: front.diana + front.stage + '/gameList', // 获取游戏列表

  changeGame: front.diana + front.stage + '/gameChangeStatus', // 操作游戏状态接口

  bfSetting: front.diana + front.stage + '/configNew', // 包房代理配置

  getBfSetting: front.diana + front.stage + '/configOne', // 获取包房代理配置

  companySelect: front.diana + front.stage + '/companySelect', // 获取运营商

  gameBigType: front.diana + front.stage + '/gameBigType', // 获取游戏大类
  // thor

  addBooth: front.thor + front.stage + '/seatNew', // 新增展位

  boothList: front.thor + front.stage + '/seatList', // 展位列表

  changeBoothStatus: front.thor + front.stage + '/seatChangeStatus', // 展位状态变更

  updateBooth: front.thor + front.stage + '/seatUpdate', // 修改展位

  delBooth: front.thor + front.stage + '/seatDelete', // 删除展位

  propList: front.thor + front.stage + '/toolList', // 道具列表

  getBoothType: front.thor + front.stage + '/seatType', // 展位类别

  packageList: front.thor + front.stage + '/packageList', // 礼包列表

  // hera

  getPlayList: front.hera + front.stage + '/player/list', // 玩家列表

  getPlayDetail: front.hera + front.stage + '/player/bill/info', // 玩家详情

  forzenPlay: front.hera + front.stage + '/player/forzen', // 单个解冻、已锁定

  allForzenPlay: front.hera + front.stage + '/player/batch/forzen', // 单个解冻、已锁定

  addPlayer: front.hera + front.stage + '/agent/player/create', // 创建玩家

  getPlayerList: front.hera + front.stage + '/player/list', // 玩家列表

  playerDeposit: front.hera + front.stage + '/agent/player/deposit', // 玩家存点

  playerForzen: front.hera + front.stage + '/player/forzen', // 代理玩家解冻/已锁定

  playerAllForzen: front.hera + front.stage + '/player/batch/forzen', // 代理玩家批量解冻/已锁定

  playerTake: front.hera + front.stage + '/agent/player/take', // 玩家提点

  getPlayerDetail: front.hera + front.stage + '/player/bill/info', // 玩家详细

  getPassWord: front.hera + front.stage + '/agent/player/password', // 生成密码

  getChildrenList: front.hera + front.stage + '/agent/children/list', // 创建玩家获取下级代理商

  getAgentPoint: front.hera + front.stage + '/agent/point', // 获取玩家上级剩余点数

  // hawkeye

  mapPlayer: front.hawkeye + front.stage + '/player/list', // 组织架构商户玩家

  addMail: front.hawkeye + front.stage + '/email/add', // 添加邮件

  getMailList: front.hawkeye + front.stage + '/email/list', // 邮件列表

  addHorseRaceLamp: front.hawkeye + front.stage + '/notice/add', // 添加跑马灯

  getHorseRaceLampList: front.hawkeye + front.stage + '/notice/list', // 跑马灯列表

  updateHorseRaceLamp: front.hawkeye + front.stage + '/notice/update', // 修改跑马灯

  delHorseRaceLamp: front.hawkeye + front.stage + '/notice/remove', // 删除跑马灯

  // stat
  statisticsAll: front.stat + front.stage + '/statistics/overview', // 看板顶部数据统计

  statisticsConsume: front.stat + front.stage + '/statistics/consume', // 游戏消耗点数总览

  consumeAndIncome: front.stat + front.stage + '/statistics/consumeAndIncome', // 售出，收益

  reportInfo: front.stat + front.stage + '/queryUserStat', // 平台报表用户统计

  reportPlayer: front.stat + front.stage + '/queryPlayerStat', // 平台报表用户所属玩家统计

  calcUserStat: front.stat + front.stage + '/calcUserStat', // 报表用户时间查询

  calcPlayerStat: front.stat + front.stage + '/calcPlayerStat',  // 报表玩家时间查询

  //playerExt
  playerAccount: front.playerExt + front.stage + '/player/bill/flow', // 下注返奖流水(查看流水账详单)

  playerBill: front.playerExt + front.stage + '/player/bill/detail', // 账单流水详情信息(查看账单详细)

  playerRecord: front.playerExt + front.stage + '/player/bill/record', // 战绩

  playerDetail: front.playerExt + front.stage + '/player/info', // 玩家详细基本信息

  //stateMachine

  uploadImg: front.stateMachine + front.stage + '/upload', // 上传图片获取签证

  // methods

  get: 'get',

  post: 'post'
}

export default {
  ...api,
  ...front
}
