import router from './router'
import 'nprogress/nprogress.css' // progress bar style
import getPageTitle from '@/utils/get-page-title'
router.beforeEach(async(to, from, next) => {
  // start progress bar
  // set page title
  document.title = getPageTitle(to.meta.title)
  if (to.matched.some(function (record) {
    return record.meta.requireAuth;
  })){
    next()
  }else{
    next()
  }
})

router.afterEach(() => {
  // finish progress bar
})
