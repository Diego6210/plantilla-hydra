import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
import { ServerService } from 'src/app/service/server.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-asignar-tareas',
  templateUrl: './asignar-tareas.component.html',
  styleUrls: ['./asignar-tareas.component.scss']
})
export class AsignarTareasComponent implements OnInit {

  
  constructor(
    private modalService: NgbModal,
    private server:ServerService
  ) { }

  Tarea:string;
  Titulo:string;
  Fecha:string;
  idUsuario:number;
  Usuario=[];
  id = 0;


  ngOnInit(): void {
    this.getUsuarios();
  }

  capturar() {
    this.idUsuario = this.id;
  }

  getUsuarios(){
    /*this.server.getUsuariosAll().subscribe((data) => {
      this.Usuario = [];
      for(let i = 0; i < data['Usuario'].length; i++){

        this.Usuario.push({
          
          Usuario:data['Usuario'][i].Usuario,
          Id:data['Usuario'][i].IdUsuario

        });
      }
    });*/
  }


  SaveTask(){
    if(this.Fecha != undefined ||this.Titulo != undefined || this.Tarea != undefined || this.idUsuario != undefined)
    {  
      if(this.Fecha != '' ||this.Titulo != '' || this.Tarea != '' || this.idUsuario != 0)
      {
        /*this.server.setTarea(this.Titulo,this.Tarea,this.Fecha,1,this.idUsuario).subscribe((data) =>{ 
          Swal.fire({
            icon: 'success',
            text:'Tarea asignada correctamente'
          });
          
        });*/

        this.Fecha = '';
        this.Titulo = '';
        this.Tarea = '';
      }
      else{
        Swal.fire({
          icon: 'error',
          text:'Complete los campos',
        });
      }        
    }else{
      Swal.fire({
        icon: 'error',
        text:'Complete los campos',
      });
    } 
  }
}