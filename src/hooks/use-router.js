import { useLocation, useHistory } from 'react-router-dom'
import React from 'react'
import AppConfig from 'utils/AppConfig';

export default function useRouter () {
    const MODE_ALL = 'all';
    const MODE_HAVE_VALUE = 'have';
    const { search } = useLocation()
    const history = useHistory()
    const paramsToObject = (entries) => {
        const result = {}
        for (const [key, value] of entries) { // each 'entry' is a [key, value] tupple
            result[key] = value;
        }
        return result;
    }
    let query = React.useMemo(() => new URLSearchParams(search), [search])
    const get = (field) => {
        return query.get(field)
    }
    const getAll = () => {
        return paramsToObject(query)
    }

    const replace = ({ params = {} }) => {
        history.replace({
            search: convertObjToString(params, MODE_HAVE_VALUE)
        })
    }

    const convertObjToString = (_obj, mode = MODE_ALL) => {
        let newQuery = new URLSearchParams();
        for (const key in _obj) {
            if (mode == MODE_ALL) {
                newQuery.set(key, _obj[key])
            } else {
                if (_obj[key]) {
                    newQuery.set(key, _obj[key])
                }
            }
        }
        return newQuery.toString()
    }

    const push = ({
        pathname, params = {}
    }) => {
        history.push({
            pathname: pathname,
            search: convertObjToString(params, MODE_HAVE_VALUE)
        })
    }
    const pushShell = ({
        pathname, params = {}
    }) => {
        if (AppConfig.SHARE_ROUTER) {
            AppConfig.SHARE_ROUTER.push({
                pathname: pathname,
                params: params
            })
        } else {
            push({ pathname, params: params })
        }
    }
    return {
        get: get,
        getAll: getAll,
        replace: replace,
        push: push,
        pushShell: pushShell
    }
}
