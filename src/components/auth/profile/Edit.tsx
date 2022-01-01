import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {FaUserAlt} from "react-icons/fa";
import {
    ChooseGender,
    FirebasePath,
    IUser,
    Popup,
    uploadPhoto,
    useField,
    useSaveDoc,
    WithLoading
} from "../../Components";
import {device} from "../../../model/Media";

const EditForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
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
`;

const Image = styled.div`
  img, svg {
    width: 7.5rem;
    height: 7.5rem;
    border-radius: 100%;
    border: 2px solid orange;
    object-fit: cover;
  }

  svg {
    background-color: #eee;
    padding: .5rem;
  }

@media${device.tablet} {
  img, svg {
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
    const [gender, setGender] = useState(props.data.gender);
    const {fields, handleChange, setFields} = useField(props.data);
    const {setSearch, state} = useSaveDoc<IUser, string>(
        {
            path: FirebasePath.users,
            id: fields.id,
            data: {...fields, gender: gender,},
            version: fields.version
        });

    useEffect(() => {
        if (state.response === 'Done') {
            setSearch(false);
            props.handleOpen();
        }
    }, [state, props, setSearch]);

    const onImageChange = (e: any) => {
        if (e.target.files && e.target.files[0]) {
            setPhoto({
                file: e.target.files[0],
                url: URL.createObjectURL(e.target.files[0])
            });
        }
    }

    const onSubmitHandler = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (photo.file) {
            const uploadedPhoto = await uploadPhoto(FirebasePath.users, props.data.id, photo.file);
            if (uploadedPhoto) {
                setFields({...fields, photo: uploadedPhoto});
                setSearch(true);
            }
        } else setSearch(true)
    }

    return (
        <WithLoading isLoading={state.loading} error={state.message}>
            <Popup>
                <EditForm onSubmit={onSubmitHandler}>
                    <Image>
                        {photo.url ?
                            <img src={photo.url} alt="User"/>
                            :
                            <>
                                {props.data.photo ?
                                    <img src={props.data.photo} alt="User"/>
                                    :
                                    <FaUserAlt/>
                                }
                            </>
                        }
                    </Image>
                    <label>
                        Upload Image:
                        <input accept="image/*" type="file" onChange={onImageChange}/>
                    </label>
                    <label>
                        Name:
                        <input name='name' value={fields.name} type="text" minLength={3} onChange={handleChange}/>
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
                    <ChooseGender gender={gender} setGender={(val) => setGender(val)}/>
                    <button onClick={props.handleOpen} type='button'>Cancel</button>
                    <button type='submit'>Submit</button>
                </EditForm>
            </Popup>
        </WithLoading>

    )
}