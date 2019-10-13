import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-myPoc',
  templateUrl: './myPoc.component.html',
  styleUrls: ['./myPoc.component.css']
})
export class MyPOCComponent implements OnInit {
  name : string;
  surname : string;
  id : any;
  image : any;
  email : string;
  response : any;
  dialogRef : any;
  private url = 'https://reqres.in/api/users';
  constructor(private HttpClient: HttpClient) {
    HttpClient.get(this.url)
    .subscribe(response => {
      if(response.data.length != 0){
        this.response = response;
        console.log(response);
        $('div.noDtaComing').hide();
        $('button').removeClass('disabled');
      }else{
        $('div.noDtaComing').show();
        $('button').addClass('disabled');
      }
    })
   }

  ngOnInit() {}

  getUpdate(data){
    console.log(data);
    this.name = data.first_name;
    this.surname = data.last_name;
    this.id = data.id;
    this.image = data.avatar;
    $('div.updateDetails').show();
  }

  closeModal(){
    $('div.updateDetails, .addDetails, .emptyData, .deleteData').hide();
  }

  addUser(){
    $('.addDetails').show();
  }

  addDetails(name, lastname, email){
    console.log(name, email, lastname);
    let data = {
      "first_name":name,
     "email":email,
     "last_name":lastname,				 					
     "avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/calebogden/128.jpg",
    };
    this.HttpClient.post(this.url, data)
    .subscribe(response => {
      if(name != undefined || email != undefined || lastname != undefined){
        this.response = response;
        $('.emptyData, .beforeRegister').show();
        $('.emptyData p').html('Added Successfully...');
        console.log('this.response',this.response);
      }else{
        $('.emptyData').show();
        $('.emptyData p').html('Error while creating User...');
      }
    })
    
  }

  updateDetails(name, surname){
    console.log(name, this.id);
    let data = {
      "first_name": name,
      "last_name": surname,
      "avatar":this.image,
    };
    this.HttpClient.patch(this.url+'/'+this.id, data)
    .subscribe(response => {
      if(name != undefined || surname != undefined){
        this.response = response;
        $('.emptyData, .beforeRegister').show();
        $('.emptyData p').html('Updated Successfully...');
        console.log('this.response',this.response);
      }else{
        $('.emptyData').show();
        $('.emptyData p').html('Error while updating User...');
      }
    })
  }

  getNext(pageNumber){
    var pageNumber = pageNumber+1;
    console.log('pageNumber next',pageNumber);
    this.HttpClient.get(this.url+'?page='+pageNumber)
    .subscribe(response => {
      if(response.data.length != 0){
        this.response = response;
        console.log('this.response',this.response);
      }else{
        $('.emptyData').show();
        $('.emptyData p').html('No More Data...');
      }
    })

  }

  getPrev(pageNumber){
    $('.beforeRegister').hide();
    let id = pageNumber-1;
    console.log('pageNumber prev',id);
    this.HttpClient.get(this.url+'?page='+id)
    .subscribe(response => {
      this.response = response;
      console.log('this.response',this.response);
    })

  }

  deletePopUp(pageNumber){
    console.log('pageNumber',pageNumber);
    this.id = pageNumber;
    $('.deleteData').show();
  }

  deleteUser(){
    console.log('pageNumber',this.id);
    this.HttpClient.delete(this.url+'/'+this.id)
    .subscribe(response => {
      if(response != null){
        this.response = response;
        console.log('this.response',this.response);
      }else{
        $('.deleteData').show();
        $('.deleteData p').html('Error while deleting User...');
      }
    })
  }

  

}



