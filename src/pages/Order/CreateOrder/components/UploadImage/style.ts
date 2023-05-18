import styled from "styled-components";
import { css } from 'styled-components';

const dragActive = css`
    border-color:#78e5d5;
`;

const dragReject = css`
    border-color:#e57878;
`;

export const DropContainer = styled.div.attrs({
    className: "dropzone"
})`
    display:flex;
    padding:20px 0px;
    justify-content:center;
    flex-direction:column;
    align-items:center;
    border: 1px dashed #ddd;
    border-radius: 4px;
    cursor: pointer;
    transition: height 0.2s ease;
    ${props => props.isDragActive && dragActive};
    ${props => props.isDragReject && dragReject};
    
`;

const messageColor = {
    default:'#999',
    error:'#e57878',
    success:'#78e5d5'
}

export const UploadMessage = styled.p`
    display:flex;
    color ${props => messageColor[props.type || 'default']};
    justify-content:center;
    align-items:center;
    padding:8px 0;
`;