export default {
    name: 'EpisodePage',
    props: ['episode'],
    emits: ['back'],

    setup(props, {emit}) {

        function goBack() {
            emit('back')
        }


        return { goBack}
    },

    template: `
    <div class="container mx-auto flex flex-col flex-start p-8" v-if="episode">
        <div class="mb-4">
            <button class="font-bold" @click="goBack"><- Go Back</button>
        </div>
        <div class="flex flex-col items-center justify-center w-full bg-white rounded-lg p-8">
            <h3 class="text-xl font-bold mb-6">{{episode.title}}</h3>
            <div class="flex flex-row gap-10">
                <button class="px-3 py-1 text-white transition-colors duration-150 bg-blue-600 rounded-lg focus:shadow-outline hover:bg-blue-500">Download Audio</button>
                <button>Generate transcript</button>
                <button>Ask AI to generate episode information</button>
            </div>
            <div class="flex flex-col">
                <h3>AI Keywords</h3>
                <p></p>
            </div>
            <div class="flex flex-col">
                <h3>AI Summary</h3>
                <p></p>
            </div>
            <div class="flex flex-col">
                <h3>AI Guest list</h3>
                <p></p>
            </div>
            <div class="flex flex-col">
                <h3>AI episode picks</h3>
                <p></p>
            </div>
            <div class="flex flex-col">
                <h3>AI sources to learn more on this subject</h3>
                <p></p>
            </div>
        </div>
        
    </div>
    `,
};