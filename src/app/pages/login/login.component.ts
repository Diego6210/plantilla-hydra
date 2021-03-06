import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from "jquery"
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { environment } from 'src/environments/environment';
import { ServerService } from 'src/app/service/server.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  Password:string;
  Username:string;
  nombreAplicacion:string;

  constructor(
    private localStorange:LocalStorageService,
    private router: Router,
    private server: ServerService
  ) { }

  ngOnInit(): void {
    this.nombreAplicacion = environment.nombreAplicacion;

    $('.button_try').click(function() {
      setTimeout(function() {
        $('.failed').fadeOut(123);
      }, 250);
      setTimeout(function() {
        $('.login_title').fadeIn();
        $('.login_fields').fadeIn();
        $('.login_fields div').fadeIn();
        $('.disclaimer').fadeIn();
        $('.authent.visible').fadeOut();
    
      }, 250);
    });
    
    $('input[type="text"],input[type="password"]').focus(function() {
      $(this).prev().animate({
        'opacity': '1'
      }, 200)
    });
    $('input[type="text"],input[type="password"]').blur(function() {
      $(this).prev().animate({
        'opacity': '.5'
      }, 200)
    });
    
    $('input[type="text"],input[type="password"]').keyup(function() {
      if ($(this).val() != '') {
        $(this).next().animate({
          'opacity': '1',
          'right': '30'
        }, 200)
      } else {
        $(this).next().animate({
          'opacity': '0',
          'right': '20'
        }, 200)
      }
    });
    
    var open = 0;
    $('.tab').click(function() {
      $(this).fadeOut(200, function() {
        $(this).parent().animate({
          'left': '0'
        })
      });
    });
    
  }

  login(){

    var estatus = false;

    this.server.signin(this.Username,this.Password).subscribe((data) => {

      this.localStorange.setStorage('token',data['token']);

      let fecha = new Date();
      fecha.setSeconds(1800);
      this.localStorange.setStorage('expira',fecha.getTime().toString());



      if(data['token'] != '')
        estatus = true;
    });


    $('.login').addClass('test')
      setTimeout(function() {
        $('.login').addClass('testtwo')
      }, 300);
      setTimeout(function() {
        $(".authent").show().animate({
          right: -20 // -320
        }, {
          duration: 600,
          queue: false
        });
        $(".authent").animate({
          opacity: 1
        }, {
          duration: 200,
          queue: false
        }).addClass('visible');
      }, 500);


      setTimeout(function() {
        $(".authent").show().animate({
          right: 90
        }, {
          duration: 600,
          queue: false
        });
        $(".authent").animate({
          opacity: 0
        }, {
          duration: 200,
          queue: false
        }).addClass('visible');

        $('.login').removeClass('testtwo');

        if(estatus){
          setTimeout(function() {
            $('.login').removeClass('test')
            $('.login div').fadeOut(123);
          }, 250);
          setTimeout(function() {
            $('.success').fadeIn();
          }, 300);
          setTimeout(function() {
            location.href='#/dashboard';
          }, 2000);
        }else{
          $(".authent").hide();
          setTimeout(function() {
            $('.login').removeClass('test')
            $('.login div').fadeOut(123);
          }, 250);
          setTimeout(function() {
            $('.failed').fadeIn();
            $('.button_try').fadeIn();
          }, 300);

        }

      }, 2500);

        this.localStorange.setStorage('userInfo',this.Username);
  }


}
