const variable = {
  islogin: false,
  isloading: false,
  isSlider: false,
  token: '',
  userInfo: {},
  nowIndex: '', // 当前所在页面
  steps: 0, // 创建线路商或商户步骤条
  condition: {}, // 搜索框搜索条件

  nowUser: {}, // 在列表上操作的用户的数据

  playerDetail: [], // 玩家详细

  boothType: '', // 存储展位类别状态

  gameList: [], // 游戏后台游戏列表

  operatorList: [], // 游戏后台游戏商列表

  searchOld: '', // 游戏后台搜索数据存储

  gameReadyDetailInfo: '', // 存储游戏详细信息

  gameDetailInfo: '', // 游戏供应商详细

  getSuccessOperator: '', // 游戏运营成功后商详细数据

  getSuccessGame: '', // 游戏列表成功后详细数据

  getSearchGame: '', // 搜索存储游戏数据

  getSearchOperator: '', // 搜索存储游戏商数据
  visitedViews: [],

  activeIndex: null,

  tabIndex: null,

  operatorItem: '', // 游戏供应商单条数据存储

  gameOneItem: '', // 游戏列表单条数据存储

  isEdit: false
}

export default {
  ...variable
}
