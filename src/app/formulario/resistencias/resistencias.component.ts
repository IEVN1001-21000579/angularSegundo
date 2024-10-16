import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

interface Resistencia{
  color1: string;
  color2: string;
  color3: string;
  Tolercia: string;
}

@Component({
  selector: 'app-resistencias',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './resistencias.component.html',
  styles: ``
})

export default class ResistenciasComponent implements OnInit{
  formGroup!: FormGroup;

  resistencia: Resistencia = {
    color1: '',
    color2: '',
    color3: '',
    Tolercia: ''
  }

  constructor(private readonly fb: FormBuilder){
    this.formGroup = this.initForm();
  }

  ngOnInit():void{
    this.formGroup = this.initForm();
  }

  initForm():FormGroup{
    return this.fb.group({
      color1: [''],
      color2: [''],
      color3: [''],
      Tolercia: ['']
    });
  }

  onSubmit():void{
    const { color1, color2, color3, Tolercia } = this.formGroup.value;
    this.resistencia.color1=color1;
    this.resistencia.color2=color2;
    this.resistencia.color3=color3;
    this.resistencia.Tolercia=Tolercia;

    let resistenciaJSON = JSON.stringify(this.resistencia);
    localStorage.setItem("resistencia", resistenciaJSON);
  }

  subImprimir():void{
    const resistenciaGuardado = localStorage.getItem("resistencia");
    if(resistenciaGuardado){
      const resistenciaRecuperado: Resistencia = JSON.parse(resistenciaGuardado);
      this.resistencia = resistenciaRecuperado;
    }
  }
}
