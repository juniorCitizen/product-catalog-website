<template>
  <div class="staff">
    <div>
      <fa :icon="['fas', 'user-circle']" />&nbsp;
      <span class="name-text">
        {{ name }}
      </span>
    </div>
    <div>
      <fa :icon="['fas', 'envelope']" />&nbsp;
      <a :href="`mailto:${email}`"
         class="email-text">
        {{ email }}
      </a>
    </div>
    <div v-if="mobile">
      <fa :icon="['fas', 'mobile']" />&nbsp;
      <span class="mobile-text">
        {{ mobile }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Staff',
  props: {
    name: {
      type: String,
      default: 'name',
    },
    email: {
      type: String,
      default: 'email',
    },
    mobile: {
      type: String,
      default: '',
    },
  },
}
</script>

<style scoped>
svg {
  color: rgba(0, 0, 0, 0.5);
}

.staff {
  border-top-left-radius: 7px 10%;
  border-left: 8px solid rgb(36, 145, 145);
  border-bottom-left-radius: 7px 10%;
  padding-top: 5px;
  padding-left: 10px;
  padding-bottom: 5px;
  background-color: white;
}

.staff:hover {
  transform: scale(1.01, 1.01);
}

.name-text,
.email-text,
.mobile-text {
  font-weight: 900;
  line-height: 2em;
}
</style>
