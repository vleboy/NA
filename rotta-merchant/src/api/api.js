const front = {
  stage:'dev', // 接口类型

  zues: zues_URL, // zues有关接口

  hulk: hulk_URL, // hulk有关接口

  Javis: Javis_URL, // javis有关接口

  diana: diana_URL, // diana有关接口

  thor: thor_URL, // thor有关接口

  hera: hera_URL, // hera有关接口

  hawkeye: hawkeye_URL, // hawkeye有关接口

  stat: stat_URL // stat有关接口
}

const api = {
  // zues

  createAdmin: front.zues + front.stage + '/admins', // 创建管理员接口

  adminCenter: front.zues + front.stage + '/admin_center', // 管理员个人中心接口

  createUser: front.zues + front.stage + '/users', // 创建线路商/一般商户接口

  randomPassword: front.zues + front.stage + '/random_password', // 随机生成密码接口

  randomCaptcha: front.zues + front.stage + '/captcha', // 随机生成验证码

  login: front.zues + front.stage + '/users/auth', // 所有用户登录接口

  checkUserExist: front.zues + front.stage + '/checkUserExist', // 检查用户标识是否存在

  managers: front.zues + front.stage + '/managers', // 线路商数据接口

  merchants: front.zues + front.stage + '/merchants', // 一般商户数据接口

  getchilds: front.zues + front.stage + '/childList', // 查询下级接口

  userStatus: front.zues + front.stage + '/userChangeStatus', // 锁定解锁用户接口

  checkMSN: front.zues + front.stage + '/check_msn', // 检查线路号是否重复接口

  msnLock: front.zues + front.stage + '/lockmsn', // 锁定解锁线路号接口

  msnList: front.zues + front.stage + '/msnList', // 线路号列表接口

  randomMSN: front.zues + front.stage + '/msnRandom', // 随机生成线路号接口

  parentList: front.zues + front.stage + '/avalible_managers', // 获取可用上级接口

  adminList: front.zues + front.stage + '/admins', // 管理员列表

  checkDisplayName: front.zues + front.stage + '/checkNickExist', // 验证昵称是否重复

  changePassword: front.zues + front.stage + '/updatePassword', // 修改密码

  userRight: front.zues + front.stage + '/subRoleList', // 获取创建管理角色

  getSign: front.zues + front.stage + '/game/sign', // 获取游戏后台跳转链接签名

  // diana

  allGames: front.diana + front.stage + '/gameType', // 获取游戏类型列表

  gameList: front.diana + front.stage + '/gameList', // 获取游戏列表

  changeGame: front.diana + front.stage + '/gameChangeStatus', // 操作游戏状态接口

  lineUp: front.diana + front.stage + '/queueNew', // 排队设置

  lineUpGet: front.diana + front.stage + '/configOne', // 排队设置获取

  // hulk

  billTransfer: front.hulk + front.stage + '/billTransfer', // 存提点接口

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

  forzenPlay: front.hera + front.stage + '/player/forzen', // 单个解冻、已锁定

  allForzenPlay: front.hera + front.stage + '/player/batch/forzen', // 单个解冻、已锁定

  // thor

  addBooth: front.thor + front.stage + '/seatNew', // 新增展位

  boothList: front.thor + front.stage + '/seatList', // 展位列表

  changeBoothStatus: front.thor + front.stage + '/seatChangeStatus', // 展位状态变更

  updateBooth: front.thor + front.stage + '/seatUpdate', // 修改展位

  delBooth: front.thor + front.stage + '/seatDelete', // 删除展位

  propList: front.thor + front.stage + '/toolList', // 道具列表

  getBoothType: front.thor + front.stage + '/seatType', // 展位类别

  packageList: front.thor + front.stage + '/packageList', // 礼包列表

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

  // methods

  get: 'get',

  post: 'post'
}

export default {
  ...api,
  ...front
}
