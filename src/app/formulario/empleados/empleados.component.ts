import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface EmpleadoGuardado {
  matricula: string;
  nombre: string;
  correo: string;
  edad: number;
  horas: number;
}

@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [],
  templateUrl: './empleados.component.html',
  styles: ``
})

export default class EmpleadosComponent {
  formGroup!: FormGroup;
  empleadosGuardados: EmpleadoGuardado[] = [];
  mostrarTabla: boolean = false;

  constructor(private readonly fb: FormBuilder) {}

  ngOnInit(): void {
    this.formGroup = this.initForm();
    this.cargarEmpleados();
  }

  initForm(): FormGroup {
    return this.fb.group({
      matricula: [''],
      nombre: [''],
      correo: [''],
      edad: [''],
      horas: ['']
    });
  }

  onSubmit(): void {
    const { matricula, nombre, correo, edad, horas } = this.formGroup.value;
    
    const nuevoEmpleado: EmpleadoGuardado = {
      matricula,
      nombre,
      correo,
      edad,
      horas
    };

    this.empleadosGuardados.push(nuevoEmpleado);
    this.guardarEmpleados();
    this.formGroup.reset();
  }

  guardarEmpleados(): void {
    localStorage.setItem('empleados', JSON.stringify(this.empleadosGuardados));
  }

  cargarEmpleados(): void {
    const empleadosGuardados = localStorage.getItem('empleados');
    if (empleadosGuardados) {
      this.empleadosGuardados = JSON.parse(empleadosGuardados);
    }
  }

  eliminarEmpleado(index: number): void {
    this.empleadosGuardados.splice(index, 1);
    this.guardarEmpleados();
  }

  mostrarTablaEmpleados(): void {
    this.mostrarTabla = !this.mostrarTabla;
  }
}
