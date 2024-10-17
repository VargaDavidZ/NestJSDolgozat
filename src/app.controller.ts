import { Body, Controller, Get, Param, Post, Query, Render, Res } from '@nestjs/common';
import { AppService } from './app.service';

import { DataDto } from './data.dto';
import { Response } from 'express';



@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}


  #errors = [];


  @Get("")
  @Render("index")
  getIndex()
  {
    
  }


  @Get("szallasForm")
  @Render('szallasForm')
  getSzallas(@Query('item') item: DataDto) {
    return {
      errors: [],
      msg: [],
      nameData: "",
      emailData: "",
      dateData: "",
    };
  }


  



  @Post("szallasForm")
  getFormData(@Body() item: DataDto, @Res() response: Response )
  {

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

   if(item.Nev == "" || item.Email == "" || item.Datum.toString() == "")
   {
    this.#errors.push("Minden adatot meg kell adni")
   }
   else if(!emailRegex.test(item.Email))
    {
       this.#errors.push("Helytelen email")
    }
    else
    {
      this.#errors = []
    }
    

   
 

   console.log(item.Nev)
   console.log(item.Email)
   console.log(item.Datum)

  

   

   console.log(this.#errors)
   
   if(this.#errors.length == 0)
   {

    response.redirect("sikeresFoglalas",303)
    
   }
   else{
    response.render("szallasForm", {

      nameData: item.Nev,
      emailData: item.Email,
      dateData: item.Datum,

      msg: "",
      errors: this.#errors
    })
   }


  }
 


  @Get("sikeresFoglalas")
  @Render("sikeresFoglalas")
  getSiker(){

  }




}
