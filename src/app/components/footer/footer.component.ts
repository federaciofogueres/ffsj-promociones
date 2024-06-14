import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    NgbModule
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  width: number = 0;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }
  
  ngOnInit() {  
    if (isPlatformBrowser(this.platformId)) {
      this.width = window.innerWidth;
    }
  }

}
