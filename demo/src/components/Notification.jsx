// notification components, can choose from success | error | info | warning. 
// each comes with different design and duration

import {notification} from "antd";

const openNotificationWithIcon = (type, msg, description, placement, duration = 0) => {
    placement = placement || "topRight"
    notification[type]({

        message: msg,
        description:
            description,
        placement,
        duration: duration
    });
};
export const successNotificationWithIcon = (msg, description, placement) =>
    openNotificationWithIcon('success', msg, description, placement, 2);


export const errorNotificationWithIcon = (msg, description, placement) =>
    openNotificationWithIcon('error', msg, description, placement);

export const infoNotificationWithIcon = (msg, description, placement) =>
    openNotificationWithIcon('info', msg, description, placement, 2);

export const warningNotificationWithIcon = (msg, description, placement) =>
    openNotificationWithIcon('warning', msg, description, placement, 3);
