import { Routes } from '@angular/router';
import { ListServidores } from './components/servidores/list-servidores/list-servidores';
import { ServidorForm } from './components/servidores/servidor-form/servidor-form';
import { ServidorDetail } from './components/servidores/servidor-detail/servidor-detail';
import { ServidorDelete } from './components/servidores/servidor-delete/servidor-delete';

export const routes: Routes = [ 
  { path: '', redirectTo: 'servidores', pathMatch: 'full' },
  { path: 'servidores', component: ListServidores },
  { path: 'servidores/nuevo', component: ServidorForm },
  { path: 'servidores/:id', component: ServidorDetail },
  { path: 'servidores/:id/editar', component: ServidorForm },
  { path: 'servidores/:id/eliminar', component: ServidorDelete },
  { path: '**', redirectTo: 'servidores' }
];
