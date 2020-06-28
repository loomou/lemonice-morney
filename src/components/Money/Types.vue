<template>
  <div>
    <ul class="types">
      <li :class="type === '-' && 'selected'"
          @click="selectType ('-')">
        支出
      </li>
      <li :class="type === '+' && 'selected'"
          @click="selectType ('+')">
        收入
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';

  // 1.自动提示更智能
  // 2.不能随便写.toString()
  // 3.编译报错，无法变成JS
  @Component
  export default class Types extends Vue {
    type = '-'; // '-'表示指出，'+'表示收入

    // @Prop(Number) xxx: number | undefined;
    // Prop告诉Vue，xxx不是data是prop
    // Number告诉Vue xxx运行时是个Number
    // xxx是属性名
    // number | undefined告诉TS xxx的编译时类型

    selectType(type: string) {
      if (type !== '-' && type !== '+') {
        throw new Error('type is unknown ');
      }
      this.type = type;
    }
    mounted() {
      if (this.xxx === undefined) {
        console.log('没有xxx');
      } else {
        console.log(this.xxx);
      }
    }
  }

  // export default {
  //   name: "Types",
  //   props: ['xxx'],
  //   data() {
  //     return {
  //       type: '-'
  //     }
  //   },
  //   mounted() {
  //     console.log(this.xxx)
  //   },
  //   methods: {
  //     selectType(type) {
  //       if (type !== '-' && type !== '+') {
  //         throw new Error('type is unknown ')
  //       }
  //       this.type = type
  //     }
  //   }
  // }
</script>

<style lang="scss" scoped>
  .types {
    background: #c4c4c4;
    display: flex;
    text-align: center;
    font-size: 24px;

    > li {
      width: 50%;
      /*line-height: 64px;*/
      height: 64px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;

      &.selected {
        /*border-bottom: 4px solid; // 会将字顶上去，占位置*/
        &::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background: #333;
        }
      }
    }
  }
</style>