<template>
  <Layout class-prefix="layout">
    <NumberPad/>
    <Types/>
    <Notes/>
    <Tags :data-source="tags"/>
  </Layout>
</template>

<script>
  // import Nav from '@/components/Nav.vue';

  import NumberPad from "@/components/Money/NumberPad";
  import Types from "@/components/Money/Types";
  import Notes from "@/components/Money/Notes";
  import Tags from "@/components/Money/Tags";

  export default {
    name: 'Money',
    components: {
      Tags,
      Notes,
      Types,
      NumberPad
      // Nav
    },
    data() {
      return {
        tags: ['衣', '食', '住', '行', '彩票']
      }
    },
  };
</script>

<style lang="scss">
  .layout-content {
    display: flex;
    flex-direction: column-reverse;
  }
</style>

<style lang="scss" scoped>
  @import "~@/assets/style/helper.scss";
</style>