import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {base64ToFile, Dimensions, ImageCroppedEvent, ImageTransform} from 'ngx-image-cropper';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {

  imageChangedEvent: any = '';
  croppedImage64 = '';
  @Output() croppedImage: EventEmitter<string>;
  canvasRotation = 0;
  rotation = 0;
  scale = 1;
  showCropper = false;
  containWithinAspectRatio = false;
  transform: ImageTransform = {};
  croppedImageDetails = new Array<{key: string, value: string}>();
  croppedImageProperties = ['height', 'width'];
  cropperPositionProperties = ['x1', 'x2', 'y1', 'y2'];

  constructor() {
    this.croppedImage = new EventEmitter<string>();
  }

  ngOnInit(): void {
  }

  updateDetails(event: ImageCroppedEvent): void {
    this.croppedImageDetails = [];

    this.pushDetails(event, this.croppedImageProperties, this.croppedImageDetails, '');
    this.pushDetails(event.cropperPosition, this.cropperPositionProperties, this.croppedImageDetails, 'crop');
  }

  recursiveFlattenDetails(object, target, prefix): void {
    Object.keys(object).forEach(prop => {
      // tslint:disable-next-line:variable-name
      const _prefix = (prefix) ? prefix + '.' : '';

      if (Object.keys(object[prop]).length > 0) {
        this.recursiveFlattenDetails(object[prop], target, `${_prefix}${prop}`);
      } else {
        target.push({key: `${_prefix}${prop}`, value: object[prop]});
      }
    });
  }

  pushDetails(object, keys, target, prefix): void {
    // tslint:disable-next-line:variable-name
    const _prefix = (prefix) ? prefix + '.' : '';

    keys.forEach(prop => {
      target.push({key: `${_prefix}${prop}`, value: object[prop]});
    });
  }

  fileChangeEvent(event: any): void {
    console.log(event);
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent): void {
    this.croppedImage64 = event.base64;
    this.croppedImage.emit(event.base64);
    console.log(event, base64ToFile(event.base64));
    this.updateDetails(event);
  }

  imageLoaded(): void {
    this.showCropper = true;
    console.log('Image loaded');
  }

  cropperReady(sourceImageDimensions: Dimensions): void {
    console.log('Cropper ready', sourceImageDimensions);
  }

  loadImageFailed(): void {
    console.log('Load failed');
  }

  rotateLeft(): void {
    this.canvasRotation--;
    this.flipAfterRotate();
  }

  rotateRight(): void {
    this.canvasRotation++;
    this.flipAfterRotate();
  }

  private flipAfterRotate(): void {
    const flippedH = this.transform.flipH;
    const flippedV = this.transform.flipV;
    this.transform = {
      ...this.transform,
      flipH: flippedV,
      flipV: flippedH
    };
  }


  flipHorizontal(): void {
    this.transform = {
      ...this.transform,
      flipH: !this.transform.flipH
    };
  }

  flipVertical(): void {
    this.transform = {
      ...this.transform,
      flipV: !this.transform.flipV
    };
  }

  resetImage(): void {
    this.scale = 1;
    this.rotation = 0;
    this.canvasRotation = 0;
    this.transform = {};
  }

  updateScale(): void {
    this.transform = {
      ...this.transform,
      scale: this.scale
    };
  }

  toggleContainWithinAspectRatio(): void {
    this.containWithinAspectRatio = !this.containWithinAspectRatio;
  }

  updateRotation(): void {
    this.transform = {
      ...this.transform,
      rotate: this.rotation
    };
  }


}
