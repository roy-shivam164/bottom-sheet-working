import { Component, Input, ElementRef, Renderer2 } from '@angular/core';
import {
  MatBottomSheet,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';

@Component({
  selector: 'hello',
  templateUrl: `./hello.component.html`,
  styles: [
    `h1 { font-family: Lato; };.no-scroll {
    /* Disable pointer events to prevent interactions */
    pointer-events: none;
  }`,
  ],
})
export class HelloComponent {
  constructor(private _bottomSheet: MatBottomSheet) {}

  @Input() name: string;

  openBottomSheet(): void {
    this._bottomSheet.open(DemoBottomSheet);
  }
}

@Component({
  selector: 'demo-bottom-sheet',
  templateUrl: './demo-bottom-sheet.html',
  styles: [],
})
export class DemoBottomSheet {
  private startY: number = 0;
  private currentY: number = 0;
  private isDragging: boolean = false;

  constructor(
    private _matBottomSheetRef: MatBottomSheetRef<DemoBottomSheet>,
    private elementRef: ElementRef,
    private renderer: Renderer2 // Using Renderer2 for DOM manipulations
  ) {}

  startDrag(event: MouseEvent | TouchEvent): void {
    this.isDragging = true;
    this.startY =
      event instanceof MouseEvent ? event.clientY : event.touches[0].clientY;

    // Add class to disable pointer events
    this.renderer.addClass(this.elementRef.nativeElement, 'no-scroll');

    // Add event listeners
    document.addEventListener('mousemove', this.onDrag);
    document.addEventListener('mouseup', this.stopDrag);
    document.addEventListener('touchmove', this.onDrag);
    document.addEventListener('touchend', this.stopDrag);

    // Prevent default scroll behavior
    document.body.style.overflow = 'hidden';
  }

  onDrag = (event: MouseEvent | TouchEvent): void => {
    if (!this.isDragging) return;

    this.currentY =
      event instanceof MouseEvent ? event.clientY : event.touches[0].clientY;
    const deltaY = this.currentY - this.startY;

    // Update the position of the bottom sheet (optional, for visual feedback)
    const container = this.elementRef.nativeElement.querySelector(
      '.bottom-sheet-container'
    );
    container.style.transform = `translateY(${deltaY}px)`;

    // If dragged down enough, close the bottom sheet
    if (deltaY > 50) {
      // 50 pixels threshold to close
      this._matBottomSheetRef.dismiss();
      this.stopDrag(); // Clean up event listeners
    }
  };

  stopDrag = (): void => {
    if (!this.isDragging) return;

    this.isDragging = false;

    // Remove class disabling pointer events
    this.renderer.removeClass(this.elementRef.nativeElement, 'no-scroll');

    // Remove event listeners
    document.removeEventListener('mousemove', this.onDrag);
    document.removeEventListener('mouseup', this.stopDrag);
    document.removeEventListener('touchmove', this.onDrag);
    document.removeEventListener('touchend', this.stopDrag);

    // Reset the position of the bottom sheet (optional, for visual feedback)
    const container = this.elementRef.nativeElement.querySelector(
      '.bottom-sheet-container'
    );
    container.style.transform = `translateY(0)`;

    // Restore default scroll behavior
    document.body.style.overflow = '';
  };
}
