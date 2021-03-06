import request from '@/utils/request'
const group_name = 'gathering'
const api_name = 'gathering'
export default {
  page(page,limit) {
    return request({
      url: `/${group_name}/${api_name}/page?page=`+page+'&limit='+limit+'&state=1',
      method: 'get'
    })
  },
  save(pojo) {
    return request({
      url: `/${group_name}/${api_name}`,
      method: 'post',
      data: pojo
    })
  },
  findById(id) {
    return request({
      url: `/${group_name}/${api_name}/${id}`,
      method: 'get'
    })
  },
  update(id, pojo) {
    if (id === null || id === '') {
      return this.save(pojo)
    }
    return request({
      url: `/${group_name}/${api_name}/${id}`,
      method: 'put',
      data: pojo
    })
  },
  deleteById(id) {
    return request({
      url: `/${group_name}/${api_name}/${id}`,
      method: 'delete'
    })
  },
  join (id) {
    return request({
      url: `/${group_name}/${api_name}/usergath/${id}`,
      method: 'get'
    })
  },
    myjoin() {
        return request({
            url: `/${group_name}/${api_name}/myjoin`,
            method: 'get'
        })
    },
    mygathing() {
        return request({
            url: `/${group_name}/${api_name}/mygathering`,
            method: 'get'
        })
    },
    joinList(id) {
        return request({
            url: `/${group_name}/${api_name}/joinList/${id}`,
            method: 'get'
        })
    },
    exportTable(id) {
        return request({
            url: `/${group_name}/${api_name}/export/${id}`,
            method: 'get'
        })
    }
}
