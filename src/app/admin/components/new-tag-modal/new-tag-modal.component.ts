import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Tag } from '../../../shared/models/tag';
import { CreateService } from '../../services/tag/create/create.service';
import { UpdateService } from '../../services/tag/update/update.service';

@Component({
  selector: 'app-new-tag-modal',
  templateUrl: './new-tag-modal.component.html',
  styleUrl: './new-tag-modal.component.css'
})
export class NewTagModalComponent implements OnInit {
  @Input() tags: Tag[] = [];
  editing: boolean = false;
  opened: boolean = false;
  creating: boolean = false;
  tagForm: FormGroup = new FormGroup({});
  errorMessage: string = "";

  constructor(
    private createTagService: CreateService,
    private updateTagService: UpdateService,
    private router: Router, private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ){}

  ngOnInit(): void {
    this.tagForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      tagSelected: [null, ]
    });
  }

  insertTagData() {
    if (!this.tagForm.value.tagSelected || this.tagForm.value.tagSelected === 'null') return;
    const tag = this.tags.filter((tag) => tag.id === parseInt(this.tagForm.value.tagSelected));
    this.tagForm.patchValue(tag[0]);
  }

  createTag(): void {
    if(this.tagForm.valid){
      this.errorMessage = "";
      const data = this.tagForm.value;
      delete data['tagSelected'];
      this.creating = true;
      this.createTagService.create(data).subscribe(() => {
        this.creating = false;
        this.windowReload();
      });
    }else
      this.errorMessage = "Form invalid";
  }

  updateTag(): void {
    if(this.tagForm.valid){
      this.errorMessage = "";
      const data = this.tagForm.value
      const id = data['tagSelected'];
      delete data['tagSelected'];
      this.creating = true;
      this.updateTagService.update(id, data).subscribe(() => {
        this.creating = false;
        this.windowReload();
      });
    }else
      this.errorMessage = "Form invalid";
  }

  windowReload(){
    window.location.reload();
  }

  openModal() {
    this.tagForm.patchValue({tagSelected: null ,name: '', description: ''});
    this.opened = true;
    this.editing = false;
  }

  loadModal() {
    this.tagForm.patchValue({tagSelected: null ,name: '', description: ''});
    this.opened = true;
    this.editing = true;
  }

  closeModal() {
    this.opened = false;
    this.editing = false;
  }
}
