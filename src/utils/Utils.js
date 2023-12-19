import md5 from 'md5';

export default class Utils {
    static MD5 (val) {
        return md5(`${val}`)
    }
}
