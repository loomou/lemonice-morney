<template>
  <nav class="nav">
    <router-link to="/money" class="item" active-class="selected">
      <Icon name="money"/>
      <!--            <svg>-->
      <!--              <use xlink:href="#money"></use>-->
      <!--            </svg>-->
      记账
    </router-link>
    <router-link to="/labels" class="item" active-class="selected">
      <!--      <Icon name="label"/>-->
      <Icon name="labels"/>
      标签
    </router-link>
    <router-link to="/statistics" class="item" active-class="selected">
      <!--      <Icon name="statistics"/>-->
      <Icon name="statistics"/>
      统计
    </router-link>
  </nav>
</template>

<script lang="ts">
  // import x from '@/assets/icons/label.svg';
  // import y from '@/assets/icons/money.svg';
  // import z from '@/assets/icons/statistics.svg';
  // console.log(x);
  // let importAll = (requireContext: __WebpackModuleApi.RequireContext) => requireContext.keys().forEach(requireContext);
  // try {
  //   importAll(require.context('../assets/icons', true, /\.svg$/));
  // } catch (error) {
  //   console.log(error);
  // }

  export default {
    name: 'Nav'
  };
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/helper.scss";
  .nav {
    @extend %outerShadow;
    display: flex;
    flex-direction: row;
    font-size: 12px;
    >.item {
      padding: 2px 0;
      width: 33.33333%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .icon {
        width: 32px;
        height: 32px;
      }
    }
    > .item.selected {
      color: $color-highlight;
    }
  }
</style>