<template>
  <div>
    <section class="w mt30 clearfix">
      <y-shelf title="捐赠名单">
        <div slot="content" class="table">
          <p>佛祖保佑这些好心人写程序永无BUG，工资翻倍，长命百岁，迎娶白富美，走上人生巅峰！</p>
          <el-table
            border
            :data="tableData"
            :default-sort="{prop: 'date', order: 'descending'}"
            stripe
            style="width: 90%"
          >
            <el-table-column sortable prop="nickName" label="昵称" align="center"></el-table-column>
            <el-table-column sortable prop="username" label="登录账号" align="center"></el-table-column>
            <el-table-column sortable prop="money" label="捐赠金额(￥)" align="center"></el-table-column>
            <el-table-column sortable prop="info" label="捐赠人信息" align="center"></el-table-column>
            <el-table-column sortable prop="time" label="时间" align="center"></el-table-column>
          </el-table>

          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[5, 10, 20, 50]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next"
            :total="total"
          ></el-pagination>
        </div>
      </y-shelf>
    </section>

    <section class="w mt30 clearfix">
      <y-shelf title="为什么要捐赠">
        <div slot="content" class="donate">
          <p>捐赠是国外用来支持开发者和资源贡献者的一种常见的方式。</p>
          <p>这些开发者不通过加入广告或者进行第三方推广获得收入，</p>
          <p>仅通过使用的用户自己主动捐赠来表达对开发者的感谢！</p>
          <p>当一个非盈利项目仅仅依靠兴趣的支撑，很难确定它还能走多远。</p>
          <p>所有的捐赠都将用于提升我的环境配置，维持网站的运行和提高我的积极性。</p>
          <p>这个渠道的存在并不意味着你必须捐赠。</p>
          <p>你也可以不做任何事。你的捐赠意味着你对我过去所做的表示感谢，而不是表达对未来的期望。</p>
          <p>但你的捐赠会提高我的积极性和设备配置让我努力把手头上的事做的更好。</p>
          <p>我会维护一份名单以感谢所有的捐赠者。正如我所说，捐赠是一个向我表示感谢的方式。</p>
        </div>
      </y-shelf>
    </section>

    <section class="w mt30 clearfix">
      <y-shelf title="我要捐赠">
        <div slot="content" class="hot">
          <mall-goods :msg="item" v-for="(item,i) in hot" :key="i"></mall-goods>
        </div>
      </y-shelf>
    </section>

    <div id="SOHUCS" sid="123456" style="width:1218px;"></div>
  </div>
</template>
<script>
import { productHome, thanksList } from '/api/index.js'
import YShelf from '/components/shelf'
import product from '/components/product'
import mallGoods from '/components/mallGoods'
require('../../../static/changyan/changyan.js')
export default {
  data() {
    return {
      banner: {},
      floors: [],
      hot: [],
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      total: 0
    }
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val
      this._thanksList()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this._thanksList()
    },
    _thanksList() {
      const params = {
        params: {
          size: this.pageSize,
          page: this.currentPage
        }
      }
      thanksList(params).then(res => {
        this.tableData = res.result.data
        this.total = res.result.recordsTotal
      })
    }
  },
  mounted() {
    productHome().then(res => {
      const data = res.result
      this.floors = data.home_floors
      this.hot = data.home_hot
    })
    this._thanksList()
    window.changyan.api.config({
      appid: 'cyrV7vlR4',
      conf: 'prod_3163726f95fdac5ad0531c2344fc86ea'
    })
  },
  components: {
    YShelf,
    product,
    mallGoods
  }
}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.sk_item {
  width: 170px;
  height: 225px;
  padding: 0 14px 0 15px;
  > div {
    width: 100%;
  }
  a {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: all 0.3s;
    &:hover {
      transform: translateY(-5px);
    }
  }
  img {
    width: 130px;
    height: 130px;
    margin: 17px 0;
  }
  .sk_item_name {
    color: #999;
    display: block;
    max-width: 100%;
    _width: 100%;
    overflow: hidden;
    font-size: 12px;
    text-align: left;
    height: 32px;
    line-height: 16px;
    word-wrap: break-word;
    word-break: break-all;
  }
  .sk_item_price {
    padding: 3px 0;
    height: 25px;
  }
  .price_new {
    font-size: 18px;
    font-weight: 700;
    margin-right: 8px;
    color: #f10214;
  }
  .price_origin {
    color: #999;
    font-size: 12px;
  }
}

.box {
  overflow: hidden;
  position: relative;
  z-index: 0;
  margin-top: 29px;
  box-sizing: border-box;
  border: 1px solid rgba(0, 0, 0, 0.14);
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 3px 8px -6px rgba(0, 0, 0, 0.1);
}

ul.box {
  display: flex;
  li {
    flex: 1;
    img {
      display: block;
      width: 305px;
      height: 200px;
    }
  }
}

.mt30 {
  margin-top: 30px;
}

.hot {
  display: flex;
  > div {
    flex: 1;
    width: 25%;
  }
}

.table {
  align-items: center;
  display: flex;
  flex-direction: column;
  p {
    font-size: 18px;
    margin-top: 2vw;
    // color: #5683EA;
  }
  .el-table {
    // margin: 5vw 8vw 2vw 8vw;
    margin: 2vw 0 2vw 0vw;
  }
  .el-pagination {
    align-self: flex-end;
    margin: 0 3.5vw 2vw;
  }
}

.donate {
  // align-items: center;
  display: flex;
  flex-direction: column;
  margin: 1vw 3vw 2vw 3vw;
  p {
    font-size: 16px;
    margin-top: 1vw;
  }
}

.floors {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  .imgbanner {
    width: 50%;
    height: 430px;
  }
  img {
    display: block;
    width: 100%;
    height: 100%;
  }
}
</style>
