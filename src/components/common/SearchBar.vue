<template>
<div class="weui_search_bar" :class="{'weui_search_focusing': isFocusing || !!value}">
  <div class="weui_search_outer">
    <form class="weui_search_inner" @submit="submit">
      <i class="weui_icon_search"></i>
      <input type="search" class="weui_search_input" id="searchInput" :placeholder="placeholder" required v-model="value" ref="input" @focus="isFocusing = true" @blur="isFocusing = false">
      <a href="javascript:;" class="weui_icon_clear" @click="clearInput"></a>
    </form>
    <label for="searchInput" class="weui_search_text">
      <i class="weui_icon_search"></i>
      <span v-if="!!placeholder">{{placeholder}}</span>
    </label>
  </div>
  <a href="javascript:;" class="weui_search_cancel" v-if="!!cancelText && isFocusing" @click="cancelInput">{{cancelText}}</a>
</div>
</template>

<script>
export default {
  props: {
    /**
     * 标签
     */
    placeholder: {
      type: String,
      required: false
    },

    /**
     * 取消按钮文本，若不设置则无取消按钮
     */
    cancelText: {
      type: String,
      required: false
    }
  },

  data() {
    return {
      isFocusing: false,
      value: ""
    };
  },

  methods: {
    clearInput() {
      this.value = '';
      this.$refs.input.focus();
    },

    cancelInput() {
      this.value = '';
    },

    submit(event) {
      event.preventDefault();
      this.$emit('weui-search-bar-submit',this.value);
    }
  }
}
</script>
