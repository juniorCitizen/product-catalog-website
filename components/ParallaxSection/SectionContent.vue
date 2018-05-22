<template>
  <div class="section-content-container">
    <div v-if="section.titleText"
         class="title has-text-warning">
      {{ section.titleText }}
    </div>
    <div v-if="section.mobileTitleText"
         class="subtitle has-text-warning">
      {{ section.mobileTitleText }}
    </div>
    <div v-if="section.mottoText"
         class="paragraph-content has-text-warning">
      {{ section.mottoText }}
    </div>
    <template v-if="content.length===0">
      <div class="title has-text-warning">
        Content Unavailable
      </div>
    </template>
    <template v-else>
      <template v-for="(item,index) in content">
        <div :key="index"
             class="content-heading has-text-warning">
          {{ item.heading }}
        </div>
        <p v-if="item.paragraph"
           :key="index"
           class="paragraph-content has-text-warning"
           v-html="item.paragraph"/>
        <ol v-if="item.list"
            :key="index"
            class="list-content has-text-warning"
            v-html="item.list"/>
      </template>
    </template>
  </div>
</template>

<script>
export default {
  name: 'SectionContent',
  props: {
    section: {
      type: Object,
      default: null,
    },
  },
  computed: {
    content() {
      return this.section.content
    },
  },
}
</script>

<style scoped>
.section-content-container {
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  font-weight: 900;
}

.paragraph-content {
  white-space: pre-line;
}

.list-content {
  list-style-position: inside;
}
</style>
