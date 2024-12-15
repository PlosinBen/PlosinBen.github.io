import storage from "./storage.js";
import random from "./random.js";
import {ref, reactive, watch} from 'vue';

export default {
    setup() {
        const users = reactive(storage.getUsers())
        const awards = reactive(storage.getAwards())

        const new_user = ref('')

        const new_award = reactive({
            name: '',
            count: '',
            winners: []
        })

        const add_user = () => {
            users.push(new_user.value)

            storage.saveUsers(users)

            new_user.value = ''
        }

        const remove_user = (index) => {
            users.splice(index, 1);
            storage.saveUsers(users)
        }

        const add_awards = () => {
            if (new_award.name.length === 0) {
                alert("獎項名稱必須輸入")
                return
            }

            awards.push({
                name: new_award.name,
                count: parseInt(new_award.count) || 1,
                winners: []
            })

            storage.saveAwards(awards)
        }

        const random_type = ref('basic')

        const random_seed = ref('')

        const pick = (award_index) => {
            let not_win_users = [...users]

            for (let i in awards) {
                if (awards[i].winners.length === 0) {
                    continue
                }

                for (let j in awards[i].winners) {
                    not_win_users.splice(
                        not_win_users.indexOf(awards[i].winners[j])
                        , 1
                    )
                }
            }

            not_win_users.sort(() => Math.random() - 0.5)

            console.log(not_win_users)
            const random_func = random.get_random_func(random_type)

            for (let i = 0; i < awards[award_index].count; i++) {
                let winner_index = Math.floor(
                    random_func(random_seed.value) * not_win_users.length
                )

                console.log(
                    "Winner",
                    winner_index,
                    not_win_users[winner_index],
                )

                awards[award_index].winners.push(not_win_users[winner_index])
                not_win_users.splice(winner_index, 1)
            }

            storage.saveAwards(awards)
        }

        return {new_user, users, awards, add_user, remove_user, new_award, add_awards, random_type, random_seed, pick}
    },
    template: `
        <div class="flex space-x-4">
            <div class="h-full max-h-screen overflow-y-auto">
                <h5 class="py-2">抽獎人員共 {{ users.length }}</h5>
                <div class="flex flex-col bg-white">
                    <div class="border-b flex">
                        <input type="text" class="flex-grow" placeholder="新增人員" v-model="new_user"
                               @keydown.enter="add_user">
                        <button class="w-8 bg-gray-300 py-1">+</button>
                    </div>
                    <div class="px-0.5 space-y-1">
                        <div class="py-0.5 flex" v-for="(participant, i) in users">
                            <span class="w-12" v-text="i+1"></span>
                            <span class="flex-grow" v-text="participant"></span>
                            <button class="w-7" @click="remove_user(i)">-</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex-grow h-full max-h-screen overflow-y-auto space-y-4 py-4">
                <div class="flex space-x-5 items-center">
                    <h5>抽獎獎項</h5>
                    <div class="flex space-x-2 items-center">
                        <div>品項</div>
                        <div>
                            <input type="text" placeholder="獎項名稱" v-model="new_award.name">
                        </div>
                        <div>數量</div>
                        <div>
                            <input type="number" class="w-14" placeholder="1" v-model="new_award.count"
                                   @change="new_award.count = new_award.count < 1 ? 1 : new_award.count">
                        </div>

                        <button class="bg-gray-200 px-2 py-0.5 rounded-sm" @click="add_awards">新增</button>
                    </div>
                </div>
                <div class="space-y-1">
                    <div class="space-x-2">
                        <span>亂數種子</span>
                        <input type="text" v-model="random_seed">
                    </div>
                    <div class="flex space-x-3">
                        <div>
                            <input name="random_type" type="radio" v-model="random_type" id="basic" value="basic">
                            <label for="basic" title="return Math.random">Math.random</label>
                        </div>
                        <div>
                            <input name="random_type" type="radio" v-model="random_type" id="rng" value="rng">
                            <label for="rng" title="var m_as_number = 2**53 - 111
var m = 2n**53n - 111n
var a = 5667072534355537n
var s = BigInt(seed) % m
return Number(s = s * a % m) / m_as_number">Lehmer / LCG</label>
                        </div>
                        <div>
                            <input name="random_type" type="radio" v-model="random_type" id="sin" value="sin">
                            <label for="sin" title="    let x = Math.sin(seed_to_int(seed)) * 10000;
return x - Math.floor(x);">Sin</label>
                        </div>
                        <div>
                            <input name="random_type" type="radio" v-model="random_type" id="pseudo" value="pseudo">
                            <label for="pseudo" title="Math.random">pseudo</label>
                        </div>
                    </div>
                </div>
                <div class="space-y-2">
                    <div class="flex border-b text-center">
                        <div class="w-60">獎項</div>
                        <div class="w-14">數量</div>
                        <div class="w-60">中獎人</div>
                        <div>
                            <button class="bg-gray-200 px-2 py-0.5 rounded-sm">全部開獎</button>
                        </div>
                    </div>

                    <div class="flex" v-for="(award, i) in awards">
                        <div class="w-60">{{ award.name }}</div>
                        <div class="w-14 text-center">{{ award.count }}</div>
                        <div class="w-60">
                            <p v-for="winner in award.winners">{{ winner }}</p>
                        </div>
                        <div v-if="award.winners.length === 0">
                            <button class="bg-gray-200 px-2 py-0.5 rounded-sm" @click="pick(i)">    抽獎</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
}