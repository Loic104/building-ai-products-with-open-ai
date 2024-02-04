export default {
  name: 'PodcastPage',
  props: ['podcast'],

  setup(props) {
    const {watch} = Vue

    const podcast = props.podcast

    console.log({props})


    watch(podcast, ()=>{
      console.log({podcast})
    })

    return{podcast}
  },

  template: `
  <div class="container mx-auto">
        <div v-if="podcast.title"  class="flex flex-col md:flex-row items-center bg-white p-5 rounded shadow">
            <img class="mb-5 md:mb-0 md:mr-5 rounded-full h-48 w-48 object-cover" :src="podcast.image" alt="Podcast Image">
            <div>
                <h1 class="text-3xl font-bold mb-2">Podcast Name: {{podcast.title}}</h1>
                <p class="text-gray-600">Podcast Description:</p>
                <p class="text-gray-400 font-sm" v-html="podcast.description"></p>
                <a target="_blank" :href="podcast.link">Go to website</a>
            </div>
        </div>
        <div v-if="podcast?.episodes?.length" class="mt-10">
            <h2 class="text-2xl font-bold mb-5">Episodes</h2>
            <ul class="space-y-4">
                <li v-for="episode of podcast.episodes" class="bg-white p-4 rounded shadow">
                    <details>
                        <summary class="text-lg font-bold">Episode {{episode.number}}: {{episode.title}}</summary>
                        <p class="text-gray-400 font-sm" v-html="episode.description"></p>
                    </details>
                </li>
                <!-- Add more list items for additional episodes -->
            </ul>
        </div>
    </div>
    `,
};