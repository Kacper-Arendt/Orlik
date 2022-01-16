import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {
    ChooseGender,
    FirebasePath,
    IUser,
    Popup,
    uploadPhoto,
    useField, useLoading, UserImage,
    useUpdateDoc,
    WithLoading
} from "../../Components";
import {device} from "../../../model/Media";
import {BackgroundPicker} from "./BackgroundPicker";

const EditForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;

  width: 30rem;
  padding: 2rem 1rem;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.35) 0 5px 15px;
  border-radius: .5rem;
  font-size: 1.6rem;

  label {
    display: flex;
    flex-direction: column;
    row-gap: .5rem;
    font-size: .7em;
  }

  input {
    width: 18rem;
    outline: none;
    border: 1px solid black;
    border-radius: 3px;
    padding: .5rem;
  }

@media${device.tablet} {
  width: 40rem;
  font-size: 2rem;

  input {
    padding: .75rem;
    width: 25rem;
  }
}
`;

const Button = styled.button`
  width: 8rem;
  padding: .75rem;

  font-size: 1.6rem;
  background-color: transparent;
  border: 2px solid green;
  border-radius: 3px;
  color: #000;

  :first-of-type {
    border: 2px solid red;
  }

@media${device.tablet} {
  width: 10rem;
}
`;

const Image = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  img {
    width: 7.5rem;
    height: 7.5rem;
    border-radius: 100%;
    border: 2px solid orange;
    object-fit: cover;
  }


@media${device.tablet} {
  img {
    width: 12.5rem;
    height: 12.5rem;
  }
}
`;

interface IProps {
    handleOpen: () => void,
    data: IUser,
}

export const Edit = (props: IProps) => {
    const [photo, setPhoto] = useState({url: '', file: ''});
    const {fields, handleChange, setFields} = useField(props.data);
    const { message, setMessage} = useLoading();
    const {setSearch, state, clearData} = useUpdateDoc<IUser, string>(
        {
            path: FirebasePath.users,
            id: fields.id,
            data: fields,
            version: fields.version
        });

    useEffect(() => {
        if (state.response === 'Done') {
            clearData();
            setSearch(false);
            setMessage({type: 'success', message: 'Done'});
            props.handleOpen();
        }
    }, [state, props, setSearch, clearData, setMessage]);

    const onImageChange = (e: any) => {
        if (e.target.files && e.target.files[0]) {
            setPhoto({
                file: e.target.files[0],
                url: URL.createObjectURL(e.target.files[0])
            });
        }
    };

    const onSubmitHandler = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (photo.file) {
            const uploadedPhoto = await uploadPhoto(FirebasePath.users, props.data.id, photo.file);
            if (uploadedPhoto) {
                setFields({...fields, photo: uploadedPhoto});
                setSearch(true);
            }
        } else setSearch(true)
    };

    return (
        <WithLoading isLoading={state.loading} message={message}>
            <Popup>
                <EditForm onSubmit={onSubmitHandler}>
                    <Image>
                        {photo.url ?
                            <img src={photo.url} alt="User"/>
                            :
                            <UserImage photo={props.data.photo}/>
                        }
                    </Image>
                    <label>
                        Image: (5mb max)
                        <input accept="image/*" type="file" onChange={onImageChange}/>
                    </label>
                    <label>
                        Background:
                        <BackgroundPicker
                            bgcId={fields.backgroundColor}
                            chooseBgc={(val) => setFields({...fields, backgroundColor: val})}/>
                    </label>
                    <label>
                        Name:
                        <input name='name'
                               value={fields.name}
                               type="text"
                               minLength={3}
                               maxLength={14}
                               onChange={handleChange}/>
                    </label>
                    <label>
                        Age:
                        <input name='age' value={fields.age} type="number" onChange={handleChange}/>
                    </label>
                    <label>
                        City:
                        <input name='city' value={fields.city} type="text" onChange={handleChange}/>
                    </label>
                    <label>
                        Postal code:
                        <input name='postalCode' value={fields.postalCode} type="text" onChange={handleChange}/>
                    </label>
                    <ChooseGender
                        gender={fields.gender}
                        setGender={(val) => setFields({...fields, gender: val})}/>
                    <Button onClick={props.handleOpen} type='button'>Cancel</Button>
                    <Button type='submit'>Submit</Button>
                </EditForm>
            </Popup>
        </WithLoading>
    )
}