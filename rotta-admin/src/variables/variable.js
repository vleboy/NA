const variable = {
  isSlider: false, // 是否显示层级关系
  islogin: false,
  isloading: false,
  mapLoading: false, // 层级关系loading
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

  map: [], // 管理员层级关系

  nowParent: '', // 创建页面默认上级线路商

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
    gameList: [], // 拥有游戏
    username: '', // 代理商管理员用户名
    password: '', // 代理商管理员密码
    adminName: '', // 代理商管理员姓名
    adminEmail: '', // 代理商管邮箱
    adminContact: '' // 代理商管理员联系方式
  }, // 创建线路商信息

  comcreate: {
    role: '100',
    suffix: '', // 商户标识
    displayName: '', // 商户昵称
    rate: '', // 商户抽成比
    merchantEmail: '', // 商户邮箱
    hostName: '', // 负责人
    hostContact: '', // 负责人联系方式
    parent: '', // 所属代理商
    remark: '', // 备注
    contractPeriod: [], // 生效时间
    isforever: false, // 是否永久有效
    points: '', // 初始代理点数
    msn: '', // 线路号
    gameList: [], // 拥有游戏
    loginWhiteList: '', // 商户白名单
    frontURL: '', // 商户前端域名
    username: '', // 商户管理员用户名
    password: '', // 商户管理员密码
    adminName: '', // 商户管理员姓名
    adminEmail: '', // 商户管理员邮箱
    adminContact: '' // 商户管理员联系方式
  }, // 创建一般商户信息

  nowUser: {}, // 在列表上操作的用户的数据

  outsuccess: {}, // 创建线路商成功后返回的数据
  comsuccess: {}, // 创建一般商户成功后返回的数据

  outparentBills: '', // 上级线路商余额
  comparentBills: '', // 上级商户余额

  outdetailID: '', // 查看线路商详情页的该用户ID
  comdetailID: '', // 查看线路商详情页的该用户ID

  outdetaildata: {}, // 线路商详情页基本数据
  comdetaildata: {}, // 商户详情页基本数据

  outdetailproperty: [], // 线路商详情页财务信息数据
  outdetailmanagers: [],  // 线路商下级线路商列表数据
  outdetailmerchants: [], // 线路商下级商户列表数据

  comdetailproperty: [], // 商户详情页财务信息数据

  personalinfo: {}, // 管理员基本信息
  personalproperty: [], // 管理员点数操作记录

  storeDialog: false, // 加点框状态
  withdrawDialog: false, // 减点框状态

  storePoints: {
    fromUserId: '',
    toRole: '',
    toUser: '',
    amount: '',
    remark: ''
  }, // 加点明细
  withdrawPoints: {
    fromUserId: '',
    toRole: '',
    toUser: '',
    amount: '',
    remark: ''
  }, // 减点明细

  partLoading: {
    infoLoading: true,
    billLoading: true,
    form_one_Loading: true,
    form_two_Loading: true,
  }, // 局部loading

  pointsIndex: '', // 加减点发起方式
  pointsObject: {}, // 对详情页用户发起加减点操作的下级信息

  allgames: [], // 游戏中该用户所有游戏
  companyList: [], // 游戏中心游戏运营商
  companyGame: [], // 游戏中心游戏运营商游戏

  managerLoginList: [], // 线路商登录日志
  copyManagerLoginList: [], // 线路商登录日志副本

  merchantLoginList: [], // 商户登录日志
  copyMerchantLoginList: [], // 商户登录日志副本

  adminCooperdate: [], // 管理员操作日志

  adminList: [], // 管理员列表
  copyAdminlist: [], // 管理员列表副本

  bills: '', // 个人中心用户余额

  msnList: [], // 线路号列表
  copymsnList: [], // 线路号列表副本
  msn: '', // 搜索的线路号

  playerDetail: [], // 玩家详细

  boothType: '', // 加储展位类别状态
  visitedViews: [],
  activeIndex: null,
  tabIndex: null,

  firstKey: '', // 后端分页开始键
  lastKey: '', // 后端分页结束键

  rightList: [], // 管理员权限列表
  allRight: [], //管理员所有权限

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
  }, // TTG电子游戏报表数据

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
