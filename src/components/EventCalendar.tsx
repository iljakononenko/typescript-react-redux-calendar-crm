import React, {FC} from 'react';
import {Badge, Calendar} from "antd";
import {IEvent} from "../models/IEvent";
import {Dayjs} from "dayjs";
import {formatDate} from "../utils/date";

interface EventCalendarProps {
    events: IEvent[]
}

const EventCalendar:FC<EventCalendarProps> = ({events}) => {

    const dateCellRender = (value: Dayjs) => {
        const formatedDate = formatDate(value)
        const currentDayEvents = events.filter(event => event.date === formatedDate)
        return (
            <ul className="events">
                {currentDayEvents.map((event, index) => (
                    <li key={index}>
                        {event.description}
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <Calendar
            dateCellRender={dateCellRender}
        />
    );
};

export default EventCalendar;
