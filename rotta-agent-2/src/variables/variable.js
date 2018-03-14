const variable = {
  agentSearchData: '', // 代理中心代理搜索条件
  playerSearchData: '', // 代理中心玩家搜索条件
  mapUser: '', // 组织架构当前选中项
  selfData: [], // 代理列表自己的数据
  agentPlayer: [], // 代理所属玩家
  copyagentPlayer: [], // 代理所属玩家拷贝数据
  listId: '', // 代理列表代理Id
  isSlider: true, // 是否显示组织架构
  map: [], // 代理组织架构
  nowParent: '', // 上级代理ID
  islogin: false,
  isloading: false,
  token: '',
  userInfo: {},
  nowIndex: '', // 当前所在页面
  steps: 0, // 创建线路商或商户步骤条
  condition: {}, // 搜索框搜索条件
  isEdit: false, // 是否开启编辑菜单
  outlist: [], // 线路商列表
  comlist: [], // 商户列表

  copyoutlist: [], // 线路商列表拷贝数据
  copycomlist: [], // 商户列表拷贝数据

  outcreate: {
    role: '10',
    suffix: '', // 线路商标识
    displayName: '', // 线路商昵称
    rate: '', // 线路商抽成比
    managerEmail: '', // 线路商邮箱
    parent: '', // 上级线路商
    remark: '', // 备注
    hostName: '', // 负责人
    hostContact: '', // 负责人联系方式
    contractPeriod: [], // 生效时间
    isforever: false, // 是否永久有效
    points: '', // 初始代理点数
    limit: '', // 可放名额
    gameList: [], // 拥有游戏
    username: '', // 代理商管理员用户名
    password: '', // 代理商管理员密码
    adminName: '', // 代理商管理员姓名
    adminEmail: '', // 代理商管邮箱
    adminContact: '' // 代理商管理员联系方式
  }, // 创建线路商信息

  comcreate: {
    role: '1000',
    displayName: '', // 代理昵称
    rate: '', // 代理抽成比
    parent: '', // 上级代理
    remark: '', // 备注
    gameList: [], // 代理游戏
    contractPeriod: [], // 生效时间
    isforever: false, // 是否永久有效
    points: '', // 代理点数
    agentEmail: '', // 代理邮箱
    username: '', // 代理用户名
    password: '' // 代理登录密码
  }, // 创建代理信息

  dialogObj: {}, // 代理存提点对象

  nowUser: {}, // 在列表上操作的用户的数据

  outsuccess: {}, // 创建线路商成功后返回的数据
  comsuccess: {}, // 创建一般商户成功后返回的数据

  outparentBills: '', // 上级线路商余额
  comparentBills: '', // 上级商户余额

  personalBills: '', // 个人中心余额

  outdetailID: '', // 查看线路商详情页的该用户ID
  comdetailID: '', // 查看线路商详情页的该用户ID
  parentGame: '', // 上级游戏

  outdetaildata: {}, // 线路商详情页基本数据
  comdetaildata: {}, // 商户详情页基本数据

  detailPlayer: [], // 代理详情页玩家数据

  outdetailproperty: [], // 线路商详情页财务信息数据
  outdetailmanagers: [],  // 线路商下级线路商列表数据
  outdetailmerchants: [], // 线路商下级商户列表数据

  comdetailproperty: [], // 商户详情页财务信息数据

  personalinfo: {}, // 管理员基本信息
  personalproperty: [], // 管理员点数操作记录

  storeDialog: false, // 存点框状态
  withdrawDialog: false, // 提点框状态

  storePoints: {
    fromUserId: '',
    toRole: '',
    toUser: '',
    amount: '',
    remark: ''
  }, // 存点明细
  withdrawPoints: {
    fromUserId: '',
    toRole: '',
    toUser: '',
    amount: '',
    remark: ''
  }, // 提点明细

  pointsIndex: '', // 存提点发起方式
  pointsObject: {}, // 对详情页用户发起存提点操作的下级信息

  gameListData: [], // 游戏中心游戏类型列表

  managerLoginList: [], // 线路商登录日志
  merchantLoginList: [], // 商户登录日志

  adminCooperdate: [], // 管理员操作日志

  detailChild: [], // 详情页下级代理数据

  adminList: [], // 管理员列表

  msnList: [], // 线路号列表
  copymsnList: [], // 线路号列表副本
  msn: '', // 搜索的线路号

  playerDetail: [], // 玩家详细

  boothType: '', // 存储展位类别状态

  agentPlayerName: '', // 代理页面直属玩家跳转至玩家详细保存userName
  visitedViews: [],
  activeIndex: null,
  tabIndex: null,

  allGameData: {
    allNowlist: [],
    allNowchild: [],
    allNowplayer: [],
    nowUserID: ''
  }, // 公司所有游戏报表数据

  naAllGameData: {
    allNowlist: [],
    allNowchild: [],
    allNowplayer: [],
    nowUserID: ''
  }, // NA所有游戏报表数据

  naVedioGameData: {
    nowList: [],
    nowChildList: [],
    nowPlayerlist: [],
    nowUserID: ''
  }, // NA电子游戏报表数据

  naLiveGameData: {
    nowList: [],
    nowChildList: [],
    nowPlayerlist: [],
    nowUserID: ''
  }, // NA真人游戏报表数据

  naArcadeGameData: {
    nowList: [],
    nowChildList: [],
    nowPlayerlist: [],
    nowUserID: ''
  }, // NA街机游戏报表数据

  naMallData: {
    mallNowList: [],
    mallNowChild: [],
    mallNowplayer: [],
    nowUserID: ''
  }, // NA商城报表数据

  ttgVedioGameData: {
    nowList: [],
    nowChildList: [],
    nowPlayerlist: [],
    nowUserID: ''
  }, // PT电子游戏报表数据

  saLiveGameData: {
    nowList: [],
    nowChildList: [],
    nowPlayerlist: [],
    nowUserID: ''
  }, // SA真人游戏报表数据

  playerGameType: '', // 玩家玩的游戏类别（大类）

  playerUserName: '' // 存储玩家用户名

}

export default {
  ...variable
}
