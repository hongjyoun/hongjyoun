<template>
  <v-container>
    <PostForm v-if="me" />
    <div>
      <PostCard v-for="p in mainPosts" :key="p.id" :post="p" />
    </div>
  </v-container>
</template>

<script>
import PostCard from '~/components/PostCard';
import PostForm from '~/components/PostForm'
export default {
  components: {
    PostCard, PostForm
  },
  fetch({ store }) {
    store.dispatch('posts/loadPosts')
  },
  computed: {
    me() {
      return this.$store.state.users.me
    },
    mainPosts() {
      return this.$store.state.posts.mainPosts
    },
    hasMorePost() {
      return this.$store.state.posts.hasMorePost
    }
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll);
  },
  methods: {
    onScroll() {
      if(window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 100) {
        if(this.hasMorePost) {
          this.$store.dispatch('posts/loadPosts');
        }
      }
    },
  },

}
</script>

<style>

</style>