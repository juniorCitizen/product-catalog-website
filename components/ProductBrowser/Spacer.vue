<template>
  <div class="spacer">
    <div class="field has-addons">
      <p class="control">
        <a class="button is-small">
          <span class="icon is-small">
            <i class="fas fa-angle-left"/>
          </span>
          <span>PREVIOUS</span>
        </a>
      </p>
      <p class="control">
        <a class="button is-small">
          <span>FIRST PAGE</span>
        </a>
      </p>
      <p class="control">
        <a class="button is-small">
          <span>LAST PAGE</span>
        </a>
      </p>
      <p class="control">
        <a class="button is-small">
          <span>NEXT</span>
          <span class="icon is-small">
            <i class="fas fa-angle-right"/>
          </span>
        </a>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Spacer',
}
</script>

<style scoped>
.spacer {
  height: min-content;
  grid-column: 1/-1;
  display: flex;
  justify-content: center;
}
div.pagination-nav-button-container {
  margin-left: 15px;
  margin-right: 15px;
}
</style>
