import { Fragment, useState } from "react";
import Header from "./Header";
import Body from './Body';
import Upload from "./Upload";

function Home (){
    const [uploadState, setUploadState] = useState(null);
    const [pageSelect, setPageSelect] = useState('transactiontable')
    function uploadStateShowHandler () {
        setUploadState('UploadShow');
    }
    function uploadStateHideHandler () {
        setUploadState(null);
    }
    const pageSelectHandler = (event) =>{
        setPageSelect(event.target.attributes.value.value)
    }
    return (
        <Fragment>
            <Header uploadStateShowHandler={uploadStateShowHandler} uploadState={uploadState} pageSelectHandler={pageSelectHandler}></Header>
            <Body pageSelect={pageSelect} ></Body>
            {uploadState && <Upload className='UploadShow' uploadStateHideHandler={uploadStateHideHandler}></Upload>}
        </Fragment>
           
    );
}

export default Home;