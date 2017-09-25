const variable = {
  islogin: false,
  isloading: false,
  isSlider: false,
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

  personalbills: '', // 商户个人中心余额

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

  adminList: [], // 管理员列表

  bills: '', // 个人中心用户余额

  msnList: [], // 线路号列表
  copymsnList: [], // 线路号列表副本
  msn: '', // 搜索的线路号

  playerDetail: [], // 玩家详细

  boothType: '', // 存储展位类别状态
  visitedViews: [],
  activeIndex: null,
  tabIndex: null
}

export default {
  ...variable
}
