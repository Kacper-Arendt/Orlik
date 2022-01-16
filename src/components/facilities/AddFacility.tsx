import React from "react";
import styled from "styled-components";
import {WrapperStyles} from "../reusable/Css";
import {FirebasePath, useField, WithLoading, useLoading, generateDoc, useAppSelector} from "../Components";
import {device} from "../../model/Media";

const Wrapper = styled.div`
  ${WrapperStyles};
  display: grid;
  align-items: start;
  grid-template-columns: 1fr;
  grid-auto-rows: min-content;
  row-gap: 5rem;

  width: 100%;
  max-width: 65rem;
  padding: 3rem 0;

  img {
    display: none;
  }

@media${device.mobileM} {
  grid-template-columns: 1fr 1fr;
  grid-template-rows: min-content min-content;
  grid-template-areas: 
    "header form"
   "img form";
  gap: 0;
  margin-top: 10rem;

  img {
    grid-area: img;
    display: block;
    width: 100%;
    height: auto;
  }
}
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  padding: 0 2rem;
  font-size: 1.4rem;
@media${device.mobileM} {
  grid-area: header;
}
`;

const Form = styled.form`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 30rem;

  padding: 0 2rem;
  row-gap: 1rem;
  font-size: 1.6rem;

  label {
    width: 100%;
    font-weight: 500;
    display: flex;
    flex-direction: column;
    row-gap: .5rem;
    font-size: .9em;
  }

  input {
    outline: none;
    border: 1px solid black;
    border-radius: 3px;
    padding: .75rem;
  }


  button {
    margin-top: 1rem;
    padding: 1rem 2rem;
    border: none;
    border-radius: 5px;

    box-shadow: rgba(0, 0, 0, .1) 0 2px 4px 0;
    outline: none;
    font-size: .9em;
    color: #fff;
    cursor: pointer;

    :first-of-type {
      background-color: var(--color-reset);
    }

    :last-of-type {
      background-color: var(--color-submit);
    }
  }

@media${device.mobileM} {
  grid-area: form;
}
`;

const initialState = {
    name: '',
    city: '',
    street: '',
    streetNumber: '',
    postalCode: '',
    version: 0,
}

export const AddFacility = () => {
    const {fields, handleChange, reset} = useField(initialState);
    const {loading, setLoading, message, setMessage} = useLoading();
    const {user} = useAppSelector(state => state);

    const onSubmitHandler = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
             await generateDoc(FirebasePath.facilities, {...fields, ownerId: user.id});
            reset();
            setMessage({type: 'success', message: 'Facility Added'});
        } catch (e) {
            setMessage({type: 'error', message: 'Something went wrong, try again'});
        } finally {
            setLoading(false);
        }
    }

    return (
        <WithLoading isLoading={loading} message={message}>
            <Wrapper>
                <Header>
                    <h2>Create a new Facility</h2>
                    <p>The facility includes all information about it, such as: address, owners and playing fields.</p>
                    <p>Thank you for building our community</p>
                </Header>
                <Form onSubmit={onSubmitHandler}>
                    <label>
                        Name
                        <input
                            type="text"
                            name='name'
                            value={fields.name}
                            required
                            minLength={5}
                            maxLength={25}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        City
                        <input
                            type="text"
                            name='city'
                            value={fields.city}
                            minLength={2}
                            required
                            maxLength={25}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Street
                        <input
                            type="text"
                            name='street'
                            value={fields.street}
                            minLength={3}
                            required
                            maxLength={25}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Street number
                        <input
                            type="text"
                            name='streetNumber'
                            value={fields.streetNumber}
                            minLength={1}
                            required
                            maxLength={8}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Postal-code
                        <input
                            type="text"
                            name='postalCode'
                            value={fields.postalCode}
                            minLength={6}
                            required
                            onChange={handleChange}
                        />
                    </label>
                    <button type='reset' onClick={reset}>Reset</button>
                    <button type='submit'>Add</button>
                </Form>
                <img src="https://ik.imagekit.io/kacper/Orlik/woman-writting_u2dKEUdj6lh.jpg?updatedAt=1641559901818"
                     alt="typewriter"/>
            </Wrapper>
        </WithLoading>
    )
}