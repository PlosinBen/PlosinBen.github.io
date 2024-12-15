const basic = (seed) => {
    return Math.random()
}

const rng = (seed) => {
    var m_as_number = 2 ** 53 - 111
    var m = 2n ** 53n - 111n
    var a = 5667072534355537n
    var s = BigInt(seed_to_int(seed)) % m

    return Number(s = s * a % m) / m_as_number
}

const sin = (seed) => {
    let x = Math.sin(seed_to_int(seed)) * 10000;
    return x - Math.floor(x);
}

const pseudo = (seed) => {
    let s = seed_to_int(seed)

    let mask = 0xffffffff;
    let m_w = (123456789 + s) & mask;
    let m_z = (987654321 - s) & mask;

    m_z = (36969 * (m_z & 65535) + (m_z >>> 16)) & mask;
    m_w = (18000 * (m_w & 65535) + (m_w >>> 16)) & mask;

    return (((m_z << 16) + (m_w & 65535)) >>> 0) / 4294967296;
}

const seed_to_int = (seed) => {
    let s = parseInt(seed)
    if (isNaN(s)) {
        s = 0
        for (let char of seed) {
            console.log(char);
            s += char.charCodeAt(0)
        }
    }

    return s
}

const get_random_func = (name) => {
    switch (name) {
        case 'rng':
            return rng
        case 'sin':
            return sin
        case 'pseudo':
            return pseudo
        default:
            return basic
    }
}

export default {
    get_random_func
}