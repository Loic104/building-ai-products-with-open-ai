export default {
    name: 'EpisodePage',
    props: ['episode'],
    emits: ['back'],

    setup(props, {emit}) {
        const {ref} = Vue

        function goBack() {
            emit('back')
        }

        const transcript = ref('')
        const transcriptPath = ref('')
        const audioPath = ref('')

        const summary = ref('')
        const keywords = ref('')
        const speakers = ref('')
        const picks = ref('')

        async function downloadPodcast() {
            const response = await fetch("/api/download", {
                method: "POST",
                body: JSON.stringify({
                    url: props.episode.url,
                    name: props.episode.title,
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            });

            audioPath.value = await response.text()
        }

        async function generateTranscript() {
            console.log({audioPath: audioPath.value})
            const response = await fetch("/api/transcribe", {
                method: "POST",
                body: JSON.stringify({
                    path: audioPath.value.replaceAll('"','')
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            });

            const data = await response.json()

            transcript.value = data.transcript
            transcriptPath.value = data['transcript_path']
        }

        async function generateAiResults(){
            const response = await fetch('/api/info?feed='+props.episode.url)

            const data = await response.json()


        }

        return { goBack, downloadPodcast, generateTranscript, generateAiResults, audioPath, transcript, transcriptPath}
    },

    template: `
    <div class="container mx-auto flex flex-col flex-start p-8" v-if="episode">
        <div class="mb-4">
            <button class="font-bold" @click="goBack"><- Go Back</button>
        </div>
        <div class="flex flex-col items-center justify-center w-full bg-white rounded-lg p-8">
            <h3 class="text-xl font-bold mb-6">{{episode.title}}</h3>
            <div class="flex flex-row gap-10">
                <button class="px-3 py-1 text-white transition-colors duration-150 bg-blue-600 rounded-lg focus:shadow-outline hover:bg-blue-500" @click="downloadPodcast">Download Audio</button>
                <button class="px-3 py-1 text-white transition-colors duration-150 bg-blue-600 rounded-lg focus:shadow-outline hover:bg-blue-500" @click="generateTranscript">Generate transcript</button>
                <button class="px-3 py-1 text-white transition-colors duration-150 bg-blue-600 rounded-lg focus:shadow-outline hover:bg-blue-500" @click="generateAiResults">Ask AI to generate episode information</button>
            </div>
            <div class="flex flex-col">
                <h3>AI Keywords</h3>
                <p>
                <pre>
                    {{keywords}}
                </pre>
                </p>
            </div>
            <div class="flex flex-col">
                <h3>AI Summary</h3>
                <p>
                    <pre>{{summary}}</pre>
                </p>
            </div>
            <div class="flex flex-col">
                <h3>AI Guest list</h3>
                <p><pre>{{speakers}}</pre></p>
            </div>
            <div class="flex flex-col">
                <h3>AI episode picks</h3>
                <p><pre>{{picks}}</pre></p>
            </div>
            <div class="flex flex-col">
                <h3>Transcript</h3>
                <textarea>{{transcript}}</textarea>
            </div>
        </div>
        
    </div>
    `,
};