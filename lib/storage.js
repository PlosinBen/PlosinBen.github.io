const KEY_USER = 'users'

const KEY_AWARDS = 'awards'

const getUsers = () => {
    const data = localStorage.getItem(KEY_USER)

    if (data === null || data.length === 0) {
        return [
            '資工探吉爸',
            '水蜜頭罐桃',
            '有點耐心好嗎',
            '探吉閒人',
            '探吉教-Chance',
            '探吉更生人',
            '黃金社畜少女界的肥宅',
            '探吉教-小魚',
            '嗚膩拔',
            'Jay',
            '探吉教-Ａ大（ameryu）',
            '阿喵',
            '章魚',
            '探吉教--Kim',
            '迷茫燒酒',
            'MInG股海求生日記',
            '西西',
            'Paul Wang',
            '探吉教-DouDou',
            'Jason.L',
            'Kurt',
            'Fong',
            '海貓咪',
            '探吉教-茶',
            '探吉教-ya',
            '代購君',
            '柬埔仔',
            '安扣',
            '肥嘟嘟左右衛門',
            '探吉教- -傻蛋洋蔥Tony',
            'WaXiJamesLa',
            'Sylvia',
            '探吉教-麥克',
            'Olivia',
            '探吉教-心思縝密的吉米',
            '菜餅餅',
            '特等農務軍械士',
            '容嬤嬤',
            '探吉教-Ives',
            '白老虎',
            '探吉教 - Tsao (賈許)',
            '探吉教-阿啾',
            '探吉教-韭菜allen',
            '夏亞',
            '探吉教-承',
            'Scooby',
            '傑尼',
            '探吉教 - kainors',
            '廢文男',
            '探吉教-打工玩沙YU',
            '我諾亞鐵粉啦',
            '我是一隻小小鳥',
            '天天探吉',
            'Oscar',
            '探吉教-窩是邊緣人',
            '探吉教 馬克',
            '探吉教-Peter_H',
            '握奶',
            '翊',
            '探吉教-Nina',
            '海豹',
            '探吉教-探吉麻糬',
            '茉莉茉茉茉莉',
            '賠錢貨BBB',
            '小小韭菜',
            '我愛Jay哥大麵包',
            '探吉教-屁鼠 Peace',
            '探吉教-Keith',
            'SLV',
            'Quin',
            '探吉教-大熊',
            '探吉教-神之小棍棍',
            '探吉教-3cm無用橘子',
            '探吉教-Frank',
            'Arthur',
            '猛攻我老公',
            '精銳糧草徵收人',
            '加碼減碼-小文',
        ]
    }

    return JSON.parse(data)
}

const saveUsers = (users) => {
    console.log("Save Users", users)

    localStorage.setItem(KEY_USER, JSON.stringify(users))
}

const getAwards = () => {
    const data = localStorage.getItem(KEY_AWARDS)

    if (data === null || data.length === 0) {
        return []
    }

    return JSON.parse(data)
}

const saveAwards = (awards) => {
    console.log("Save Awards", awards)

    localStorage.setItem(KEY_AWARDS, JSON.stringify(awards))
}

export default {
    getUsers,
    saveUsers,
    getAwards,
    saveAwards
}