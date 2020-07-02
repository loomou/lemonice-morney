<template>
  <Layout class-prefix="layout">
    <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
    <Types :value.sync="record.type"/>
    <div class="notes">
      <FormItem field-name="备注"
                placeholder="在这里输入备注"
                @update:value="onUpdateNotes"/>
    </div>
    <Tags :data-source.sync="tags" @update:value="onUpdateTags"/>
  </Layout>
</template>

<script lang="ts">
  // import Nav from '@/components/Nav.vue';
  import Vue from 'vue';
  import NumberPad from '@/components/Money/NumberPad.vue';
  import Types from '@/components/Money/Types.vue';
  import FormItem from '@/components/Money/FormItem.vue';
  import Tags from '@/components/Money/Tags.vue';
  import {Component, Watch} from 'vue-property-decorator';
  import recordListModel from '@/moudels/recordListMoudel';
  import tagListModel from '@/moudels/tagListMoudel';

  const version = window.localStorage.getItem('version') || '0';
  const recordList: RecordItem[] = recordListModel.fetch();

  if (version === '0.0.1') {
    // 数据库升级，数据迁移
    recordList.forEach(record => {
      record.createdAt = new Date(2020, 0, 1);
    });
    // 保存数据
    window.localStorage.setItem('recordList', JSON.stringify(recordList));
  }

  window.localStorage.setItem('version', '0.0.2');

  @Component({
    components: {Tags, FormItem, Types, NumberPad}
  })
  export default class Money extends Vue {
    tags = window.tagList;
    recordList: RecordItem[] = recordList;
    record: RecordItem = {tags: [], notes: '', type: '-', amount: 0};

    onUpdateTags(value: string[]) {
      this.record.tags = value;
    }

    onUpdateNotes(value: string) {
      this.record.notes = value;
    }

    saveRecord() {
      recordListModel.create(this.record);
    }

    @Watch('recordList')
    onRecordListChange() {
      recordListModel.save();
    }
  }
</script>

<style lang="scss">
  .layout-content {
    display: flex;
    flex-direction: column-reverse;
  }
  .notes {
    padding: 12px 0;
  }
</style>

<style lang="scss" scoped>
  @import "~@/assets/style/helper.scss";
</style>