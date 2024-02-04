export default {
  name: 'HomePage',
  emits: ['submit'],

  setup(props, {emit}) {
    const {ref, defineProps, defineEmits} = Vue

    console.log({props})
    console.log({emit})

    const rssFeed = ref('')

    function saveFeedUrl() {
      console.log({rssFeed: rssFeed.value})
      emit('submit', rssFeed.value)
    }

    return {rssFeed, saveFeedUrl}
  },

  template: `
  <div class="flex items-center justify-center h-screen w-full">
    <div id="home-page" class="bg-white p-10 rounded-xl shadow-lg max-w-md w-full">
          <h1 class="text-4xl font-bold mb-6 text-center">Podcast RSS Feed</h1>
          <p class="mb-6 text-center">Please enter the RSS feed of the podcast:</p>
          <input type="text" placeholder="RSS feed..." 
              class="w-full p-3 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-600" 
              :class="{ 'ring-2 ring-red-500': rssFeed.length > 0 && rssFeed.length < 3 }" 
              v-model="rssFeed">
          <button class="bg-purple-600 text-white w-full mt-6 p-2 rounded hover:bg-purple-700 transition-colors duration-150" @click="saveFeedUrl">
              Submit
          </button>
      </div>
    </div>
    `,
};