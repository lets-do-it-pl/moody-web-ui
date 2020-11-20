import styled from 'styled-components';

export const Styles = styled.div`
    h1{
        text-align : center;
        color : #777;
    }

    form {
        display : flex;
        flex-direction : column;
        width : 70%;
        margin : 30px;

        label {
            margin-top : 20px;
        }

        input, select{
            font-size : 1.2em;
        }

        .error{
            color : red;
            font-size : .6em;
        }
    }

    button{
        margin-top : 20px;
        width : 40%;
    }
`