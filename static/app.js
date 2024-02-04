import HomePage from "./HomePage.js";
import PodcastPage from "./PodcastPage.js";

export default {
  name: 'App',
  components: {
    HomePage,
    PodcastPage
  },

  setup() {
    const {ref, watch} = Vue;

    const podcastFeed = ref('')
    const podcast = ref(null)

    watch(podcastFeed, async (newVal)=>{
      const response = await fetch('/api/rss?feed='+newVal)

      podcast.value = await response.json()

      console.log({podcast: podcast.value})
    })

    function saveFeed(feed){
      console.log({feed})
      podcastFeed.value = feed
    }

    return {podcastFeed, saveFeed, podcast}
  },

  template: `
  <div id="content" class="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 h-screen text-gray-800 text-lg fixed h-full w-full">
    <HomePage v-if="!podcastFeed" @submit="saveFeed"></HomePage>
    <PodcastPage v-if="podcast" :podcast="podcast"></PodcastPage>
  </div>
    `,
};