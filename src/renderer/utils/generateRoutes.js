
/**
 *
 * @param route
 * @param leave
 * @returns {*}
 */
export function hasPermission(route, leave) {
  if (leave) {
    if (route.details) {
      return route.details.some(children => children.checked)
    } else {
      return true
    }
  } else {
    if (route.details) {
      return route.details.some(children => children.checked)
    } else {
      return true
    }
  }
}

/**
 * 过滤数据
 * @param array
 * @param leave
 * @returns {Array}
 */
export function filterDatas(array, leave) {
  const res = []
  array.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(tmp, leave)) {
      if (tmp.details) {
        tmp.children = tmp.details
        tmp.children = filterDatas(tmp.children, leave + 1)
        delete tmp.details
      }
      res.push(tmp)
    }
  })
  return res
}

export async function generateRoutes(array) {
  const filterAfterDatas = await filterDatas(array, 0)
  const res = []
  filterAfterDatas.forEach(item => {
    const { name, model, data_auth, children } = item
    const childRes = []
    switch (name) {
      case '固定资产管理':
        children.forEach((child, index) => {
          const { sub_name, checked } = child
          if (child.sub_name === '资产类别列表') {
            delete children[index]
            childRes.push({
              title: '资产类别',
              show: checked,
              auth: children.filter((item, index) => {
                delete item.authority_module_id
                if (item.sub_name.indexOf('资产类别') >= 0) {
                  delete children[index]
                  return true
                } else if (item.sub_name.indexOf('折旧') >= 0) {
                  delete children[index]
                  return true
                } else {
                  return false
                }
              })
            })
          } else if (child.sub_name === '查询资产') {
            childRes.push({
              title: '资产列表',
              show: checked,
              auth: children.filter((item, index) => {
                delete item.authority_module_id
                if (item.sub_name.indexOf('资产') >= 0 && item.sub_name.indexOf('资产类别') < 0) {
                  delete children[index]
                  return true
                } else {
                  return false
                }
              })
            })
          }
        })
        res.push({
          title: name,
          model: model,
          data_auth: data_auth || 'c',
          show: childRes.some(children => children.show),
          children: childRes
        })
        break
      case '薪资管理':
        children.forEach((child, index) => {
          const { sub_name, checked } = child
          if (child.sub_name === '查看薪资') {
            delete children[index]
            childRes.push({
              title: '员工薪资',
              show: checked,
              auth: children.filter((item, index) => {
                delete item.authority_module_id
                if (item.sub_name.indexOf('薪资') >= 0) {
                  delete children[index]
                  return true
                } else {
                  return false
                }
              })
            })
          }
        })
        res.push({
          title: name,
          model: model,
          data_auth: data_auth || 'c',
          show: childRes.some(children => children.show),
          children: childRes
        })
        break
      case '成本管理':
        children.forEach((child, index) => {
          const { sub_name, checked } = child
          if (child.sub_name === '查看费用科目') {
            delete children[index]
            childRes.push({
              title: '科目管理',
              show: checked,
              auth: []
            })
          } else if (child.sub_name === '查看成本') {
            delete children[index]
            childRes.push({
              title: '成本管理',
              show: checked,
              auth: []
            })
          } else if (child.sub_name === '新增/编辑收入') {
            delete children[index]
            childRes.push({
              title: '收入列表',
              show: checked,
              auth: []
            })
          } else if (child.sub_name !== '查看费用科目' && child.sub_name !== '查看成本' && child.sub_name !== '新增/编辑收入') {
            childRes.push({
              title: '费用列表',
              show: checked,
              auth: children.filter((item, index) => {
                delete item.authority_module_id
                if (item.sub_name.indexOf('查看成本') < 0 && item.sub_name.indexOf('查看费用科目') < 0 && item.sub_name.indexOf('新增/编辑收入') < 0) {
                  delete children[index]
                  return true
                } else {
                  return false
                }
              })
            })
          }
        })
        res.push({
          title: name,
          model: model,
          data_auth: data_auth || 'c',
          show: childRes.some(children => children.show),
          children: childRes
        })
        break
      case '员工管理':
        children.forEach((child, index) => {
          const { sub_name, checked } = child
          if (sub_name.indexOf('员工') >= 0) {
            if (child.sub_name === '查询员工') {
              delete children[index]
              childRes.push({
                title: '员工列表',
                show: checked,
                auth: children.filter((item, index) => {
                  delete item.authority_module_id
                  if (item.sub_name.indexOf('员工') >= 0) {
                    delete children[index]
                    return true
                  } else {
                    return false
                  }
                })
              })
              childRes.push({
                title: '员工审核',
                show: checked,
                auth: []
              })
            }
          } else if (sub_name.indexOf('部门') >= 0) {
            childRes.push({
              title: '组织架构',
              show: true,
              auth: children.filter((item, index) => {
                delete item.authority_module_id
                if (item.sub_name.indexOf('部门') >= 0) {
                  delete children[index]
                  return true
                } else {
                  return false
                }
              })
            })
          }
        })
        res.push({
          title: name,
          model: model,
          data_auth: data_auth || 'c',
          show: childRes.some(children => children.show),
          children: childRes
        })
        break
      case '角色管理':
        children.forEach((child, index) => {
          const { sub_name, checked } = child
          if (child.sub_name === '角色列表') {
            delete children[index]
            childRes.push({
              title: sub_name,
              show: checked,
              auth: children.filter((item, index) => {
                delete item.authority_module_id
                if (item.sub_name.indexOf('角色') >= 0) {
                  delete children[index]
                  return true
                } else {
                  return false
                }
              })
            })
          }
        })
        res.push({
          title: name,
          model: model,
          data_auth: data_auth || 'c',
          show: childRes.some(children => children.show),
          children: childRes
        })
        break
      case '收支管理':
        children.forEach((child, index) => {
          const { sub_name, checked } = child
          if (child.sub_name === '采购单列表') {
            delete children[index]
            childRes.push({
              title: sub_name,
              show: checked,
              auth: children.filter((item, index) => {
                delete item.authority_module_id
                if (item.sub_name.indexOf('采购单') >= 0) {
                  delete children[index]
                  return true
                } else {
                  return false
                }
              })
            })
          } else if (child.sub_name === '收支项管理') {
            delete children[index]
            childRes.push({
              title: '收支项列表',
              show: checked,
              auth: []
            })
          }
        })
        res.push({
          title: name,
          model: model,
          data_auth: data_auth || 'c',
          show: true,
          children: childRes
        })
        break
      case '操作日志':
        children.forEach((child, index) => {
          const { sub_name, checked } = child
          if (child.sub_name === '查询操作日志') {
            delete children[index]
            childRes.push({
              title: '操作日志',
              show: checked,
              auth: []
            })
          }
        })
        res.push({
          title: '系统管理',
          model: model,
          data_auth: data_auth || 'c',
          show: childRes.some(children => children.show),
          children: childRes
        })
        break
      case '视频监控':
        children.forEach((child, index) => {
          const { checked } = child
          if (child.sub_name === '摄像头列表') {
            delete children[index]
            childRes.push({
              title: '摄像头列表',
              show: checked,
              auth: []
            })
          }
        })
        res.push({
          title: '视频监控4',
          model: model,
          data_auth: data_auth || 'c',
          show: childRes.some(children => children.show),
          children: childRes
        })
        break
    }
  })
  return res
}
