<template>
  <div class="nav">
    <router-link to="/money">
      <Icon name="money"/>
      <!--            <svg>-->
      <!--              <use xlink:href="#money"></use>-->
      <!--            </svg>-->
      记账
    </router-link>
    |
    <router-link to="/labels">
      <!--      <Icon name="label"/>-->
      <Icon name="labels"/>
      标签
    </router-link>
    |
    <router-link to="/statistics">
      <!--      <Icon name="statistics"/>-->
      <Icon name="statistics"/>
      统计
    </router-link>
  </div>
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
  .nav {
    border: 1px solid red;
  }
</style>