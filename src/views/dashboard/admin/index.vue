<template>
  <div class="dashboard-editor-container">
    <el-divider/>
    <div style="font-size: 300px; color: #2b9c9c">A/B Test</div>
    <el-divider/>
    <div>
      <h2>背景</h2>
      <span>
  如今，大多数互联网产品野蛮生长的时代已经过去，人口红利到顶，产品策略需要从快糙猛的跑马圈地方式转向深耕细作的精细化运营方式，要精细化运营。一方面业务人员无法承担其中任何一个错误特性直接影响用户体验的严重后果，另一方面业务人员又希望能够分离并量化每个特性的影响。因此，我们需要设计并坚持使用一套数据驱动的方法[1]，使得业务人员可以以较小的风险对新feature进行评估，积极试错积累经验；并且我们设计的该方法有能力排除其他因素（比如同时开发的其他feature以及时间因素等）的干扰；最后，除了“好”或者“不好”，我们希望这个方法最好也能够给出定量的结果。
为了解决上述问题，普遍使用的方法论是小流量随机实验，也就是我们常说的A/B实验。
        <h3>现状和意义</h3>
  实际上，A/B实验早就广泛地应用于科研领域，比如医学界会使用A/B实验来判断药品在治疗某种疾病时是否真的有效（实验中一半患者会领到药品，另一半患者会在不知情的情况下，领到与药品外形一样的安慰剂）。现如今，A/B实验的思想被引入互联网领域，广泛地应用于互联网产品的增长之中。
A/B实验方法使得企业利用大量的实验，能够不断提高自己的试错能力、提升试错效率、降低试错风险。从某种程度上来说，互联网企业的实力与其实施A/B实验的能力紧密相关。

      </span>
    </div>
  </div>
</template>

<script>
import GithubCorner from '@/components/GithubCorner'
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import RaddarChart from './components/RaddarChart'
import PieChart from './components/PieChart'
import BarChart from './components/BarChart'
import TransactionTable from './components/TransactionTable'
import TodoList from './components/TodoList'
import BoxCard from './components/BoxCard'

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}

export default {
  name: 'DashboardAdmin',
  components: {
    GithubCorner,
    PanelGroup,
    LineChart,
    RaddarChart,
    PieChart,
    BarChart,
    TransactionTable,
    TodoList,
    BoxCard
  },
  data() {
    return {
      lineChartData: lineChartData.newVisitis
    }
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
