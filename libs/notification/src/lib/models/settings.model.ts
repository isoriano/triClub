import { ThemePalette, pHoritzontal, pVertical } from '@isg/ui';

export class Settings {
  color: ThemePalette;
  position?: {
    horitzontal: pHoritzontal;
    vertical: pVertical;
  };

  constructor(public title: string, public content: string, color?: ThemePalette, pHoritzontal?: pHoritzontal, pVertical?: pVertical) {
    this.color = color ?? 'primary';
    this.position = {
      horitzontal: pHoritzontal ?? 'top',
      vertical: pVertical ?? 'right'
    };
  }
}
