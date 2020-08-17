<template>
  <Layout>
    <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type"></Tabs>
    <div class="chart-wrapper" ref="chartWrapper">
      <Chart class="chart" :options="xyz"/>
    </div>
    <ol>
      <li v-for="(group, index) in groupedList" :key="index">
        <h3 class="title">
          {{beautify(group.title)}}
          <span>
            ￥{{group.total}}
          </span>
        </h3>
        <ol>
          <li v-for="item in group.items" :key="item.id" class="record">
            <span>{{tagString(item.tags)}}</span>
            <span class="note">{{item.notes}}</span>
            <span>￥{{item.amount}}</span>
          </li>
        </ol>
      </li>
    </ol>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Tabs from '@/components/Tabs.vue';
  import recordTypeList from '@/constant/recordTypeList';
  import dayjs from 'dayjs';
  import clone from '@/lib/clone';
  import Chart from '@/components/Chart.vue';
  import _ from 'lodash';
  import day from 'dayjs';

  @Component({
    components: {Tabs, Chart},
  })
  export default class Statistics extends Vue {
    tagString(tags: Tag[]) {
      return tags.length === 0 ? '无' : tags.join(',');
    }

    beautify(string: string) {
      const day = dayjs(string);
      const now = dayjs();
      if (day.isSame(now, 'day')) {
        return '今天';
      } else if (day.isSame(now.subtract(1, 'day'), 'day')) {
        return '昨天';
      } else if (day.isSame(now.subtract(2, 'day'), 'day')) {
        return '前天';
      } else if (day.isSame(now, 'year')) {
        return day.format('MM月D日');
      } else {
        return day.format('YYYY年MM月D日');
      }
    }

    get y() {
      const today = new Date();
      const array = [];
      for (let i = 0; i <= 29; i++) {
        const dateString = day(today).subtract(i, 'day').format('YYYY-MM-DD');
        const found = _.find(this.recordList, {
          createdAt: dateString
        });
        array.push({
          date: dateString, value: found ? found.amount : 0
        });
        console.log(found);
      }
      array.sort((a, b) => {
        if (a.date > b.date) {
          return 1;
        } else if (a.date === b.date) {
          return 0;
        } else {
          return -1;
        }
      });
      return array;
    }

    get xyz() {

      const keys = this.y.map(item => item.date);
      const values = this.y.map(item => item.value);
      return {
        grid: {
          left: 0,
          right: 0,
        },
        xAxis: {
          type: 'category',
          data: keys,
          axisTick: {
            alignWithLabel: true,
          },
          axisLine: {
            lineStyle: {
              color: '#666'
            }
          }
        },
        tooltip: {
          show: true,
          triggerOn: 'click',
          formatter: '{c}',
          position: 'top',
        },
        yAxis: {
          type: 'value',
          show: false,
        },
        series: [{
          symbol: 'circle',
          symbolSize: 10,
          itemStyle: {
            borderWidth: 1,
            color: '#666',
            borderColor: '#666'
          },
          data: values,
          type: 'line',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(220, 220, 220, 0.8)'
          }
        }]
      };
    }

    get recordList() {
      return (this.$store.state as RootState).recordList;
    }

    get groupedList() {
      const {recordList} = this;
      const newList = clone(recordList)
        .filter(r => r.type === this.type)
        .sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());
      if (newList.length === 0) {
        return [] as Result;
      }
      type Result = { title: string; total?: number; items: RecordItem[] }[];
      const result: Result = [{title: dayjs(newList[0].createdAt).format('YYYY-MM-DD'), items: [newList[0]]}];
      for (let i = 1; i < newList.length; i++) {
        const current = newList[i];
        const last = result[result.length - 1];
        if (dayjs(last.title).isSame(dayjs(current.createdAt), 'day')) {
          last.items.push(current);
        } else {
          result.push({title: dayjs(current.createdAt).format('YYYY-MM-DD'), items: [current]});
        }
      }
      result.map(group => {
        group.total = group.items.reduce((sum, item) => {
          return sum + item.amount;
        }, 0);
      });
      return result;
    }

    beforeCreate() {
      this.$store.commit('fetchRecords');
    }

    mounted() {
      const div = (this.$refs.chartWrapper as HTMLDivElement);
      div.scrollLeft = div.scrollWidth;
    }

    type = '-';
    recordTypeList = recordTypeList;
  }
</script>

<style lang="scss" scoped>
  .echarts {
    width: 100%;
    height: 400px;
  }

  ::v-deep {
    .type-tabs-item {
      background: white;

      &.selected {
        background: #c4c4c4;

        &::after {
          display: none;
        }
      }
    }

    .interval-tabs-item {
      height: 48px;
    }
  }

  %item {
    padding: 8px 16px;
    line-height: 24px;;
    display: flex;
    justify-content: space-between;
    align-content: center;
  }

  .title {
    @extend %item;
  }

  .record {
    background: white;
    @extend %item;
  }

  .note {
    margin-right: auto;
    margin-left: 8px;
    color: #999;
  }

  .chart {
    width: 430%;

    &-wrapper {
      overflow: auto;

      &::-webkit-scrollbar {
        display: none;
      }
    }
  }
</style>
