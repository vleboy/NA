const front = {
  test: test_URL, // zues有关接口

  game: game_URL, // hulk有关接口
}

const api = {
  // zues
  randomCaptcha: front.test+'/captcha', // 随机生成验证码

  login: front.test + '/users/auth', // 所有用户登录接口

  // diana

  allGames: front.game + '/gameType', // 获取游戏类型列表

  gameBigType: front.game + '/gameBigType', // 获取游戏类别

  gameList: front.game + '/gameList', // 获取游戏列表

  gameOne: front.game + '/gameOne', // 单个游戏信息

  addGame: front.game + '/games', // 新增游戏

  changeGame: front.game + '/gameChangeStatus', // 操作游戏状态接口

  companyList: front.game + '/companyList', // 游戏商列表

  companyOne: front.game + '/companyOne', // 查询单个供应商

  addCompanyNew: front.test + '/companyNew', // 新增游戏供应商

  companyUpdate: front.game + '/companyUpdate', // 修改游戏供应商

  changeCompany: front.game + '/companyChangeStatus',

  companySelect: front.game + '/companySelect', // 获取供应商标识

  gameUpdate: front.game + '/gameUpdate', // 修改游戏数据

  configMultList: front.test + '/configMultList', // 获取游戏配置列表

  configMultNew: front.test + '/configMultNew', // 新增、编辑游戏配置

  configMultDel: front.test + '/configMultDel', // 删除游戏配置

  addGameNotice: front.test + '/adNew', // 新增游戏公告列表

  propList: front.game + '/toolList', // 道具列表

  getBoothType: front.test + '/seatType', // 展位类别

  changeState: front.game + '/toolChangeStatus', // 修改道具状态

  addProp: front.game + '/toolNew', // 新增道具

  delProp: front.game + '/toolDelete', // 删除道具

  updateProp: front.game + '/toolUpdate', // 修改道具

  packageList: front.game + '/packageList', // 礼包列表

  addPackage: front.game + '/packageNew', // 新增礼包

  changePackageStatus: front.game + '/packageChangeStatus', // 变更礼包状态

  packageUpdate: front.game + '/packageUpdate', // 修改礼包

  packageDelete: front.game + '/packageDelete', // 删除礼包

  uploadImg: front.test + '/upload', // 上传图片获取签证

  // methods

  get: 'get',

  post: 'post'
}

export default {
  ...api,
  ...front
}
