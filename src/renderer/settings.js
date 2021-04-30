module.exports = {
  /**
   * @type {number} 1100
   * @description 窗口的宽度
   */
  windowWidth: 1100,

  /**
   * @type {number} 700
   * @description 窗口的高度
   */
  windowHeight: 700,

  /**
   * @type {string}
   * @description 系统名称
   */
  title: '系统名称',

  /**
   * @type {boolean} true | false
   * @description 开启调试功能面板
   */
  isDevTools: true,

  /**
   * @type {boolean} true | false
   * @description 显示/隐藏窗口边框及菜单
   */
  showFrame: false,

  /**
   * @type {boolean} true | false
   * @description 是/否可放大
   */
  isResizable: false,

  /**
   * @type {boolean} true | false
   * @description Whether show the settings right-panel
   */
  showSettings: false,

  /**
   * @type {boolean} true | false
   * @description Whether need tagsView
   */
  tagsView: false,

  /**
   * @type {boolean} true | false
   * @description Whether fix the header
   */
  fixedHeader: true,

  /**
   * @type {boolean} true | false
   * @description Whether show the logo in sidebar
   */
  sidebarLogo: true,

  /**
   * 通知
   * @type {boolean} true | false
   */
  showNotice: true,

  /**
   * @type {string | array} 'production' | ['production', 'development']
   * @description Need show err logs component.
   * The default is only used in the production env
   * If you want to also use it in dev, you can pass ['production', 'development']
   */
  errorLog: 'production'
}
