import { Routes } from '@angular/router';

export default[
    {
        path: 'formulario',
        loadComponent: () => import('./ejemplo1.component'),
    }
] as Routes