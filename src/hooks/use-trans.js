import i18n, { resources } from "i18nextInit";
// import Permission from "utils/Permission";

export default function useTrans () {
    const { t } = i18n
    const trans = (text) => {
        return t(text)
    }
    return {
        trans: trans,
        t: trans
    }
}
