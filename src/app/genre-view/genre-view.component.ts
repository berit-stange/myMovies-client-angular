import { Component, OnInit, Inject } from '@angular/core';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-genre-view',
  templateUrl: './genre-view.component.html',
  styleUrls: ['./genre-view.component.scss']
})
export class GenreViewComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public genre: {
      name: string;
      description: string;
    }
  ) { }

  ngOnInit(): void {
  }

}
