<template>
  <div>
    <label class="notes">
      {{value}}
      <span class="name">{{this.fieldName}}</span>
      <!--      <input type="text" :value="value" @input="onInput" placeholder="在这里输入备注">-->
      <input type="text"
             v-model="value"
             :placeholder="this.placeholder">
    </label>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Watch, Prop} from 'vue-property-decorator';

  @Component
  export default class Notes extends Vue {
    value = '';

    @Prop({required: true}) fieldName!: string;
    @Prop() placeholder!: string;

    @Watch('value')
    onValueChange(value: string) {
      this.$emit('update:value', value);
    }

    // onInput(event: KeyboardEvent) {
    //   const input = event.target as HTMLInputElement;
    //   this.value = input.value;
    // }
  }
</script>

<style lang="scss" scoped>
  .notes {
    font-size: 14px;
    background: #f5f5f5;
    display: flex;
    padding-left: 16px;
    align-items: center;

    .name {
      padding-right: 16px;
    }

    input {
      height: 64px;
      flex-grow: 1;
      background: transparent;
      border: none;
    }
  }
</style>