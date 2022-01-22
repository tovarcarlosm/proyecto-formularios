import {RouterModule, Routes} from "@angular/router";
import {TemplateComponent} from "./pages/template/template.component";
import {ReactiveComponent} from "./pages/reactive/reactive.component";
import {NgModule} from "@angular/core";

const APP_ROUTES: Routes = [
  { path: 'template', component: TemplateComponent },
  { path: 'reactive', component: ReactiveComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'template' }
];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule]
})

export class AppRouterModule {}
