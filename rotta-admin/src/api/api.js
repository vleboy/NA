const front = {
  stage:'dev', // 接口类型

  zues: zues_URL, // zues有关接口

  hulk: hulk_URL, // hulk有关接口

  Javis: Javis_URL, // javis有关接口

  diana: diana_URL, // diana有关接口

  thor: thor_URL, // thor有关接口

  hera: hera_URL, // hera有关接口

  hawkeye: hawkeye_URL, // hawkeye有关接口

  stat: stat_URL, // stat有关接口

  other: other_URL, // other接口 （针对老曾）

  stateMachine: stateMachine_URL, // stateMachine接口

  playerExt: playerExt_URL // playerExt接口
}

const api = {
  // zues

  createAdmin: front.zues + front.stage + '/admins', // 创建管理员接口

  adminCenter: front.zues + front.stage + '/admin_center', // 管理员个人中心接口

  createUser: front.zues + front.stage + '/users', // 创建线路商/一般商户接口

  randomPassword: front.zues + front.stage + '/random_password', // 随机生成密码接口

  randomCaptcha: front.zues + front.stage + '/captcha', // 随机生成验证码

  login: front.zues + front.stage + '/users/auth', // 所有用户登录接口

  checkExist: front.zues + front.stage + '/checkExist', // 检查用户 标识,昵称,账号,sn 是否存在

  managers: front.zues + front.stage + '/managers', // 线路商数据接口

  merchants: front.zues + front.stage + '/merchants', // 一般商户数据接口

  getchilds: front.zues + front.stage + '/childList', // 查询下级接口

  userStatus: front.zues + front.stage + '/userChangeStatus', // 停用开启用户接口

  checkMSN: front.zues + front.stage + '/check_msn', // 检查线路号是否重复接口

  msnLock: front.zues + front.stage + '/lockmsn', // 停用开启线路号接口

  msnList: front.zues + front.stage + '/msnList', // 线路号列表接口

  randomMSN: front.zues + front.stage + '/msnRandom', // 随机生成线路号接口

  parentList: front.zues + front.stage + '/avalible_managers', // 获取可用上级接口

  adminList: front.zues + front.stage + '/adminList', // 管理员列表

  changePassword: front.zues + front.stage + '/updatePassword', // 修改密码

  userRight: front.zues + front.stage + '/subRoleList', // 获取创建管理角色

  getSign: front.zues + front.stage + '/game/sign', // 获取游戏后台跳转链接签名

  adminUpdate: front.zues + front.stage + '/adminUpdate', // 更新管理员角色

  merchantTTGList: front.zues + front.stage + '/merchantTTGList', // 获取TTG游戏列表

  merchantTTGUpdate : front.zues + front.stage + '/merchantTTGUpdate ', // 编辑TTG游戏

  // diana

  gameType: front.diana + front.stage + '/gameType', // 获取游戏厂商

  gameBigType: front.diana + front.stage + '/gameBigType', // 获取游戏大类

  companySelect: front.diana + front.stage + '/companySelect', // 获取运营商

  gameList: front.diana + front.stage + '/gameList', // 获取游戏列表

  changeGame: front.diana + front.stage + '/gameChangeStatus', // 操作游戏状态接口

  lineUp: front.diana + front.stage + '/queueNew', // 排队设置

  lineUpGet: front.diana + front.stage + '/configOne', // 排队设置获取

  subRoleList: front.diana + front.stage + '/subRoleList', // 管理员权限列表

  subRolePermissionList: front.diana + front.stage + '/subRolePermissionList', // 管理员所有权限

  subRoleUpdate: front.diana + front.stage + '/subRoleUpdate', // 更新权限角色

  subRoleNew: front.diana + front.stage + '/subRoleNew', // 新增权限角色

  subRoleDelete: front.diana + front.stage + '/subRoleDelete', // 删除权限角色

  configMultList: front.diana + front.stage + '/configMultList', // 获取电子游戏配置列表

  configMultNew: front.diana + front.stage + '/configMultNew', // 设置电子游戏配置列表

  configOne: front.diana + front.stage + '/configOne', // 查看神秘大奖

  configNew: front.diana + front.stage + '/configNew ', // 新增神秘大奖
  // hulk

  billTransfer: front.hulk + front.stage + '/billTransfer', // 加减点接口

  bills: front.hulk + front.stage + '/bills', // 查询用户余额

  waterFall: front.hulk + front.stage + '/waterfall', // 查询用户账单明细

  loginList: front.hulk + front.stage + '/logList', // 登录日志

  addGameNotice: front.hulk + front.stage + '/adNew', // 新增游戏公告列表

  getGameNoticeList: front.hulk + front.stage + '/adList', // 获取游戏公告列表

  updateGameNotice: front.hulk + front.stage + '/adUpdate', // 修改公告列表

  changeGameNoticeStatus: front.hulk + front.stage + '/adChangeStatus', // 更改状态

  delGameNotice: front.hulk + front.stage + '/adDelete', // 更改状态

  // javis

  getUploadImgToken: front.Javis + front.stage + '/upToken', // 获取七牛云token

  map: front.Javis + front.stage + '/organize', // 层级关系接口

  // hera

  getPlayList: front.hera + front.stage + '/player/list', // 玩家列表

  getPlayDetail: front.hera + front.stage + '/player/bill/info', // 玩家详情

  forzenPlay: front.hera + front.stage + '/player/forzen', // 单个解冻、已停用

  allForzenPlay: front.hera + front.stage + '/player/batch/forzen', // 单个解冻、已停用

  // thor

  addBooth: front.thor + front.stage + '/seatNew', // 新增展位

  boothList: front.thor + front.stage + '/seatList', // 展位列表

  changeBoothStatus: front.thor + front.stage + '/seatChangeStatus', // 展位状态变更

  updateBooth: front.thor + front.stage + '/seatUpdate', // 修改展位

  delBooth: front.thor + front.stage + '/seatDelete', // 删除展位

  propList: front.thor + front.stage + '/toolList', // 道具列表

  getBoothType: front.thor + front.stage + '/seatType', // 展位类别

  packageList: front.thor + front.stage + '/packageList', // 礼包列表

  seatAllList : front.thor + front.stage + '/seatAllList ', // 商户运营记录展位列表

  toolSetPrice : front.thor + front.stage + '/toolSetPrice ', // 道具定价

  boothReplace  : front.thor + front.stage + '/seatTigger ', // 展位替换

  // hawkeye

  addMail: front.hawkeye + front.stage + '/email/add', // 添加邮件

  getMailList: front.hawkeye + front.stage + '/email/list', // 邮件列表

  addHorseRaceLamp: front.hawkeye + front.stage + '/notice/add', // 添加跑马灯

  getHorseRaceLampList: front.hawkeye + front.stage + '/notice/list', // 跑马灯列表

  updateHorseRaceLamp: front.hawkeye + front.stage + '/notice/update', // 修改跑马灯

  delHorseRaceLamp: front.hawkeye + front.stage + '/notice/remove', // 删除跑马灯

  mapPlayer: front.hawkeye + front.stage + '/player/list', // 层级关系商户玩家

  // stat

  statisticsAll: front.stat + front.stage + '/statistics/overview', // 看板顶部数据统计

  statisticsConsume: front.stat + front.stage + '/statistics/consume', // 游戏消耗点数总览

  consumeAndIncome: front.stat + front.stage + '/statistics/consumeAndIncome', // 售出，收益

  reportInfo: front.stat + front.stage + '/queryUserStat', // 平台报表用户统计

  reportPlayer: front.stat + front.stage + '/queryPlayerStat', // 平台报表用户所属玩家统计

  calcUserStat: front.stat + front.stage + '/calcUserStat', // 报表用户时间查询

  calcPlayerStat: front.stat + front.stage + '/calcPlayerStat',  // 报表玩家时间查询

  //other

  statisticsGame: front.other + 'g40001/gamestats', // 获取风控中心电子游戏顶部统计数据接口

  canvasGame: front.other + 'g40001/rtpstats', // 获取风控中心电子游戏图表数据

  //stateMachine

  uploadImg: front.stateMachine + front.stage + '/upload', // 上传图片获取签证

  mysteryList: front.stateMachine + front.stage + '/mysteryList', // 神秘大奖列表

  mysteryOperate : front.stateMachine + front.stage + '/mysteryOperate ', // 操作神秘大奖

  //playerExt
  playerAccount: front.playerExt + front.stage + '/player/bill/flow', // 下注返奖流水(查看流水账详单)

  playerBill: front.playerExt + front.stage + '/player/bill/detail', // 账单流水详情信息(查看账单详细)

  playerRecord: front.playerExt + front.stage + '/player/bill/record', // 战绩

  playerDetail: front.playerExt + front.stage + '/player/info', // 玩家详细基本信息

  // methods
  get: 'get',

  post: 'post'
}

export default {
  ...api,
  ...front
}
