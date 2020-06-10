import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { ServerService } from 'src/app/service/server.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-new-object-web',
  templateUrl: './new-object-web.component.html',
  styleUrls: ['./new-object-web.component.scss']
})
export class NewObjectWebComponent implements OnInit {

  web: string;
  urlweb: string;
  locattionSice: number = 0;
  locations: any = [];

  accountSice: number = 0;
  accounts: any = [];

  contactSice: number = 0;
  contacts: any = [];

  Username: string;
  imgdefault: string = 'assets/img/default-avatar.png';
  cheange = false;

  IMG: string;
  formData = new FormData();
  id = 0;
  idTipoUsuario;

  Descripcion: string;
  Latitud: string;
  Longitud: string;
  dialogCorreo: string;
  dialogPassword: string;
  dialogUrl: string;

  idProyect: string;
  tags = [];
  usuarioModal: string;

  public hostUrl: string = 'https://ej2services.syncfusion.com/production/web-services/';
  public ajaxSettings: object = {
    url: this.hostUrl + 'api/FileManager/FileOperations',
    getImageUrl: this.hostUrl + 'api/FileManager/GetImage',
    uploadUrl: this.hostUrl + 'api/FileManager/Upload',
    downloadUrl: this.hostUrl + 'api/FileManager/Download'
  };
  data = [];

  keyword = 'name';
  constructor(
    public dialog: MatDialog,
    private modalService: NgbModal,
    private routeActive: ActivatedRoute,
    private server: ServerService
  ) {

  }

  ngOnInit(): void {
    this.locattionSice = this.locations.length;
    this.accountSice = this.accounts.length;
    this.contactSice = this.contacts.length;
    if (this.routeActive.snapshot.params.id != undefined) {
      this.idProyect = this.routeActive.snapshot.params.id;
      this.server.getDataProyect(this.routeActive.snapshot.params.id).subscribe((data) => {
        this.tags = [];
        this.tags = [{
          tag: data['data']['tag'],
          tagcolor: "#0f0f0f"
        }];
      });
    }

    this.server.getTarget().subscribe((data) => {

      for (let i = 0; i < data['list'].length; i++) {

        var foto = 'assets/img/default-avatar.png';

        this.server.getTargetFoto(data['list'][i]['_id']).subscribe((res) => {
          if (res['data'] != null)
            foto = 'data:image/jpg;base64,' + res['data'];

          this.data.push({
            'id': data['list'][i]['_id'],
            'Img': foto,
            'name': data['list'][i]['name']
          });
        });
      }
    });
  }


  contactos(contacto) {
    this.modalService.open(contacto, { ariaLabelledBy: 'modal-basic-title' });

  }

  onItemChangeEstado(item) {

  }

  onItemChangeSex(item) {

  }

  addAccount() {

    this.accounts.push({
      Url: this.dialogUrl,
      Correo: this.dialogCorreo,
      Password: this.dialogPassword
    });
    this.dialogUrl = '';
    this.dialogCorreo = '';
    this.dialogPassword = '';

    this.accountSice = this.accounts.length;
    this.modalService.dismissAll();
  }

  opendAccount(modalCuenta) {

    this.modalService.open(modalCuenta, { ariaLabelledBy: 'modal-basic-title' });
  }

  onChange($event, Archivo: FileList) {

    if ($event.target.files) {
      var reader = new FileReader();

      reader.onload = ($event: any) => {
        this.imgdefault = $event.target.result;
      }
      this.cheange = true;
      reader.readAsDataURL($event.target.files[0]);

      this.formData.delete('archivo');
      this.formData.append('archivo', Archivo[0]);
    }
  }

  capturar() {
    this.idTipoUsuario = this.id;
  }

  onSubmit() {
    this.server.uploadFile(this.formData, this.Username).subscribe((data) => { console.log(data) });
    this.cheange = false;
  }

  addLocation() {

    this.locations.push({
      Long: this.Longitud,
      Lat: this.Latitud,
      Descripcion: this.Descripcion
    });

    this.Longitud = '';
    this.Latitud = '';
    this.Descripcion = '';
    this.locattionSice = this.locations.length;
  }


  GuardarDatos() {

    if (this.routeActive.snapshot.params.id != undefined)
      this.tags = [{ tag: "", tagcolor: "" }];

    let targets = [{}];

    this.server.setTargetAddWeb(this.web, [this.idProyect], JSON.stringify(targets), JSON.stringify(this.accounts), JSON.stringify(this.tags), JSON.stringify(this.locations), this.imgdefault, true, this.urlweb).subscribe((data) => {

      if (!data['err']) {
        Swal.fire({
          icon: 'success',
          text: data['message']
        });
      } else {
        Swal.fire({
          icon: 'error',
          text: data['message']
        });
      }
    });

  }

  selectEvent(item) {
    alert(item)
  }

}
