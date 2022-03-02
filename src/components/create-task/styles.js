export default (root) => /*css*/`

${root},
.ctx-content {
    display:flex;
    align-items:flex-end;
    width:100%;
}    

.ctx-content label {
    display:flex;
    flex-wrap:wrap;
    width:calc(100% - 150px);
    padding-right:15px;
}

.ctx-content span {
    width:100%;
    padding-bottom:5px;
}  

.ctx-content input {
    width:100%;
    height:75px;
    padding:0 15px;
    border-radius:5px;
    border:0;
    background:#fff;
    color: #666;
}     

.ctx-content button {
    display:flex;
    align-items:center;
    justify-content:center;
    width:150px;
    height:75px;
    border:0;
    border-radius:5px;
    background: #000;
    color:#fff;
    font-size: .875em;
    text-transform: uppercase;
}
`