import { Routes } from '@angular/router';
import { ListServidores } from './components/servidores/list-servidores/list-servidores';
import { ServidorForm } from './components/servidores/servidor-form/servidor-form';
import { ServidorDetail } from './components/servidores/servidor-detail/servidor-detail';
import { ServidorDelete } from './components/servidores/servidor-delete/servidor-delete';
import { listServidoresResolver } from './components/servidores/list-servidores/list-servidores.resolver';
import { servidorResolver } from './components/servidores/servidor-detail/servidor.resolver';
import { incidenciasResolver } from './components/servidores/servidor-detail/incidencias.resolver';

export const routes: Routes = [ 
  { path: '', redirectTo: 'servidores', pathMatch: 'full' },

  { 
    path: 'servidores',
    component: ListServidores,
    resolve: { servidores: listServidoresResolver } 
  },

  { path: 'servidores/nuevo', component: ServidorForm },

  { 
    path: 'servidores/:id',
    component: ServidorDetail,
    resolve: { servidor: servidorResolver, incidencias: incidenciasResolver } 
  },

  { path: 'servidores/:id/editar', component: ServidorForm },
  { path: 'servidores/:id/eliminar', component: ServidorDelete },
  { path: '**', redirectTo: 'servidores' }
];
