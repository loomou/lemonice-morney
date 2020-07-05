<template>
  <ul class="tabs" :class="{[classPrefix+'-tabs']: classPrefix}">
    <li v-for="item in dataSource"
        :key="item.value"
        @click="select(item)"
        :class="liClass(item)"
        class="tabs-item">
<!--        :style="{height: height + 'px'}"-->
      {{item.text}}
    </li>
  </ul>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';

  type DateSourceItem = { text: string; value: string }

  @Component
  export default class Tabs extends Vue {
    @Prop({required: true, type: Array}) dataSource!: DateSourceItem[];
    @Prop(String) readonly value!: string;
    @Prop(String) classPrefix?: string;
    // @Prop({type: Number, default: '64px'}) height!: string;

    liClass(item: DateSourceItem) {
      return {
        selected: item.value === this.value,
        [this.classPrefix + '-tabs-item']: this.classPrefix
      };
    }

    select(item: DateSourceItem) {
      this.$emit('update:value', item.value);
    }
  }
</script>

<style lang="scss" scoped>
  .tabs {
    background: #c4c4c4;
    display: flex;
    text-align: center;
    font-size: 24px;

    &-item {
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