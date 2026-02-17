import { NgModule } from '@angular/core';
import { CommonModule as AngularCommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BaseEditComponent } from './page/base-edit/base-edit.component';
import { CardItemComponent } from './page/card-item/card-item.component';
import { TableItemComponent } from './page/table-item/table-item.component';
import { TableComponent } from './page/table/table.component';
import { GridContainerComponent } from './page/gridcontainer/gridcontainer.component';
import { RouterLink } from '@angular/router';

@NgModule({
    imports: [AngularCommonModule, HttpClientModule, RouterLink],
    declarations: [
        BaseEditComponent,
        CardItemComponent,
        TableItemComponent,
        TableComponent,
        GridContainerComponent
    ],
    exports: [
        CardItemComponent,
        TableItemComponent,
        TableComponent,
        GridContainerComponent
    ]
})
export class CommonModule {}
