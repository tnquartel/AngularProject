import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { FormBuilder, FormsModule } from '@angular/forms'

import { RegisterFormComponent } from './register-form.component'

describe('RegisterFormComponent', () => {
    let component: RegisterFormComponent
    let fixture: ComponentFixture<RegisterFormComponent>

    const formBuilderSpy = {
        group: jest.fn()
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RegisterFormComponent],
            imports: [FormsModule],
            providers: [{ provider: FormBuilder, useValue: formBuilderSpy }]
        }).compileComponents()
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(RegisterFormComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
