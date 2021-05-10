import React, { Component } from 'react';
import FileBase64 from 'react-file-base64';
import { Button, Form, FormGroup, Label, FormText, Input } from 'reactstrap'

import './upload.css'
class Upload extends Component {
    state = {
        confirmation: "",
        isLoading: '',
        files: "",
        Invoice: "",
        Amount: "",
        Date: "",
        Vendor: "",
        Description: ""
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        this.setState({ confirmation: "Uploading..." })
    }
    handlechange = (event) => {
        event.preventDefault();
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({name: value})
    }
    getFiles = async (files) => {
        this.setState({
            isLoading: "Extracting data",
            files: files
        })
 
    const UID = Math.round(1+ Math.random()*(1000000-1));

    var data ={
        fileExt: 'jpg',
        imageID: UID,
        folder: UID,
        img: this.state.files[0].base64
    }
    await fetch("https://8zui4edo90.execute-api.us-east-1.amazonaws.com/Production",{
        method: 'POST',
        headers: {
            Accept: 'applicatin/json',
            "Content-Type": 'application.json'
        },
        body: JSON.stringify(data)
    });
    const targetImage = UID+'.jpg';
 const response =   await fetch("https://8zui4edo90.execute-api.us-east-1.amazonaws.com/Production/ocr",{
        method: 'POST',
        headers: {
            Accept: 'applicatin/json',
            "Content-Type": 'application.json'
        },
        body: JSON.stringify(targetImage)
    });
    console.log('OCRBODY',response);
    const OCRBODY = response.body;
    console.log('OCRBODY',OCRBODY);
}

    render() {
        const processing = 'Processing document...';
        return (<div>
            <div className='row'>
                <div className='col-6 offset-3'>
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <h3 className="text-danger">{processing}</h3>
                            <h6>Upload Invoice</h6>
                            <FormText color="muted">PNG, JPB</FormText>
                        </FormGroup>
                        <div className="form-group files color">
                            <FileBase64 multiple={true}
                                onDone={this.getFiles.bind(this)}></FileBase64>
                        </div>
                        <FormGroup>
                            <Label>
                                <h6>Invoice</h6>
                            </Label>
                            <Input
                                type="text" name="Invoice" id="Invoice" value={this.state.Invoice} onChange={this.handlechange} required />
                        </FormGroup>

                        <FormGroup>
                            <Label>
                                <h6>Amount: ($)</h6>
                            </Label>
                            <Input
                                type="text" name="Amount" id="Amount" value={this.state.Amount} onChange={this.handlechange} required />
                        </FormGroup>
                        <FormGroup>
                            <Label>
                                <h6>Date</h6>
                            </Label>
                            <Input
                                type="text" name="Date" id="Date" value={this.state.Date} onChange={this.handlechange} required />
                        </FormGroup>
                        <FormGroup>
                            <Label>
                                <h6>Vendor</h6>
                            </Label>
                            <Input
                                type="text" name="Vendor" id="Vendor" value={this.state.Vendor} 
                                onChange={this.handlechange} required />
                        </FormGroup>
                        <FormGroup>
                            <Label>
                                <h6>Description</h6>
                            </Label>
                            <Input
                                type="text" name="Description" id="Description" value={this.state.Description} onChange={this.handlechange}  required />
                        </FormGroup>
                        
                            <Button className="btn btn-lg btn-block btn-success">Submit</Button>
                     

                    </Form>
                </div>
            </div>
        </div>);
    }
}

export default Upload;
