import React, {FC, useState} from 'react';
import {Button, DatePicker, Form, Input, Row, Select} from "antd";
import {rules} from "../utils/rules";
import {IUser} from "../models/IUser";
import {IEvent} from "../models/IEvent";
import dayjs, {Dayjs} from "dayjs";
import {formatDate} from "../utils/date";
import {useTypedSelector} from "../hooks/useTypedSelector";

interface EventFormProps {
    guests: IUser[],
    submit: (event: IEvent) => void;
}

const EventForm:FC<EventFormProps> = ({guests, submit}) => {

    const {user} = useTypedSelector(state => state.auth)
    const [event, setEvent] = useState<IEvent>({
        author: "",
        date: "",
        description: "",
        guest: "",
    } as IEvent);

    const selectDate = (date: Dayjs | null) => {
        if (date != null) {
            setEvent({...event, date: formatDate(date)})
        }
    }

    const submitForm = () => {
        submit({...event, author: user.username})
    }

    return (
        <Form onFinish={submitForm}>
            <Form.Item
                label="Event description"
                name="description"
                rules={[rules.required()]}
            >
                <Input value={event.description} onChange={(e) => setEvent({...event, description: e.target.value})} />
            </Form.Item>
            <Form.Item
                label="Event date"
                name="date"
                rules={[rules.required()]}
            >
                <DatePicker
                    onChange={(date) => selectDate(date)}
                />
            </Form.Item>
            <Form.Item
                label={"Select guest"}
                name={"guest"}
                rules={[rules.required()]}
            >
                <Select onChange={(guest:string) => setEvent({...event, guest})}>
                    {
                        guests.map(guest =>
                            <Select.Option key={guest.username} value={guest.username}>{guest.username}</Select.Option>
                        )
                    }
                </Select>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Row justify={'end'}>
                    <Button type="primary" htmlType="submit">
                        Create
                    </Button>
                </Row>
            </Form.Item>
        </Form>
    );
};

export default EventForm;
