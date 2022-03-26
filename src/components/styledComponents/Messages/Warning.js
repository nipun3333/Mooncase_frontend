import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { MoreIconRed, WarningIcon } from '../../../assets/icon'

const Container = styled.div`
    padding: 15px;
    background: rgba(255, 72, 120, 0.3);
    border-radius: 10px;
    width: ${props => props.width ? props.width : '100%'};
    height: fit-content;
    margin: ${props => props.margin ? props.margin : '0'};
`      
const Head = styled.div`
    display: flex;
    gap: 10px;
`

const Body = styled.div`
    padding: 10px 0;
`

const Foot = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const More = styled.button`
    color: #FF4878;
    background: rgba(0, 0, 0, 0.06);
    border: 1px solid #FF4878;
    box-sizing: border-box;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    padding: 5px 10px;
    gap: 14px;
`

const Button = styled.button`
    background: ${props => props.color ? props.color : '#FF4878'};
    border-radius: 10px;
    width: ${props => props.width ? props.width : '150px'};
    color: white;
    padding: 10px;
`

const Warning = (props) => {

    const [shouldHide, setshouldHide] = useState(false);

    const [hide, setHide] = useState(false);

    useEffect(() => {
        if(props.shouldHide){
            setshouldHide(props.shouldHide);
        }else{
            setshouldHide(false);
        }
    }, [])

    return (
        <>
        {
            hide ? null : 
        <Container width={props.width} margin={props.margin}>
            <Head>
                <WarningIcon />
                <h4 style={{
                    color: '#FF4878',
                    fontWeight: '600',

                }}>
                    Warning
                </h4>
            </Head>
            <Body>
                <p>
                The auctions in this list are indexed directly from the blockchain and do not represent an endorsement by the Copper platform or the Alchemist community. Please note that participating in any of these auctions is a high-risk endeavor and that the value of the tokens that you've received in exchange for contributing to such an auction might go to 0. Copper is not liable for any losses incurred by using our platform.
                </p>
            </Body>
            <Foot>
                <More>
                    Read More 
                    <MoreIconRed />
                </More>
                {
                    shouldHide ?
                    <Button onClick={() => setHide(true)}>
                    I understand
                    </Button>:
                    null
                }
                
            </Foot>
        </Container>
        }
        </>
    )
}

export default Warning
