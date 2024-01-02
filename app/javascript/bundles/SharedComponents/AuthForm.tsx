import * as React from 'react';
import {FormEvent, FunctionComponent} from 'react'
import {Button, Header, Form} from 'semantic-ui-react'

interface AuthFormProps {
    onEmailChange(event: FormEvent<HTMLInputElement>): void,
    onPasswordChange(event: FormEvent<HTMLInputElement>): void,
    onSubmit(event: FormEvent<HTMLFormElement>): void,
}

const AuthForm: FunctionComponent<AuthFormProps> = ({onEmailChange, onPasswordChange, onSubmit}) => {
    return (
        <div>
            <Header>Signup</Header>
            <Form onSubmit={onSubmit}>
                <Form.Field>
                    <label>Email</label>
                    <input onInput={onEmailChange} type={'email'} placeholder='example@example.com'/>
                </Form.Field>
                <Form.Field>
                    <label>Password</label>
                    <input onInput={onPasswordChange} type={'password'}/>
                </Form.Field>
                <Button type='submit'>Submit</Button>
            </Form>
        </div>
    );
}

export default AuthForm