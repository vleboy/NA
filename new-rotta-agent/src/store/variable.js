const variable = {
  // 标签页
  visitedViews: [], // 标签页
  activeIndex: null, // 标签页选中状态
  tabIndex: null,  // 标签页索引
  // 看板
  // 个人中心
  personal_info: [], // 代理个人中心数据
  personal_waterfall: [], // 代理个人中心流水
  personal_bills: 0 // 代理个人中心余额
}
export default {
  ...variable
}
