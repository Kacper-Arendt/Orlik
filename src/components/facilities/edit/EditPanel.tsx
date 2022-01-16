import React, {useEffect, useState} from "react";
import {
    device,
    FirebasePath,
    IFacility,
    updateDocument,
    useField,
    useGetDoc,
    WithLoading
} from "../../Components";
import {useParams} from "react-router-dom";
import styled from "styled-components";
import {BsPencil} from "react-icons/bs";
import {SubmitButtonStyles} from "../../reusable/Css";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;

@media${device.tablet} {
  justify-content: start;
  padding: 2rem;
}
`;

const Data = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  width: 80%;
  min-height: 36rem;
  max-width: 30rem;
  margin-top: 4rem;
  padding: 2rem;
  box-shadow: rgba(0, 0, 0, 0.35) 0 5px 15px;

  svg {
    position: absolute;
    right: 1rem;
    font-size: 2rem;
    cursor: pointer;
  }
`;

const FacilityData = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;

  div {
    display: flex;
    flex-direction: column;
    row-gap: .5rem;
  }

  p {
    font-size: 1.4rem;

    :first-of-type {
      font-size: 1.5rem;
      font-weight: 500;
    }
  }
`;

const EditData = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;

  label {
    display: flex;
    flex-direction: column;
    row-gap: .25rem;
    font-size: 1.4rem;
    font-weight: 500;
  }

  input {
    width: 20rem;
    padding: .5rem;
    outline: none;
  }

  button {
    ${SubmitButtonStyles};
    align-self: start;
    font-size: 1.4rem;
  }
`;

export const EditPanel = () => {
    const {id} = useParams();
    const {setSearch, state} = useGetDoc<IFacility>({path: FirebasePath.facilities, id: id!});
    const [editData, setEditData] = useState(false);
    const {fields, handleChange, setFields} = useField(state.response);

    useEffect(() => {
        setSearch(true);
    }, [id, setSearch]);

    useEffect(() => {
        setFields(state.response);
    }, [state.response, setFields]);

    const onSubmitHandler = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
            if (fields) {
                const request = await updateDocument(FirebasePath.facilities, fields.id, fields, fields.version);
                request === 'Done' && setSearch(true);
                if (request === 'Done') {
                    setSearch(true);
                    setEditData(false);
                }
            }
        } catch (e) {
            console.log(e)
        }
    };

    return (
        <WithLoading isLoading={state.loading}>
            <Wrapper>
                <Data>
                    <BsPencil onClick={() => setEditData(!editData)}/>
                    {editData && state.response?.id ?
                        <EditData onSubmit={onSubmitHandler}>
                            <label>
                                Name:
                                <input type="text" name='name' value={fields?.name}
                                       onChange={handleChange}/>
                            </label> <label>
                            City:
                            <input type="text" name='city' value={fields?.city} onChange={handleChange}/>
                        </label>
                            <label>
                                Street:
                                <input type="text" name='street' value={fields?.street}
                                       onChange={handleChange}/>
                            </label>
                            <label>
                                Street number:
                                <input type="text" name='streetNumber' value={fields?.streetNumber}
                                       onChange={handleChange}/>
                            </label>
                            <label>
                                Postal code:
                                <input type="text" name='postalCode' value={fields?.postalCode}
                                       onChange={handleChange}/>
                            </label>
                            <button type='submit'>Submit</button>
                        </EditData>
                        :
                        <FacilityData>
                            <div>
                                <p>Name:</p>
                                <p>{state.response?.name}</p>
                            </div>
                            <div>
                                <p>City: </p>
                                <p>{state.response?.city}</p>

                            </div>
                            <div>
                                <p>Street:</p>
                                <p>{state.response?.street}</p>
                            </div>
                            <div>
                                <p>Street number:</p>
                                <p>{state.response?.streetNumber}</p>
                            </div>
                            <div>
                                <p>Postal code:</p>
                                <p>{state.response?.postalCode}</p>
                            </div>
                        </FacilityData>
                    }
                </Data>
            </Wrapper>
        </WithLoading>
    )
}