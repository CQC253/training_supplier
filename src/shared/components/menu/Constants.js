import { MenuIcon1 } from '../icons/MenuIcon1';
import { MenuIcon2 } from '../icons/MenuIcon2';
import { MenuIcon3 } from '../icons/MenuIcon3';
import { MenuIcon4 } from '../icons/MenuIcon4';
import { MenuIcon5 } from '../icons/MenuIcon5';
import { MenuIcon6 } from '../icons/MenuIcon6';

const Constants = {
    MENU: [
        {
            'icon': <MenuIcon1 />,
            'title': 'overview',
            'linkTo': '/supplier/overview'
        },
        {
            'icon': <MenuIcon2 />,
            'title': 'categoryList',
            'linkTo': '/supplier/category'
        },
        {
            'icon': <MenuIcon3 />,
            'title': 'supplierList',
            'linkTo': '/supplier/list'
        },
        {
            'icon': <MenuIcon4 />,
            'title': 'orderHistory',
            'linkTo': '/supplier/order_history'
        },
        {
            'icon': <MenuIcon5 />,
            'title': 'quotation',
            'linkTo': '/supplier/quotation'
        },
        {
            'icon': <MenuIcon6 />,
            'title': 'trackingHistory',
            'linkTo': '/supplier/tracking_history'
        },
    ]
}

export default Constants